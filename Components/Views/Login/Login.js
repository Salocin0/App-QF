import React, { useState } from "react";
import { View } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { ToastAndroid } from "react-native";
import useStyles from "../../Styles/useStyles";
import { useLoginUserMutation } from "../../App/Service/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../Features/Auth/authSlice";
import useNotificationToken from "./useNoficationToken";

export default Login = ({ navigation }) => {
  const styles = useStyles()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUserMutation] = useLoginUserMutation();
  const token = useNotificationToken();

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
    };
    const responseData = await loginUserMutation(userData);
    console.log(responseData)
    if(responseData?.data?.code === "undefined"){
      ToastAndroid.show("Error en el login", ToastAndroid.SHORT);
    }
    if (Number(responseData?.data?.code) === 200) {
      if (token) {
        try {
          await fetch(`http://192.168.0.154:8000/token/${token}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Token enviado al backend:', token);
        } catch (error) {
          console.error('Error al enviar el token:', error);
        }
      }
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

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title} testID="titulo">
        QuickFood {token && <Text>Token: {token}</Text>}
      </Text>
      <Input
        testID="usuario"
        label="Usuario"
        inputStyle={styles.input}
        labelStyle={styles.label}
        underlineColorAndroid="transparent"
        inputContainerStyle={{ borderBottomWidth: 0 }}
        onChangeText={handleEmailChange}
        value={email}
      />
      <Input
        testID="contraseña"
        label="Contraseña"
        secureTextEntry
        inputStyle={styles.input}
        labelStyle={styles.label}
        underlineColorAndroid="transparent"
        inputContainerStyle={{ borderBottomWidth: 0 }}
        onChangeText={handlePasswordChange}
        value={password}
      />
      <View style={styles.ViewButtom}>
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
  );
};
