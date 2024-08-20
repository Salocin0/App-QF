import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { StripeProvider } from '@stripe/stripe-react-native';
import { useSelector } from "react-redux";
import CardCarrito from "./CardCarrito";
import Aviso from "../Aviso";

const Carrito = () => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const carrito = useSelector((state) => state.carrito);
  const [loadingGlobal, setLoadingGlobal] = useState(false); // Estado global para manejar la carga

  const agruparPorPuesto = (productos) => {
    const grupos = {};
    productos.forEach((producto) => {
      const { puesto } = producto;
      if (!grupos[puesto]) {
        grupos[puesto] = [];
      }
      grupos[puesto].push(producto);
    });
    return grupos;
  };

  const carritoAgrupado = agruparPorPuesto(carrito);

  const renderItem = ({ item }) => (
    <CardCarrito 
      puesto={item.puesto} 
      productos={item.productos} 
      setLoadingGlobal={setLoadingGlobal} // Pasar función para actualizar el estado global
      loadingGlobal={loadingGlobal} // Pasar estado global como prop
    />
  );

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Colors?.GrisClaro,
      }}
    >
      <StripeProvider publishableKey="pk_test_51PnpcMRoRlWr6LoNQ4tRgvaMtD4Aqkexi6IhVhxYz75HwgFQYDvO0TX0y7q0bjS5iQ0XQSKzSzLYVrlBCQxBscK600tF3LXOcU">
        {Object.keys(carritoAgrupado).length === 0 ? (
          <Aviso mensaje="No hay productos en el carrito" />
        ) : (
          <FlatList
            data={Object.keys(carritoAgrupado).map((puesto) => ({
              puesto,
              productos: carritoAgrupado[puesto],
            }))}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </StripeProvider>
    </View>
  );
};

export default Carrito;
