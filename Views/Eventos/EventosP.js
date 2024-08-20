import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { useGetAllEventosQuery } from "./../../components/App/Service/EventosApi";
import EventoCard from "./eventoCard";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "@/Styles/useDynamicColors";
import Aviso from "../Aviso";

const EventosP = () => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;

  const { data: eventosData, isLoading, isError } = useGetAllEventosQuery(userId);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    if (eventosData) {
      setEventos(eventosData);
    }
  }, [eventosData]);

  const style = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: Colors?.GrisClaro,
    },
  });

  if (isLoading) {
    return (
      <View style={style.container}>
        <ActivityIndicator size="large" color={Colors?.Naranja} />
      </View>
    );
  }

  if (isError || !eventosData) {
    return (
      <View style={style.container}>
        <Aviso mensaje="Error al cargar los eventos o no hay eventos" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={style.container}>
      {eventos.length === 0 ? (
        <Aviso mensaje="No hay eventos" />
      ) : (
        eventos.map((evento, index) => (
          <EventoCard key={index} evento={evento} />
        ))
      )}
    </ScrollView>
  );
};

export default EventosP;
