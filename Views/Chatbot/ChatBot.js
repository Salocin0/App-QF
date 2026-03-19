import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import logoImage from "./../../assets/quickfood-logo.png";
import botImage from "./../../assets/bot-img.png";
import userImage from "./../../assets/user-img.png";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Importar useNavigation
import useDynamicColors from "@/Styles/useDynamicColors";

const Chatbot = () => {
  const user = useSelector((state) => state.auth);
  const isLoggedIn = user?.id;
  const Colors = useDynamicColors();
  console.log(user);
  const navigation = useNavigation(); // Inicializar useNavigation

  const [messages, setMessages] = useState([]);
  const chatInputRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [inputText, setInputText] = useState("");
  
  const MenssageLogin = `Puedes loguearte haciendo click aquí.`;

  const MenssageRegister = `Tambien podes crearte una cuenta \nhaciendo click aquí.`;

  useEffect(() => {
    const greetingMessage = isLoggedIn
      ? `Hola ${user.nombre} 👋 👋, \nespero que estés bien! Acá Foody 🤖.  \nDecime, ¿en qué puedo ayudarte?`
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
  }, [isLoggedIn, user.nombre]); // Run when `isLoggedIn` or `user.nombre` changes

  const sendMessage = () => {
    if (inputText.trim()) {
      addMessageToChat(inputText, "user");
      setInputText("");

      fetch(`${process.env.REACT_APP_BACK_URL}chatbot`, {
        method: "POST",
        body: new URLSearchParams({ userMessage: inputText }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          addMessageToChat(data.data.chat_response, "bot");
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const addMessageToChat = (message, sender) => {
    setMessages((prevMessages) => [...prevMessages, { message, sender }]);

    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
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
    logo: {
      width: 100,
      height: 100,
      marginBottom: 5,
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
      marginTop: 5,
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
        <Image source={logoImage} style={styles.logo} />
      </View>
      <ScrollView style={styles.chatContainer} ref={scrollViewRef}>
        {messages.map((msg, index) => (
          <View
            key={index}
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
              <Text style={styles.messageText}>{msg.message}</Text>
            </TouchableOpacity>
          </View>
        ))}
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
          placeholderTextColor={Colors.Negro}
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
