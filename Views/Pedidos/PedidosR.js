import React, { useCallback } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import PedidoCardR from "./PedidoCardR"; // Asegúrate de tener este componente
import useDynamicColors from "../../Styles/useDynamicColors";
import { useGetPedidosRepartidorQuery } from "@/components/App/Service/PedidosApi";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import Aviso from "../Aviso";

const PedidosR = ({ navigation }) => {
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);

  // Obtén los pedidos del repartidor
  const { data, error, isLoading, refetch } = useGetPedidosRepartidorQuery(user.consumidorId, {
    pollingInterval: 1000,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.GrisClaro,
    },
    flatListContainer: {
      flexGrow: 1,
    },
  });

  // Filtrar pedidos con estado "EnCamino"
  const filteredData = data?.data?.filter(item => item.estado === "EnCamino") || [];

  const renderItem = ({ item }) => (
    <PedidoCardR
      item={item}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors?.Azul} />
      ) : error ? (
        <Aviso mensaje="Error al cargar los pedidos" />
      ) : filteredData.length > 0 ? ( // Cambia aquí para usar filteredData
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <Aviso mensaje="No hay pedidos en camino" /> // Mensaje actualizado
      )}
    </View>
  );
};

export default PedidosR;
