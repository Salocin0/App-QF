import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Modal, TextInput, FlatList, Alert, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';
import useDynamicColors from "../../Styles/useDynamicColors";
import { useRoute } from "@react-navigation/native";
import { useGetPuntosEncuentroByEventoIdQuery, useDeletePuntoEncuentroByIdMutation, useUpdatePuntoEncuentroByIdMutation, useCreatePuntoEncuentroMutation } from "../../App/Service/PuntosEncuentroApi";

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
      padding: 16,
      backgroundColor: Colors.GrisClaro,
    },
    card: {
      backgroundColor: Colors.Blanco,
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
      width: '100%',
      height: 200,
      resizeMode: 'cover',
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
    // action buttons removed (kept smallButton for list actions)
    smallButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      backgroundColor: Colors.Azul,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 80,
      marginHorizontal: 4,
    },
    smallButtonText: {
      color: Colors.OnPrimary,
      fontWeight: '600',
      textAlign: 'center',
    },
    table: {
      width: "100%",
      marginTop: 20,
    },
    row: {
      flexDirection: "row",
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 6,
      borderBottomWidth: 1,
      borderBottomColor: Colors.GrisClaroPeroNoTanClaro,
    },
    cell: {
      flex: 1,
      paddingHorizontal: 6,
    },
    cellTitle: {
      fontSize: 16,
      color: Colors.Negro,
    },
    cellSubtitle: {
      fontSize: 12,
      color: Colors.Gris,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
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
    modalActions: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginTop: 10,
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: evento?.img || undefined }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{evento.nombre}</Text>
          <Text style={styles.description}>{evento.descripcion}</Text>
          <Text style={styles.detail}>Tipo: {evento.tipoEvento}</Text>
          <Text style={styles.detail}>Estado: {evento.estado}</Text>
          <Text style={styles.detail}>Fecha de inicio: {evento.fechaInicio ? new Date(evento.fechaInicio).toLocaleDateString() : '-'}</Text>
        </View>
      </View>

      {String(evento.estado).toLowerCase().includes('prepar') && (
        <View style={{ width: '100%', marginTop: 12, alignItems: 'center' }}>
          <TouchableOpacity style={[styles.smallButton, { backgroundColor: Colors.Verde, paddingVertical: 12, paddingHorizontal: 16 }]} onPress={handleAgregarPuntoEncuentro}>
            <Text style={[styles.smallButtonText, { fontWeight: '700' }]}>Crear Punto de encuentro</Text>
          </TouchableOpacity>
        </View>
      )}
      {puntosEncuentro && puntosEncuentro.length > 0 && (
        <View style={styles.table}>
          <FlatList
            data={puntosEncuentro}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={styles.cellTitle}>{item.nombre}</Text>
                  <Text style={styles.cellSubtitle}>Lat: {item.latitud} · Lon: {item.longitud}</Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity style={[styles.smallButton, { backgroundColor: Colors.Azul }]} onPress={() => handleModificarPuntoEncuentro(item)}>
                    <Text style={styles.smallButtonText}>Modificar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.smallButton, { backgroundColor: Colors.Rojo }]} onPress={() => handleEliminarPuntoEncuentro(item.id)}>
                    <Text style={styles.smallButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
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
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.smallButton, { backgroundColor: Colors.Azul }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.smallButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.smallButton, { backgroundColor: Colors.Verde }]} onPress={handleGuardarPuntoEncuentro}>
                <Text style={styles.smallButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EventoDetalle;
