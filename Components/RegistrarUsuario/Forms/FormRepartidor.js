import React, { useState } from "react";
import { View, Text, TouchableOpacity, CheckBox } from "react-native";
import { ToastAndroid } from "react-native";

const FormRepartidor = ({ nextStep, backStep, handleRegistro }) => {
  const [repartidorData, setRepartidorData] = useState({
    confirmacionMayorDeEdad: false,
  });

  const handleCheckboxChange = (name, checked) => {
    setRepartidorData({
      ...repartidorData,
      [name]: checked,
    });
  };

  const handleSubmit = () => {
    if (repartidorData.confirmacionMayorDeEdad) {
      handleRegistro(repartidorData);
      navigation.navigate("Login");
    } else {
      ToastAndroid("Debes confirmar que tienes más de 18 años.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Datos Repartidor</Text>
      <View style={{ /* Estilos para el contenedor del checkbox y el texto */ }}>
        <CheckBox
          value={repartidorData.confirmacionMayorDeEdad}
          onValueChange={(checked) => handleCheckboxChange("confirmacionMayorDeEdad", checked)}
        />
        <Text>Confirmo que tengo más de 18 años</Text>
      </View>
      <View style={{ /* Estilos para el contenedor de los botones */ }}>
        <TouchableOpacity onPress={() => backStep()}>
          <Text>Atrás</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!repartidorData.confirmacionMayorDeEdad}
        >
          <Text>Finalizado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormRepartidor;
