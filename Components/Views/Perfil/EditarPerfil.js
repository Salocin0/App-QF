import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetPerfilQuery } from "../../App/Service/PerfilApi";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import RNPickerSelect from "react-native-picker-select";
import useLocalidades from "../../Hooks/UseLocalidades";
import useProvincias from "../../Hooks/UseProvincias";

const EditarPerfil = () => {
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;
  const { data, error, isLoading } = useGetPerfilQuery(userId);
  const [nombre, setNombre] = useState(data.nombre || "");
  const [apellido, setApellido] = useState(data.apellido || "");
  const [dni, setDNI] = useState(String(data.dni) || "");
  const [telefono, setTelefono] = useState(data.telefono || "");
  const [localidad, setLocalidad] = useState(data.localidad || "");
  const [provincia, setProvincia] = useState(data.provincia || "");
  const [condicionIva, setCondicionIva] = useState(data.encargado?.condicionIva || data.productor?.condicionIva || "");
  const [cuit, setCuit] = useState(data.encargado?.cuit || data.productor?.cuit || "");
  const { provincias } = useProvincias();
  const { localidades, fetchLocalidades } = useLocalidades();

  const handleLocalidadChange = (value) => {
    setLocalidad(value);
  };

  const handleProvinceChange = (value) => {
    setProvincia(value);
    handleLocalidadChange("")
    fetchLocalidades(value);
  };

  const handleGuardarCambios = () => {
    //crear un objeto con todos los usestate
    //crear la api para hacer el update al back
    //volver atras
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      paddingHorizontal: 16,
      backgroundColor: Colors.GrisClaro,
    },
    card: {
      backgroundColor: Colors.Blanco,
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
      shadowColor: Colors.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: Colors.Negro,
    },
    button: {
      marginTop: 4,
    },
    label: {
      fontSize: 14,
      fontWeight: "bold",
      color: Colors.Negro,
    },
    input: {
      fontSize: 14,
      color: Colors.Negro,
    },
    inputSelect: {
      fontSize: 14,
      color: Colors.Negro,
    },
    placeholder: {
      color: Colors.Negro,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.Naranja} />
      </View>
    );
  }

  if (error) {
    console.log(error);
    return (
      <View style={styles.container}>
        <Text style={{ color: Colors.Negro }}>Error al cargar los datos del perfil</Text>
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
          <TextInput style={styles.input} placeholder="DNI" value={dni} onChangeText={setDNI} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Teléfono: </Text>
          <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Provincia: </Text>
          <RNPickerSelect
            style={{ inputAndroid: styles.inputSelect,placeholder:styles.placeholder }}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            placeholder={{ label: data.provincia, value: data.provincia }}
            value={provincia}
            onValueChange={(value) => handleProvinceChange(value)}
            items={provincias.map((provincia) => ({
              label: provincia.nombre,
              value: provincia.id,
              key: provincia.id,
              inputLabel: provincia.nombre,
            }))}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Localidad: </Text>
          <RNPickerSelect
            style={{ inputAndroid: styles.inputSelect,placeholder:styles.placeholder }}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            placeholder={{ label: data.localidad, value: data.localidad }}
            value={localidad}
            onValueChange={(value) => handleLocalidadChange(value)}
            items={localidades.map((localidad) => ({
              label: localidad.nombre,
              value: localidad.id,
              key: localidad.id,
              inputLabel: localidad.nombre,
            }))}
          />
        </View>
        {data.productor && data.productor.habilitado && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Condición frente al IVA: </Text>
              <RNPickerSelect
                style={{ inputAndroid: styles.inputSelect,placeholder:styles.placeholder }}
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
          </>
        )}

        {data.encargado && data.encargado.habilitado && (
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
          </>
        )}

        <Button title="Guardar Cambios" style={styles.button} onPress={handleGuardarCambios} />
      </View>
    </View>
  );
};

export default EditarPerfil;
