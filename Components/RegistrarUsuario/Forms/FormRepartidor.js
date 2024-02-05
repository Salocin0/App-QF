import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { ToastAndroid } from "react-native";
import CheckBox from "react-native-check-box";
import styles from "../../Styles/cards.style";

const FormRepartidor = ({
  nextStep,
  backStep,
  handleRegistro,
  activarRegistro,
}) => {
  const [confirmacionMayorDeEdad, setconfirmacionMayorDeEdad] = useState(false);

  const handleCheckboxChange = () => {
    setconfirmacionMayorDeEdad(!confirmacionMayorDeEdad);
  };

  const handleSubmit = () => {
    if (confirmacionMayorDeEdad) {
      activarRegistro("repartidor");
    } else {
      ToastAndroid.show(
        "Debes confirmar que tienes más de 18 años.",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/QuickFoodCortado.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.containerCard}>
        <View style={styles.card}>
          <View style={styles.cardheader}>
            <Text style={styles.title}>Datos Repartidor 3/3</Text>
          </View>
          <View>
            <CheckBox
              rightText="Confirmo que tengo más de 18 años"
              isChecked={confirmacionMayorDeEdad}
              onClick={() => handleCheckboxChange()}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => backStep()}
              style={styles.clearButton}
            >
              <Text>Atrás</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerCard}
              onPress={handleSubmit}
              disabled={!confirmacionMayorDeEdad}
            >
              <Text style={styles.buttonEndForm}>Finalizado</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default FormRepartidor;
