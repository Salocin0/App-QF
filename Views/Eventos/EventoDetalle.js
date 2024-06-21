import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Modal,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useRoute } from "@react-navigation/native";
import {
  useGetPuntosEncuentroByEventoIdQuery,
  useDeletePuntoEncuentroByIdMutation,
  useUpdatePuntoEncuentroByIdMutation,
  useCreatePuntoEncuentroMutation,
} from "./../../components/App/Service/PuntosEncuentroApi";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const EventoDetalle = () => {
  const route = useRoute();
  const Colors = useDynamicColors();
  const evento = route.params?.evento;
  const {
    data: puntos,
    isLoading,
    isError,
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

  useEffect(() => {
    if (!isLoading && puntos) {
      setPuntosEncuentro(puntos);
    }
    console.log(isLoading, puntos);
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

  const handleAgregarPuntoEncuentro = () => {
    setModalType("create");
    setSelectedPunto(null);
    setNombre("");
    setModalVisible(true);
  };

  const handleGuardarPuntoEncuentro = () => {
    if (modalType === "create") {
      createPuntoEncuentro({ eventoId: evento.id, nombre, latitud, longitud })
        .unwrap()
        .then((response) => {
          console.log("Punto de encuentro creado:", response);
          setPuntosEncuentro([...puntosEncuentro, response]);
        });
    } else {
      updatePuntoEncuentro({ id: selectedPunto.id, nombre, latitud, longitud })
        .unwrap()
        .then((response) => {
          console.log("Punto de encuentro actualizado:", response);
          const updatedPuntos = puntosEncuentro.map((punto) =>
            punto.id === selectedPunto.id ? response : punto
          );
          setPuntosEncuentro(updatedPuntos);
        });
    }
    setModalVisible(false);
  };

  const handleModificarPuntoEncuentro = (punto) => {
    setModalType("update");
    setSelectedPunto(punto);
    setNombre(punto.nombre);
    setLatitud(punto.latitud);
    setLongitud(punto.longitud);
    setModalVisible(true);
  };

  const handleConfirmEliminarPuntoEncuentro = (punto) => {
    setSelectedPunto(punto);
    setConfirmDeleteVisible(true);
  };

  const handleEliminarPuntoEncuentro = () => {
    deletePuntoEncuentro(selectedPunto.id)
      .unwrap()
      .then(() => {
        console.log("Punto de encuentro eliminado:", selectedPunto.id);
        setPuntosEncuentro(
          puntosEncuentro.filter((punto) => punto.id !== selectedPunto.id)
        );
      });
    setConfirmDeleteVisible(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.Blanco,
    },
    contentContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    card: {
      backgroundColor: Colors.GrisClaro,
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: Colors.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
      width: "100%",
      alignItems: "center",
      padding: 10,
    },
    image: {
      width: 150,
      height: 150,
      resizeMode: "contain",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colors.Gris,
    },
    infoContainer: {
      padding: 10,
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: Colors.Negro,
      textAlign: "center",
    },
    description: {
      fontSize: 16,
      color: Colors.Gris,
      marginVertical: 5,
      textAlign: "center",
    },
    detail: {
      fontSize: 14,
      color: Colors.GrisOscuro,
      textAlign: "center",
    },
    buttonContainer: {
      marginTop: 20,
      width: "100%",
      alignItems: "center",
    },
    table: {
      width: "100%",
      marginTop: 20,
      borderWidth:1,
      borderColor: Colors.Gris,
      borderBottomWidth:0
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
    confirmModalContent: {
      backgroundColor: Colors.Blanco,
      padding: 20,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
    },
    confirmText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: "center",
    },
    confirmButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
    confirmButton: {
      marginHorizontal: 10,
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <Image source={{ uri: evento.img }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{evento.nombre}</Text>
          <Text style={styles.description}>{evento.descripcion}</Text>
          <Text style={styles.detail}>Tipo: {evento.tipoEvento}</Text>
          <Text style={styles.detail}>Estado: {evento.estado}</Text>
          <Text style={styles.detail}>
            Fecha de inicio: {new Date(evento.fechaInicio).toLocaleDateString()}
          </Text>
        </View>
      </View>
      {evento.estado === "EnPreparacion" && (
        <View style={styles.buttonContainer}>
          <Button
            title="Crear Punto de encuentro"
            onPress={handleAgregarPuntoEncuentro}
            color={Colors.Verde}
          />
        </View>
      )}
      {puntosEncuentro && puntosEncuentro.length > 0 && (
        <View style={styles.table}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Nombre</Text>
            <Text style={styles.headerText}>Latitud</Text>
            <Text style={styles.headerText}>Longitud</Text>
            <Text style={styles.headerText}>Acciones</Text>
          </View>
          {puntosEncuentro.map((item) => (
            <View style={styles.row} key={item.id.toString()}>
              <Text style={styles.cell}>{item.nombre}</Text>
              <Text style={styles.cell}>
                {parseFloat(item.latitud).toFixed(3)}
              </Text>
              <Text style={styles.cell}>
                {parseFloat(item.longitud).toFixed(3)}
              </Text>
              <View style={styles.actionsCell}>
                <TouchableOpacity
                  onPress={() => handleModificarPuntoEncuentro(item)}
                  style={[styles.iconButton, styles.modifyButton]}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    color={Colors.Blanco}
                    size={16}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleConfirmEliminarPuntoEncuentro(item)}
                  style={[styles.iconButton, styles.deleteButton]}
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    color={Colors.Blanco}
                    size={16}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
              style={styles.input}
            />
            <Text>Latitud: {parseFloat(latitud).toFixed(4)}</Text>
            <Text>Longitud: {parseFloat(longitud).toFixed(4)}</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ paddingHorizontal: 10 }}>
                <Button
                  title="Cancelar"
                  onPress={() => setModalVisible(false)}
                  color={Colors.Azul}
                />
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <Button
                  title="Guardar"
                  onPress={handleGuardarPuntoEncuentro}
                  color={Colors.Verde}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={confirmDeleteVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setConfirmDeleteVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.confirmModalContent}>
            <Text style={styles.confirmText}>
              ¿Seguro que quieres eliminar el punto de encuentro?
            </Text>
            <View style={styles.confirmButtonContainer}>
              <TouchableOpacity
                onPress={() => setConfirmDeleteVisible(false)}
                style={[styles.iconButton, styles.deleteButton,{width:"40%"}]}
              >
                <Text style={{ color: Colors.Blanco }}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleEliminarPuntoEncuentro}
                style={[styles.iconButton, styles.modifyButton,  {width:"40%"}]}
              >
                <Text style={{ color: Colors.Blanco }}>Si</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EventoDetalle;
