import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  RefreshControl,
} from "react-native";
import CardPuesto from "./CardPuesto";
import Aviso from "../Aviso";
import useDynamicColors from "../../Styles/useDynamicColors";
import BuscadorPuestos from "./../BuscadorPuestos";
import { useGetPuestosPorEventoQuery } from "./../../components/App/Service/PuestosApi";
import { useRoute } from "@react-navigation/native";

const Puestos = ({ navigation }) => {
  const route = useRoute();
  const Colors = useDynamicColors();
  const { evento, fecha } = route.params;
  const [filteredData, setFilteredData] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { data, error, isLoading, refetch } = useGetPuestosPorEventoQuery(evento?.id);

  const onRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch, refreshing]);

  useEffect(() => {
    if (data) {
      updateFilteredData(searchText, filters); // Actualiza los datos filtrados
      setDataReady(true); // Marca los datos como listos solo después de filtrarlos
    }
  }, [data, searchText, filters]);

  const updateFilteredData = (searchText, filters) => {
    let updatedData = [...(data || [])];
    
    // Aplicar búsqueda
    if (searchText) {
      updatedData = updatedData.filter((item) =>
        item.nombreCarro.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Aplicar filtros
    if (filters) {
      if (filters === "porNombre") {
        updatedData = updatedData.sort((a, b) => a.nombreCarro.localeCompare(b.nombreCarro));
      } else if (filters === "TiempoEntrega") {
        updatedData = updatedData.sort((a, b) => a.tiempoEntrega - b.tiempoEntrega);
      } else if (filters === "Estrellas") {
        updatedData = updatedData.sort((a, b) => b.estrellas - a.estrellas);
      }
    }

    setFilteredData(updatedData);
  };

  const handleUpdate = (newCategoria, newSearchText) => {
    setSearchText(newSearchText);
    setFilters(newCategoria);
  };

  const renderItem = ({ item }) => (
    <CardPuesto item={item} navigation={navigation} precompra={evento.tienePreventa} fecha={fecha} evento={evento} />
  );

  const styles = StyleSheet.create({
    avisoContainer: {
      padding: 10,
      marginHorizontal: 16,
      marginBottom: 10,
      borderWidth: 2,
      borderRadius: 8,
    },
    avisoText: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={{ backgroundColor: Colors?.GrisClaro, flex: 1 }}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors?.Naranja} />
        </View>
      ) : error ? (
        <Aviso mensaje={error.message || "Error al cargar puestos"} />
      ) : dataReady && filteredData.length > 0 ? (
        <>
          <BuscadorPuestos onUpdate={handleUpdate} />
          {(evento.estado === "Confirmado" && evento.tienePreventa) && (
            <View
              style={[
                styles.avisoContainer,
                {
                  borderColor: Colors?.Rojo,
                  backgroundColor: Colors?.Amarillo,
                },
              ]}
            >
              <Text style={[styles.avisoText, { color: Colors?.Rojo }]}>
                Este evento aún no comenzó. Tu pedido se registrará, pero
                recuerda solicitar la entrega del mismo cuando estés en el
                evento.
              </Text>
            </View>
          )}
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 75 }}
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
      ) : (
        <Aviso mensaje="No hay puestos disponibles" />
      )}
    </View>
  );
};

export default Puestos;
