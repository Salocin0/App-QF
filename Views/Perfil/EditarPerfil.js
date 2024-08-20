import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetPerfilQuery, useUpdateConsumidorMutation, useUpdateEncargadoMutation, useUpdateProductorMutation } from "./../../components/App/Service/PerfilApi";
import useDynamicColors from "@/Styles/useDynamicColors";
import RNPickerSelect from "react-native-picker-select";
import useLocalidades from "./../../hooks/UseLocalidades";
import useProvincias from "./../../hooks/UseProvincias";
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import Aviso from "../Aviso";

const EditarPerfil = () => {
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;
  const { data, error, isLoading } = useGetPerfilQuery(userId);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDNI] = useState("");
  const [telefono, setTelefono] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [condicionIva, setCondicionIva] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [cuit, setCuit] = useState("");
  const { provincias } = useProvincias();
  const { localidades, fetchLocalidades, setLocalidades } = useLocalidades();
  const [initialFormState, setInitialFormState] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isFormReady, setIsFormReady] = useState(false);
  const [updateConsumidor] = useUpdateConsumidorMutation();
  const [updateProductor] = useUpdateProductorMutation();
  const [updateEncargado] = useUpdateEncargadoMutation();
  const navigation = useNavigation();

  useEffect(() => {
    if (data) {
      const initialState = {
        nombre: data.nombre || "",
        apellido: data.apellido || "",
        dni: String(data.dni) || "",
        telefono: data.telefono || "",
        localidad: data.localidad || "",
        provincia: data.provincia || "",
        condicionIva: data.encargado?.condicionIva || data.productor?.condicionIva || "",
        cuit: data.encargado?.cuit || data.productor?.cuit || "",
        razonSocial: data.encargado?.razonSocial || data.productor?.razonSocial || "",
      };
      setInitialFormState(initialState);
      setNombre(initialState.nombre);
      setApellido(initialState.apellido);
      setDNI(initialState.dni);
      setTelefono(initialState.telefono);
      setLocalidad(initialState.localidad);
      setProvincia(initialState.provincia);
      setCondicionIva(initialState.condicionIva);
      setRazonSocial(initialState.razonSocial);
      setCuit(initialState.cuit);
      setIsFormReady(true);
    }
  }, [data]);

  useEffect(() => {
    const currentFormState = {
      nombre,
      apellido,
      dni,
      telefono,
      localidad,
      provincia,
      condicionIva,
      razonSocial,
      cuit,
    };
    const isFormChanged = Object.keys(initialFormState).some(
      (key) => initialFormState[key] !== currentFormState[key] && currentFormState[key] !== ""
    );
    setIsButtonDisabled(!isFormChanged);
  }, [nombre, apellido, dni, telefono, localidad, provincia, condicionIva, razonSocial, cuit, initialFormState]);

  const handleLocalidadChange = (value) => {
    setLocalidad(value);
  };

  const handleProvinceChange = (value) => {
    setProvincia(value);
    setLocalidad("");
    setLocalidades([]);
    fetchLocalidades(value);
  };

  const handleGuardarCambios = async () => {
    try {
      let resultUser = null;
      let resultEncargado = null;
      let resultProductor = null;

      const newDataConsumidor = {
        nombreC: nombre,
        apellidoC: apellido,
        dniC: dni,
        telefono,
        provinciaC: provincia,
        localidad,
      };

      const newDataRol = {
        condicionIva,
        cuitPE: cuit,
        cuitEPC: cuit,
        razonSocialEPC: razonSocial,
        razonSocialPE: razonSocial,
      };

      if (Object.keys(newDataConsumidor).some((key) => newDataConsumidor[key] !== initialFormState[key])) {
        resultUser = await updateConsumidor({ id: userId, ...newDataConsumidor });
      }

      if (Object.keys(newDataRol).some((key) => newDataRol[key] !== initialFormState[key])) {
        if (data?.encargado && data.encargado.habilitado) {
          resultEncargado = await updateEncargado({ id: userId, ...newDataRol });
        }

        if (data?.productor && data.productor.habilitado) {
          resultProductor = await updateProductor({ id: userId, ...newDataRol });
        }
      }

      const allResponses = [resultUser, resultEncargado, resultProductor].filter(Boolean);
      const allSuccessful = allResponses.every((response) => response?.data === 200);

      if (allSuccessful) {
        ToastAndroid.show("Datos Guardados Correctamente", ToastAndroid.SHORT);
        navigation.navigate("Perfil");
      } else {
        ToastAndroid.show("Error: algunos datos no se guardaron correctamente", ToastAndroid.SHORT);
        navigation.navigate("Perfil");
      }
    } catch (error) {
      ToastAndroid.show("Error al guardar los datos", ToastAndroid.SHORT);
      navigation.navigate("Perfil");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      paddingHorizontal: 16,
      backgroundColor: Colors?.GrisClaro,
    },
    card: {
      backgroundColor: Colors?.Blanco,
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
      shadowColor: Colors?.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: Colors?.Negro,
    },
    button: {
      marginTop: 4,
    },
    label: {
      fontSize: 14,
      fontWeight: "bold",
      color: Colors?.Negro,
    },
    input: {
      fontSize: 14,
      color: Colors?.Negro,
    },
    inputSelect: {
      fontSize: 14,
      color: Colors?.Negro,
      minWidth: 100,
    },
    placeholder: {
      color: Colors?.Negro,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
  });

  if (isLoading && !isFormReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors?.Naranja} />
      </View>
    );
  }

  if (error) {
    console.log(error);
    return (
      <View style={styles.container}>
        <Aviso style={{ color: Colors?.Negro }}>Error al cargar los datos del perfil</Aviso>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre: </Text>
          <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Apellido: </Text>
          <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>DNI: </Text>
          <TextInput style={styles.input} placeholder="DNI" value={dni} onChangeText={setDNI} keyboardType="numeric" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Teléfono: </Text>
          <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="numeric" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Provincia: </Text>
          <RNPickerSelect
            style={{ inputAndroid: styles.inputSelect, placeholder: styles.placeholder }}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            placeholder={{ label: data?.provincia, value: data?.provincia }}
            value={provincia}
            onValueChange={handleProvinceChange}
            items={provincias.map((provincia) => ({
              label: provincia.nombre,
              value: provincia.id,
              key: provincia.id,
            }))}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Localidad: </Text>
          <RNPickerSelect
            style={{ inputAndroid: styles.inputSelect, placeholder: styles.placeholder }}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            placeholder={{ label: data?.localidad, value: data?.localidad }}
            value={localidad}
            onValueChange={handleLocalidadChange}
            items={localidades.map((localidad) => ({
              label: localidad.nombre,
              value: localidad.id,
              key: localidad.id,
            }))}
          />
        </View>
        {data?.productor && data.productor.habilitado && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Condición frente al IVA: </Text>
              <RNPickerSelect
                style={{ inputAndroid: styles.inputSelect, placeholder: styles.placeholder }}
                useNativeAndroidPickerStyle={false}
                fixAndroidTouchableBug={true}
                placeholder={{ label: "", value: null }}
                value={condicionIva}
                onValueChange={(value) => setCondicionIva(value)}
                items={[
                  { label: "Monotributista", value: "Monotributista", key: "Monotributista" },
                  { label: "Responsable Inscripto", value: "Responsable Inscripto", key: "Responsable Inscripto" },
                ]}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>CUIT: </Text>
              <TextInput style={styles.input} placeholder="CUIT" value={cuit} onChangeText={setCuit} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Razon social: </Text>
              <TextInput style={styles.input} placeholder="Razón Social" value={razonSocial} onChangeText={setRazonSocial} />
            </View>
          </>
        )}

        {data?.encargado && data.encargado.habilitado && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Condición frente al IVA: </Text>
              <RNPickerSelect
                style={{ inputAndroid: styles.input }}
                useNativeAndroidPickerStyle={false}
                fixAndroidTouchableBug={true}
                placeholder={{ label: "", value: null }}
                value={condicionIva}
                onValueChange={(value) => setCondicionIva(value)}
                items={[
                  { label: "Monotributista", value: "Monotributista", key: "Monotributista" },
                  { label: "Responsable Inscripto", value: "Responsable Inscripto", key: "Responsable Inscripto" },
                ]}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>CUIT: </Text>
              <TextInput style={styles.input} placeholder="CUIT" value={cuit} onChangeText={setCuit} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Razon social: </Text>
              <TextInput style={styles.input} placeholder="Razón Social" value={razonSocial} onChangeText={setRazonSocial} />
            </View>
          </>
        )}

        <Button title="Guardar Cambios" style={styles.button} onPress={handleGuardarCambios} disabled={isButtonDisabled} />
      </View>
    </View>
  );
};

export default EditarPerfil;
