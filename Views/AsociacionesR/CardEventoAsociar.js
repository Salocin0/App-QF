import React from "react";
import { ToastAndroid } from "react-native";
import EventoCard from "../EventoCard";
import { useCreateAsociacionMutation } from "@/components/App/Service/AsociacionesApi";
import { useSelector } from "react-redux";

const CardEventoAsociar = ({ item, navigation }) => {
  const [useCreateAsociacion] = useCreateAsociacionMutation();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;

  const seleccionarPuesto = (evento) => {
    useCreateAsociacion({ eventoId: evento.id, puestoId: 0, consumidorId: userId });
    ToastAndroid.show("Asociacion Enviada", ToastAndroid.SHORT);
    navigation.goBack();
  };

  return <EventoCard item={item} onPress={seleccionarPuesto} />;
};

export default CardEventoAsociar;
