import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import Aviso from "../Aviso";
import useDynamicColors from "../../Styles/useDynamicColors";
import CardProducto from "./CardProducto";
import BuscadorProductos from "../BuscadorProductos";
import { useGetProductosQuery } from "./../../components/App/Service/ProductosApi";
import { useRoute } from '@react-navigation/native';

const Productos = ({ navigation }) => {
  const Colors = useDynamicColors();
  const route = useRoute();
  const item = route.params;
  const { data, isLoading, error } = useGetProductosQuery(item.evento.id);

  const renderItem = ({ item }) => (
    <CardProducto item={item} navigation={navigation} />
  );

  return (
    <View style={{ backgroundColor: Colors?.GrisClaro }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors?.Azul} />
      ) : error ? (
        <Aviso mensaje={error.message || "Error al cargar productos"} />
      ) : data.length > 0 ? (
        <>
          <BuscadorProductos />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 75 }}
          />
        </>
      ) : (
        <Aviso mensaje="No hay productos disponibles" />
      )}
    </View>
  );
};

export default Productos;
