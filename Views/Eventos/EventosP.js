import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import { useGetAllEventosQuery } from "./../../components/App/Service/EventosApi";
import EventoCard from "./eventoCard";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import Aviso from "../Aviso";

const EventosP = () => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;

  const { data: eventosData, isLoading, isError, refetch } = useGetAllEventosQuery(userId);
  const [eventos, setEventos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (eventosData && Array.isArray(eventosData)) {
      setEventos(eventosData);
    }
  }, [eventosData]);

  const onRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refreshing, refetch]);

  const style = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: "#1a1a1a",
      minHeight: 300,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1a1a1a",
    },
  });

  // Solo mostrar "No hay eventos" si ya terminó de cargar Y no hay eventos
  const showNoEventos = !isLoading && eventos.length === 0;

  if (isLoading) {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size="large" color={Colors?.Naranja} />
      </View>
    );
  }

  if (showNoEventos) {
    return (
      <View style={style.loadingContainer}>
        <Aviso mensaje={"No hay eventos"} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={style.container}>
        <Aviso mensaje={"Error al cargar los eventos"}/>
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={style.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors?.Naranja]}
          tintColor={Colors?.Naranja}
        />
      }
    >
      {eventos.map((evento, index) => (
        <EventoCard key={index} evento={evento} />
      ))}
    </ScrollView>
  );
};

export default EventosP;
