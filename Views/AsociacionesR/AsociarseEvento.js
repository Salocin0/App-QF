import { StyleSheet, Text, View,ActivityIndicator,FlatList, RefreshControl } from "react-native";
import React, { useState, useCallback } from "react";
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
  const { data, error, isLoading, refetch } = useGetEventosSinAsociacionValidaQuery({estado:"EnPreparacion",idConsumidor:user?.consumidorId});
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch, refreshing]);

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
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors?.Naranja]}
                tintColor={Colors?.Naranja}
              />
            }
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