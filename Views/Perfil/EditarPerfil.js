import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetPerfilQuery, useUpdateConsumidorMutation, useUpdateEncargadoMutation, useUpdateProductorMutation } from "./../../components/App/Service/PerfilApi";
import useDynamicColors from "../../Styles/useDynamicColors";
import RNPickerSelect from "react-native-picker-select";
import useLocalidades from "./../../hooks/UseLocalidades";
import useProvincias from "./../../hooks/UseProvincias";
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPencil, faSave, faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
      backgroundColor: "#1a1a1a",
      paddingHorizontal: 16,
    },
    logoContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 30,
    },
    logo: {
      width: 180,
      height: 180,
    },
    card: {
      backgroundColor: "#222222",
      borderRadius: 10,
      padding: 16,
      marginVertical: 8,
      shadowColor: Colors.BordeDorado,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 3,
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: Colors.BordeDorado,
      textAlign: "center",
      marginBottom: 15,
    },
    button: {
      marginTop: 20,
      backgroundColor: Colors.BordeDorado,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonDisabled: {
      backgroundColor: "#444444",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 20,
    },
    buttonText: {
      color: "#000000",
      fontWeight: "bold",
      fontSize: 16,
    },
    buttonTextDisabled: {
      color: "#888888",
      fontWeight: "bold",
      fontSize: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: "bold",
      color: Colors.BordeDorado,
      marginBottom: 5,
    },
    input: {
      fontSize: 16,
      color: "#ffffff",
      backgroundColor: "#1a1a1a",
      borderWidth: 1,
      borderColor: Colors.BordeDorado,
      borderRadius: 8,
      padding: 12,
      marginBottom: 15,
    },
    inputSelect: {
      fontSize: 14,
      color: "#ffffff",
      minWidth: 100,
    },
    placeholder: {
      color: "#666666",
    },
    inputContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: 5,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    editIcon: {
      padding: 5,
    },
  });

  if (isLoading && !isFormReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.BordeDorado} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#ffffff" }}>Error al cargar los datos del perfil</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <View style={styles.logoContainer}>
        <Image 
          source={require("./../../assets/quickfood-logo.png")} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.card}>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre</Text>
          <View style={styles.inputRow}>
            <TextInput 
              style={[styles.input, { flex: 1 }]} 
              placeholder="Nombre" 
              placeholderTextColor="#666666"
              value={nombre} 
              onChangeText={setNombre} 
            />
            <FontAwesomeIcon icon={faPencil} color={Colors.BordeDorado} size={18} style={styles.editIcon} />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Apellido</Text>
          <View style={styles.inputRow}>
            <TextInput 
              style={[styles.input, { flex: 1 }]} 
              placeholder="Apellido" 
              placeholderTextColor="#666666"
              value={apellido} 
              onChangeText={setApellido} 
            />
            <FontAwesomeIcon icon={faPencil} color={Colors.BordeDorado} size={18} style={styles.editIcon} />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>DNI</Text>
          <View style={styles.inputRow}>
            <TextInput 
              style={[styles.input, { flex: 1 }]} 
              placeholder="DNI" 
              placeholderTextColor="#666666"
              value={dni} 
              onChangeText={setDNI} 
              keyboardType="numeric" 
            />
            <FontAwesomeIcon icon={faPencil} color={Colors.BordeDorado} size={18} style={styles.editIcon} />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Teléfono</Text>
          <View style={styles.inputRow}>
            <TextInput 
              style={[styles.input, { flex: 1 }]} 
              placeholder="Teléfono" 
              placeholderTextColor="#666666"
              value={telefono} 
              onChangeText={setTelefono} 
              keyboardType="numeric" 
            />
            <FontAwesomeIcon icon={faPencil} color={Colors.BordeDorado} size={18} style={styles.editIcon} />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Provincia</Text>
          <View style={styles.inputRow}>
            <RNPickerSelect
              style={{ 
                inputIOS: { color: "#ffffff" },
                inputAndroid: { 
                  color: "#ffffff", 
                  backgroundColor: "#1a1a1a", 
                  borderWidth: 1, 
                  borderColor: Colors.BordeDorado, 
                  borderRadius: 8, 
                  padding: 12, 
                  flex: 1,
                  height: 50,
                }, 
                placeholder: { color: "#666666" },
                iconContainer: { paddingRight: 10 },
              }}
              useNativeAndroidPickerStyle={false}
              fixAndroidTouchableBug={true}
              placeholder={{ label: data?.provincia || "Seleccionar", value: data?.provincia }}
              value={provincia}
              onValueChange={handleProvinceChange}
              items={provincias.map((provincia) => ({
                label: provincia.nombre,
                value: provincia.id,
                key: provincia.id,
              }))}
              Icon={() => <FontAwesomeIcon icon={faChevronDown} color={Colors.BordeDorado} size={16} />}
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Localidad</Text>
          <View style={styles.inputRow}>
            <RNPickerSelect
              style={{ 
                inputIOS: { color: "#ffffff" },
                inputAndroid: { 
                  color: "#ffffff", 
                  backgroundColor: "#1a1a1a", 
                  borderWidth: 1, 
                  borderColor: Colors.BordeDorado, 
                  borderRadius: 8, 
                  padding: 12, 
                  flex: 1,
                  height: 50,
                }, 
                placeholder: { color: "#666666" },
                iconContainer: { paddingRight: 10 },
              }}
              useNativeAndroidPickerStyle={false}
              fixAndroidTouchableBug={true}
              placeholder={{ label: data?.localidad || "Seleccionar", value: data?.localidad }}
              value={localidad}
              onValueChange={handleLocalidadChange}
              items={localidades.map((localidad) => ({
                label: localidad.nombre,
                value: localidad.id,
                key: localidad.id,
              }))}
              Icon={() => <FontAwesomeIcon icon={faChevronDown} color={Colors.BordeDorado} size={16} />}
            />
          </View>
        </View>
        
        {data?.productor && data.productor.habilitado && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Condición frente al IVA</Text>
              <RNPickerSelect
                style={{ 
                  inputIOS: { color: "#ffffff" },
                  inputAndroid: { 
                    color: "#ffffff", 
                    backgroundColor: "#1a1a1a", 
                    borderWidth: 1, 
                    borderColor: Colors.BordeDorado, 
                    borderRadius: 8, 
                    padding: 12, 
                    height: 50,
                  }, 
                  placeholder: { color: "#666666" },
                }}
                useNativeAndroidPickerStyle={false}
                fixAndroidTouchableBug={true}
                placeholder={{ label: "Seleccionar", value: null }}
                value={condicionIva}
                onValueChange={(value) => setCondicionIva(value)}
                items={[
                  { label: "Monotributista", value: "Monotributista", key: "Monotributista" },
                  { label: "Responsable Inscripto", value: "Responsable Inscripto", key: "Responsable Inscripto" },
                ]}
                Icon={() => <FontAwesomeIcon icon={faChevronDown} color={Colors.BordeDorado} size={16} />}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>CUIT</Text>
              <TextInput style={styles.input} placeholder="CUIT" placeholderTextColor="#666666" value={cuit} onChangeText={setCuit} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Razón Social</Text>
              <TextInput style={styles.input} placeholder="Razón Social" placeholderTextColor="#666666" value={razonSocial} onChangeText={setRazonSocial} />
            </View>
          </>
        )}

        {data?.encargado && data.encargado.habilitado && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Condición frente al IVA</Text>
              <RNPickerSelect
                style={{ 
                  inputIOS: { color: "#ffffff" },
                  inputAndroid: { 
                    color: "#ffffff", 
                    backgroundColor: "#1a1a1a", 
                    borderWidth: 1, 
                    borderColor: Colors.BordeDorado, 
                    borderRadius: 8, 
                    padding: 12, 
                    height: 50,
                  }, 
                  placeholder: { color: "#666666" },
                }}
                useNativeAndroidPickerStyle={false}
                fixAndroidTouchableBug={true}
                placeholder={{ label: "Seleccionar", value: null }}
                value={condicionIva}
                onValueChange={(value) => setCondicionIva(value)}
                items={[
                  { label: "Monotributista", value: "Monotributista", key: "Monotributista" },
                  { label: "Responsable Inscripto", value: "Responsable Inscripto", key: "Responsable Inscripto" },
                ]}
                Icon={() => <FontAwesomeIcon icon={faChevronDown} color={Colors.BordeDorado} size={16} />}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>CUIT</Text>
              <TextInput style={styles.input} placeholder="CUIT" placeholderTextColor="#666666" value={cuit} onChangeText={setCuit} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Razón Social</Text>
              <TextInput style={styles.input} placeholder="Razón Social" placeholderTextColor="#666666" value={razonSocial} onChangeText={setRazonSocial} />
            </View>
          </>
        )}

        <TouchableOpacity 
          style={isButtonDisabled ? styles.buttonDisabled : styles.button} 
          onPress={handleGuardarCambios} 
          disabled={isButtonDisabled}
        >
          <FontAwesomeIcon 
            icon={faSave} 
            color={isButtonDisabled ? "#888888" : "#000000"} 
            size={18} 
            style={{ marginRight: 8 }}
          />
          <Text style={isButtonDisabled ? styles.buttonTextDisabled : styles.buttonText}>
            Guardar Cambios
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditarPerfil;
