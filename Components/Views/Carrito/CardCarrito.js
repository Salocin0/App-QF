import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useDynamicColors from '../../Styles/useDynamicColors';
import { useCreatePedidoMutation } from '../../App/Service/PedidosApi';
import { useSelector } from 'react-redux';
import { eliminarProductosPorPuesto } from '../../Features/carrito/carritoSlice';
import { useDispatch } from 'react-redux';

const CardCarrito = ({ puesto, productos }) => {
  const Colors = useDynamicColors();
  const [createPedidoMutation] = useCreatePedidoMutation();
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.carrito);

  const handleComprar = async () => {
    console.log(user);
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
    console.log(detalles);
    // hacer pago 
    const responseData = await createPedidoMutation(detalles);
    if (responseData.data) {
      console.log('Pedido creado:', responseData.data);
      dispatch(eliminarProductosPorPuesto({puestoId:puesto}));
    } else {
      console.log('Error al crear el pedido:', responseData.error);
      //tirar toast con error
    }
    console.log(cart);
  }

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
      marginHorizontal:10,
      flexDirection: 'column',
      alignItems: 'flex-start',
      backgroundColor: Colors.Blanco,
      elevation:5
    },
    titulo: {
      fontWeight: 'bold',
      fontSize: 16,
      color:Colors.Negro
    },
    subtitulo: {
      fontWeight: 'bold',
      fontSize: 14,
      marginTop: 5,
      color:Colors.Negro
    },
    item: {
      marginLeft: 10,
      marginTop: 5,
      flexDirection: 'row',
      alignItems: 'center',
      color:Colors.Negro
    },
    nombreCantidad: {
      flex: 1,
      color:Colors.Negro
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
      color:Colors.Negro
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
      <TouchableOpacity style={styles.botonFinalizar} onPress={handleComprar}>
        <Text style={styles.textoBoton}>Finalizar compra</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardCarrito;
