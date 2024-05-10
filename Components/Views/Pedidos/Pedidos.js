import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
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
  const { data, error, isLoading } = useGetPedidosQuery(user.consumidorId);

  const renderItem = ({ item }) => <PedidoCard item={item} navigation={navigation} />;

  return (
    <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors?.Azul} />
      ) : error ? (
        <Aviso mensaje="Error al cargar los pedidos" />
      ) : data && data.data?.length > 0 ? (
        <FlatList data={data.data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.flatListContainer} />
      ) : (
        <Aviso mensaje="No hay pedidos disponibles" />
      )}
    </View>
  );
};

export default Pedido;
