import React, { useState, useEffect } from "react";
import { View, TextInput, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";
import { ToastAndroid } from "react-native";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useLoginUserMutation } from "../../App/Service/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../Features/Auth/authSlice";
import { usePushNotifications } from "./usePushNotifications";
import { REACT_APP_BACK_URL } from "@env";

export default Login = ({ navigation }) => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUserMutation] = useLoginUserMutation();
  const { expoPushToken, notification } = usePushNotifications();
  const dispatch = useDispatch();
  const [backendReady, setBackendReady] = useState(false);
  const [backendChecking, setBackendChecking] = useState(true);
  const [backendPinged, setBackendPinged] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const onPressLogin = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const userData = {
      correoElectronico: email,
      contraseña: password,
    };

    // Log de la URL completa
    const fullUrl = `${REACT_APP_BACK_URL}login/`;
    console.log("URL completa del fetch:", fullUrl);
    console.log("REACT_APP_BACK_URL:", REACT_APP_BACK_URL);

    const responseData = await loginUserMutation(userData);
    console.log(responseData);

    if (responseData === "undefined") {
      ToastAndroid.show("Error en el login", ToastAndroid.SHORT);
    }

    if (Number(responseData?.data?.code) === 200) {
      dispatch(
        setUser({
          email: email,
          idToken: responseData.data.data.sessionId,
          tipoUsuario: responseData.data.data.tipoUsuario,
          usuario: responseData.data.data.usuario,
          consumidorId: responseData.data.data.consumidorId,
          id: responseData.data.data.id,
          sessionId: responseData.data.data.sessionId,
        })
      );
      ToastAndroid.show("Login correcto", ToastAndroid.SHORT);
      return { success: true, data: responseData.data };
    } else if (Number(responseData?.data?.code) === 300) {
      ToastAndroid.show(
        "Email no validado, revisa tu correo",
        ToastAndroid.SHORT
      );
      navigation.navigate("Login");
    } else if (Number(responseData?.data?.code) === 301) {
      ToastAndroid.show("Usuario inhabilitado", ToastAndroid.SHORT);
      navigation.navigate("Login");
    } else {
      ToastAndroid.show("Datos incorrectos", ToastAndroid.SHORT);
    }
  };

  // Ping the backend once (do not block the UI). This wakes sleeping hosting services.
  useEffect(() => {
    let cancelled = false;

    const fetchWithTimeout = async (url, timeout = 5000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      try {
        const resp = await fetch(url, { method: "GET", signal: controller.signal });
        clearTimeout(id);
        return resp;
      } catch (e) {
        clearTimeout(id);
        throw e;
      }
    };

    const pingBackendOnce = async () => {
      setBackendChecking(true);
      const base = REACT_APP_BACK_URL || "";
      const candidates = [`${base}health`, base];

      for (const url of candidates) {
        if (cancelled) return;
        try {
          console.log("Pinging backend ->", url);
          const r = await fetchWithTimeout(url, 7000);
          console.log("Ping response status:", r.status, "url:", url);
          if (r && (r.ok || r.status === 200 || r.status === 204)) {
            setBackendReady(true);
            setBackendChecking(false);
            setBackendPinged(true);
            console.log("Backend disponible en:", url);
            return;
          }
        } catch (err) {
          console.warn("Ping fallo para:", url, err.message);
        }
      }

      // mark as pinged even if failed, so we don't retry again
      if (!cancelled) {
        setBackendReady(false);
        setBackendChecking(false);
        setBackendPinged(true);
        // No mostrar error al usuario; loguear a nivel debug para desarrolladores
        console.debug("Login: ping al backend fallido (intento único)");
      }
    };

    // Only attempt once on mount
    pingBackendOnce();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ImageBackground source={require("../../../assets/QuickFoodCortado.png")} style={styles.backgroundImage}>
      <View style={styles.containerCard}>
        <View style={[styles.card, { width: "90%", borderWidth: 1, borderColor: Colors.Gris }]}>
          <View style={styles.cardheader}>
            <Text style={styles.title} testID="titulo">
              QuickFood
            </Text>
          </View>
          <View style={[styles.cardBody, { alignItems: "stretch" }]}> 
              <View style={styles.inputContainerAlternativa}>
                <Text style={[styles.label, { alignSelf: "flex-start", marginBottom: 6, marginLeft: 4 }]}>Email</Text>
                <TextInput
                  testID="inputEmail"
                  style={[styles.inputAlternativo, { width: "100%", paddingVertical: 12, fontSize: 15, color: Colors.Negro }]}
                  placeholder="Correo Electrónico"
                  placeholderTextColor={Colors.Gris}
                  value={email}
                  onChangeText={handleEmailChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>

              <View style={styles.inputContainerAlternativa}>
                <Text style={[styles.label, { alignSelf: "flex-start", marginBottom: 6, marginLeft: 4 }]}>Contraseña</Text>
                <TextInput
                  testID="inputPassword"
                  style={[styles.inputAlternativo, { width: "100%", paddingVertical: 12, fontSize: 15, color: Colors.Negro }]}
                  placeholder="Contraseña"
                  placeholderTextColor={Colors.Gris}
                  value={password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoComplete="password"
                />
              </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              testID="botonIngresar"
              style={[styles.button, { width: "100%", alignSelf: "center", marginHorizontal: 0 }]}
              onPress={(event) => onPressLogin(event)}
            >
              <Text style={{ color: "#fff", textAlign: "center", padding: 12 }}>Ingresar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text
              testID="recuperarContraseña"
              style={styles.link}
              onPress={() => navigation.navigate("Recuperar Contraseña")}
            >
              Recuperar Contraseña
            </Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.text}>¿No tienes cuenta? </Text>
            <Text
              testID="registrarse"
              style={styles.link}
              onPress={() => navigation.navigate("Seleccion Perfil")}
            >
              Registrarse
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
