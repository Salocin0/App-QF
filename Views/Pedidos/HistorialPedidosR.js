import { View, FlatList, ActivityIndicator, StyleSheet, Text } from "react-native";
import React, { useCallback } from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useGetPedidosRepartidorQuery } from "@/components/App/Service/PedidosApi";
import PedidoCard from "./PedidoCard";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import Aviso from "../Aviso";

const HistorialPedidosR = ({ navigation }) => {
  const stylesExternos = useStyles();
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const { data, error, isLoading, refetch } = useGetPedidosRepartidorQuery(user.consumidorId, {
    pollingInterval: 1000,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  // Filtrar pedidos con estado "Entregado"
  const filteredData = data?.data?.filter(item => item.estado === "Entregado") || [];

  const renderItem = ({ item }) => (
    <PedidoCard
      item={item}
      navigation={navigation}
      isViewRepartidor={true}
    />
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
        <Aviso mensaje="No hay pedidos entregados" /> // Mensaje actualizado
      )}
    </View>
  );
};

export default HistorialPedidosR;
