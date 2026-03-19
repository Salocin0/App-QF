import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from "react-native";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { StripeProvider } from '@stripe/stripe-react-native';
import { useSelector } from "react-redux";
import CardCarrito from "./CardCarrito";
import Aviso from "../Aviso";

// Helper function to group products by fecha, precompra, and puesto
const agruparPorFechaYPrecompra = (carrito) => {
  return Object.values(carrito).map(grupo => ({
    ...grupo,
    productos: grupo.productos || []
  }));
};

const Carrito = () => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const carrito = useSelector((state) => state.carrito);
  const [loadingGlobal, setLoadingGlobal] = useState(false);

  // Group the cart items
  const carritoAgrupado = agruparPorFechaYPrecompra(carrito);
  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <CardCarrito 
      puesto={item.puesto} 
      productos={item.productos} 
      fecha={item.fecha} // Pass fecha
      precompra={item.preventa} // Pass precompra
      setLoadingGlobal={setLoadingGlobal} // Pass function to update the global state
      loadingGlobal={loadingGlobal} // Pass global state as a prop
    />
  );

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Colors.GrisClaro,
      }}
    >
      <StripeProvider publishableKey="pk_test_51PnpcMRoRlWr6LoNQ4tRgvaMtD4Aqkexi6IhVhxYz75HwgFQYDvO0TX0y7q0bjS5iQ0XQSKzSzLYVrlBCQxBscK600tF3LXOcU">
        {carritoAgrupado.length === 0 ? (
          <Aviso mensaje={"No hay productos en el carrito"}/>
        ) : (
          <FlatList
            data={carritoAgrupado}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </StripeProvider>
    </View>
  );
};

export default Carrito;
