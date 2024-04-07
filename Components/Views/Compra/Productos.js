import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import Aviso from "../Aviso";
import useDynamicColors from "../../Styles/useDynamicColors";
import producto from "./../../../data/productos.json";
import CardProducto from "./CardProducto";
import BuscadorProductos from "../BuscadorProductos";

const Productos = ({ navigation }) => {
  const Colors = useDynamicColors();
  const isLoading = false;

  const renderItem = ({ item }) => (
    <CardProducto item={item} navigation={navigation} />
  );

  return (
    <View style={{ backgroundColor: Colors?.GrisClaro }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors?.Azul} />
      ) : producto.length > 0 ? (
        <>
          <BuscadorProductos />
          <FlatList
            data={producto}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{paddingBottom:75}}
          />
        </>
      ) : (
        <Aviso mensaje="No hay productos disponibles" />
      )}
    </View>
  );
};

export default Productos;
