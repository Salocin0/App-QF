import React, { useState, useEffect, useCallback } from "react";
import { Text, View, TouchableOpacity, Image, Alert, StyleSheet, ToastAndroid } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Counter } from "./../../components/Features/counter/Counter";
import { useSelector, useDispatch } from "react-redux";
import logoevento from "./../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";
import useStyles from "../../Styles/useStyles";
import { agregarProducto } from "./../../components/Features/carrito/carritoSlice";

const Detalle = ({navigation}) => {
  const route = useRoute();
  const styles = useStyles();
  const { producto } = route.params;
  const Colors = useDynamicColors();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  const handleAddProduct = useCallback(() => {
    Alert.alert(`¿Seguro que quieres agregar ${count} x ${producto?.nombre} al carrito?`, "", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Sí",
        onPress: () => {
          handleAgregar();
        },
      },
    ]);
  }, [count, producto, dispatch]);

  const handleAgregar = () => {
    if (count>1){
      ToastAndroid.show("Productos agregados al carrito", ToastAndroid.SHORT);
    }else{
      ToastAndroid.show("Producto agregado al carrito", ToastAndroid.SHORT);
    }
    handleAgregarAlCarrito();
    navigation.goBack();
  };

  const handleAgregarAlCarrito = () => {
    console.log(producto);
    console.log(producto.puestoId);
    console.log(count);
    dispatch(agregarProducto({ producto, puesto: producto.puestoId, cantidad: count }));
  };

  return (
    <View style={styles.container}>
      <Image source={logoevento} style={{ width: 100, height: 100, alignSelf: 'center', marginBottom:20 }} />
      <Text style={[styles.nombreProducto, { fontWeight: 'bold', fontSize: 24, textAlign: 'center', marginBottom:20,color:Colors.Negro }]}>
        {producto?.nombre}
      </Text>
      <Text style={[styles.descripcionProducto, { fontSize: 20, textAlign: 'center',color:Colors.Negro }]}>
        {producto?.descripcion}
      </Text>
      <Text style={[styles.precioProducto, { textAlign: 'center',fontSize: 20,color:Colors.Negro }]}>
        Precio: ${producto?.precio}
      </Text>
      <View style={styles.centerVertically}>
        <View style={[styles.tituloCantidad,{paddingTop:20}]}>
          <Counter />
        </View>
      </View>
      <TouchableOpacity style={[styles.botonCompra, { backgroundColor: Colors.Azul, borderRadius: 10, marginTop: 20, padding:10 }]} onPress={handleAddProduct}>
        <Text style={[styles.textoBoton, {color:Colors.Blanco}]}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detalle;
