import { StyleSheet, Text, View,ActivityIndicator,FlatList } from "react-native";
import React from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useGetEventosSinAsociacionValidaQuery } from "@/components/App/Service/EventosApi";
import CardEventoAsociar from "./CardEventoAsociar"
import BuscadorEventos from "../BuscadorEventos";
import Aviso from "../Aviso";
import { useSelector } from "react-redux";

const AsociarseEvento = ({ navigation }) => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const { data, error, isLoading } = useGetEventosSinAsociacionValidaQuery({estado:"EnPreparacion",idConsumidor:user?.consumidorId});
  const renderItem = ({ item }) => (
    <CardEventoAsociar item={item} navigation={navigation} />
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
        <Aviso mensaje="No hay nuevos eventos disponibles" />
      )}
    </View>
  );
};

const styleslocal = StyleSheet.create({
  flatListContainer: {
    paddingBottom: 10,
  },
});


export default AsociarseEvento;