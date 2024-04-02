import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import Aviso from '../Aviso';
import { Colors } from '../../Styles/Colors';
import producto from './../../../data/productos.json'; 
import CardProducto from './CardProducto';

const Productos = ({ navigation }) => {
  const isLoading = false;

  const renderItem = ({ item }) => <CardProducto item={item} navigation={navigation} />;

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.Azul} />
      ) : producto.length > 0 ? (
        <FlatList
          data={producto}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{}}
        />
      ) : (
        <Aviso mensaje="No hay productos disponibles" />
      )}
    </View>
  );
};

export default Productos;
