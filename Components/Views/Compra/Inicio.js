import React from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import CardEvento from "./CardEvento";
import Aviso from "../Aviso";
import useStyles from "../../Styles/useStyles";
import { useGetEventosJsonQuery } from "../../App/Service/EventosApi";
import useDynamicColors from "../../Styles/useDynamicColors";
import eventos from "./../../../data/eventos.json";
import BuscadorEventos from "../BuscadorEventos";

const Inicio = ({ navigation }) => {
  const styles = useStyles()
  const Colors = useDynamicColors();
  // const { data: eventos, isLoading } = useGetEventosJsonQuery();
  const isLoading = false;

  const renderItem = ({ item }) => (
    <CardEvento item={item} navigation={navigation} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro,}}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors?.Azul} />
      ) : eventos?.length > 0 ? (
        <>
          <BuscadorEventos />
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
