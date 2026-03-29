import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useDynamicColors from "../../Styles/useDynamicColors";

const PedidoCardR = ({ item, navigation }) => {
  const Colors = useDynamicColors();

  const handleIrUbicacion = (pedido) => {
      navigation.navigate("Ubicacion Pedido", {pedido});
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha); // Convertir a objeto Date
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses de 0-11
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month} ${hours}:${minutes}`;
  };

  const styles = StyleSheet.create({
    card: {
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
      borderRadius: 14,
      padding: 18,
      marginVertical: 10,
      marginHorizontal: 10,
      backgroundColor: "#222222",
      shadowColor: Colors.BordeDorado,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#ffffff",
      letterSpacing: 1,
    },
    text: {
      color: "#cccccc",
      marginBottom: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    status: {
      position: "absolute",
      right: 18,
      top: 18,
      paddingVertical: 5,
      paddingHorizontal: 12,
      borderRadius: 20,
      fontWeight: "bold",
      color: "#000000",
      fontSize: 14,
      overflow: "hidden",
    },
    pending: {
      backgroundColor: Colors.Naranja,
    },
    inProgress: {
      backgroundColor: Colors.Azul,
    },
    delivered: {
      backgroundColor: Colors.Verde,
    },
    aceptado: {
      backgroundColor: Colors.Purpura,
    },
    enPreparacion: {
      backgroundColor: Colors.Rosa,
    },
    Cancelado: {
      backgroundColor: Colors.Rojo,
    },
    icon: {
      marginRight: 10,
      color: Colors.BordeDorado,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    mapButton: {
      backgroundColor: Colors.BordeDorado,
      padding: 10,
      borderRadius: 8,
      marginTop: 12,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      shadowColor: Colors.BordeDorado,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    mapButtonText: {
      color: "#000000",
      fontWeight: "bold",
      marginLeft: 7,
      fontSize: 16,
    },
  });

  const getStatusInfo = () => {
    switch (item.estado) {
      case "Pendiente":
        return { style: styles.pending, text: "Pendiente" };
      case "EnCamino":
        return { style: styles.inProgress, text: "En Camino" }; // Cambiado a "En camino"
      case "Entregado":
        return { style: styles.delivered, text: "Entregado" };
      case "Aceptado":
        return { style: styles.aceptado, text: "Aceptado" };
      case "EnPreparacion":
        return { style: styles.enPreparacion, text: "En Preparación" }; // Cambiado a "En preparación"
      case "Cancelado":
        return { style: styles.Cancelado, text: "Cancelado" };
        case "Precomprado":
        return { style: styles.aceptado, text: "Precompra" };
      default:
        return { style: {}, text: item.estado };
    }
  };

  const { style: statusStyle, text: statusText } = getStatusInfo();

  // Para el color del icono, usamos dorado para el estado EnCamino
  const iconColor = item.estado === "EnCamino" ? Colors.BordeDorado : Colors.BordeDorado;

  return (
    <View>
      <View style={styles.card}>
        <Text style={styles.title}>Pedido #{item?.id}</Text>
        <Text style={[styles.status, statusStyle]}>{statusText}</Text>
        <View style={styles.row}>
          <View style={styles.text}>
            <Icon name="storefront-outline" size={20} style={styles.icon} />
            <Text style={{ color: "#ffffff" }}>{item?.puesto?.nombreCarro}</Text>
          </View>
        </View>
        {item.estado === "EnCamino" && (
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => handleIrUbicacion(item)}
          >
            <Icon name="map-marker" size={20} color="#000000" />
            <Text style={styles.mapButtonText}>Ver en mapa</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PedidoCardR;
