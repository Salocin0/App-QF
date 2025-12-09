import { StyleSheet, Text, View, ActivityIndicator, Button, Modal, TouchableOpacity, ToastAndroid, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetPerfilQuery } from "../../App/Service/PerfilApi";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useNavigation } from "@react-navigation/native";
import { useDeleteUserMutation } from "../../App/Service/authApi";
import { clearUser } from "../../Features/Auth/authSlice";

const Perfil = () => {
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [deleteUser] = useDeleteUserMutation();
  const [modalVisible, setModalVisible] = useState(false);

  const { data, error, isLoading, refetch, isFetching } = useGetPerfilQuery(userId);
  const [refreshing, setRefreshing] = useState(false);

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
      backgroundColor: Colors.GrisClaro,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: Colors.Gris,
    },
    label: {
      color: Colors.GrisOscuro,
      fontSize: 14,
      flex: 0.45,
    },
    value: {
      color: Colors.Negro,
      fontSize: 15,
      fontWeight: '600',
      flex: 0.55,
      textAlign: 'right'
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
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: Colors.Blanco,
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      color: Colors.Negro,
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
      backgroundColor: Colors.Verde,
      marginRight: 10,
    },
    closeButton: {
      backgroundColor: Colors.Rojo,
    },
    buttonText: {
      color: Colors.Negro,
    },
    primaryButton: {
      backgroundColor: Colors.Azul,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    primaryButtonText: {
      color: Colors.OnPrimary,
      fontWeight: '700',
    },
    secondaryButton: {
      backgroundColor: Colors.Rojo,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    secondaryButtonText: {
      color: Colors.OnPrimary,
      fontWeight: '700',
    },
  });

  // Show a centered blue spinner while loading or when a refresh is in progress
  if (isLoading || isFetching || refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.Azul} />
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
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing || isFetching} onRefresh={async () => { setRefreshing(true); try { await refetch(); } catch(e){ console.error(e); } setRefreshing(false); }} />}>
      {data.habilitado && (
        <>
          <Text style={styles.title}>Usuario</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Nombre</Text>
              <Text style={styles.value}>{data.nombre}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Apellido</Text>
              <Text style={styles.value}>{data.apellido}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>DNI</Text>
              <Text style={styles.value}>{data.dni}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Teléfono</Text>
              <Text style={styles.value}>{data.telefono}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Localidad</Text>
              <Text style={styles.value}>{data.localidad}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Provincia</Text>
              <Text style={styles.value}>{data.provincia}</Text>
            </View>
          </View>
        </>
      )}

      {data.productor && data.productor.habilitado && (
        <>
          <Text style={styles.title}>Productor</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Condición IVA</Text>
              <Text style={styles.value}>{data.productor.condicionIva}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>CUIT</Text>
              <Text style={styles.value}>{data.productor.cuit}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Razón Social</Text>
              <Text style={styles.value}>{data.productor.razonSocial}</Text>
            </View>
          </View>
        </>
      )}
      {data.encargado && data.encargado.habilitado && (
        <>
          <Text style={styles.title}>Encargado</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Condición IVA</Text>
              <Text style={styles.value}>{data.encargado.condicionIva}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>CUIT</Text>
              <Text style={styles.value}>{data.encargado.cuit}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Razón Social</Text>
              <Text style={styles.value}>{data.encargado.razonSocial}</Text>
            </View>
          </View>
        </>
      )}
      <TouchableOpacity style={styles.primaryButton} onPress={handleEditarUser} accessibilityLabel="Editar datos">
        <Text style={styles.primaryButtonText}>Editar Datos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => setModalVisible(true)} accessibilityLabel="Deshabilitar usuario">
        <Text style={styles.secondaryButtonText}>Deshabilitar usuario</Text>
      </TouchableOpacity>

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
                <Text style={{ color: Colors.OnPrimary }}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonModal, styles.closeButton]} onPress={() => setModalVisible(false)}>
                <Text style={{ color: Colors.OnPrimary }}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Perfil;
