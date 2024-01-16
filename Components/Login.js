import React from "react";
import { StyleSheet, View } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { Link } from "react-router-native";
import useLogin from "./Hooks/UseLogin";

export default Login = () => {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  } = useLogin();

  const onPressLogin = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const loginResult = await handleLogin();
    console.log(loginResult);
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
        <Link to="/recuperar-contraseña">
          <Text style={styles.link}>Recuperar Contraseña</Text>
        </Link>
      </View>
      <View style={styles.footer}>
        <Text>¿No tienes cuenta? </Text>
        <Link to="/registrarse">
          <Text style={styles.link}>Registrarse</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 20,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  label: {
    color: "black",
    fontWeight: "normal",
  },
  button: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    marginHorizontal: 10,
    alignSelf: "flex-end",
    width: "33%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  link: {
    color: "#3498db",
  },
  ViewButtom: {
    width: "100%",
  },
});
