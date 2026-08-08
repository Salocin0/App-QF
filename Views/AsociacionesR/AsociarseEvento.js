import { StyleSheet, Text, View,ActivityIndicator,FlatList, RefreshControl } from "react-native";
import React, { useState, useCallback } from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useGetEventosSinAsociacionValidaQuery } from "@/components/App/Service/EventosApi";
import CardEventoAsociar from "./CardEventoAsociar"
import BuscadorEventos from "../BuscadorEventos";
import Aviso from "../Aviso";
import { useSelector } from "react-redux";

// Un evento acepta asociar repartidores mientras está "en preparación"
// (incluye las variantes legacy del wizard) o ya "Confirmado".
// Ver el mismo criterio en AsociarRepartidorAEvento.js (web).
const ESTADOS_ASOCIABLES = ["EnPreparacion", "EnPreparacion1", "EnPreparacion2", "EnPreparacion3", "Confirmado"];

const AsociarseEvento = ({ navigation }) => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);

  const q0 = useGetEventosSinAsociacionValidaQuery({ estado: ESTADOS_ASOCIABLES[0], idConsumidor: user?.consumidorId });
  const q1 = useGetEventosSinAsociacionValidaQuery({ estado: ESTADOS_ASOCIABLES[1], idConsumidor: user?.consumidorId });
  const q2 = useGetEventosSinAsociacionValidaQuery({ estado: ESTADOS_ASOCIABLES[2], idConsumidor: user?.consumidorId });
  const q3 = useGetEventosSinAsociacionValidaQuery({ estado: ESTADOS_ASOCIABLES[3], idConsumidor: user?.consumidorId });
  const q4 = useGetEventosSinAsociacionValidaQuery({ estado: ESTADOS_ASOCIABLES[4], idConsumidor: user?.consumidorId });
  const queries = [q0, q1, q2, q3, q4];

  const isLoading = queries.some((q) => q.isLoading);
  const error = queries.every((q) => q.error) ? queries[0].error : null;
  const dataById = new Map();
  queries.forEach((q) => {
    (Array.isArray(q.data) ? q.data : []).forEach((evento) => dataById.set(evento.id, evento));
  });
  const data = Array.from(dataById.values());

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      await Promise.all(queries.map((q) => q.refetch()));
    } finally {
      setRefreshing(false);
    }
  }, [refreshing, q0.refetch, q1.refetch, q2.refetch, q3.refetch, q4.refetch]);

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