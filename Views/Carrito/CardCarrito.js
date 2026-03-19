import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useCreatePedidoMutation } from "../../components/App/Service/PedidosApi";
import { useSelector, useDispatch } from "react-redux";
import {
  agregarProducto,
  restarProducto,
  eliminarProducto,
  eliminarConjunto,
} from "../../components/Features/carrito/carritoSlice";
import { useStripe } from "@stripe/stripe-react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CardCarrito = ({
  puesto,
  productos,
  precompra,
  fecha,
  setLoadingGlobal,
  loadingGlobal,
}) => {
  const Colors = useDynamicColors();
  const [createPedidoMutation] = useCreatePedidoMutation();
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const handleComprar = async () => {
    setLoadingGlobal(true);
    try {
      const pago = await mostrarSheetPago();
      if (pago) {
        const detalles = {
          detalles: productos.map((producto) => ({
            cantidad: producto.cantidad,
            productoId: producto.id,
            precio: Number(producto.precio),
          })),
          consumidorId: user.consumidorId,
          total: calcularTotal(productos),
          puestoId: Number(puesto),
          precompra,
          fecha: formatDate(fecha),
        };
        const responseData = await createPedidoMutation(detalles);
        if (responseData.data) {
          dispatch(
            eliminarConjunto({ id: undefined, fecha, preventa: precompra, puesto })
          );
        } else {
          console.log("Error al crear el pedido:", responseData.error);
        }
      }
    } catch (error) {
      console.log("Error durante el proceso de compra:", error.message);
    } finally {
      setLoadingGlobal(false);
    }
  };

  const incrementarCantidad = (productoId) => {
    dispatch(
      agregarProducto({
        id: undefined,
        fecha,
        preventa: precompra,
        puesto,
        producto: { id: productoId },
      })
    );
  };

  const disminuirCantidad = (productoId) => {
    dispatch(
      restarProducto({ id: undefined, fecha, preventa: precompra, productoId, puesto })
    );
  };

  const confirmarEliminarProducto = () => {
    if (productoSeleccionado) {
      dispatch(
        eliminarProducto({
          id: undefined,
          fecha,
          puesto,
          preventa: precompra,
          productoId: productoSeleccionado.id,
        })
      );
      setModalVisible(false);
    }
  };

  const mostrarSheetPago = async () => {
    try {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams();

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
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            fontWeight: "400",
            headingFontFamily: "Arial, sans-serif",
            headingFontSize: "24px",
            headingFontWeight: "700",
          },
          borderRadius: "10px",
          borderWidth: "1px",
          spacing: {
            padding: "16px",
            margin: "16px",
          },
        },
        locale: "es",
        paymentMethodTypes: ["card", "google_pay", "paypal"],
        merchantDisplayName: "Mi Tienda",
        currency: "ars",
      });

      if (!error) {
        const { error: paymentError } = await presentPaymentSheet();

        if (paymentError) {
          console.log("Error en el pago:", paymentError.message);
          return false;
        } else {
          return true;
        }
      } else {
        console.log("Error al inicializar la hoja de pago:", error.message);
        return false;
      }
    } catch (error) {
      console.log("Error al mostrar la hoja de pago:", error.message);
      return false;
    }
  };

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL || "http://backendnode-qf.onrender.com"}/payment-sheet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: calcularTotal(productos) * 100,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los parámetros de la hoja de pago");
      }

      return await response.json();
    } catch (error) {
      console.log(
        "Error al obtener los parámetros de la hoja de pago:",
        error.message
      );
      return {};
    }
  };

  const calcularTotal = (productos) => {
    return productos.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
  };

  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: Colors.GrisOscuro,
      borderRadius: 10,
      padding: 20,
      marginVertical: 10,
      marginHorizontal: 10,
      backgroundColor: Colors.Blanco,
    },
    titulo: {
      fontWeight: "bold",
      fontSize: 18,
      color: Colors.Negro,
      marginBottom: 10,
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    itemInfo: {
      flexDirection: "column",
      flex: 1,
    },
    nombreProducto: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.Negro,
    },
    precioProducto: {
      fontSize: 14,
      color: Colors.GrisOscuro,
    },
    cantidadContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    cantidadButton: {
      backgroundColor: Colors.GrisClaro,
      padding: 5,
      borderRadius: 5,
    },
    cantidadText: {
      marginHorizontal: 10,
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.Negro,
    },
    eliminarButton: {
      backgroundColor: Colors.Rojo,
      padding: 8,
      borderRadius: 5,
      marginStart: 10,
    },
    totalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      borderTopWidth: 1,
      borderTopColor: Colors.Gris,
      paddingTop: 10,
    },
    totalText: {
      fontSize: 18,
      fontWeight: "bold",
      color: Colors.Negro,
    },
    botonFinalizar: {
      backgroundColor: Colors.Azul,
      padding: 15,
      borderRadius: 5,
      marginTop: 20,
      alignItems: "center",
    },
    textoBoton: {
      color: Colors.Blanco,
      fontWeight: "bold",
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      backgroundColor: Colors.Blanco,
      padding: 20,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: "center",
      color: Colors.Negro,
    },
    modalButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    modalButton: {
      flex: 1,
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      marginHorizontal: 5,
    },
    modalButtonText: {
      color: Colors.Blanco,
      fontWeight: "bold",
      fontSize: 16,
    },
    fechaPrecompra: {
      fontSize: 14,
      color: Colors.GrisOscuro,
      marginTop: 10,
      fontWeight: "bold",
    },
    diaEventosContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 10,
    },
    diaEventoButton: {
      backgroundColor: Colors.GrisClaro,
      padding: 10,
      borderRadius: 5,
      marginVertical: 5,
      alignItems: "center",
      width: "23%",
    },
    diaEventoText: {
      fontSize: 14,
      fontWeight: "bold",
      color: Colors.Negro,
    },
    diaEventoActual: {
      backgroundColor: Colors.Naranja,
    },
    diaEventoExpirado: {
      backgroundColor: Colors.GrisClaro,
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Puesto: {puesto}</Text>
      {precompra && (
        <Text style={styles.fechaPrecompra}>
          Precompra para: {formatDate(fecha)}
        </Text>
      )}
      {productos.map((producto) => (
        <View key={producto.id} style={styles.itemContainer}>
          <View style={styles.itemInfo}>
            <Text style={styles.nombreProducto}>{producto.nombre}</Text>
            <Text style={styles.precioProducto}>
              ${producto.precio.toFixed(2)}
            </Text>
          </View>
          <View style={styles.cantidadContainer}>
            <TouchableOpacity
              style={styles.cantidadButton}
              onPress={() => disminuirCantidad(producto.id)}
            >
              <Icon name="minus" size={16} color={Colors.Negro} />
            </TouchableOpacity>
            <Text style={styles.cantidadText}>{producto.cantidad}</Text>
            <TouchableOpacity
              style={styles.cantidadButton}
              onPress={() => incrementarCantidad(producto.id)}
            >
              <Icon name="plus" size={16} color={Colors.Negro} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.eliminarButton}
              onPress={() => {
                setProductoSeleccionado(producto);
                setModalVisible(true);
              }}
            >
              <Icon name="trash" size={16} color={Colors.Blanco} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: ${calcularTotal(productos).toFixed(2)}
        </Text>
        <TouchableOpacity
          style={styles.botonFinalizar}
          onPress={handleComprar}
          disabled={loadingGlobal}
        >
          {loadingGlobal ? (
            <ActivityIndicator color={Colors.Blanco} />
          ) : (
            <Text style={styles.textoBoton}>
              {precompra ? "Finalizar Precompra" : "Finalizar Compra"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Modal para confirmar eliminación */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              ¿Deseas eliminar este producto del carrito?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: Colors.Gris }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: Colors.Rojo }]}
                onPress={confirmarEliminarProducto}
              >
                <Text style={styles.modalButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Botones de días de eventos */}
      <View style={styles.diaEventosContainer}>
        {/* Aquí debes renderizar los botones de los días de eventos */}
      </View>
    </View>
  );
};

export default CardCarrito;
