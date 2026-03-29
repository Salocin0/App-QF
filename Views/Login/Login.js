import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Button, Image } from "react-native";
import { ToastAndroid } from "react-native";
import useStyles from "../../Styles/useStyles";
import { useLoginUserMutation } from "./../../components/App/Service/authApi";
import { useDispatch } from "react-redux";
import { guardarSesionUsuario } from "../../components/Features/Auth/authSlice";
import { usePushNotifications } from "./../../hooks/usePushNotifications";
import useDynamicColors from "@/Styles/useDynamicColors";
import FloatingButton from "../Chatbot/FloatingButton";
import imglogo from "./../../assets/logo.png";

export default Login = ({ navigation }) => {
  const Colors = useDynamicColors();
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUserMutation] = useLoginUserMutation();
  const { expoPushToken, notification } = usePushNotifications();
  const dispatch = useDispatch();

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
      tokenMobile: expoPushToken?.data,
    };
    const responseData = await loginUserMutation(userData);

    if (responseData === "undefined") {
      ToastAndroid.show("Error en el login", ToastAndroid.SHORT);
    }

    if (Number(responseData?.data?.code) === 200) {
      console.log("data", responseData.data);
      const usuarioLogueado = {
        email: email,
        idToken: responseData.data.data.sessionId,
        tipoUsuario: responseData.data.data.tipoUsuario,
        usuario: responseData.data.data.usuario,
        consumidorId: responseData.data.data.consumidorId,
        id: responseData.data.data.id,
        sessionId: responseData.data.data.sessionId,
        tokenWeb: null,
        tokenMobile: expoPushToken?.data,
        nombre: responseData.data.data.nombre,
        apellido: responseData.data.data.apellido,
      };

      dispatch(guardarSesionUsuario(usuarioLogueado));
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
      //ToastAndroid.show("Datos incorrectos", ToastAndroid.SHORT);
      ToastAndroid.show(process.env.EXPO_PUBLIC_API_URL || "http://backendnode-qf.onrender.com"+"/login/", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
            <Image 
        source={imglogo}
        style={{ height: "20%", resizeMode: "contain" }}
      />

      <Text h4 style={styles.title} testID="titulo">
        QuickFood
      </Text>
      <Text style={[styles.label, { alignSelf: "flex-start", paddingTop: 20 }]}>
        Usuario
      </Text>
      <TextInput
        style={[
          styles.input,
          { 
            color: Colors.Negro, 
            fontSize: 13, 
            width: "100%", 
            height: 40,
            backgroundColor: Colors.Blanco,
          },
        ]}
        placeholderTextColor={Colors.Gris}
        value={email}
        onChangeText={handleEmailChange}
      />
      <Text style={[styles.label, { alignSelf: "flex-start", paddingTop: 20 }]}>
        Contraseña
      </Text>
      <TextInput
        style={[
          styles.input,
          { 
            color: Colors.Negro, 
            fontSize: 13, 
            width: "100%", 
            height: 40,
            backgroundColor: Colors.Blanco,
          },
        ]}
        placeholderTextColor={Colors.Gris}
        secureTextEntry={true}
        value={password}
        onChangeText={handlePasswordChange}
      />
      <View style={[styles.ViewButtom, { paddingTop: 20 }]}>
        <Button
          testID="botonIngresar"
          title="Ingresar"
          buttonStyle={styles.button}
          onPress={(event) => onPressLogin(event)}
        />
      </View>
      <View style={styles.footer}>
        <Text
          testID="recuperarContraseña"
          style={[styles.link, { color: Colors.Azul }]}
          onPress={() => navigation.navigate("Recuperar Contraseña")}
        >
          Recuperar Contraseña
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.text, { color: Colors.Negro }]}>¿No tienes cuenta? </Text>
        <Text
          testID="registrarse"
          style={[styles.link, { color: Colors.Azul }]}
          onPress={() => navigation.navigate("Seleccion Perfil")}
        >
          Registrarse
        </Text>
      </View>
      <FloatingButton />
    </View>
  );
};
