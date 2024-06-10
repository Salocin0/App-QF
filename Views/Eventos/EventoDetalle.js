import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button, Modal, TextInput, FlatList, Alert } from "react-native";
import * as Location from 'expo-location';
import useDynamicColors from "../../Styles/useDynamicColors";
import { useRoute } from "@react-navigation/native";
import { useGetPuntosEncuentroByEventoIdQuery, useDeletePuntoEncuentroByIdMutation, useUpdatePuntoEncuentroByIdMutation, useCreatePuntoEncuentroMutation } from "./../../components/App/Service/PuntosEncuentroApi";

const EventoDetalle = () => {
  const route = useRoute();
  const Colors = useDynamicColors();
  const evento = route.params?.evento;
  const { data: puntos, isLoading, isError } = useGetPuntosEncuentroByEventoIdQuery(evento.id);
  const [deletePuntoEncuentro] = useDeletePuntoEncuentroByIdMutation();
  const [createPuntoEncuentro] = useCreatePuntoEncuentroMutation();
  const [updatePuntoEncuentro] = useUpdatePuntoEncuentroByIdMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [selectedPunto, setSelectedPunto] = useState(null);
  const [nombre, setNombre] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");

  const [puntosEncuentro, setPuntosEncuentro] = useState([]);

  useEffect(() => {
    if (!isLoading && puntos) {
      setPuntosEncuentro(puntos);
    }
    console.log(isLoading, puntos)
  }, [isLoading, puntos]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
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

  const handleEliminarPuntoEncuentro = (id) => {
    deletePuntoEncuentro(id)
      .unwrap()
      .then(() => {
        console.log("Punto de encuentro eliminado:", id);
        setPuntosEncuentro(puntosEncuentro.filter((punto) => punto.id !== id));
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "white",
    },
    card: {
      backgroundColor: "white",
      borderRadius: 10,
      overflow: "hidden",
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
      width: "100%",
      alignItems: "center",
    },
    image: {
      width: 100,
      height: 100,
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
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    cell: {
      flex: 1,
      textAlign: "center",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
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
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: evento.img }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{evento.nombre}</Text>
          <Text style={styles.description}>{evento.descripcion}</Text>
          <Text style={styles.detail}>Tipo: {evento.tipoEvento}</Text>
          <Text style={styles.detail}>Estado: {evento.estado}</Text>
          <Text style={styles.detail}>Fecha de inicio: {new Date(evento.fechaInicio).toLocaleDateString()}</Text>
        </View>
      </View>
      {evento.estado === "EnPreparacion" && (
        <View style={styles.buttonContainer}>
          <Button title="Crear Punto de encuentro" onPress={handleAgregarPuntoEncuentro} color={Colors.Verde} />
        </View>
      )}
      {puntosEncuentro && puntosEncuentro.length > 0 && (
        <View style={styles.table}>
          <FlatList
            data={puntosEncuentro}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.nombre}</Text>
                <Text style={styles.cell}>{item.latitud}</Text>
                <Text style={styles.cell}>{item.longitud}</Text>
                <Button title="Modificar" onPress={() => handleModificarPuntoEncuentro(item)} />
                <Button title="Eliminar" onPress={() => handleEliminarPuntoEncuentro(item.id)} />
              </View>
            )}
          />
        </View>
      )}
      <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
            <Text>Latitud: {latitud}</Text>
            <Text>Longitud: {longitud}</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ paddingHorizontal: 10 }}>
                <Button title="Cancelar" onPress={() => setModalVisible(false)} color={Colors.Azul} />
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <Button title="Guardar" onPress={handleGuardarPuntoEncuentro} color={Colors.Verde} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EventoDetalle;
