import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ToastAndroid } from "react-native";

const FormUsuario = ({ tipoUsuario, handleRegistro }) => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = () => {
    if (!userData.username.trim()) {
      ToastAndroid.show("El nombre de usuario no puede estar vacío.", ToastAndroid.SHORT);
      return;
    }

    if (userData.email.length === 0) {
      ToastAndroid.show("El email no puede estar vacío.", ToastAndroid.SHORT);
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      ToastAndroid.show("Las contraseñas no coinciden.", ToastAndroid.SHORT);
      return;
    }

    if (!userData.password.trim()) {
      ToastAndroid.show("La contraseña no puede estar vacía.", ToastAndroid.SHORT);
      return;
    }

    if (userData.password.length < 8) {
      ToastAndroid.show("La contraseña debe tener al menos 8 caracteres.", ToastAndroid.SHORT);
      return;
    }

    handleRegistro(userData);
    navigation("SiguienteScreen");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Datos Usuario 1/{tipoUsuario === "consumidor" ? "2" : "3"}</Text>
      <TextInput
        placeholder="Nombre de usuario"
        value={userData.username}
        onChangeText={(value) => handleChange("username", value)}
      />
      <TextInput
        placeholder="Email"
        value={userData.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      <View >
        <TextInput
          secureTextEntry={!showPassword1}
          placeholder="Contraseña"
          value={userData.password}
          onChangeText={(value) => handleChange("password", value)}
        />
        <TouchableOpacity onPress={toggleShowPassword1}>
          <Text>{showPassword1 ? "Ocultar" : "Mostrar"}</Text>
        </TouchableOpacity>
      </View>
      <View >
        <TextInput
          secureTextEntry={!showPassword2}
          placeholder="Repetir Contraseña"
          value={userData.confirmPassword}
          onChangeText={(value) => handleChange("confirmPassword", value)}
        />
        <TouchableOpacity onPress={toggleShowPassword2}>
          <Text>{showPassword2 ? "Ocultar" : "Mostrar"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormUsuario;
