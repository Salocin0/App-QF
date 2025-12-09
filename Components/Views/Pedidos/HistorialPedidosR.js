import { StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useCallback } from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useSelector } from "react-redux";
import { useGetPedidosRepartidorQuery } from "../../App/Service/PedidosApi";
import Aviso from "../Aviso";
import PedidoCard from "./PedidoCard";

const HistorialPedidosR = ({ route, navigation }) => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector((state) => state.auth);
  const repartidorId = route?.params?.repartidorId ?? user?.id ?? user?.repartidorId;
  const { data, error, isLoading, isFetching, refetch } = useGetPedidosRepartidorQuery(repartidorId, { skip: !repartidorId });

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (typeof (route?.params?.refetch) === 'function') {
        await route.params.refetch();
      } else if (typeof refetch === 'function') {
        await refetch();
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }
    } catch (e) {
      console.error('Refresh HistorialPedidosR error', e);
    } finally {
      setRefreshing(false);
    }
  }, [route?.params?.refetch, refetch]);

  if (isLoading || isFetching || refreshing) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors?.Azul} />
      </View>
    );
  }

  // Use same backend search as assigned pedidos, but show only 'Entregado' in historial
  const pedidos = (data?.data ?? []).filter((p) => p?.estado === "Entregado");

  return (
    <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro }}>
      {/* Title removed per request */}
      {error ? (
        <Aviso mensaje="Error al cargar el historial" />
      ) : pedidos.length > 0 ? (
        <FlatList
          data={pedidos}
          renderItem={({ item }) => <PedidoCard item={item} navigation={navigation} origin="historial" />}
          keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
          contentContainerStyle={styles.flatListContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[Colors?.Azul]} />}
        />
      ) : (
        <Aviso mensaje="sin pedidos encontrados" />
      )}
    </View>
  );
};

export default HistorialPedidosR;
