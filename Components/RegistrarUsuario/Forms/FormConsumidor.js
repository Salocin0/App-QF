import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Picker } from "react-native";
import { ToastAndroid } from "react-native";

const FormConsumidor = ({ nextStep, backStep, handleRegistro, tipoUsuario }) => {
  const [provincias, setProvincias] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [localidades, setLocalidades] = useState([]);
  const [selectedLocalidad, setSelectedLocalidad] = useState("");
  const [consumidorData, setConsumidorData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
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
      ToastAndroid.show("El nombre no puede contener números.", ToastAndroid.SHORT);
      return;
    }

    if (tieneNumeros(consumidorData.apellido)) {
      ToastAndroid.show("El apellido no puede contener números.", ToastAndroid.SHORT);
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
      ToastAndroid.show("Debes tener al menos 18 años para registrarte.", ToastAndroid.SHORT);
      return;
    }

    if (tieneLetras(consumidorData.telefono)) {
      ToastAndroid.show("El teléfono no puede contener letras.", ToastAndroid.SHORT);
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
      navigation("Login");
    } else {
      nextStep();
    }
  };

  useEffect(() => {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
      .then((response) => response.json())
      .then((data) => {
        setProvincias(data.provincias);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLocalidadChange = (value) => {
    setSelectedLocalidad(value);
    consumidorData.localidad = value;
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    consumidorData.provincia = value;

    if (value !== "") {
      fetch(
        `https://apis.datos.gob.ar/georef/api/municipios?provincia=${value}&campos=id,nombre&max=700`
      )
        .then((response) => response.json())
        .then((data) => {
          const sortedLocalidades = data.municipios.sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
          );
          setLocalidades(sortedLocalidades);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setLocalidades([]);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Datos Consumidor 2/{tipoUsuario === "consumidor" ? "2" : "3"}</Text>
      <TextInput
        style={{ /* Estilos para el input */ }}
        placeholder="Nombre"
        value={consumidorData.nombre}
        onChangeText={(value) => handleChange("nombre", value)}
      />
      <TextInput
        style={{ /* Estilos para el input */ }}
        placeholder="Apellido"
        value={consumidorData.apellido}
        onChangeText={(value) => handleChange("apellido", value)}
      />
      <TextInput
        style={{ /* Estilos para el input */ }}
        placeholder="DNI"
        keyboardType="numeric"
        value={consumidorData.dni}
        onChangeText={(value) => handleChange("dni", value)}
      />
      <TextInput
        style={{ /* Estilos para el input */ }}
        placeholder="Fecha de Nacimiento"
        value={consumidorData.fechaNacimiento}
        onChangeText={(value) => handleChange("fechaNacimiento", value)}
      />
      <Picker
        style={{ /* Estilos para el selector */ }}
        selectedValue={selectedProvince}
        onValueChange={(value) => handleProvinceChange(value)}
      >
        <Picker.Item label="Seleccione una provincia" value="" disabled />
        {provincias.map((prov) => (
          <Picker.Item key={prov.nombre} label={prov.nombre} value={prov.nombre} />
        ))}
      </Picker>
      <Picker
        style={{ /* Estilos para el selector */ }}
        selectedValue={selectedLocalidad}
        onValueChange={(value) => handleLocalidadChange(value)}
      >
        <Picker.Item label="Seleccione una localidad" value="" disabled />
        {localidades.map((loc) => (
          <Picker.Item key={loc.nombre} label={loc.nombre} value={loc.nombre} />
        ))}
      </Picker>
      <TextInput
        style={{ /* Estilos para el input */ }}
        placeholder="Teléfono"
        keyboardType="numeric"
        value={consumidorData.telefono}
        onChangeText={(value) => handleChange("telefono", value)}
      />
      <View style={{ /* Estilos para el contenedor de los botones */ }}>
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
