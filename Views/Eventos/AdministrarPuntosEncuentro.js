import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Modal,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useDynamicColors from "@/Styles/useDynamicColors";
import ThemedModal from "../../components/ThemedModal/ThemedModal";
import {
  useGetPuntosEncuentroByEventoIdQuery,
  useDeletePuntoEncuentroByIdMutation,
  useUpdatePuntoEncuentroByIdMutation,
  useCreatePuntoEncuentroMutation,
} from "./../../components/App/Service/PuntosEncuentroApi";
import * as Location from "expo-location";
import Maps from "./Maps";

const AdministrarPuntosEncuentro = ({ route }) => {
  const { evento } = route.params;
  const {
    data: puntos,
    isLoading,
    refetch,
  } = useGetPuntosEncuentroByEventoIdQuery(evento.id);
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
    if (modalType === "create") {
      setNombre(generateCode(6));
      const watchPosition = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          return;
        }

        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (location) => {
            setLatitud(location.coords.latitude.toString());
            setLongitud(location.coords.longitude.toString());
          }
        );
      };
      watchPosition();
    }
  }, [modalType]);

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
  };

  const handleSave = async () => {
    if (
      nombre.trim() === "" ||
      latitud.trim() === "" ||
      longitud.trim() === ""
    ) {
      Alert.alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (modalType === "create") {
        await createPuntoEncuentro({
          nombre,
          latitud,
          longitud,
          eventoId: evento.id,
        }).unwrap();
      } else if (modalType === "edit" && selectedPunto) {
        await updatePuntoEncuentro({
          id: selectedPunto.id,
          nombre,
          latitud,
          longitud,
        }).unwrap();
      }
      refetch();
      closeModal();
      setNombre(generateCode(6));
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
        refetch();
        setConfirmDeleteVisible(false);
      }
    } catch (error) {
      console.error("Error deleting punto de encuentro:", error);
      Alert.alert("Error al eliminar el punto de encuentro");
    }
  };

  function generateCode(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1a1a1a",
      flexDirection: "column",
    },
    mapContainer: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      padding: 20,
    },
    buttonContainer: {
      marginTop: 0,
      marginBottom: 20,
      width: "100%",
      alignItems: "center",
    },
    tableContainer: {
      flex: 1,
      width: "100%",
    },
    tableHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      backgroundColor: "#222222",
      borderBottomColor: Colors.BordeDorado,
      borderBottomWidth: 2,
    },
    headerText: {
      fontWeight: "bold",
      fontSize: 14,
      color: "#ffffff",
    },
    tableContent: {
      flex: 1,
    },
    table: {
      width: "100%",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: Colors.BordeDorado,
      backgroundColor: "#222222",
    },
    cell: {
      flex: 1,
      textAlign: "center",
      color: "#ffffff",
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
      backgroundColor: Colors.BordeDorado,
    },
    deleteButton: {
      backgroundColor: Colors.Rojo,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalContent: {
      backgroundColor: "#222222",
      padding: 20,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
    },
    input: {
      width: "100%",
      padding: 10,
      borderWidth: 1,
      borderColor: Colors.BordeDorado,
      borderRadius: 5,
      marginBottom: 10,
      color: "#ffffff",
      backgroundColor: "#1a1a1a",
    },
    confirmModalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    confirmModalContent: {
      backgroundColor: "#222222",
      padding: 20,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
    },
    confirmText: {
      marginBottom: 20,
      color: "#ffffff",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1a1a1a",
    },
    // Estilos de botón dorado
    botonDorado: {
      backgroundColor: Colors.BordeDorado,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    botonTexto: {
      color: "#000000",
      fontWeight: "bold",
      fontSize: 16,
    },
    botonRojo: {
      backgroundColor: Colors.Rojo,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const points = puntosEncuentro.map((p) => ({
    lng: parseFloat(p.longitud),
    lat: parseFloat(p.latitud),
  }));

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.Naranja} />
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <View style={styles.mapContainer}>
              <Maps points={points} />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.botonDorado}
                  onPress={() => openModal("create")}
                >
                  <Text style={styles.botonTexto}>+ Crear Punto</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerText}>Nombre</Text>
                  <Text style={styles.headerText}>Latitud</Text>
                  <Text style={styles.headerText}>Longitud</Text>
                  <Text style={styles.headerText}>Acciones</Text>
                </View>
                <ScrollView style={styles.tableContent}>
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
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            color="#000000"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.iconButton, styles.deleteButton]}
                          onPress={() => confirmDeletePunto(punto)}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            color="#ffffff"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#666666"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Latitud"
              placeholderTextColor="#666666"
              value={latitud}
              onChangeText={setLatitud}
            />
            <TextInput
              style={styles.input}
              placeholder="Longitud"
              placeholderTextColor="#666666"
              value={longitud}
              onChangeText={setLongitud}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.botonDorado}
                onPress={handleSave}
              >
                <Text style={styles.botonTexto}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botonRojo}
                onPress={closeModal}
              >
                <Text style={styles.botonTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={confirmDeleteVisible} animationType="slide" transparent>
        <View style={styles.confirmModalContainer}>
          <View style={styles.confirmModalContent}>
            <Text style={styles.confirmText}>
              ¿Deseas eliminar este punto de encuentro?
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.botonRojo}
                onPress={handleDelete}
              >
                <Text style={styles.botonTexto}>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botonDorado}
                onPress={() => setConfirmDeleteVisible(false)}
              >
                <Text style={styles.botonTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AdministrarPuntosEncuentro;
