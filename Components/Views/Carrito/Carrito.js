import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import useStyles from '../../Styles/useStyles';
import useDynamicColors from '../../Styles/useDynamicColors';
import { useSelector } from 'react-redux';
import CardCarrito from './CardCarrito'; 
import Aviso from '../Aviso';

const Carrito = () => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const carrito = useSelector((state) => state.carrito);
  const [refreshing, setRefreshing] = useState(false);

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
    <CardCarrito puesto={item.puesto} productos={item.productos} />
  );

  return (
    <View style={{width:"100%", height:"100%", backgroundColor:Colors.GrisClaro}}>
      {refreshing ? (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color={Colors?.Azul} />
        </View>
      ) : Object.keys(carritoAgrupado).length === 0 ? (
        <Aviso mensaje="Sin Productos en el Carrito" />
      ) : (
        <FlatList
          data={Object.keys(carritoAgrupado).map((puesto) => ({
            puesto,
            productos: carritoAgrupado[puesto],
          }))}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 600); }} />}
        />
      )}
    </View>
  );
};

export default Carrito;
