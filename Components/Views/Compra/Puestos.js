import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import CardPuesto from "./CardPuesto";
import Aviso from "../Aviso";
import useDynamicColors from "../../Styles/useDynamicColors";
import puestos from "./../../../data/puestos.json";
import BuscadorPuestos from "./../BuscadorPuestos"

const Puestos = ({ navigation }) => {
  const Colors = useDynamicColors();
  const isLoading = false;

  const renderItem = ({ item }) => (
    <CardPuesto item={item} navigation={navigation} />
  );

  return (
    <View style={{ backgroundColor: Colors?.GrisClaro }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors?.Azul} />
      ) : puestos.length > 0 ? (
        <>
          <BuscadorPuestos/>
          <FlatList
            data={puestos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{paddingBottom:75}}
          />
        </>
      ) : (
        <Aviso mensaje="No hay puestos disponibles" />
      )}
    </View>
  );
};

export default Puestos;
