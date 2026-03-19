import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
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
      backgroundColor: Colors.GrisClaro,
      padding: 10,
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
        <Aviso mensaje="Error al cargar las asociaciones" />
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
          />
        </>
      ) : (
        <Aviso mensaje="No hay asociaciones disponibles" />
      )}
    </View>
  );
};

export default AdministrarAsociaciones;
