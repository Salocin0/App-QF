import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import useDynamicColors from '@/Styles/useDynamicColors';
import { useGetPuntosEncuentroByEventoIdQuery, useDeletePuntoEncuentroByIdMutation, useUpdatePuntoEncuentroByIdMutation, useCreatePuntoEncuentroMutation } from "./../../components/App/Service/PuntosEncuentroApi";
import * as Location from "expo-location";
import Maps from "./Maps";

const AdministrarPuntosEncuentro = ({ route }) => {
  const { evento } = route.params;
  const { data: puntos, isLoading } = useGetPuntosEncuentroByEventoIdQuery(evento.id);
  const [deletePuntoEncuentro] = useDeletePuntoEncuentroByIdMutation();
  const [createPuntoEncuentro] = useCreatePuntoEncuentroMutation();
  const [updatePuntoEncuentro] = useUpdatePuntoEncuentroByIdMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [selectedPunto, setSelectedPunto] = useState(null);
  const [nombre, setNombre] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const [puntosEncuentro, setPuntosEncuentro] = useState([]);
  const Colors = useDynamicColors();

  useEffect(() => {
    if (!isLoading && puntos) {
      setPuntosEncuentro(puntos);
    }
  }, [isLoading, puntos]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLatitud(location.coords.latitude.toString());
      setLongitud(location.coords.longitude.toString());
    })();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.Blanco,
    },
    contentContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      flex: 1,
    },
    buttonContainer: {
      marginTop: 20,
      width: "100%",
      alignItems: "center",
    },
    table: {
      width: "100%",
      marginTop: 20,
      borderWidth: 1,
      borderColor: Colors.Gris,
      borderBottomWidth: 0,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      backgroundColor: Colors.GrisClaro,
      borderBottomColor: Colors.Gris,
    },
    headerText: {
      flex: 1,
      textAlign: "center",
      fontWeight: "bold",
      color: Colors.Negro,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: Colors.Gris,
    },
    cell: {
      flex: 1,
      textAlign: "center",
      color: Colors.Negro,
    },
    actionsCell: {
      flexDirection: "row",
      justifyContent: "center",
      flex: 1,
    },
    iconButton: {
      marginHorizontal: 2,
      padding: 10,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    modifyButton: {
      backgroundColor: Colors.Azul,
    },
    deleteButton: {
      backgroundColor: Colors.Rojo,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: Colors.Blanco,
      padding: 20,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
    },
    input: {
      width: "100%",
      padding: 10,
      borderWidth: 1,
      borderColor: Colors.Gris,
      borderRadius: 5,
      marginBottom: 10,
    },
    confirmModalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    confirmModalContent: {
      backgroundColor: Colors.Blanco,
      padding: 20,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
    },
    confirmText: {
      marginBottom: 20,
      color: Colors.Negro,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const points = puntosEncuentro.map(p => ({
    lng: parseFloat(p.longitud),
    lat: parseFloat(p.latitud)
  }));

  const openModal = (type, punto = null) => {
    setModalType(type);
    setSelectedPunto(punto);
    if (punto) {
      setNombre(punto.nombre);
      setLatitud(punto.latitud);
      setLongitud(punto.longitud);
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setNombre("");
    setLatitud("");
    setLongitud("");
  };

  const handleSave = async () => {
    if (nombre.trim() === "" || latitud.trim() === "" || longitud.trim() === "") {
      Alert.alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (modalType === "create") {
        await createPuntoEncuentro({ nombre, latitud, longitud, eventoId: evento.id }).unwrap();
      } else if (modalType === "edit" && selectedPunto) {
        await updatePuntoEncuentro({ id: selectedPunto.id, nombre, latitud, longitud }).unwrap();
      }
      closeModal();
    } catch (error) {
      console.error("Error saving punto de encuentro:", error);
      Alert.alert("Error al guardar el punto de encuentro");
    }
  };

  const confirmDeletePunto = (punto) => {
    setSelectedPunto(punto);
    setConfirmDeleteVisible(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedPunto) {
        await deletePuntoEncuentro(selectedPunto.id).unwrap();
        setConfirmDeleteVisible(false);
      }
    } catch (error) {
      console.error("Error deleting punto de encuentro:", error);
      Alert.alert("Error al eliminar el punto de encuentro");
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.Naranja} />
        </View>
      ) : (
        <>
          <Maps points={points} />
          <View style={styles.contentContainer}>
            <Button title="Crear Punto de Encuentro" onPress={() => openModal("create")} />
            <View style={styles.table}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Nombre</Text>
                <Text style={styles.headerText}>Latitud</Text>
                <Text style={styles.headerText}>Longitud</Text>
                <Text style={styles.headerText}>Acciones</Text>
              </View>
              {puntosEncuentro.map((punto) => (
                <View key={punto.id} style={styles.row}>
                  <Text style={styles.cell}>{punto.nombre}</Text>
                  <Text style={styles.cell}>{punto.latitud}</Text>
                  <Text style={styles.cell}>{punto.longitud}</Text>
                  <View style={styles.actionsCell}>
                    <TouchableOpacity
                      style={[styles.iconButton, styles.modifyButton]}
                      onPress={() => openModal("edit", punto)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} color={Colors.Blanco} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.iconButton, styles.deleteButton]}
                      onPress={() => confirmDeletePunto(punto)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} color={Colors.Blanco} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Latitud"
              value={latitud}
              onChangeText={setLatitud}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Longitud"
              value={longitud}
              onChangeText={setLongitud}
              keyboardType="numeric"
            />
            <Button title={modalType === "create" ? "Crear" : "Guardar"} onPress={handleSave} />
            <Button title="Cancelar" onPress={closeModal} color="red" />
          </View>
        </View>
      </Modal>

      <Modal visible={confirmDeleteVisible} animationType="slide" transparent>
        <View style={styles.confirmModalContainer}>
          <View style={styles.confirmModalContent}>
            <Text style={styles.confirmText}>¿Estás seguro de que deseas eliminar este punto de encuentro?</Text>
            <Button title="Eliminar" onPress={handleDelete} />
            <Button title="Cancelar" onPress={() => setConfirmDeleteVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AdministrarPuntosEncuentro;
