import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import useDynamicColors from "../../Styles/useDynamicColors";
import { useRoute } from "@react-navigation/native";
import { useCambiarEstadoEventoMutation } from "@/components/App/Service/EventosApi";
import {
  faLocationDot,
  faAddressBook,
  faFlagCheckered,
  faCirclePause,
  faCirclePlay,
  faCircleXmark,
  faPenToSquare,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

const EventoDetalle = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const Colors = useDynamicColors();
  const [cambiarEstadoEvento] = useCambiarEstadoEventoMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [accion, setAccion] = useState(null);
  const [estado, setEstado] = useState(null);
  const [evento, setEventoLocal] = useState(route.params.evento);

  const handleChangeState = async (accion) => {
    try {
      const result = await cambiarEstadoEvento({ id: evento.id, accion });
      setModalVisible(false);
      setEventoLocal({ ...evento, estado: estado });

    } catch (error) {
      console.error("Error changing event state:", error);
    }
  };

  const showModal = (mensaje, accion, estado) => {
    setMessage(mensaje);
    setAccion(accion);
    setEstado(estado);
    setModalVisible(true);
  };

  // Obtener la fecha de inicio más reciente
  const fechaInicioMasReciente = evento.diaEventos
    ? evento.diaEventos
        .map((dia) => new Date(dia.fechaHoraInicioDiaEvento))
        .sort((a, b) => a - b)[0]
    : null;

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
      marginVertical: 10,
      backgroundColor: Colors.Info,
      padding: 10,
      width: 300,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainerRojo: {
      marginVertical: 10,
      backgroundColor: Colors.Rojo,
      padding: 10,
      width: 300,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainerVerde: {
      marginVertical: 10,
      backgroundColor: Colors.Verde,
      padding: 10,
      width: 300,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainerNaranja: {
      marginVertical: 10,
      backgroundColor: Colors.Naranja,
      padding: 10,
      width: 300,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: Colors.Blanco,
      marginLeft: 5,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
      width: 300,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalText: {
      marginBottom: 20,
      textAlign: "center",
      fontSize: 16,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    buttonContainer2: {
      flex: 1,
      marginHorizontal: 10, // Adds spacing between buttons
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.card}>
        <Image
          source={
            evento?.img
              ? { uri: evento?.img }
              : require("./../../assets/logoevento.webp")
          }
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{evento.nombre}</Text>
          <Text style={styles.description}>{evento.descripcion}</Text>
          <Text style={styles.detail}>Tipo: {evento.tipoEvento}</Text>
          <Text style={styles.detail}>Estado: {evento.estado}</Text>
          {fechaInicioMasReciente && (
            <Text style={styles.detail}>
              Fecha de inicio: {fechaInicioMasReciente.toLocaleDateString()}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("Administrar Puntos de encuentro", {
            evento: evento,
          });
        }}
      >
        <Text style={styles.buttonText}>Administrar Puntos de encuentro </Text>
        <FontAwesomeIcon icon={faLocationDot} color={Colors.Blanco} size={16} />
      </TouchableOpacity>
      {evento.estado !== "EnCurso" && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate("Administrar Asociaciones",{
              evento: evento,
            });
          }}
        >
          <Text style={styles.buttonText}>Administrar Asociaciones </Text>
          <FontAwesomeIcon
            icon={faAddressBook}
            color={Colors.Blanco}
            size={16}
          />
        </TouchableOpacity>
      )}
      {evento.estado === "EnCurso" && (
        <TouchableOpacity
          style={styles.buttonContainerVerde}
          onPress={() =>
            showModal(
              "¿Esta seguro que quiere finalizar el evento?",
              "finalizarEvento",
              "Finalizado"
            )
          }
        >
          <Text style={styles.buttonText}>Finalizar Evento </Text>
          <FontAwesomeIcon
            icon={faFlagCheckered}
            color={Colors.Blanco}
            size={16}
          />
        </TouchableOpacity>
      )}
      {evento.estado === "Confirmado" && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            showModal(
              "¿Esta seguro que quiere pausar el evento?",
              "pausarEvento",
              "Pausado"
            )
          }
        >
          <Text style={styles.buttonText}>Pausar Evento </Text>
          <FontAwesomeIcon
            icon={faCirclePause}
            color={Colors.Blanco}
            size={16}
          />
        </TouchableOpacity>
      )}
      {evento.estado === "Confirmado" && (
        <TouchableOpacity
          style={styles.buttonContainerVerde}
          onPress={() =>
            showModal(
              "¿Esta seguro que quiere iniciar el evento?",
              "iniciarEvento",
              "Iniciado"
            )
          }
        >
          <Text style={styles.buttonText}>Iniciar Evento </Text>
          <FontAwesomeIcon
            icon={faCirclePlay}
            color={Colors.Blanco}
            size={16}
          />
        </TouchableOpacity>
      )}
      {evento.estado === "Confirmado" && (
        <TouchableOpacity
          style={styles.buttonContainerRojo}
          onPress={() =>
            showModal(
              "¿Esta seguro que quiere cancelar el evento?",
              "cancelarEvento",
              "Cancelado"
            )
          }
        >
          <Text style={styles.buttonText}>Cancelar Evento </Text>
          <FontAwesomeIcon
            icon={faCircleXmark}
            color={Colors.Blanco}
            size={16}
          />
        </TouchableOpacity>
      )}
      {evento.estado === "Pausado" && (
        <TouchableOpacity
          style={styles.buttonContainerRojo}
          onPress={() =>
            showModal(
              "¿Esta seguro que quiere cancelar el evento?",
              "cancelarEvento",
              "Cancelado"
            )
          }
        >
          <Text style={styles.buttonText}>Cancelar Evento </Text>
          <FontAwesomeIcon
            icon={faCircleXmark}
            color={Colors.Blanco}
            size={16}
          />
        </TouchableOpacity>
      )}
      {evento.estado === "Pausado" && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            showModal(
              "¿Esta seguro que quiere preparar el evento?",
              "prepararEvento",
              "EnPreparacion"
            )
          }
        >
          <Text style={styles.buttonText}>Preparar Evento </Text>
          <FontAwesomeIcon
            icon={faPenToSquare}
            color={Colors.Blanco}
            size={16}
          />
        </TouchableOpacity>
      )}
      {evento.estado === "EnPreparacion" && (
        <TouchableOpacity
          style={styles.buttonContainerVerde}
          onPress={() =>
            showModal(
              "¿Esta seguro que quiere confirmar el evento?",
              "confirmarEvento",
              "Confirmado"
            )
          }
        >
          <Text style={styles.buttonText}>Confirmar Evento </Text>
          <FontAwesomeIcon
            icon={faCircleCheck}
            color={Colors.Blanco}
            size={16}
          />
        </TouchableOpacity>
      )}
      {evento.estado === "EnPreparacion" && (
        <TouchableOpacity
          style={styles.buttonContainerRojo}
          onPress={() =>
            showModal(
              "¿Esta seguro que quiere cancelar el evento?",
              "cancelarEvento",
              "Cancelado"
            )
          }
        >
          <Text style={styles.buttonText}>Cancelar Evento </Text>
          <FontAwesomeIcon
            icon={faCircleXmark}
            color={Colors.Blanco}
            size={16}
          />
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <View style={styles.modalButtons}>
              <View style={styles.buttonContainer2}>
                <Button
                  title="No"
                  onPress={() => setModalVisible(false)}
                  color={Colors.Azul}
                />
              </View>
              <View style={styles.buttonContainer2}>
                <Button
                  title="Sí"
                  onPress={() => handleChangeState(accion)}
                  color={Colors.Rojo}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EventoDetalle;
