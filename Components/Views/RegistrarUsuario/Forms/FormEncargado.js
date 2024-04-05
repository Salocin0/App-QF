import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import useStyles from "../../../Styles/useStyles";

const FormEncargado = ({
  nextStep,
  backStep,
  handleRegistro,
  activarRegistro,
}) => {
  const styles = useStyles()
  const [encargadoData, setEncargadoData] = useState({
    cuit: "",
    razonSocial: "",
    ivaCondicion: null,
  });

  const isCuitValid = (cuit) => {
    const regexCuit = /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g;
    if (!cuit.trim()) {
      return false;
    }
    return regexCuit.test(cuit);
  };

  const handleChange = (name, value) => {
    setEncargadoData({
      ...encargadoData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!isCuitValid(encargadoData.cuit)) {
      alert("El CUIT no es válido o está vacío.");
      return;
    }

    if (!encargadoData.razonSocial.trim()) {
      alert("La razón social no puede estar vacía.");
      return;
    }

    handleRegistro(encargadoData);
    activarRegistro("encargado");
  };

  return (
    <ImageBackground
      source={require("./../../../../assets/QuickFoodCortado.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.containerCard}>
        <View style={styles.card}>
          <View style={styles.cardheader}>
            <Text style={styles.title}>Datos Encargado 3/3</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.hr}>
              <Text style={styles.label}>CUIT</Text>
              <TextInput
                style={styles.textinput}
                value={encargadoData.cuit}
                onChangeText={(text) => handleChange("cuit", text)}
              />
            </View>
            <View style={styles.hr}>
              <Text style={styles.label}>Razón Social</Text>
              <TextInput
                style={styles.textinput}
                value={encargadoData.razonSocial}
                onChangeText={(text) => handleChange("razonSocial", text)}
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
                  value={encargadoData.ivaCondicion}
                  onValueChange={(value) => handleChange("ivaCondicion", value)}
                  items={[
                    { label: "Monotributista", value: "monotributista" },
                    {
                      label: "Responsable Inscripto",
                      value: "responsable_inscripto",
                    },
                  ]}
                />
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => backStep()}
                style={styles.clearButton}
              >
                <Text style={styles.buttonText}>Atrás</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.containerCard} onPress={handleSubmit}>
                <Text style={styles.buttonEndForm}>Finalizar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default FormEncargado;
