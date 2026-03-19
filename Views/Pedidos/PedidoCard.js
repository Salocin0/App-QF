import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useDynamicColors from "../../Styles/useDynamicColors";

const PedidoCard = ({ item, navigation,isViewRepartidor }) => {
  const Colors = useDynamicColors();

  const seleccionarPedido = (pedido) => {
    navigation.navigate("Detalle Pedido", { pedido });
  };
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
      borderWidth: 1,
      borderColor: Colors.Gris,
      borderRadius: 8,
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
      backgroundColor: Colors.Blanco,
      shadowColor: Colors.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: Colors.Negro,
    },
    text: {
      color: Colors.Negro,
      marginBottom: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    status: {
      position: "absolute",
      right: 15,
      top: 15,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 15,
      fontWeight: "bold",
      color: Colors.Blanco,
    },
    pending: {
      backgroundColor: Colors.NaranjaOscuro,
    },
    inProgress: {
      backgroundColor: Colors.Azul,
    },
    delivered: {
      backgroundColor: Colors.Verde,
    },
    aceptado: {
      backgroundColor: Colors.Rosa,
    },
    enPreparacion: {
      backgroundColor: Colors.Purpura,
    },
    Cancelado: {
      backgroundColor: Colors.Rojo,
    },
    icon: {
      marginRight: 8,
      color: Colors.Negro,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    mapButton: {
      backgroundColor: Colors.Azul,
      padding: 8,
      borderRadius: 5,
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    mapButtonText: {
      color: Colors.Blanco,
      fontWeight: "bold",
      marginLeft: 5,
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

  return (
    <TouchableOpacity onPress={() => seleccionarPedido(item)}>
      <View style={styles.card}>
        <Text style={styles.title}>Pedido #{item?.id}</Text>
        <Text style={[styles.status, statusStyle]}>{statusText}</Text>
        <View style={styles.row}>
          <View style={styles.text}>
            <Icon name="storefront-outline" size={20} style={styles.icon} />
            <Text>{item?.puesto?.nombreCarro}</Text>
          </View>
          {item?.estado === "EnCamino" ? (
            <View style={styles.text}>
              <Icon name="account-outline" size={20} style={styles.icon} />
              <Text>{item?.repartidore?.consumidore?.nombre +", " +item?.repartidore?.consumidore?.apellido || "Alberto"}</Text>
            </View>
          ) : (
            <View style={styles.text}>
              <Text></Text>
            </View>
          )}
          {item?.estado === "Entregado" && isViewRepartidor ? (
            <View style={styles.text}>
              <Icon name="account-outline" size={20} style={styles.icon} />
              <Text>{item?.consumidore?.nombre +", " +item?.consumidore?.apellido || "Alberto"}</Text>
            </View>
          ) : (
            <View style={styles.text}>
              <Text></Text>
            </View>
          )}
        </View>
        <View style={styles.row}>
          <View style={styles.text}>
            <Icon name="calendar-outline" size={20} style={styles.icon} />
            <Text>{formatFecha(item?.fecha)}</Text>
          </View>
          <View style={styles.text}>
            <Icon name="currency-usd" size={20} style={styles.icon} />
            <Text style={{ fontSize: 18 }}>{item?.total}</Text>
          </View>
        </View>
        {item.estado === "EnCamino" && (
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => handleIrUbicacion(item)}
          >
            <Icon name="map-marker" size={20} color={Colors.Blanco} />
            <Text style={styles.mapButtonText}>Ver en mapa</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PedidoCard;
