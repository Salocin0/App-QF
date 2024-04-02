import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import CardPuesto from './CardPuesto';
import Aviso from '../Aviso';
import { Colors } from '../../Styles/Colors';
import puestos from './../../../data/puestos.json'; 

const Puestos = ({ navigation }) => {
  const isLoading = false;


  const renderItem = ({ item }) => <CardPuesto item={item} navigation={navigation} />;

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.Azul} />
      ) : puestos.length > 0 ? (
        <FlatList
          data={puestos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{}}
        />
      ) : (
        <Aviso mensaje="No hay puestos disponibles" />
      )}
    </View>
  );
};

export default Puestos;
