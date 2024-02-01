import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ToastAndroid } from "react-native";
import CheckBox from "react-native-check-box";

const FormRepartidor = ({
  nextStep,
  backStep,
  handleRegistro,
  activarRegistro,
}) => {
  const [confirmacionMayorDeEdad,setconfirmacionMayorDeEdad] = useState(false)

  const handleCheckboxChange = () => {
    setconfirmacionMayorDeEdad(!confirmacionMayorDeEdad);
  };

  const handleSubmit = () => {
    if (confirmacionMayorDeEdad) {
      activarRegistro("repartidor");
    } else {
      ToastAndroid.show("Debes confirmar que tienes más de 18 años.",ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Datos Repartidor</Text>
      <View>
        <CheckBox
          isChecked={confirmacionMayorDeEdad}
          onClick={() => handleCheckboxChange()}
        />
        <Text>Confirmo que tengo más de 18 años</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => backStep()}>
          <Text>Atrás</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!confirmacionMayorDeEdad}
        >
          <Text>Finalizado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormRepartidor;
