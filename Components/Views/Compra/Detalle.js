import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Counter } from "../../Features/counter/Counter";
import { useSelector, useDispatch } from "react-redux";
//import { addProduct } from "../features/carrito/carritoSlice";
//import { useAgregarProductoMutation } from "../app/services/CarritoApi";
//import styles from "./../Styles/Styles";
//import imgdefault from "../../assets/productoDefault.jpg";
import logoevento from "./../../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";
import useStyles from "../../Styles/useStyles";

const Detalle = (producto) => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const route = useRoute();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const userId = useSelector((state) => state.auth.localId);
//  const [agregarProductoMutation] = useAgregarProductoMutation();
  const carrito = useSelector((state) => state.carrito);

  const handleAddProduct = useCallback(() => {
    Alert.alert(
      `¿Seguro que quieres agregar ${count} x ${producto?.nombre} al carrito?`,
      "",
      [
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
      ]
    );
  }, [count, producto, dispatch]);

  const handleAgregar = () => {
    //dispatch(addProduct({ ...producto, cantidad: count }));
  };

 /* useEffect(() => {
    if (carrito.productos.length > 0) {
      try {
        agregarProductoMutation({
          localId: userId,
          productos: carrito.productos,
          total: carrito.total,
        });
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    }
  }, [carrito, userId, /*agregarProductoMutation]);*/

  return (
    <View style={styles.container}>
      <Image source={logoevento} style={{width:100,height:100}} />
      <Text style={styles.nombreProducto}>{producto?.nombre}</Text>
      <Text style={styles.descripcionProducto}>{producto?.descripcion}</Text>
      <Text style={styles.precioProducto}>
        Precio Unitario: ${producto?.precio}
      </Text>
      <View style={styles.centerVertically}>
        <Text style={styles.tituloCantidad}>Cantidad: </Text>
        <View style={styles.tituloCantidad}>
          <Counter />
        </View>
      </View>
      <TouchableOpacity style={styles.botonCompra} onPress={handleAddProduct}>
        <Text style={styles.textoBoton}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detalle;
