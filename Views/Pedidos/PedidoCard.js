import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";

const PedidoCard = ({ item, navigation }) => {
  const Colors = useDynamicColors();
  const seleccionarPedido = (pedido) => {
    navigation.navigate("Detalle Pedido", { pedido });
  };

  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: Colors.Gris,
      borderRadius: 8,
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 20,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
      color: Colors.Negro,
    },
    text: {
      color: Colors.Negro,
    },
  });

  return (
    <TouchableOpacity onPress={() => seleccionarPedido(item)}>
      <View style={styles.card}>
        <Text style={styles.title}>Pedido #{item?.id}</Text>
        {item?.repartidorId && (
          <Text style={styles.text}>Repartidor: {item?.repartidorId}</Text>
        )}
        {item?.puesto && (
          <Text style={styles.text}>
            Puesto: {item?.puesto?.nombreCarro} - {item?.puesto?.tipoNegocio}
          </Text>
        )}
        {item?.total && (
          <Text style={styles.text}>Total: ${item?.total}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PedidoCard;
