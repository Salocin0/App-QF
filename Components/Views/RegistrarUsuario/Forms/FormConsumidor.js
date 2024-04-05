import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { ToastAndroid } from "react-native";
import useLocalidades from "../../../Hooks/UseLocalidades";
import useProvincias from "../../../Hooks/UseProvincias";
import RNPickerSelect from "react-native-picker-select";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import useStyles from "../../../Styles/useStyles";

const FormConsumidor = ({
  nextStep,
  backStep,
  handleRegistro,
  tipoUsuario,
  activarRegistro,
  navigation,
  setTipoUsuario,
}) => {
  const { provincias } = useProvincias();
  const styles = useStyles()
  const { localidades, fetchLocalidades } = useLocalidades();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedLocalidad, setSelectedLocalidad] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [consumidorData, setConsumidorData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: new Date().setFullYear(new Date().getFullYear() - 18),
    provincia: "",
    localidad: "",
    telefono: "",
  });

  const handleChange = (name, value) => {
    setConsumidorData({
      ...consumidorData,
      [name]: value,
    });
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || consumidorData.fechaNacimiento;
    setShowDatePicker(false);
    handleChange("fechaNacimiento", currentDate);
  };

  const tieneNumeros = (cadena) => {
    const pattern = /\d/;
    return pattern.test(cadena);
  };

  const tieneLetras = (cadena) => {
    const regex = /[a-zA-Z]/;
    return regex.test(cadena);
  };

  const validaDNI = (cadena) => {
    const regexDni = /^\d{8}$/;
    return regexDni.test(cadena);
  };

  const handleSubmit = () => {
    const hoy = new Date();
    const fechaNacimientoDate = new Date(consumidorData.fechaNacimiento);
    const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();

    if (!consumidorData.nombre.trim()) {
      ToastAndroid.show("Nombre no puede estar vacío.", ToastAndroid.SHORT);
      return;
    }

    if (tieneNumeros(consumidorData.nombre)) {
      ToastAndroid.show(
        "El nombre no puede contener números.",
        ToastAndroid.SHORT
      );
      return;
    }

    if (tieneNumeros(consumidorData.apellido)) {
      ToastAndroid.show(
        "El apellido no puede contener números.",
        ToastAndroid.SHORT
      );
      return;
    }

    if (tieneLetras(consumidorData.dni)) {
      ToastAndroid.show("El DNI no puede contener letras.", ToastAndroid.SHORT);
      return;
    }

    if (!validaDNI(consumidorData.dni)) {
      ToastAndroid.show("El DNI no es válido.", ToastAndroid.SHORT);
      return;
    }

    if (!consumidorData.apellido.trim()) {
      ToastAndroid.show("Apellido no puede estar vacío.", ToastAndroid.SHORT);
      return;
    }

    if (!consumidorData.dni.trim()) {
      ToastAndroid.show("DNI no puede estar vacío.", ToastAndroid.SHORT);
      return;
    }

    if (edad < 18) {
      ToastAndroid.show(
        "Debes tener al menos 18 años para registrarte.",
        ToastAndroid.SHORT
      );
      return;
    }

    if (tieneLetras(consumidorData.telefono)) {
      ToastAndroid.show(
        "El teléfono no puede contener letras.",
        ToastAndroid.SHORT
      );
      return;
    }

    if (!consumidorData.telefono.trim()) {
      ToastAndroid.show("Teléfono no puede estar vacío.", ToastAndroid.SHORT);
      return;
    }

    setConsumidorData({
      ...consumidorData,
    });

    handleRegistro(consumidorData);

    if (tipoUsuario === "consumidor") {
      setTipoUsuario(tipoUsuario);
      activarRegistro(tipoUsuario);
    } else {
      nextStep();
    }
  };

  const handleLocalidadChange = (value) => {
    setSelectedLocalidad(value);
    consumidorData.localidad = value;
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    fetchLocalidades(value);
    consumidorData.provincia = value;
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long", // 'long' para nombre completo del mes
      day: "2-digit", // '2-digit' para día con dos dígitos
    };

    return new Intl.DateTimeFormat("es-ES", options).format(date);
  };

  return (
    <ImageBackground
      source={require("../../../../assets/QuickFoodCortado.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.containerCard}>
        <View style={styles.card}>
          <View style={styles.cardheader}>
            <Text style={styles.title}>
              Datos Consumidor 2/{tipoUsuario === "consumidor" ? "2" : "3"}
            </Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.hr}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.textinput}
                value={consumidorData.nombre}
                onChangeText={(value) => handleChange("nombre", value)}
              />
            </View>
            <View style={styles.hr}>
              <Text style={styles.label}>Apellido</Text>
              <TextInput
                style={styles.textinput}
                value={consumidorData.apellido}
                onChangeText={(value) => handleChange("apellido", value)}
              />
            </View>
            <View style={styles.hr}>
              <Text style={styles.label}>DNI</Text>
              <TextInput
                style={styles.textinput}
                keyboardType="numeric"
                value={consumidorData.dni}
                onChangeText={(value) => handleChange("dni", value)}
              />
            </View>
            <View style={styles.hr}>
              <Text style={styles.label}>Fecha de Nacimiento</Text>
              <TouchableWithoutFeedback onPress={toggleDatePicker}>
                <View>
                  <TextInput
                    style={styles.textinput}
                    editable={false}
                    value={formatDate(consumidorData.fechaNacimiento)}
                  />
                </View>
              </TouchableWithoutFeedback>
              {showDatePicker && (
                <RNDateTimePicker
                  value={consumidorData.fechaNacimiento}
                  onChange={handleDateChange}
                  mode="date"
                  maximumDate={new Date()}
                />
              )}
            </View>
            <View style={styles.hr}>
              <Text style={styles.label}>Seleccione una provincia</Text>
              <View style={styles.textinput}>
                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
                  fixAndroidTouchableBug={true}
                  placeholder={{ label: "", value: null }}
                  value={selectedProvince}
                  onValueChange={(value) => handleProvinceChange(value)}
                  items={provincias.map((prov) => ({
                    label: prov.nombre,
                    value: prov.nombre,
                    key: prov.id,
                    inputLabel: prov.nombre,
                  }))}
                />
              </View>
            </View>
            <View style={styles.hr}>
              <Text style={styles.label}>Seleccione una localidad</Text>
              <View style={styles.textinput}>
                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
                  fixAndroidTouchableBug={true}
                  placeholder={{
                    label: "",
                    value: null,
                  }}
                  value={selectedLocalidad}
                  onValueChange={(value) => handleLocalidadChange(value)}
                  items={localidades.map((loc) => ({
                    label: loc.nombre,
                    value: loc.nombre,
                    key: loc.id,
                    inputLabel: loc.nombre,
                  }))}
                />
              </View>
            </View>
            <View style={styles.hr}>
              <Text style={styles.label}>Teléfono</Text>
              <TextInput
                style={styles.textinput}
                keyboardType="numeric"
                value={consumidorData.telefono}
                onChangeText={(value) => handleChange("telefono", value)}
              />
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => backStep()}
              style={styles.clearButton}
            >
              <Text>Atrás</Text>
            </TouchableOpacity>
            {tipoUsuario === "consumidor" ? (
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.containerCard}
              >
                <Text style={styles.buttonEndForm}>Finalizar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.containerCard}
              >
                <Text style={styles.buttonForm}>Siguiente</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default FormConsumidor;
