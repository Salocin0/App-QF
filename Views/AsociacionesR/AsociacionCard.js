import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";

const AsociacionCard = ({ asociacion, evento }) => {
  const Colors = useDynamicColors();

  // Convierte camelCase a PascalCase (conObservacion -> ConObservacion)
  const toPascalCase = (str) => {
    if (!str) return "";
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
  };

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
        return { backgroundColor: Colors.GrisOscuro, text: toPascalCase(asociacion.estado) };
    }
  };

  const { backgroundColor, text } = getStatusStyle();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: "#222222",
      borderRadius: 10,
      marginVertical: 8,
      padding: 15,
      shadowColor: Colors.BordeDorado,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
      position: "relative",
      minHeight: 120,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: "#ffffff",
    },
    detail: {
      fontSize: 14,
      marginBottom: 5,
      color: "#cccccc",
    },
    status: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 15,
      color: "#ffffff",
      fontWeight: "bold",
      flexShrink: 1,
    },
  });

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <Text style={[styles.title, { flex: 1, marginRight: 80 }]}>{evento?.nombre || "Sin Evento"}</Text>
        <Text style={[styles.status, { backgroundColor }]}>{text}</Text>
      </View>
      <Text style={styles.detail}>
        Fecha de Asociacion: {new Date(asociacion.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
};

export default AsociacionCard;
