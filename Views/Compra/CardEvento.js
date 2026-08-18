import React from "react";
import EventoCard from "../EventoCard";

const CardEvento = ({ item, navigation }) => {
  const seleccionarPuesto = (evento) => {
    // Siempre mostrar la ventana intermedia para elegir el tipo de compra
    navigation.navigate("TipoCompra", { evento });
  };

  return <EventoCard item={item} onPress={seleccionarPuesto} />;
};

export default CardEvento;
