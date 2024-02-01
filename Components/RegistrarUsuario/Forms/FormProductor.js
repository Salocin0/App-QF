import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ToastAndroid } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const FormProductor = ({
  nextStep,
  backStep,
  handleRegistro,
  activarRegistro,
}) => {
  const [productorData, setProductorData] = useState({
    cuit: "",
    razonSocial: "",
    ivaCondicion: "responsable_inscripto",
  });

  const handleChange = (name, value) => {
    setProductorData({
      ...productorData,
      [name]: value,
    });
  };

  const isCuitValid = (cuit) => {
    const regexCuit = /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g;
    if (!cuit.trim()) {
      return false;
    }
    return regexCuit.test(cuit);
  };

  const tieneLetras = (cadena) => {
    const regex = /[a-zA-Z]/;
    return regex.test(cadena);
  };

  const handleSubmit = () => {
    if (!isCuitValid(productorData.cuit)) {
      ToastAndroid.show(
        "El CUIT no es válido o está vacío.",
        ToastAndroid.SHORT
      );
      return;
    }

    if (!productorData.razonSocial.trim()) {
      ToastAndroid.show(
        "Razón social no puede estar vacía.",
        ToastAndroid.SHORT
      );
      return;
    }

    if (tieneLetras(productorData.cuit)) {
      ToastAndroid.show("CUIT no puede tener letras.", ToastAndroid.SHORT);
      return;
    }

    handleRegistro(productorData);
    activarRegistro("productor");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Datos Productor 3/3</Text>
      <TextInput
        style={
          {
            /* Estilos para el input */
          }
        }
        placeholder="Ingrese CUIT"
        value={productorData.cuit}
        onChangeText={(value) => handleChange("cuit", value)}
        required
      />
      <TextInput
        style={
          {
            /* Estilos para el input */
          }
        }
        placeholder="Ingrese Razón Social"
        value={productorData.razonSocial}
        onChangeText={(value) => handleChange("razonSocial", value)}
        required
      />
      <View>
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          fixAndroidTouchableBug={true}
          placeholder={{ label: "Condicion frente al iva", value: null }}
          value={productorData.ivaCondicion}
          onValueChange={(value) => handleChange("ivaCondicion", value)}
          items={[
            { label: "Monotributista", value: "monotributista" },
            { label: "Responsable Inscripto", value: "responsable_inscripto" },
          ]}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => backStep()}>
          <Text>Atrás</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Text>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormProductor;
