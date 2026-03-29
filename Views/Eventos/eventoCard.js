import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useNavigation } from "@react-navigation/native";
import logoevento from "./../../assets/logoevento.webp";

const EventoCard = ({ evento }) => {
  const Colors = useDynamicColors();
  const navigation = useNavigation();

  // Obtener la fecha más reciente de diaEventos
  const obtenerFechaMasReciente = (diaEventos) => {
    if (!diaEventos || diaEventos.length === 0) return null;

    const fechas = diaEventos.map((dia) => new Date(dia.fechaHoraInicioDiaEvento));
    const fechaMasReciente = new Date(Math.max(...fechas)); // Obtener la fecha más reciente

    return fechaMasReciente;
  };

  const fechaMasReciente = obtenerFechaMasReciente(evento.diaEventos);

  const formatEstado = (estado) => {
    switch (estado) {
      case "EnPreparacion":
        return "En Preparación";
      case "EnCurso":
        return "En Curso";
      default:
        return estado; // Retorna el estado original si no necesita formato
    }
  };
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: "#222222",
      flexDirection: "row",
      height: 150,
      marginBottom: 20,
      borderRadius: 10,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
      shadowColor: Colors.BordeDorado,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    imageContainer: {
      width: 100,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    infoContainer: {
      padding: 10,
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#ffffff",
    },
    description: {
      fontSize: 14,
      color: "#cccccc",
      marginVertical: 5,
    },
    detail: {
      fontSize: 12,
      color: Colors.BordeDorado,
    },
  });

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Detalle Evento", { evento })}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={
              evento?.img
                ? { uri: evento?.img }
                : logoevento
            }
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{evento.nombre}</Text>
          <Text style={styles.description}>{evento.descripcion}</Text>
          <Text style={styles.detail}>Tipo: {evento.tipoEvento}</Text>
          <Text style={styles.detail}>Estado: {formatEstado(evento.estado)}</Text>
          <Text style={styles.detail}>
            Fecha de inicio:{" "}
            {fechaMasReciente
              ? fechaMasReciente.toLocaleDateString()
              : "No disponible"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventoCard;
