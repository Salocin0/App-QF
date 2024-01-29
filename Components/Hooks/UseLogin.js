import { useState } from "react";
import { ToastAndroid } from "react-native";
import { REACT_APP_BACK_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLogin = (navigation) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    const url = `${REACT_APP_BACK_URL}login/`;

    const data = {
      contraseña: password,
      correoElectronico: email,
    };
    console.log(data);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const responseData = await response.json();

      if (Number(responseData.code) === 200) {
        await AsyncStorage.setItem("sessionId", responseData.data.sessionId);
        ToastAndroid("Login correcto");
        navigation.navigate("Inicio");
        return { success: true, data: responseData.data };
      } else if (Number(responseData.code) === 300) {
        ToastAndroid("Email no validado, revisa tu correo");
        navigation.navigate("Login");
      } else if (Number(responseData.code) === 301) {
        ToastAndroid("Usuario inhabilitado");
        navigation.navigate("Login");
      } else {
        ToastAndroid("Datos incorrectos");
      }
    } catch (error) {
      ToastAndroid("Error de red");
    }

    return { success: false };
  };

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  };
};

export default useLogin;
