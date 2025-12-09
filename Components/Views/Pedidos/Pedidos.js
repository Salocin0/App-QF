import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import PedidoCard from "./PedidoCard";
import useDynamicColors from "../../Styles/useDynamicColors";
import useStyles from "../../Styles/useStyles";
import Aviso from "../Aviso";
import { useGetPedidosQuery } from "../../App/Service/PedidosApi";
import { useSelector } from "react-redux";

const Pedido = ({ navigation }) => {
  const Colors = useDynamicColors();
  const styles = useStyles();
  const user = useSelector((state) => state.auth);
  const { data, error, isLoading, refetch, isFetching } = useGetPedidosQuery(user.consumidorId);
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = ({ item }) => <PedidoCard item={item} navigation={navigation} />;

  // If we're loading or refetching, show a centered full-screen spinner and hide the list
  if (isLoading || isFetching) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors?.Azul} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro }}>
      {error ? (
        <Aviso mensaje="Error al cargar los pedidos" />
      ) : data && data.data?.length > 0 ? (
        <FlatList
          data={data.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                try {
                  await refetch();
                } catch (e) {
                  console.error(e);
                }
                setRefreshing(false);
              }}
              colors={[Colors?.Azul]}
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
