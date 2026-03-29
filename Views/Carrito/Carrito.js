import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useSelector, useDispatch } from "react-redux";
import { inicializarCarrito } from "../../components/Features/carrito/carritoSlice";
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
  const Colors = useDynamicColors();
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.carrito);
  const [loadingGlobal, setLoadingGlobal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const carritoAgrupado = agruparPorFechaYPrecompra(carrito);

  const onRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      // Re-initialize cart from AsyncStorage
      await dispatch(inicializarCarrito());
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, refreshing]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.GrisClaro,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: Colors.HeaderBackground,
      borderBottomWidth: 1,
      borderBottomColor: Colors.modoOscuroActivo ? Colors.BordeDorado : Colors.GrisClaroPeroNoTanClaro,
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: Colors.Negro,
    },
    listContent: {
      paddingBottom: 20,
    }
  });

  const renderItem = ({ item }) => (
    <CardCarrito 
      puesto={item.puesto} 
      puestoNombre={item.puestoNombre}
      productos={item.productos} 
      fecha={item.fecha}
      precompra={item.preventa}
      setLoadingGlobal={setLoadingGlobal}
      loadingGlobal={loadingGlobal}
    />
  );

  return (
    <View style={styles.container}>
      <StripeProvider publishableKey="pk_test_51PnpcMRoRlWr6LoNQ4tRgvaMtD4Aqkexi6IhVhxYz75HwgFQYDvO0TX0y7q0bjS5iQ0XQSKzSzLYVrlBCQxBscK600tF3LXOcU">
        {carritoAgrupado.length === 0 ? (
          <Aviso mensaje={"No hay productos en el carrito"}/>
        ) : (
          <FlatList
            data={carritoAgrupado}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors?.Naranja]}
                tintColor={Colors?.Naranja}
              />
            }
          />
        )}
      </StripeProvider>
    </View>
  );
};

export default Carrito;
