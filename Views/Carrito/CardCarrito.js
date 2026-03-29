import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";
import ThemedModal from "../../components/ThemedModal/ThemedModal";
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
  puestoNombre,
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
  const [errorPago, setErrorPago] = useState("");
  const [loadingPago, setLoadingPago] = useState(false);
  const timeoutRef = useRef(null);
  const nombrePuesto = puestoNombre || productos?.[0]?.puesto?.nombreCarro || `#${puesto}`;

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
    setErrorPago("");
    setLoadingPago(true);
    let timeoutId;
    try {
      // Timeout de 10s
      const fetchPromise = fetchPaymentSheetParams();
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error("Timeout: No se pudo armar la hoja de pago en 10 segundos.")), 10000);
      });
      const { clientSecret, ephemeralKey, customer } = await Promise.race([fetchPromise, timeoutPromise]);
      clearTimeout(timeoutId);

      if (!clientSecret || !ephemeralKey || !customer) {
        setErrorPago("Parámetros de pago incompletos. Intentá de nuevo.");
        setLoadingPago(false);
        return false;
      }

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
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
        currency: "usd",
      });

      if (!error) {
        const { error: paymentError } = await presentPaymentSheet();
        setLoadingPago(false);
        if (paymentError) {
          setErrorPago("Error en el pago: " + paymentError.message);
          return false;
        } else {
          return true;
        }
      } else {
        setErrorPago("Error al inicializar la hoja de pago: " + error.message);
        setLoadingPago(false);
        return false;
      }
    } catch (error) {
      clearTimeout(timeoutId);
      setErrorPago(error.message || "Error desconocido al mostrar la hoja de pago");
      setLoadingPago(false);
      return false;
    }
  };

  // ...
  const fetchPaymentSheetParams = async () => {
    try {
      const apiBaseUrl = (process.env.EXPO_PUBLIC_API_URL || "http://backendnode-qf.onrender.com").replace(/\/$/, "");
      const response = await fetch(
        `${apiBaseUrl}/payment-sheet`,
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

      // Log completo de la respuesta
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.log("Respuesta no es JSON válido:", text);
        throw new Error("Respuesta del backend no es JSON válido");
      }

      if (!response.ok) {
        console.log("Respuesta error del backend:", data);
        throw new Error(data.error || "Error al obtener los parámetros de la hoja de pago");
      }

      console.log("Respuesta backend payment-sheet:", data);
      return {
        clientSecret: data.clientSecret || data.paymentIntent,
        ephemeralKey: data.ephemeralKey,
        customer: data.customer,
      };
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

  // ...

  // Ejemplo de uso en el botón de pago:
  // <TouchableOpacity onPress={mostrarSheetPago} disabled={loadingPago}>
  //   {loadingPago ? <ActivityIndicator /> : <Text>Pagar</Text>}
  // </TouchableOpacity>
  // {errorPago ? <Text style={{color: 'red'}}>{errorPago}</Text> : null}

  const styles = StyleSheet.create({
    card: {
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
      borderRadius: 14,
      padding: 16,
      marginVertical: 10,
      marginHorizontal: 10,
      backgroundColor: "#222222",
      shadowColor: Colors.BordeDorado,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.18,
      shadowRadius: 6,
      elevation: 4,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: Colors.BordeDorado,
      paddingBottom: 10,
      marginBottom: 12,
    },
    titulo: {
      fontWeight: "bold",
      fontSize: 19,
      color: Colors.BordeDorado,
    },
    chipPrecompra: {
      backgroundColor: Colors.BordeDorado,
      borderRadius: 999,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    chipPrecompraText: {
      color: "#000000",
      fontWeight: "700",
      fontSize: 12,
    },
    fechaPrecompra: {
      fontSize: 13,
      color: "#cccccc",
      marginBottom: 12,
      fontWeight: "700",
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
      backgroundColor: "#1a1a1a",
      borderWidth: 1,
      borderColor: Colors.BordeDorado,
      borderRadius: 10,
      padding: 10,
    },
    itemInfo: {
      flexDirection: "column",
      flex: 1,
    },
    nombreProducto: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#ffffff",
    },
    precioProducto: {
      fontSize: 14,
      color: "#cccccc",
    },
    cantidadContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    cantidadButton: {
      backgroundColor: Colors.BordeDorado,
      padding: 6,
      borderRadius: 5,
    },
    cantidadText: {
      marginHorizontal: 10,
      fontSize: 16,
      fontWeight: "bold",
      color: "#ffffff",
    },
    eliminarButton: {
      backgroundColor: Colors.Rojo,
      padding: 8,
      borderRadius: 5,
      marginStart: 10,
    },
    resumenContainer: {
      marginTop: 8,
      backgroundColor: "#1a1a1a",
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: Colors.BordeDorado,
      padding: 14,
    },
    summaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    summaryLabel: {
      color: "#cccccc",
      fontWeight: "700",
      fontSize: 14,
    },
    summaryValue: {
      color: Colors.BordeDorado,
      fontWeight: "700",
      fontSize: 14,
    },
    totalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 4,
      borderTopWidth: 2,
      borderTopColor: Colors.BordeDorado,
      paddingTop: 12,
    },
    totalText: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#ffffff",
    },
    botonFinalizar: {
      backgroundColor: Colors.BordeDorado,
      padding: 14,
      borderRadius: 8,
      marginTop: 14,
      alignItems: "center",
    },
    textoBoton: {
      color: "#000000",
      fontWeight: "bold",
      fontSize: 16,
    },
    modalText: {
      fontSize: 15,
      marginBottom: 24,
      textAlign: "center",
      color: Colors.Negro,
      lineHeight: 22,
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
      <View style={styles.cardHeader}>
        <Text style={styles.titulo}>Puesto: {nombrePuesto}</Text>
        {precompra && (
          <View style={styles.chipPrecompra}>
            <Text style={styles.chipPrecompraText}>Precompra</Text>
          </View>
        )}
      </View>

      {precompra && (
        <Text style={styles.fechaPrecompra}>
          Fecha: {formatDate(fecha)}
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
              <Icon name="trash" size={16} color={Colors.Negro} />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={styles.resumenContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>
            ${calcularTotal(productos).toFixed(2)}
          </Text>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total: ${calcularTotal(productos).toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botonFinalizar}
          onPress={handleComprar}
          disabled={loadingGlobal}
        >
          {loadingGlobal ? (
            <ActivityIndicator color={Colors.Negro} />
          ) : (
            <Text style={styles.textoBoton}>
              {precompra ? "Finalizar Precompra" : "Finalizar Compra"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Modal para confirmar eliminación */}
      <ThemedModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        animationType="slide"
        title="¿Deseas eliminar este producto del carrito?"
        buttons={[
          { 
            text: "Cancelar", 
            variant: "secondary",
            onPress: () => setModalVisible(false),
          },
          { 
            text: "Eliminar", 
            onPress: confirmarEliminarProducto,
            style: { backgroundColor: Colors.Rojo },
          },
        ]}
      />

      {/* Botones de días de eventos */}
      <View style={styles.diaEventosContainer}>
        {/* Aquí debes renderizar los botones de los días de eventos */}
      </View>
    </View>
  );
};

export default CardCarrito;
