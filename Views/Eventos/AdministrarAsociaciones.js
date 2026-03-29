import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React, { useState, useCallback,useEffect } from "react";
import { useGetAsociacionesEventoQuery } from "@/components/App/Service/AsociacionesApi";
import CardAsociacion from "./CardAsociacion"; // Asegúrate de que la ruta sea correcta
import { useFocusEffect } from "@react-navigation/native";
import useDynamicColors from "../../Styles/useDynamicColors";
import Aviso from "../Aviso"; // Componente para mostrar mensajes
import StatusTabs from "./Tabs";

const AdministrarAsociaciones = ({ route }) => {
  const { evento } = route.params;
  const eventoId = evento.id;
  const Colors = useDynamicColors();

  // Estado local para el filtro seleccionado
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [refreshing, setRefreshing] = useState(false);

  // Obtener asociaciones del evento
  const { data, error, isLoading, refetch } = useGetAsociacionesEventoQuery(
    eventoId,
    {
      pollingInterval: 1000,
    }
  );

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

  let filteredData = data;
  if(selectedStatus !== "Todos"){
    filteredData = data.filter(item => selectedStatus.includes(item.estado));
  }
  
  

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1a1a1a",
      padding: 10,
    },
    flatListContainer: {
      flexGrow: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1a1a1a",
    },
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.BordeDorado} />
        </View>
      ) : error ? (
        <View style={styles.loadingContainer}>
          <Aviso mensaje="Error al cargar las asociaciones" />
        </View>
      ) : data?.length > 0 ? (
        <>
          {/* Filtro de pestañas */}
          <StatusTabs onStatusSelect={handleStatusSelect} />

          {/* Lista de asociaciones filtradas */}
          <FlatList
            data={filteredData}
            renderItem={({ item }) => <CardAsociacion asociacion={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors.BordeDorado]}
                tintColor={Colors.BordeDorado}
              />
            }
          />
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Aviso mensaje="No hay asociaciones disponibles" />
        </View>
      )}
    </View>
  );
};

export default AdministrarAsociaciones;
