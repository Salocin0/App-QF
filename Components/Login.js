import React from "react";
import { View } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import useLogin from "./Hooks/UseLogin";
import styles from "./Styles/cards.style";

export default Login = ({ navigation }) => {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  } = useLogin(navigation);

  const onPressLogin = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const loginResult = await handleLogin();
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>
        QuickFood
      </Text>
      <Input
        label="Usuario"
        inputStyle={styles.input}
        labelStyle={styles.label}
        underlineColorAndroid="transparent"
        inputContainerStyle={{ borderBottomWidth: 0 }}
        onChangeText={handleEmailChange}
        value={email}
      />
      <Input
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
          title="Ingresar"
          buttonStyle={styles.button}
          onPress={(event) => onPressLogin(event)}
        />
      </View>
      <View style={styles.footer}>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Recuperar Contraseña")}
        >
          Recuperar Contraseña
        </Text>
      </View>
      <View style={styles.footer}>
        <Text>¿No tienes cuenta? </Text>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Seleccion Perfil")}
        >
          Registrarse
        </Text>
      </View>
    </View>
  );
};
