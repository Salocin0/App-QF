import React, { useState } from "react";
import PedidoCard from "./PedidoCard";
import useDynamicColors from "../../Styles/useDynamicColors";
import useStyles from "../../Styles/useStyles";
import pedidos from "../../../data/pedidos.json";
import Aviso from "../Aviso";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";

const Pedido = ({ navigation }) => {
  const Colors = useDynamicColors();
  const styles = useStyles();
  const isLoading = false;

  const renderItem = ({ item }) => <PedidoCard item={item} navigation={navigation} />;

  return (
    <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors?.Azul} />
      ) : pedidos?.length > 0 ? (
        <FlatList data={pedidos} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.flatListContainer} />
      ) : (
        <Aviso mensaje="No hay pedidos disponibles" />
      )}
    </View>
  );
};

export default Pedido;
