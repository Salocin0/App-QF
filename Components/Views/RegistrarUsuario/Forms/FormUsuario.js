import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { ToastAndroid } from "react-native";
import styles from "../../../Styles/styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const FormUsuario = ({
  tipoUsuario,
  nextStep,
  backStep,
  handleUserDataChange,
  navigation,
}) => {
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
      ToastAndroid.show(
        "El nombre de usuario no puede estar vacío.",
        ToastAndroid.SHORT
      );
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
      ToastAndroid.show(
        "La contraseña no puede estar vacía.",
        ToastAndroid.SHORT
      );
      return;
    }

    if (userData.password.length < 8) {
      ToastAndroid.show(
        "La contraseña debe tener al menos 8 caracteres.",
        ToastAndroid.SHORT
      );
      return;
    }

    handleUserDataChange(userData);
    nextStep();
  };

  return (
    <ImageBackground
      source={require("./../../../../assets/QuickFoodCortado.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.containerCard}>
        <View style={styles.card}>
          <View style={styles.cardheader}>
            <Text style={styles.title}>
              Datos Usuario 1/{tipoUsuario === "consumidor" ? "2" : "3"}
            </Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.hr}>
              <Text style={styles.label}>Usuario</Text>
              <TextInput
                testID="Usuarioinput"
                style={styles.textinput}
                value={userData.username}
                onChangeText={(value) => handleChange("username", value)}
              />
            </View>
            <View style={styles.hr}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.textinput}
                value={userData.email}
                onChangeText={(value) => handleChange("email", value)}
              />
            </View>
            <View style={styles.hr}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  secureTextEntry={!showPassword1}
                  style={styles.textinput}
                  value={userData.password}
                  onChangeText={(value) =>
                    handleChange("password", value)
                  }
                />
                <TouchableOpacity
                  onPress={toggleShowPassword1}
                  style={styles.toggleButton}
                >
                  <Text>
                    {showPassword1 ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.hr}>
              <Text style={styles.label}>Repetir Contraseña</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  secureTextEntry={!showPassword2}
                  style={styles.textinput}
                  value={userData.confirmPassword}
                  onChangeText={(value) =>
                    handleChange("confirmPassword", value)
                  }
                />
                <TouchableOpacity
                  onPress={toggleShowPassword2}
                  style={styles.toggleButton}
                >
                  <Text>{showPassword2 ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Seleccion Perfil");
              }}
              style={styles.clearButton}
            >
              <Text>Volver</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.containerCard}
            >
              <Text style={styles.buttonForm}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default FormUsuario;
