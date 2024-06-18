import React, { useState } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { ToastAndroid } from "react-native";
import useStyles from "../../Styles/useStyles";
import { useLoginUserMutation } from "./../../components/App/Service/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../components/Features/Auth/authSlice";
import { usePushNotifications } from "./usePushNotifications";
import useDynamicColors from "@/Styles/useDynamicColors";

export default Login = ({ navigation }) => {
  const Colors = useDynamicColors()
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUserMutation] = useLoginUserMutation();
  const { expoPushToken, notification } = usePushNotifications()
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
          tokenWeb: null,
          tokenMobile:expoPushToken?.null,
        })
      );
      ToastAndroid.show("Login correcto", ToastAndroid.SHORT);
      return { success: true, data: responseData.data };
    } else if (Number(responseData?.data?.code) === 300) {
      ToastAndroid.show("Email no validado, revisa tu correo", ToastAndroid.SHORT);
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
        QuickFood
      </Text>
      <Text style={[styles.label, { alignSelf: 'flex-start',paddingTop:20 }]}>Usuario </Text>
      <TextInput
          style={[styles.input, { color: Colors.Negro,fontSize:13, width:"100%", height:40 }]}
          placeholderTextColor={Colors.Negro}
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <Text style={[styles.label, { alignSelf: 'flex-start',paddingTop:20 }]}>Contraseña </Text>
        <TextInput
          style={[styles.input, { color: Colors.Negro,fontSize:13,width:"100%", height:40 }]}
          placeholderTextColor={Colors.Negro}
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      <View style={[styles.ViewButtom,{paddingTop:20}]}>
        <Button testID="botonIngresar" title="Ingresar" buttonStyle={styles.button} onPress={(event) => onPressLogin(event)} />
      </View>
      <View style={styles.footer}>
        <Text testID="recuperarContraseña" style={styles.link} onPress={() => navigation.navigate("Recuperar Contraseña")}>
          Recuperar Contraseña
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>¿No tienes cuenta? </Text>
        <Text testID="registrarse" style={styles.link} onPress={() => navigation.navigate("Seleccion Perfil")}>
          Registrarse
        </Text>
      </View>
    </View>
  );
};
