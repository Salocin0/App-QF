import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useRecuperarContraseniaMutation } from "../../App/Service/authApi";
import { ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TengoCodigo = () => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const [codigo, setCodigo] = useState("");
  const navigation = useNavigation();
  const [recuperarContraseña] = useRecuperarContraseniaMutation();

  const handleTengoCodigo = () => {
    navigation.navigate("CambioContraseña", { codigo: codigo });
  };

  return (
    <ImageBackground source={require("../../../assets/QuickFoodCortado.png")} style={styles.backgroundImage}>
      <View style={styles.containerCard}>
        <View style={styles.card}>
          <View style={styles.cardheader}>
            <Text style={styles.title}>Ingrese Codigo</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Codigo </Text>
              <TextInput style={styles.inputAlternativo} value={codigo} onChangeText={setCodigo} />
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.containerCard}>
              <Text style={styles.buttonForm} onPress={() => handleTengoCodigo()}>
                Siguiente
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default TengoCodigo;
