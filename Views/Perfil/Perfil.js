import { StyleSheet, Text, View, ActivityIndicator, Button, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetPerfilQuery } from "./../../components/App/Service/PerfilApi"
import useDynamicColors from "../../Styles/useDynamicColors";
import ThemedModal from "../../components/ThemedModal/ThemedModal";
import { useNavigation } from "@react-navigation/native";
import { useDeleteUserMutation } from "./../../components/App/Service/authApi";
import { cerrarSesionPersistida } from "./../../components/Features/Auth/authSlice";
import Aviso from "../Aviso";
import { useCerrarMobileMutation } from "./../../components/App/Service/authApi";

const Perfil = () => {
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [deleteUser] = useDeleteUserMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const [cerrarMobile] = useCerrarMobileMutation();

  const { data, error, isLoading } = useGetPerfilQuery(userId);

  const handleDisableUser = async () => {
    try {
      await deleteUser(userId).unwrap();
      dispatch(cerrarSesionPersistida());
      ToastAndroid.show("Usuario deshabilitado exitosamente", ToastAndroid.SHORT);
    } catch (err) {
      console.error("Fallo al deshabilitar el usuario", err);
      ToastAndroid.show("Fallo al deshabilitar el usuario", ToastAndroid.SHORT);
    }
  };

  const handleCerrarSesion = async () => {
    try {
      const result = await cerrarMobile(userId);
      dispatch(cerrarSesionPersistida());
      ToastAndroid.show("Sesion Cerrada Exitosamente", ToastAndroid.SHORT);
    } catch (err) {
      ToastAndroid.show("Error al cerrar la sesion", ToastAndroid.SHORT);
    }
  };

  const handleEditarUser = () => {
    navigation.navigate("EditarPerfil");
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
    buttonInfo: {
      marginTop: 20,
      borderWidth: 3,
      borderColor: Colors.Info,
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    buttonInfoText: {
      color: Colors.Info,
      fontWeight: "800",
      fontSize: 15,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.GrisClaro,
    },
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors?.Naranja} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Aviso mensaje={"Error al cargar los datos del perfil"}/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data.habilitado && (
        <>
          <Text style={styles.title}>Usuario</Text>
          <View style={styles.card}>
            <Text style={{ color: Colors.Negro }}>Nombre: {data.nombre}</Text>
            <Text style={{ color: Colors.Negro }}>Apellido: {data.apellido}</Text>
            <Text style={{ color: Colors.Negro }}>DNI: {data.dni}</Text>
            <Text style={{ color: Colors.Negro }}>Teléfono: {data.telefono}</Text>
            <Text style={{ color: Colors.Negro }}>Localidad: {data.localidad}</Text>
            <Text style={{ color: Colors.Negro }}>Provincia: {data.provincia}</Text>
          </View>
        </>
      )}

      {data.productor && data.productor.habilitado && (
        <>
          <Text style={styles.title}>Productor</Text>
          <View style={styles.card}>
            <Text style={{ color: Colors.Negro }}>Condición IVA: {data.productor.condicionIva}</Text>
            <Text style={{ color: Colors.Negro }}>CUIT: {data.productor.cuit}</Text>
            <Text style={{ color: Colors.Negro }}>Razón Social: {data.productor.razonSocial}</Text>
          </View>
        </>
      )}
      {data.encargado && data.encargado.habilitado && (
        <>
          <Text style={styles.title}>Encargado</Text>
          <View style={styles.card}>
            <Text style={{ color: Colors.Negro }}>Condición IVA: {data.encargado.condicionIva}</Text>
            <Text style={{ color: Colors.Negro }}>CUIT: {data.encargado.cuit}</Text>
            <Text style={{ color: Colors.Negro }}>Razón Social: {data.encargado.razonSocial}</Text>
          </View>
        </>
      )}
      <View style={styles.button}>
        <Button title="Editar Datos" color={Colors.Azul} onPress={handleEditarUser} />
      </View>

      <View style={styles.button}>
        <Button title="Deshabilitar usuario" color={Colors.Rojo} onPress={() => setModalVisible(true)} />
      </View>

      <TouchableOpacity style={styles.buttonInfo} onPress={handleCerrarSesion}>
        <Text style={styles.buttonInfoText}>Cerrar Sesion</Text>
      </TouchableOpacity>

      <ThemedModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="¿Estás seguro que deseas deshabilitar el usuario?"
        buttons={[
          { text: "No", variant: "secondary", onPress: () => setModalVisible(false) },
          { 
            text: "Sí", 
            onPress: () => {
              setModalVisible(false);
              handleDisableUser();
            }, 
            style: { backgroundColor: Colors.Rojo } 
          },
        ]}
      />
    </View>
  );
};

export default Perfil;
