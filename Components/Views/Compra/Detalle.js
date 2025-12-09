import React, { useState, useEffect, useCallback } from "react";
import { Text, View, TouchableOpacity, Image, Modal, StyleSheet, ToastAndroid, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Counter } from "../../Features/counter/Counter";
import { useSelector, useDispatch } from "react-redux";
import logoevento from "./../../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";
import useStyles from "../../Styles/useStyles";
import { agregarProducto } from "../../Features/carrito/carritoSlice";

const Detalle = ({navigation}) => {
  const route = useRoute();
  const styles = useStyles();
  const { producto } = route.params;
  const Colors = useDynamicColors();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const [refreshing, setRefreshing] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const handleAddProduct = useCallback(() => {
    setConfirmModalVisible(true);
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

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // If a refetch function was passed via route params, call it
      if (route.params && typeof route.params.refetch === 'function') {
        await route.params.refetch();
      } else {
        // otherwise simulate a short refresh
        await new Promise((r) => setTimeout(r, 500));
      }
    } catch (e) {
      console.error('Detalle refresh error', e);
    } finally {
      setRefreshing(false);
    }
  }, [route.params]);

  const handleAgregarAlCarrito = () => {
    console.log(producto);
    console.log(producto.puestoId);
    console.log(count);
    dispatch(agregarProducto({ producto, puesto: producto.puestoId, cantidad: count }));
  };
  // If no producto or we're refreshing, show centered spinner so user sees feedback
  if (refreshing || !producto) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors?.GrisClaro }}>
        <ActivityIndicator size="large" color={Colors?.Azul} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[Colors?.Azul]} tintColor={Colors?.Azul} />}
    >
      <View style={{ padding: 20, width: '100%' }}>
        <View style={{ backgroundColor: Colors.Blanco, borderRadius: 12, padding: 16, elevation: 4, alignSelf: 'stretch', width: '100%' }}>
          <Image source={logoevento} style={{ width: '100%', height: 260, borderRadius: 10, marginBottom: 12 }} resizeMode="cover" />
          <Text style={[styles.nombreProducto, { fontWeight: 'bold', fontSize: 24, textAlign: 'left', marginBottom:8,color:Colors.Negro }]}>{producto?.nombre}</Text>
          <Text style={[styles.descripcionProducto, { fontSize: 16, textAlign: 'left', marginBottom:12,color:Colors.Negro }]}>{producto?.descripcion}</Text>
          <Text style={[styles.precioProducto, { fontSize: 20, fontWeight: '700', marginBottom: 12, color: Colors.Negro }]}>Precio: ${producto?.precio}</Text>

          <View style={{ alignItems: 'center', marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Counter />
            </View>
          </View>

          <TouchableOpacity style={{ backgroundColor: Colors.Azul, paddingVertical: 12, borderRadius: 8, alignItems: 'center', width: '100%' }} onPress={handleAddProduct}>
            <Text style={{ color: Colors.OnPrimary, fontWeight: '700', fontSize: 16 }}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirmation modal styled with theme */}
      <Modal visible={confirmModalVisible} transparent animationType="fade" onRequestClose={() => setConfirmModalVisible(false)}>
        <View style={{ flex:1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center' }}>
          <View style={{ width: '85%', backgroundColor: Colors.Blanco, borderRadius: 12, padding: 16, elevation:6 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.Negro, marginBottom: 12 }}>Confirmar</Text>
            <Text style={{ color: Colors.Negro, marginBottom: 20 }}>{`¿Seguro que quieres agregar ${count} x ${producto?.nombre} al carrito?`}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
              <TouchableOpacity onPress={() => setConfirmModalVisible(false)} style={{ paddingVertical:10, paddingHorizontal:14, borderRadius:8, backgroundColor: Colors.Rojo, marginRight:8 }}>
                <Text style={{ color: Colors.OnPrimary }}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setConfirmModalVisible(false); handleAgregar(); }} style={{ paddingVertical:10, paddingHorizontal:14, borderRadius:8, backgroundColor: Colors.Azul }}>
                <Text style={{ color: Colors.OnPrimary }}>Sí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Detalle;
