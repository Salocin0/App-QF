import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from "react-native";
import CardEvento from "./CardEvento";
import Aviso from "../Aviso";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import BuscadorEventos from "../BuscadorEventos";
import { useGetEventosQuery } from "./../../components/App/Service/EventosApi";

// Filtra eventos cuya fecha del último día ya pasó
const filtrarFinalizados = (eventosList) => {
  const ahora = new Date();
  return eventosList.filter((evento) => {
    if (evento.diaEventos?.length) {
      const fechaFin = new Date(
        Math.max(...evento.diaEventos.map((d) => new Date(d.fechaHoraFinDiaEvento)))
      );
      return fechaFin > ahora;
    }
    return true;
  });
};

const Inicio = ({ navigation }) => {
  const styles = useStyles();
  const Colors = useDynamicColors();

  const [filteredData, setFilteredData] = useState([]);
  const [dataReady, setDataReady] = useState(false); 
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: dataEnCurso,
    error: errorEnCurso,
    isLoading: isLoadingEnCurso,
    refetch: refetchEnCurso,
  } = useGetEventosQuery("EnCurso");
  const {
    data: dataConfirmado,
    error: errorConfirmado,
    isLoading: isLoadingConfirmado,
    refetch: refetchConfirmado,
  } = useGetEventosQuery("Confirmado");

  const combinedData = [...(dataEnCurso || []), ...(dataConfirmado || [])];

  const onRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      await Promise.all([refetchEnCurso(), refetchConfirmado()]);
    } finally {
      setRefreshing(false);
    }
  }, [refetchEnCurso, refetchConfirmado, refreshing]);

  const updateFilteredData = (order, filters, searchText) => {
    let data = filtrarFinalizados([...combinedData]);

    if (searchText) {
      data = data.filter((item) =>
        item.nombre.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (order === "porDistancia") {
      data = data.sort((a, b) => a.distancia - b.distancia);
    } else if (order === "porNombre") {
      data = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (order === "porFecha") {
      data = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    }

    data = data.filter((item) => {
      let includeItem = true;

      if (filters?.conPreventa !== undefined) {
        if (!filters?.conPreventa) {
          if (item?.tienePreventa) includeItem = false;
        }
      }

      if (filters?.iniciados !== undefined) {
        if (!filters?.iniciados) {
          if (item?.estado === "EnCurso") includeItem = false;
        }
      }

      if (filters?.proximos !== undefined) {
        if (!filters?.proximos) {
          if (item?.estado === "Confirmado") includeItem = false;
        }
      }
      if (filters?.sinPreventa !== undefined) {
        if (!filters?.sinPreventa) {
          if (!item?.tienePreventa) includeItem = false;
        }
      }

      return includeItem;
    });

    setFilteredData(data);
    setDataReady(true);
  };

  useEffect(() => {
    if (!(isLoadingEnCurso || isLoadingConfirmado) && !dataReady) {
      updateFilteredData();
    }
  }, [isLoadingEnCurso, isLoadingConfirmado]);

  const handleUpdate = (newOrder, newFilters, newSearchText) => {
    updateFilteredData(newOrder, newFilters, newSearchText);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro }}>
      <BuscadorEventos onUpdate={handleUpdate} />
      {isLoadingEnCurso || isLoadingConfirmado ? (
        <View style={styleslocal.loadingContainer}>
          <ActivityIndicator size="large" color={Colors?.Naranja} />
        </View>
      ) : errorEnCurso && errorConfirmado ? (
        <Aviso mensaje="Error al cargar eventos" />
      ) : dataReady && filteredData.length > 0 ? (
        <>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <CardEvento item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item?.id.toString()}
            contentContainerStyle={styleslocal.flatListContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors?.Naranja]}
                tintColor={Colors?.Naranja}
              />
            }
          />
        </>
      ) : dataReady ? (
        <Aviso mensaje="No hay eventos disponibles" />
      ) : null}
    </View>
  );
};

const styleslocal = StyleSheet.create({
  flatListContainer: {
    paddingBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Inicio;
