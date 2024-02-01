import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { ToastAndroid } from "react-native";
import useLocalidades from "../../Hooks/UseLocalidades";
import useProvincias from "../../Hooks/UseProvincias";
import RNPickerSelect from "react-native-picker-select";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const FormConsumidor = ({
  nextStep,
  backStep,
  handleRegistro,
  tipoUsuario,
  activarRegistro,
  navigation,
  setTipoUsuario
}) => {
  const { provincias } = useProvincias();
  const { localidades, fetchLocalidades } = useLocalidades();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedLocalidad, setSelectedLocalidad] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [consumidorData, setConsumidorData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: new Date(2000, 0, 1),
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
      setTipoUsuario(tipoUsuario)
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

  return (
    <View style={styles.container}>
      <Text>Datos Consumidor 2/{tipoUsuario === "consumidor" ? "2" : "3"}</Text>
      <TextInput
        style={
          {
            /* Estilos para el input */
          }
        }
        placeholder="Nombre"
        value={consumidorData.nombre}
        onChangeText={(value) => handleChange("nombre", value)}
      />
      <TextInput
        style={
          {
            /* Estilos para el input */
          }
        }
        placeholder="Apellido"
        value={consumidorData.apellido}
        onChangeText={(value) => handleChange("apellido", value)}
      />
      <TextInput
        style={
          {
            /* Estilos para el input */
          }
        }
        placeholder="DNI"
        keyboardType="numeric"
        value={consumidorData.dni}
        onChangeText={(value) => handleChange("dni", value)}
      />
      <TouchableWithoutFeedback onPress={toggleDatePicker}>
        <View>
          <TextInput
            style={
              {
                /* Estilos para el input */
              }
            }
            placeholder="Fecha de Nacimiento"
            editable={false} // Make the TextInput not editable, as the date picker will handle the selection
            value={consumidorData.fechaNacimiento.toDateString()} // Display selected date
          />
        </View>
      </TouchableWithoutFeedback>

      {/* Show the date picker if showDatePicker is true */}
      {showDatePicker && (
        <RNDateTimePicker
          value={consumidorData.fechaNacimiento}
          onChange={handleDateChange}
          mode="date"
          maximumDate={new Date()}
        />
      )}

      <View>
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          fixAndroidTouchableBug={true}
          placeholder={{ label: "Seleccione una provincia", value: null }}
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

      <View>
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          fixAndroidTouchableBug={true}
          placeholder={{ label: "Seleccione una localidad", value: null }}
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
      <TextInput
        style={
          {
            /* Estilos para el input */
          }
        }
        placeholder="Teléfono"
        keyboardType="numeric"
        value={consumidorData.telefono}
        onChangeText={(value) => handleChange("telefono", value)}
      />
      <View
        style={
          {
            /* Estilos para el contenedor de los botones */
          }
        }
      >
        <TouchableOpacity onPress={() => backStep()}>
          <Text>Atrás</Text>
        </TouchableOpacity>
        {tipoUsuario === "consumidor" ? (
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Finalizar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Siguiente</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormConsumidor;
