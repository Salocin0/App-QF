import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "@/Styles/useDynamicColors";
import { useRecuperarContraseniaMutation } from "./../../components/App/Service/authApi";
import { ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RecuperarContraseña = () => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const [recuperarContraseña] = useRecuperarContraseniaMutation();

  const handleRecuperarContraseña = () => {
    const result = recuperarContraseña(email);
    if (result) {
      ToastAndroid.show("Email enviado", ToastAndroid.SHORT);
      navigation.navigate("Login");
    } else {
      ToastAndroid.show("Error al enviar el Email", ToastAndroid.SHORT);
    }
  };

  const handleTengoUnCodigo = () => {
    navigation.navigate("TengoCodigo");
  };

  return (
    <ImageBackground source={require("./../../assets/QuickFoodFondo.png")} style={styles.backgroundImage}>
      <View style={styles.containerCard}>
        <View style={styles.card}>
          <View style={styles.cardheader}>
            <Text style={styles.title}>Enviar codigo al Email</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email </Text>
              <TextInput style={styles.inputAlternativo} value={email} onChangeText={setEmail} />
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.containerCard}>
              <Text style={styles.buttonEndForm} onPress={() => handleTengoUnCodigo()}>
                Tengo un codigo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerCard}>
              <Text style={styles.buttonForm} onPress={() => handleRecuperarContraseña()}>
                Enviar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RecuperarContraseña;

const styles = StyleSheet.create({});
