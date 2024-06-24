import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useGetEventosSinAsociacionValidaPuestoQuery } from "@/components/App/Service/EventosApi";
import { useGetPuestosAsociacionValidaQuery } from "@/components/App/Service/PuestosApi";
import CardEventoAsociar from "./CardEventoAsociar";
import BuscadorEventos from "../BuscadorEventos";
import Aviso from "../Aviso";
import { useSelector } from "react-redux";

const AsociarseEventoEP = ({ navigation }) => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const [selectedPuestoId, setSelectedPuestoId] = useState(null);

  const {
    data: dataPuestos,
    error: errorPuestos,
    isLoading: isLoadingPuestos,
  } = useGetPuestosAsociacionValidaQuery({
    estado: "EnPreparacion",
    idConsumidor: user?.consumidorId,
  });
  const {
    data: dataEventos,
    error: errorEventos,
    isLoading: isLoadingEventos,
  } = useGetEventosSinAsociacionValidaPuestoQuery({
    estado: "EnPreparacion",
    idConsumidor: user?.consumidorId,
    idPuesto: selectedPuestoId,
  });

  const renderPuestoItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedPuestoId(item.id)}>
      <View style={styleslocal.card}>
        <Text style={styleslocal.cardText}>#{item.numeroCarro}</Text>
        <Text style={styleslocal.cardText}>{item.nombreCarro}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEventoItem = ({ item }) => (
    <CardEventoAsociar item={item} navigation={navigation} selectedPuestoId={selectedPuestoId}/>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro }}>
      {selectedPuestoId === null ? (
        isLoadingPuestos ? (
          <ActivityIndicator size="large" color={Colors?.Azul} />
        ) : errorPuestos ? (
          <Aviso mensaje={errorPuestos.message || "Error al cargar puestos"} />
        ) : dataPuestos.length > 0 ? (
          <>
            <Text style={[styles.title,{alignSelf:"center",marginVertical:10}]}>Puestos</Text>
            <FlatList
              data={dataPuestos}
              renderItem={renderPuestoItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styleslocal.flatListContainer}
            />
          </>
        ) : (
          <Aviso mensaje="No hay puestos disponibles" />
        )
      ) : (
        <>
          {isLoadingEventos ? (
            <ActivityIndicator size="large" color={Colors?.Azul} />
          ) : errorEventos ? (
            <Aviso
              mensaje={errorEventos.message || "Error al cargar eventos"}
            />
          ) : dataEventos.length > 0 ? (
            <>
              <BuscadorEventos />
              <FlatList
                data={dataEventos}
                renderItem={renderEventoItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styleslocal.flatListContainer}
              />
            </>
          ) : (
            <Aviso mensaje="No hay nuevos eventos disponibles" />
          )}
        </>
      )}
    </View>
  );
};

const styleslocal = StyleSheet.create({
  flatListContainer: {
    paddingBottom: 10,
  },
  card: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    color: "black",
  },
});

export default AsociarseEventoEP;
