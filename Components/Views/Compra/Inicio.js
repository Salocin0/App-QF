import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import CardEvento from "./CardEvento";
import Aviso from "../Aviso";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import BuscadorEventos from "../BuscadorEventos";
import { useGetEventosQuery } from "../../App/Service/EventosApi";

const Inicio = ({ navigation }) => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const { data, error, isLoading } = useGetEventosQuery();

  const renderItem = ({ item }) => (
    <CardEvento item={item} navigation={navigation} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors?.Azul} />
      ) : error ? (
        <Aviso mensaje={error.message || "Error al cargar eventos"} />
      ) : data.length > 0 ? (
        <>
          <BuscadorEventos />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styleslocal.flatListContainer}
          />
        </>
      ) : (
        <Aviso mensaje="No hay eventos disponibles" />
      )}
    </View>
  );
};

const styleslocal = StyleSheet.create({
  flatListContainer: {
    paddingBottom: 10,
  },
});

export default Inicio;
