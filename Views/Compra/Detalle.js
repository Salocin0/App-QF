import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid,
  Modal,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Counter } from "./../../components/Features/counter/Counter";
import { useSelector, useDispatch } from "react-redux";
import logoevento from "./../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";
import { agregarProducto } from "./../../components/Features/carrito/carritoSlice";

const Detalle = ({ navigation }) => {
  const route = useRoute();
  const { producto, precompra, fecha, evento } = route.params;
  const Colors = useDynamicColors();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddProduct = useCallback(() => {
    setModalVisible(true);
  }, [count, producto, dispatch]);

  const handleAgregar = () => {
    if (count > 1) {
      ToastAndroid.show("Productos agregados al carrito", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Producto agregado al carrito", ToastAndroid.SHORT);
    }
    handleAgregarAlCarrito();
    navigation.goBack();
  };

  const handleAgregarAlCarrito = () => {
    dispatch(
      agregarProducto({
        producto,
        puesto: producto.puestoId,
        cantidad: count,
        preventa: precompra,
        fecha,
      })
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: Colors.GrisClaro,
      padding: 20,
    },
    card: {
      backgroundColor: Colors.Blanco,
      borderRadius: 5,
      padding: 20,
      shadowColor: Colors.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 3,
      borderColor: Colors.Gris,
      borderWidth: 1,
    },
    image: {
      width: 300,
      height: 300,
      alignSelf: "center",
      marginBottom: 20,
      borderColor: Colors.Gris,
      borderWidth: 1,
    },
    nombreProducto: {
      fontWeight: "bold",
      fontSize: 24,
      textAlign: "center",
      marginBottom: 10,
      color: Colors.Negro,
    },
    descripcionProducto: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 10,
      color: Colors.GrisOscuro,
    },
    precioYContador: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    precioProducto: {
      fontSize: 28,
      fontWeight: "bold",
      color: Colors.Negro,
      marginRight: 20,
    },
    botonCompra: {
      backgroundColor: Colors.NaranjaOscuro,
      borderRadius: 5,
      padding: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    textoBoton: {
      color: Colors.Blanco,
      fontSize: 18,
      fontWeight: "bold",
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: Colors.Blanco,
      borderRadius: 10,
      alignItems: "center",
    },
    modalText: {
      fontSize: 18,
      color: Colors.Negro,
      marginBottom: 10,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    modalButton: {
      padding: 10,
      borderRadius: 5,
      width: 100,
      alignItems: "center",
    },
    modalButtonCancel: {
      backgroundColor: Colors.Gris,
      marginEnd: 10,
    },
    modalButtonConfirm: {
      backgroundColor: Colors.NaranjaOscuro,
      marginStart: 10,
    },
    modalButtonText: {
      color: Colors.Blanco,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={logoevento} style={styles.image} />
        <Text style={styles.nombreProducto}>{producto?.nombre}</Text>
        <Text style={styles.descripcionProducto}>{producto?.descripcion}</Text>

        {/* Mostrar el contador y el botón solo si el evento no está confirmado y precompra es true */}
        {(evento?.estado=="EnCurso" || evento?.tienePreventa) && (
          <View style={styles.precioYContador}>
            <Text style={styles.precioProducto}>${producto?.precio}</Text>
            <Counter />
          </View>
        )}

        {(evento?.estado=="EnCurso" || evento?.tienePreventa) && (
          <TouchableOpacity
            style={styles.botonCompra}
            onPress={handleAddProduct}
          >
            <Text style={styles.textoBoton}>Agregar al carrito</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              ¿Quieres agregar {count} x {producto?.nombre} al carrito?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={() => {
                  setModalVisible(false);
                  handleAgregar();
                }}
              >
                <Text style={styles.modalButtonText}>Sí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Detalle;
