import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import useDynamicColors from "../../Styles/useDynamicColors";
import ThemedModal from "../../components/ThemedModal/ThemedModal";
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

  // El backend modela la creación de un evento como un wizard de 3 sub-pasos
  // (EnPreparacion1 -> EnPreparacion2 -> EnPreparacion). Un evento que quedó
  // a mitad del wizard se ve y se comporta igual que "EnPreparacion".
  const estaEnPreparacion = evento.estado?.startsWith("EnPreparacion");
  const puedeAsociar = estaEnPreparacion || evento.estado === "Confirmado";

  const formatEstado = (estado) => {
    if (!estado) return estado;
    if (estado.startsWith("EnPreparacion")) return "En Preparación";
    if (estado === "EnCurso") return "En Curso";
    return estado;
  };

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
      backgroundColor: "#1a1a1a",
    },
    contentContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    card: {
      backgroundColor: "#222222",
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: Colors.BordeDorado,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
      width: "100%",
      alignItems: "center",
      padding: 10,
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
    },
    image: {
      width: 150,
      height: 150,
      resizeMode: "contain",
      borderRadius: 10,
    },
    infoContainer: {
      padding: 10,
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#ffffff",
      textAlign: "center",
    },
    description: {
      fontSize: 16,
      color: "#cccccc",
      marginVertical: 5,
      textAlign: "center",
    },
    detail: {
      fontSize: 14,
      color: Colors.BordeDorado,
      textAlign: "center",
    },
    // Todos los botones ahora usan el mismo estilo dorado
    buttonContainer: {
      marginVertical: 10,
      backgroundColor: Colors.BordeDorado,
      padding: 14,
      width: "90%",
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: Colors.BordeDorado,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonContainerRojo: {
      marginVertical: 10,
      backgroundColor: Colors.BordeDorado,
      padding: 14,
      width: "90%",
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainerVerde: {
      marginVertical: 10,
      backgroundColor: Colors.BordeDorado,
      padding: 14,
      width: "90%",
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainerNaranja: {
      marginVertical: 10,
      backgroundColor: Colors.BordeDorado,
      padding: 14,
      width: "90%",
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "#000000",
      marginLeft: 8,
      fontWeight: "bold",
      fontSize: 16,
    },
    buttonTextRojo: {
      color: "#000000",
      marginLeft: 8,
      fontWeight: "bold",
      fontSize: 16,
    },
    buttonTextVerde: {
      color: "#000000",
      marginLeft: 8,
      fontWeight: "bold",
      fontSize: 16,
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
          <Text style={styles.detail}>Estado: {formatEstado(evento.estado)}</Text>
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
        <FontAwesomeIcon icon={faLocationDot} color="#000000" size={18} />
        <Text style={styles.buttonText}> Puntos de Encuentro</Text>
      </TouchableOpacity>
      {puedeAsociar && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate("Administrar Asociaciones",{
              evento: evento,
            });
          }}
        >
          <FontAwesomeIcon icon={faAddressBook} color="#000000" size={18} />
          <Text style={styles.buttonText}> Associations</Text>
        </TouchableOpacity>
      )}
      {evento.estado === "EnCurso" && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            showModal(
              "¿Esta seguro que quiere finalizar el evento?",
              "finalizarEvento",
              "Finalizado"
            )
          }
        >
          <FontAwesomeIcon icon={faFlagCheckered} color="#000000" size={18} />
          <Text style={styles.buttonText}> Finalizar Evento</Text>
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
          <FontAwesomeIcon icon={faCirclePause} color="#000000" size={18} />
          <Text style={styles.buttonText}> Pausar Evento</Text>
        </TouchableOpacity>
      )}
      {evento.estado === "Confirmado" && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            showModal(
              "¿Esta seguro que quiere iniciar el evento?",
              "iniciarEvento",
              "Iniciado"
            )
          }
        >
          <FontAwesomeIcon icon={faCirclePlay} color="#000000" size={18} />
          <Text style={styles.buttonText}> Iniciar Evento</Text>
        </TouchableOpacity>
      )}
      {evento.estado === "Confirmado" && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            showModal(
              "¿Esta seguro que quiere cancelar el evento?",
              "cancelarEvento",
              "Cancelado"
            )
          }
        >
          <FontAwesomeIcon icon={faCircleXmark} color="#000000" size={18} />
          <Text style={styles.buttonText}> Cancelar Evento</Text>
        </TouchableOpacity>
      )}
      {evento.estado === "Pausado" && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            showModal(
              "¿Esta seguro que quiere cancelar el evento?",
              "cancelarEvento",
              "Cancelado"
            )
          }
        >
          <FontAwesomeIcon icon={faCircleXmark} color="#000000" size={18} />
          <Text style={styles.buttonText}> Cancelar Evento</Text>
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
          <FontAwesomeIcon icon={faPenToSquare} color="#000000" size={18} />
          <Text style={styles.buttonText}> Preparar Evento</Text>
        </TouchableOpacity>
      )}
      {estaEnPreparacion && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            showModal(
              "¿Esta seguro que quiere confirmar el evento?",
              "confirmarEvento",
              "Confirmado"
            )
          }
        >
          <FontAwesomeIcon icon={faCircleCheck} color="#000000" size={18} />
          <Text style={styles.buttonText}> Confirmar Evento</Text>
        </TouchableOpacity>
      )}
      {estaEnPreparacion && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            showModal(
              "¿Esta seguro que quiere cancelar el evento?",
              "cancelarEvento",
              "Cancelado"
            )
          }
        >
          <FontAwesomeIcon icon={faCircleXmark} color="#000000" size={18} />
          <Text style={styles.buttonText}> Cancelar Evento</Text>
        </TouchableOpacity>
      )}
      <ThemedModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        animationType="slide"
        title=""
        buttons={[
          { 
            text: "No", 
            onPress: () => setModalVisible(false),
            style: { backgroundColor: Colors.BordeDorado },
          },
          { 
            text: "Sí", 
            onPress: () => handleChangeState(accion),
            style: { backgroundColor: Colors.Rojo },
          },
        ]}
      >
        <Text style={{ textAlign: 'center', fontSize: 16, color: "#ffffff", lineHeight: 24 }}>
          {message}
        </Text>
      </ThemedModal>
    </ScrollView>
  );
};

export default EventoDetalle;
