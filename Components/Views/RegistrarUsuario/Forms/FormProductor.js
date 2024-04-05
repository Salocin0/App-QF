import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { ToastAndroid } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import useStyles from "../../../Styles/useStyles";

const FormProductor = ({
  nextStep,
  backStep,
  handleRegistro,
  activarRegistro,
}) => {
  const styles = useStyles()
  const [productorData, setProductorData] = useState({
    cuit: "",
    razonSocial: "",
    ivaCondicion: null,
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
    <ImageBackground
      source={require("./../../../../assets/QuickFoodCortado.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.containerCard}>
        <View style={styles.card}>
          <View style={styles.cardheader}>
            <Text style={styles.title}>Datos Productor 3/3</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.hr}>
              <Text style={styles.label}>CUIT</Text>
              <TextInput
                style={styles.textinput}
                value={productorData.cuit}
                onChangeText={(value) => handleChange("cuit", value)}
                required
              />
            </View>
            <View style={styles.hr}>
              <Text style={styles.label}>Razón Social</Text>
              <TextInput
                style={styles.textinput}
                value={productorData.razonSocial}
                onChangeText={(value) => handleChange("razonSocial", value)}
                required
              />
            </View>
            <View style={styles.hr}>
              <Text style={styles.label}>Condicion frente al iva</Text>
              <View style={styles.textinput}>
                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
                  fixAndroidTouchableBug={true}
                  placeholder={{
                    label: "",
                    value: null,
                  }}
                  value={productorData.ivaCondicion}
                  onValueChange={(value) => handleChange("ivaCondicion", value)}
                  items={[
                    { label: "Monotributista", value: "monotributista" },
                    {
                      label: "Responsable Inscripto",
                      value: "responsable_inscripto",
                    }
                  ]}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => backStep()} style={styles.clearButton}>
              <Text>Atrás</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.containerCard}>
              <Text style={styles.buttonEndForm}>Finalizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default FormProductor;
