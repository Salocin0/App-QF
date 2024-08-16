import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import useDynamicColors from '../../Styles/useDynamicColors';
import { useCreatePedidoMutation } from './../../components/App/Service/PedidosApi';
import { useSelector, useDispatch } from 'react-redux';
import { eliminarProductosPorPuesto } from './../../components/Features/carrito/carritoSlice';
import { useStripe } from '@stripe/stripe-react-native';

const CardCarrito = ({ puesto, productos, setLoadingGlobal, loadingGlobal }) => {
  const Colors = useDynamicColors();
  const [createPedidoMutation] = useCreatePedidoMutation();
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.carrito);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handleComprar = async () => {
    setLoadingGlobal(true); // Activa la carga global
    const pago = await mostrarSheetPago();
    if (pago) {
      const detalles = {
        detalles: productos.map(producto => ({
          cantidad: producto.cantidad,
          productoId: producto.id,
          precio: Number(producto.precio),
        })),
        consumidorId: user.consumidorId,
        total: calcularTotal(productos),
        puestoId: Number(puesto),
      };
      const responseData = await createPedidoMutation(detalles);
      if (responseData.data) {
        console.log('Pedido creado:', responseData.data);
        dispatch(eliminarProductosPorPuesto({ puestoId: puesto }));
      } else {
        console.log('Error al crear el pedido:', responseData.error);
      }
      console.log(cart);
    }
    setLoadingGlobal(false); // Desactiva la carga global
  };

  const mostrarSheetPago = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent,
      customerEphemeralKeySecret: ephemeralKey,
      customerId: customer,
      appearance: {
        colors: {
          primary: Colors.Naranja, 
          background: Colors.Blanco, 
          text: Colors.Rojo,
          link: Colors.Celeste,
          border: Colors.GrisClaro,
          secondaryText: Colors.Negro,
          primaryText: Colors.Negro,
          componentBackground: Colors.GrisClaroPeroNoTanClaro,
          componentBorder: Colors.GrisOscuro,
          componentDivider: Colors.GrisOscuro,
          componentText: Colors.Negro,
          placeholderText: Colors.GrisOscuro,
          disabled: Colors.Negro,
          disabledText: Colors.Negro,
        },
        typography: {
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          fontWeight: '400',
          headingFontFamily: 'Arial, sans-serif',
          headingFontSize: '24px',
          headingFontWeight: '700',
        },
        borderRadius: '10px',
        borderWidth: '1px',
        spacing: {
          padding: '16px',
          margin: '16px',
        },
      },
      locale: 'es',
      paymentMethodTypes: [
        'card',
        'google_pay', 
        'paypal', 
      ],
      merchantDisplayName: 'Mi Tienda', // Nombre de tu tienda
    });
    
    if (!error) {
      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        console.log('Error en el pago:', paymentError.message);
        return false;
      } else {
        console.log('Pago completado');
        return true;
      }
    } else {
      console.log('Error al inicializar la hoja de pago:', error.message);
      return false;
    }
  };

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: calcularTotal(productos) * 100, // Convertir a centavos
      }),
    });
    return response.json();
  };

  const calcularTotal = (productos) => {
    const total = productos?.reduce((acc, item) => {
      return acc + item.precio * item.cantidad;
    }, 0);
    return total;
  };

  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: Colors.GrisOscuro,
      borderRadius: 5,
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 10,
      flexDirection: 'column',
      alignItems: 'flex-start',
      backgroundColor: Colors.Blanco,
      elevation: 5,
    },
    titulo: {
      fontWeight: 'bold',
      fontSize: 16,
      color: Colors.Negro,
    },
    subtitulo: {
      fontWeight: 'bold',
      fontSize: 14,
      marginTop: 5,
      color: Colors.Negro,
    },
    item: {
      marginLeft: 10,
      marginTop: 5,
      flexDirection: 'row',
      alignItems: 'center',
      color: Colors.Negro,
    },
    nombreCantidad: {
      flex: 1,
      color: Colors.Negro,
    },
    botonFinalizar: {
      backgroundColor: Colors.Azul,
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      alignSelf: 'flex-end',
    },
    textoBoton: {
      color: Colors.Blanco,
      fontWeight: 'bold',
      textAlign: 'center',
      color: Colors.Negro,
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Pedido: {puesto}</Text>
      <Text style={styles.subtitulo}>Productos:</Text>
      {productos.map((producto, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.nombreCantidad}>
            {producto.nombre} X {producto.cantidad} : ${producto.precio * producto.cantidad}
          </Text>
        </View>
      ))}
      <TouchableOpacity
        style={[styles.botonFinalizar, loadingGlobal && { backgroundColor: Colors.GrisClaro }]} 
        onPress={handleComprar}
        disabled={loadingGlobal}
      >
        {loadingGlobal ? (
          <ActivityIndicator color={Colors.Negro} />
        ) : (
          <Text style={styles.textoBoton}>Finalizar compra</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CardCarrito;
