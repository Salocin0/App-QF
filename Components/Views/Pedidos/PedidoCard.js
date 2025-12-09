import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faStore, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const PedidoCard = ({ item, navigation, origin = 'pedidos' }) => {
  const Colors = useDynamicColors();
  const seleccionarPedido = (pedido) => {
    navigation.navigate("Detalle Pedido", { pedido, from: origin });
  };

  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: Colors.GrisClaro,
      borderRadius: 10,
      padding: 12,
      marginVertical: 6,
      marginHorizontal: 16,
      backgroundColor: Colors.Blanco,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      elevation: 3,
    },
    left: {
      flex: 1,
      paddingRight: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 4,
      color: Colors.Negro,
    },
    meta: {
      fontSize: 13,
      color: Colors.GrisOscuro,
    },
    right: {
      alignItems: "flex-end",
    },
    total: {
      fontSize: 16,
      fontWeight: "700",
      color: Colors.Azul,
    },
    status: {
      fontSize: 12,
      color: Colors.Blanco,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      overflow: 'hidden',
    },
  });

  const formatStatus = (raw) => {
    if (!raw && raw !== 0) return "";
    let s = String(raw);
    // replace underscores/dashes with spaces
    s = s.replace(/[_-]+/g, " ");
    // insert space before camelCase capitals
    s = s.replace(/([a-z])([A-Z])/g, "$1 $2");
    // normalize extra spaces
    s = s.replace(/\s+/g, " ").trim();
    return s;
  };

  const estadoColor = (raw) => {
    const s = formatStatus(raw).toLowerCase();
    if (s.includes("cancel")) return Colors.Rojo || "#e74c3c";
    if (s.includes("entreg") || s.includes("complet") || s.includes("finaliz")) return Colors.Verde || "#2ecc71";
    if (s.includes("curso") || s.includes("en curso") || s.includes("proceso") || s.includes("en camino")) return Colors.Naranja || "#f39c12";
    if (s.includes("pendient") || s.includes("pendiente")) return Colors.GrisClaroPeroNoTanClaro || "#95a5a6";
    return Colors.Gris || "#bdc3c7";
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => seleccionarPedido(item)}>
      <View style={styles.card}>
        <View style={styles.left}>
          <Text style={styles.title}>Pedido #{item?.id}</Text>
          {item?.puesto && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faStore} color={Colors.GrisOscuro} style={{ marginRight: 6 }} />
              <Text style={styles.meta} numberOfLines={1} ellipsizeMode="tail">
                {item?.puesto?.nombreCarro} · {item?.puesto?.tipoNegocio}
              </Text>
            </View>
          )}
          {(item?.repartidor || item?.repartidorId) && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <FontAwesomeIcon icon={faUser} color={Colors.GrisOscuro} style={{ marginRight: 6 }} />
              <Text style={styles.meta}>
                Repartidor: {item?.repartidor?.nombre ?? item?.repartidor?.name ?? item?.repartidor?.fullName ?? item?.repartidorNombre ?? item?.repartidorId}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.right}>
          {item?.total ? (
            <Text style={styles.total}>${item?.total}</Text>
          ) : (
            <Text style={[styles.total]}>{item?.estado}</Text>
          )}
          {item?.estado && (
            <View style={{ marginTop: 6 }}>
              <View style={{ backgroundColor: estadoColor(item?.estado), borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 }}>
                <Text style={{ color: Colors.Blanco, fontSize: 12 }}>{formatStatus(item?.estado)}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PedidoCard;
