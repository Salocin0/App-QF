import React, { useCallback, useState } from "react";
import { View, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import PedidoCard from "./PedidoCard";
import Tabs from "./Tabs"; // Importa el nuevo componente Tabs
import useDynamicColors from "../../Styles/useDynamicColors";
import useStyles from "../../Styles/useStyles";
import Aviso from "../Aviso";
import { useGetPedidosQuery } from "./../../components/App/Service/PedidosApi";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const Pedido = ({ navigation }) => {
  const Colors = useDynamicColors();
  const styles = useStyles();
  const user = useSelector((state) => state.auth);
  const { data, error, isLoading, refetch } = useGetPedidosQuery(user.consumidorId);

  const [selectedTab, setSelectedTab] = useState(["Todos"]); // Inicializamos con array
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const onRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch, refreshing]);

  const handleTabSelect = (tabFilters) => {
    setSelectedTab(tabFilters);
  };

  const filteredData = data?.data?.filter((pedido) => {
    if (selectedTab.includes("Todos")) return true;
    return selectedTab.includes(pedido.estado);
  });

  const renderItem = ({ item }) => (
    <PedidoCard
      item={item}
      navigation={navigation}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro }}>
      <Tabs onTabSelect={handleTabSelect} />
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors?.Azul} />
      ) : error ? (
        <Aviso mensaje="Error al cargar los pedidos" />
      ) : filteredData && filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors?.Naranja]}
              tintColor={Colors?.Naranja}
            />
          }
        />
      ) : (
        <Aviso mensaje="No hay pedidos disponibles" />
      )}
    </View>
  );
};

export default Pedido;
