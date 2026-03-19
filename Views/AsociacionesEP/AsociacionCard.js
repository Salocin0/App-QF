import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import useDynamicColors from "../../Styles/useDynamicColors";

const AsociacionCard = ({ asociacion, evento }) => {
  const Colors = useDynamicColors();

  const getStatusStyle = () => {
    switch (asociacion.estado) {
      case "PendienteDeAceptacion":
        return { backgroundColor: Colors.NaranjaOscuro, text: "Pendiente" };
      case "Aceptada":
        return { backgroundColor: Colors.Rosa, text: "Aceptado" };
      case "Cancelada":
        return { backgroundColor: Colors.Rojo, text: "Cancelado" };
      case "Rechazada":
        return { backgroundColor: Colors.Rojo, text: "Rechazado" };
      default:
        return { backgroundColor: Colors.GrisOscuro, text: asociacion.estado };
    }
  };

  const { backgroundColor, text } = getStatusStyle();

  const styles = StyleSheet.create({
    card: {
      ...Colors.Styles.card,
      position: "relative",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
      color: Colors.Negro,
    },
    detail: {
      fontSize: 14,
      marginBottom: 5,
      color: Colors.GrisOscuro,
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      marginRight: 5,
    },
    status: {
      position: "absolute",
      right: 10,
      top: 10,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 15,
      color: Colors.Blanco,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.card}>
      <Text style={[styles.status, { backgroundColor }]}>{text}</Text>
      <Text style={styles.title}>{evento?.nombre || "Sin Evento"}</Text>
      <View style={styles.detail}>
      <FontAwesomeIcon icon={faStore} color={Colors.Negro} size={16} />
        <Text> #{asociacion?.puesto?.numeroCarro} - {asociacion?.puesto?.nombreCarro}</Text>
      </View>
      <Text style={styles.detail}>
        Fecha de Asociación: {new Date(asociacion.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
};

export default AsociacionCard;
