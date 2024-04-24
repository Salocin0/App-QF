import React,{useEffect} from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import CardPuesto from "./CardPuesto";
import Aviso from "../Aviso";
import useDynamicColors from "../../Styles/useDynamicColors";
import BuscadorPuestos from "./../BuscadorPuestos";
import { useGetPuestosPorEventoQuery } from "../../App/Service/PuestosApi";
import { useRoute } from '@react-navigation/native';

const Puestos = ({ navigation }) => {
  const route = useRoute();
  const Colors = useDynamicColors();
  const { evento } = route.params;
  const { data, error, isLoading } = useGetPuestosPorEventoQuery(evento.id); 

  const renderItem = ({ item }) => (
    <CardPuesto item={item} navigation={navigation} />
  );
  return (
    <View style={{ backgroundColor: Colors?.GrisClaro }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors?.Azul} />
      ) : error ? (
        <Aviso mensaje={error.message || "Error al cargar puestos"} />
      ) : data ? (
        <>
          <BuscadorPuestos />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 75 }}
          />
        </>
      ) : (
        <Aviso mensaje="No hay puestos disponibles" />
      )}
    </View>
  );
};

export default Puestos;
