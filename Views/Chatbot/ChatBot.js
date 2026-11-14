import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Linking,
  Animated,
  Keyboard,
} from "react-native";
import logoImage from "./../../assets/qf-new-logo-transparent.png";
import botImage from "./../../assets/bot-img.png";
import userImage from "./../../assets/user-img.png";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Importar useNavigation
import useDynamicColors from "@/Styles/useDynamicColors";
import { enviarMensajeChatbotStream, armarHistorial } from "../../components/Features/chatbot/chatbotApi";
import { parseChatText } from "./chatRichText";
import { abrirLinkEnApp } from "./chatLinkNavigation";
import useTextoSuave from "./useTextoSuave";

// Bot text revealed smoothly while it streams (render prop keeps the hook per message).
// `pendiente` is true while Foody is still writing or part of the text is not shown yet,
// so the bubble can show the typing dots instead of looking frozen.
const TextoBot = ({ texto, animar, escribiendo, render }) => {
  const visible = useTextoSuave(texto, animar);
  return render(visible, Boolean(escribiendo) || visible.length < (texto || "").length);
};

// Bullet per nesting level: puesto (0) > producto (1) > detalle (2).
const BULLETS = ["•", "◦", "▪"];

// Three dots that pulse in sequence while Foody is "thinking".
const TypingDots = ({ color }) => {
  const dots = useRef([0, 1, 2].map(() => new Animated.Value(0.3))).current;

  useEffect(() => {
    const loops = dots.map((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 180),
          Animated.timing(dot, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.3, duration: 300, useNativeDriver: true }),
          Animated.delay((2 - i) * 180),
        ])
      )
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [dots]);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 6 }}>
      {dots.map((opacity, i) => (
        <Animated.View
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 3,
            backgroundColor: color,
            opacity,
          }}
        />
      ))}
    </View>
  );
};

const Chatbot = () => {
  const user = useSelector((state) => state.auth);
  const isLoggedIn = user?.id;
  const displayName = [user?.nombre, user?.apellido].filter(Boolean).join(" ") || user?.usuario;
  const Colors = useDynamicColors();
  const navigation = useNavigation(); // Inicializar useNavigation

  const [messages, setMessages] = useState([]);
  // Questions and their final answers by question number, for the short memory sent to Foody.
  // Kept outside React state so a queued question always sees the previous answer.
  const conversacionRef = useRef([]);
  const preguntaSeqRef = useRef(0);
  const chatInputRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [pendingCount, setPendingCount] = useState(0);
  const queueRef = useRef(Promise.resolve());
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Shrink the header logo while the keyboard is open so messages get more room.
  const compactHeader = keyboardVisible;

  const MenssageLogin = `Puedes loguearte haciendo click aquí.`;

  const MenssageRegister = `Tambien podes crearte una cuenta \nhaciendo click aquí.`;

  useEffect(() => {
    const greetingMessage = isLoggedIn
      ? `Hola ${displayName || "ahí"} 👋 👋, \nespero que estés bien! Acá Foody 🤖.  \nDecime, ¿en qué puedo ayudarte?`
      : `Hola Usuario 👋 👋,  \nespero que estés bien! Acá Foody 🤖.  \nDecime, ¿en qué puedo ayudarte?`;

    

    if (isLoggedIn) {
      setMessages([
        {
          message: greetingMessage,
          sender: "bot",
        },
      ]);
    } else {
      setMessages([
        {
          message: greetingMessage,
          sender: "bot",
        },
        {
          message: MenssageLogin,
          sender: "bot",
        },
        {
          message: MenssageRegister,
          sender: "bot",
        },
      ]);
    }
  }, [displayName, isLoggedIn]); // Run when the authenticated user's display name changes

  const sendMessage = () => {
    const text = inputText.trim();
    if (!text) return;
    const seq = ++preguntaSeqRef.current;
    conversacionRef.current.push({ seq, pregunta: text });
    setMessages((prev) => [...prev, { message: text, sender: "user", seq }]);
    setInputText("");
    setPendingCount((n) => n + 1);

    // Requests are chained so replies always come back in the order they were asked.
    // The reply is shown while Foody writes it (streaming) instead of all at once.
    queueRef.current = queueRef.current.then(() => {
      const id = `bot-${Date.now()}-${Math.random()}`;
      const actualizar = (cambios) =>
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...cambios } : m)));
      const historial = armarHistorial(conversacionRef.current, seq);
      setMessages((prev) => [...prev, { id, message: "", sender: "bot", streaming: true, animar: true, respondeA: seq }]);
      return enviarMensajeChatbotStream(text, (parcial) => actualizar({ message: parcial }), { historial })
        .then((respuesta) => {
          const entrada = conversacionRef.current.find((c) => c.seq === seq);
          if (entrada) entrada.respuesta = respuesta;
          actualizar({ message: respuesta, streaming: false });
        })
        .catch((error) => actualizar({ message: error.message, streaming: false, error: true }))
        .finally(() => setPendingCount((n) => Math.max(0, n - 1)));
    });
  };

  // Event/puesto/product links open the matching in-app screen; anything else
  // (ticket sites, roles without the purchase flow, errors) falls back to the browser.
  const abrirLink = async (href) => {
    try {
      if (await abrirLinkEnApp({ href, user, navigation })) return;
    } catch (error) {
      console.warn("No se pudo abrir el enlace en la app:", error?.message || error);
    }
    if (/^https?:\/\//i.test(href)) Linking.openURL(href);
  };

  const renderSpans = (spans, baseStyle, keyPrefix) =>
    spans.map((span, i) => {
      const key = `${keyPrefix}-${i}`;
      if (span.type === "bold") {
        return (
          <Text key={key} style={styles.boldText}>
            {span.value}
          </Text>
        );
      }
      if (span.type === "link") {
        return (
          <Text
            key={key}
            style={styles.linkText}
            onPress={() => abrirLink(span.href)}
          >
            {span.label}
          </Text>
        );
      }
      return <Text key={key}>{span.value}</Text>;
    });

  // Renders the Markdown subset Foody emits (bold, bullets, headings, links).
  // `pendiente` adds the typing dots at the end of the bubble while Foody keeps writing.
  const renderRichText = (text, pendiente = false) => {
    const blocks = parseChatText(text);
    const puntos = pendiente ? <TypingDots color={Colors.GrisOscuro} /> : null;
    if (blocks.length === 0) {
      return pendiente ? <View style={styles.bubble}>{puntos}</View> : <Text style={styles.messageText}>{text}</Text>;
    }
    return (
      <View style={styles.bubble}>
        {blocks.map((block, bi) => {
          if (block.type === "list") {
            return (
              <View key={bi} style={styles.listBlock}>
                {block.items.map((item, ii) => {
                  const level = block.levels?.[ii] || 0;
                  return (
                    <View key={ii} style={[styles.listItem, { marginLeft: level * 16 }]}>
                      <Text style={[styles.bullet, level > 0 && styles.bulletNested]}>
                        {BULLETS[level] || BULLETS[0]}
                      </Text>
                      <Text style={[styles.listText, level > 0 && styles.listTextNested]}>
                        {renderSpans(item, styles.listText, `${bi}-${ii}`)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            );
          }
          return (
            <Text
              key={bi}
              style={[styles.paragraph, block.type === "heading" && styles.headingText]}
            >
              {renderSpans(block.spans, styles.paragraph, `${bi}`)}
            </Text>
          );
        })}
        {puntos}
      </View>
    );
  };

  const scrollToEnd = () => scrollViewRef.current?.scrollToEnd({ animated: true });

  // Scroll only when a new message (or the typing bubble) appears, never while an answer
  // grows, so the user can read at their own pace and scroll down when they want.
  const conteoVisible =
    messages.filter((m) => m.message !== "").length +
    (pendingCount > 0 && !messages.some((m) => m.streaming && m.message) ? 1 : 0);
  const conteoScrolleadoRef = useRef(0);
  const scrollSiHayMensajeNuevo = () => {
    if (conteoVisible > conteoScrolleadoRef.current) scrollToEnd();
    conteoScrolleadoRef.current = conteoVisible;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.Blanco,
      padding: 10,
    },
    header: {
      alignItems: "center",
      marginBottom: 10,
    },
    // New logo is 563x443; keep that aspect ratio in both sizes.
    logo: {
      width: 140,
      height: 110,
      marginBottom: 5,
    },
    logoCompact: {
      width: 56,
      height: 44,
      marginBottom: 0,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    chatContainer: {
      flex: 1,
      marginVertical: 10,
    },
    chatMessage: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 10,
    },
    userMessage: {
      justifyContent: "flex-end",
      flexDirection: "row-reverse",
    },
    botMessage: {
      justifyContent: "flex-start",
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    messageColumn: {
      flexShrink: 1,
      maxWidth: "85%",
    },
    bubble: {
      backgroundColor: Colors.GrisClaroPeroNoTanClaro,
      padding: 10,
      borderRadius: 10,
    },
    paragraph: {
      fontSize: 16,
      color: Colors.Negro,
      marginBottom: 4,
    },
    headingText: {
      fontWeight: "bold",
      fontSize: 17,
    },
    boldText: {
      fontWeight: "bold",
    },
    listBlock: {
      marginBottom: 4,
    },
    listItem: {
      flexDirection: "row",
      marginBottom: 2,
    },
    bullet: {
      fontSize: 16,
      color: Colors.BordeDorado,
      width: 16,
    },
    bulletNested: {
      color: Colors.GrisOscuro,
      fontSize: 14,
    },
    listText: {
      flex: 1,
      fontSize: 16,
      color: Colors.Negro,
    },
    listTextNested: {
      fontSize: 15,
    },
    messageText: {
      fontSize: 16,
      backgroundColor: Colors.GrisClaroPeroNoTanClaro,
      padding: 10,
      borderRadius: 10,
      color: Colors.Negro,
    },
    linkText: {
      color: Colors.Azul,
      textDecorationLine: "underline",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    chatInput: {
      flex: 1,
      height: 40,
      borderColor: Colors.GrisOscuro,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginRight: 5,
      color: Colors.Negro,
    },
    sendBtn: {
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: Colors.Rosa,
    },
    sendBtnText: {
      color: Colors.BlancoEnBlanco,
      fontWeight: "bold",
    },
    footer: {
      alignItems: "center",
      paddingVertical: 10,
    },
    footerText: {
      fontSize: 12,
      color: Colors.GrisOscuro,
    },
    footerLink: {
      fontSize: 12,
      color: Colors.Azul,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={logoImage}
          style={compactHeader ? styles.logoCompact : styles.logo}
          resizeMode="contain"
        />
      </View>
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={scrollSiHayMensajeNuevo}
      >
        {messages.filter((msg) => msg.message !== "").map((msg, index) => (
          <View
            key={msg.id || index}
            style={[
              styles.chatMessage,
              msg.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Image
              source={msg.sender === "user" ? userImage : botImage}
              style={styles.avatar}
            />
            <TouchableOpacity
              style={styles.messageColumn}
              onPress={() => {
                if (msg.message === MenssageLogin || msg.message === MenssageRegister) {
                  if (msg.message === MenssageLogin) {
                    navigation.navigate("Login");
                  } else if (msg.message === MenssageRegister) {
                    navigation.navigate("Seleccion Perfil");
                  }
                }
              }}
              disabled={msg.message != MenssageLogin && msg.message != MenssageRegister} // Desactiva el botón si no es clickeable
            >
              {msg.sender === "bot"
                ? <TextoBot texto={msg.message} animar={Boolean(msg.animar)} escribiendo={msg.streaming} render={renderRichText} />
                : <Text style={styles.messageText}>{msg.message}</Text>
              }
            </TouchableOpacity>
          </View>
        ))}
        {pendingCount > 0 && !messages.some((m) => m.streaming && m.message) && (
          <View style={[styles.chatMessage, styles.botMessage]}>
            <Image source={botImage} style={styles.avatar} />
            <View style={styles.bubble}>
              <TypingDots color={Colors.GrisOscuro} />
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          ref={chatInputRef}
          style={styles.chatInput}
          placeholder="Escribí tu consulta aquí..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
          placeholderTextColor={Colors.GrisOscuro}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={styles.sendBtnText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          &copy; 2024 QuickFood. All rights reserved.
        </Text>
        <Text style={styles.footerLink}>Privacy Policy | Terms of Service</Text>
      </View>
    </View>
  );
};

export default Chatbot;
