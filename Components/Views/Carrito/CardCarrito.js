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
      borderRadius: 8,
      padding: 12,
      marginVertical: 10,
      marginHorizontal: 10,
      flexDirection: 'column',
      alignItems: 'stretch',
      backgroundColor: Colors.Blanco,
      elevation: 5,
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
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 8,
      marginBottom: 6,
    },
    /* pedidoIcon removed per user request */
    item: {
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.GrisClaroPeroNoTanClaro,
      padding: 8,
      borderRadius: 6,
    },
    itemBullet: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: Colors.Celeste,
      marginRight: 8,
    },
    nombreCantidad: {
      flex: 1,
      color: Colors.Negro,
    },
    botonFinalizar: {
      backgroundColor: Colors.Azul,
      padding: 10,
      borderRadius: 5,
      marginTop: 0,
      alignSelf: 'flex-end',
    },
    textoBoton: {
      color: Colors.OnPrimary,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    footerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    totalText: {
      fontSize: 16,
      fontWeight: '700',
      color: Colors.Negro,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.titulo}>Pedido: {puesto}</Text>
          <Text style={styles.subtitulo}>{productos.length} items</Text>
        </View>
      </View>

      <Text style={[styles.subtitulo, { marginTop: 8 }]}>Productos:</Text>
      {productos.map((producto, index) => (
        <View key={index} style={styles.item}>
          <View style={styles.itemBullet} />
          <Text style={styles.nombreCantidad}>
            {producto.nombre} x {producto.cantidad} — ${producto.precio * producto.cantidad}
          </Text>
        </View>
      ))}

      <View style={styles.footerRow}>
        <Text style={styles.totalText}>Total: ${calcularTotal(productos)}</Text>
        <TouchableOpacity style={styles.botonFinalizar} onPress={handleComprar}>
          <Text style={styles.textoBoton}>Finalizar compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardCarrito;
