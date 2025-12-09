import { StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator, FlatList } from "react-native";
import { useState, useCallback } from "react";
import React from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useGetPedidosRepartidorQuery } from "../../App/Service/PedidosApi";
import { useSelector } from "react-redux";
import Aviso from "../Aviso";
import PedidoCard from "./PedidoCard";

const PedidosR = ({ route, navigation }) => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector((state) => state.auth);
  // try to determine repartidor id: prefer explicit route param, else auth.id
  const repartidorId = route?.params?.repartidorId ?? user?.id ?? user?.repartidorId;
  const { data, error, isLoading, isFetching, refetch } = useGetPedidosRepartidorQuery(repartidorId, { skip: !repartidorId });

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // If a refetch function was provided via navigation params, call it
      // Otherwise simulate a short refresh so the spinner is visible
      if (typeof (route?.params?.refetch) === 'function') {
        await route.params.refetch();
      } else if (typeof refetch === 'function') {
        await refetch();
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }
    } catch (e) {
      console.error('Refresh PedidosR error', e);
    } finally {
      setRefreshing(false);
    }
  }, [route?.params?.refetch]);

  // show centered spinner while loading
  if (isLoading || isFetching || refreshing) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors?.Azul} />
      </View>
    );
  }

  // show only non-entregados in assigned pedidos
  const pedidos = (data?.data ?? []).filter(
    (p) => !(p?.estado === "Entregado" || p?.estado === "Valorado")
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro }}>
      {/* Title removed per request */}
      {error ? (
        <Aviso mensaje="Error al cargar los pedidos" />
      ) : pedidos.length > 0 ? (
        <FlatList
          data={pedidos}
          renderItem={({ item }) => <PedidoCard item={item} navigation={navigation} origin="pedidos" />}
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

export default PedidosR;
