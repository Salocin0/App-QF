import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import React, { useState, useCallback } from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useGetEventosSinAsociacionValidaPuestoQuery } from "@/components/App/Service/EventosApi";
import { useGetPuestosAsociacionValidaQuery } from "@/components/App/Service/PuestosApi";
import CardEventoAsociar from "./CardEventoAsociar";
import BuscadorEventos from "../BuscadorEventos";
import Aviso from "../Aviso";
import { useSelector } from "react-redux";
import imgevento from "./../../assets/eventoimg.jpeg";
import logoevento from "./../../assets/logoevento.webp";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faClock } from "@fortawesome/free-solid-svg-icons";

const AsociarseEventoEP = ({ navigation }) => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const [selectedPuestoId, setSelectedPuestoId] = useState(null);
  const [refreshingPuestos, setRefreshingPuestos] = useState(false);
  const [refreshingEventos, setRefreshingEventos] = useState(false);

  const {
    data: dataPuestos,
    error: errorPuestos,
    isLoading: isLoadingPuestos,
    refetch: refetchPuestos,
  } = useGetPuestosAsociacionValidaQuery({
    estado: "EnPreparacion",
    idConsumidor: user?.consumidorId,
  });
  // Un evento acepta asociar puestos mientras está "en preparación"
  // (incluye las variantes legacy del wizard) o ya "Confirmado".
  // Ver el mismo criterio en AsociarPuestoAEvento.js (web).
  const eq0 = useGetEventosSinAsociacionValidaPuestoQuery({ estado: "EnPreparacion", idConsumidor: user?.consumidorId, idPuesto: selectedPuestoId });
  const eq1 = useGetEventosSinAsociacionValidaPuestoQuery({ estado: "EnPreparacion1", idConsumidor: user?.consumidorId, idPuesto: selectedPuestoId });
  const eq2 = useGetEventosSinAsociacionValidaPuestoQuery({ estado: "EnPreparacion2", idConsumidor: user?.consumidorId, idPuesto: selectedPuestoId });
  const eq3 = useGetEventosSinAsociacionValidaPuestoQuery({ estado: "EnPreparacion3", idConsumidor: user?.consumidorId, idPuesto: selectedPuestoId });
  const eq4 = useGetEventosSinAsociacionValidaPuestoQuery({ estado: "Confirmado", idConsumidor: user?.consumidorId, idPuesto: selectedPuestoId });
  const eventoQueries = [eq0, eq1, eq2, eq3, eq4];

  const isLoadingEventos = eventoQueries.some((q) => q.isLoading);
  const errorEventos = eventoQueries.every((q) => q.error) ? eventoQueries[0].error : null;
  const dataEventosById = new Map();
  eventoQueries.forEach((q) => {
    (q.data || []).forEach((evento) => dataEventosById.set(evento.id, evento));
  });
  const dataEventos = Array.from(dataEventosById.values());
  const refetchEventos = () => Promise.all(eventoQueries.map((q) => q.refetch()));

  const onRefreshPuestos = useCallback(async () => {
    if (refreshingPuestos) return;
    setRefreshingPuestos(true);
    try {
      await refetchPuestos();
    } finally {
      setRefreshingPuestos(false);
    }
  }, [refetchPuestos, refreshingPuestos]);

  const onRefreshEventos = useCallback(async () => {
    if (refreshingEventos) return;
    setRefreshingEventos(true);
    try {
      await refetchEventos();
    } finally {
      setRefreshingEventos(false);
    }
  }, [refetchEventos, refreshingEventos]);

  const renderPuestoItem = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "#222222",
        borderRadius: 10,
        shadowColor: Colors.BordeDorado,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: "row",
        height: 170,
        marginVertical: 5,
        marginHorizontal: 20,
        borderColor: Colors.BordeDorado,
        borderWidth: 2,
      }}
      onPress={() => setSelectedPuestoId(item.id)}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: "center",
        }}
      >
        <Image
          source={item?.img ? { uri: item.img } : imgevento}
          style={{
            width: "100%",
            height: "40%",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
          resizeMode="cover"
        />
      </View>
      <View style={{ flex: 1, padding: 10, marginTop: 70 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Image
            source={item?.img ? { uri: item.img } : logoevento}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginRight: 10,
              borderWidth: 2,
              borderColor: Colors.BordeDorado,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              justifyContent: "center",
              display: "flex",
              textAlign: "center",
              alignContent: "center",
              width: "80%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 5,
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              {item.nombreCarro}
            </Text>
            <Text
              style={{ fontSize: 16, color: Colors.BordeDorado, textAlign: "center" }}
            >
              {item.tipoNegocio}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEventoItem = ({ item }) => (
    <CardEventoAsociar
      item={item}
      navigation={navigation}
      selectedPuestoId={selectedPuestoId}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#1a1a1a" }}>
      {selectedPuestoId === null ? (
        isLoadingPuestos ? (
          <ActivityIndicator size="large" color={Colors.BordeDorado} />
        ) : errorPuestos ? (
          <Aviso mensaje={errorPuestos.message || "Error al cargar puestos"} />
        ) : dataPuestos?.length > 0 ? (
          <>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: Colors.BordeDorado,
                alignSelf: "center",
                marginVertical: 15,
                textAlign: "center",
              }}
            >
              Seleccioná un Puesto
            </Text>
            <FlatList
              data={dataPuestos}
              renderItem={renderPuestoItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styleslocal.flatListContainer}
              refreshControl={
                <RefreshControl
                  refreshing={refreshingPuestos}
                  onRefresh={onRefreshPuestos}
                  colors={[Colors.BordeDorado]}
                  tintColor={Colors.BordeDorado}
                />
              }
            />
          </>
        ) : (
          <Aviso mensaje="No hay puestos disponibles" />
        )
      ) : (
        <>
          {isLoadingEventos ? (
            <ActivityIndicator size="large" color={Colors.BordeDorado} />
          ) : errorEventos ? (
            <Aviso
              mensaje={errorEventos.message || "Error al cargar eventos"}
            />
          ) : dataEventos?.length > 0 ? (
            <>
              <BuscadorEventos />
              <FlatList
                data={dataEventos}
                renderItem={renderEventoItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styleslocal.flatListContainer}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshingEventos}
                    onRefresh={onRefreshEventos}
                    colors={[Colors.BordeDorado]}
                    tintColor={Colors.BordeDorado}
                  />
                }
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
    shadowColor: "#000000",
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
