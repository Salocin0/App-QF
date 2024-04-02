import React from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import CardEvento from "./CardEvento";
import Aviso from "../Aviso";
import styles from "../../Styles/styles";
import { useGetEventosJsonQuery } from "../../App/Service/EventosApi";
import { Colors } from "../../Styles/Colors";
import eventos from "./../../../data/eventos.json";
import Buscador from "../Buscador";

const Inicio = ({ navigation }) => {
  // const { data: eventos, isLoading } = useGetEventosJsonQuery();
  const isLoading = false;

  const renderItem = ({ item }) => (
    <CardEvento item={item} navigation={navigation} />
  );

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.Azul} />
      ) : eventos?.length > 0 ? (
        <>
          <Buscador />
          <FlatList
            data={eventos}
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
