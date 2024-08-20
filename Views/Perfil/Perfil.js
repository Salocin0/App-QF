import { StyleSheet, Text, View, ActivityIndicator, Button, Modal, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetPerfilQuery } from "./../../components/App/Service/PerfilApi"
import { useNavigation } from "@react-navigation/native";
import { useDeleteUserMutation } from "./../../components/App/Service/authApi";
import { clearUser } from "./../../components/Features/Auth/authSlice";
import Aviso from "../Aviso";
import useDynamicColors from "@/Styles/useDynamicColors";

const Perfil = () => {
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [deleteUser] = useDeleteUserMutation();
  const [modalVisible, setModalVisible] = useState(false);

  const { data, error, isLoading } = useGetPerfilQuery(userId);

  const handleDisableUser = async () => {
    try {
      await deleteUser(userId).unwrap();
      dispatch(clearUser());
      ToastAndroid.show("Usuario deshabilitado exitosamente", ToastAndroid.SHORT);
    } catch (err) {
      console.error("Fallo al deshabilitar el usuario", err);
      ToastAndroid.show("Fallo al deshabilitar el usuario", ToastAndroid.SHORT);
    }
  };

  const handleCerrarSesion = async () => {
    dispatch(clearUser());
    ToastAndroid.show("Sesion Cerrada Exitosamente", ToastAndroid.SHORT);
  };

  const handleEditarUser = () => {
    navigation.navigate("EditarPerfil");
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
    buttonInfo: {
      marginTop: 20,
      borderWidth: 3,
      borderColor: Colors?.Info,
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    buttonInfoText: {
      color: Colors?.Info,
      fontWeight: "800",
      fontSize: 15,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: Colors?.Blanco,
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      color: Colors?.Negro,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    buttonModal: {
      width: 100,
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    confirmButton: {
      backgroundColor: Colors?.Verde,
      marginRight: 10,
    },
    closeButton: {
      backgroundColor: Colors?.Rojo,
    },
    buttonText: {
      color: Colors?.Negro,
    },
  });

  if (isLoading) {
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
      {data.habilitado && (
        <>
          <Text style={styles.title}>Usuario</Text>
          <View style={styles.card}>
            <Text style={{ color: Colors?.Negro }}>Nombre: {data.nombre}</Text>
            <Text style={{ color: Colors?.Negro }}>Apellido: {data.apellido}</Text>
            <Text style={{ color: Colors?.Negro }}>DNI: {data.dni}</Text>
            <Text style={{ color: Colors?.Negro }}>Teléfono: {data.telefono}</Text>
            <Text style={{ color: Colors?.Negro }}>Localidad: {data.localidad}</Text>
            <Text style={{ color: Colors?.Negro }}>Provincia: {data.provincia}</Text>
          </View>
        </>
      )}

      {data.productor && data.productor.habilitado && (
        <>
          <Text style={styles.title}>Productor</Text>
          <View style={styles.card}>
            <Text style={{ color: Colors?.Negro }}>Condición IVA: {data.productor.condicionIva}</Text>
            <Text style={{ color: Colors?.Negro }}>CUIT: {data.productor.cuit}</Text>
            <Text style={{ color: Colors?.Negro }}>Razón Social: {data.productor.razonSocial}</Text>
          </View>
        </>
      )}
      {data.encargado && data.encargado.habilitado && (
        <>
          <Text style={styles.title}>Encargado</Text>
          <View style={styles.card}>
            <Text style={{ color: Colors?.Negro }}>Condición IVA: {data.encargado.condicionIva}</Text>
            <Text style={{ color: Colors?.Negro }}>CUIT: {data.encargado.cuit}</Text>
            <Text style={{ color: Colors?.Negro }}>Razón Social: {data.encargado.razonSocial}</Text>
          </View>
        </>
      )}
      <View style={styles.button}>
        <Button title="Editar Datos" color={Colors?.Azul} onPress={handleEditarUser} />
      </View>

      <View style={styles.button}>
        <Button title="Deshabilitar usuario" color={Colors?.Rojo} onPress={() => setModalVisible(true)} />
      </View>

      <TouchableOpacity style={styles.buttonInfo} onPress={handleCerrarSesion}>
        <Text style={styles.buttonInfoText}>Cerrar Sesion</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¿Estás seguro que deseas deshabilitar el usuario?</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.buttonModal, styles.confirmButton]}
                onPress={() => {
                  setModalVisible(false);
                  handleDisableUser();
                }}
              >
                <Text style={styles.buttonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonModal, styles.closeButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Perfil;
