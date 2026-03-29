import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Counter } from "./../../components/Features/counter/Counter";
import { useSelector, useDispatch } from "react-redux";
import logoevento from "./../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";
import ThemedModal from "../../components/ThemedModal/ThemedModal";
import { agregarProducto } from "./../../components/Features/carrito/carritoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faCartPlus } from "@fortawesome/free-solid-svg-icons";

const Detalle = ({ navigation }) => {
  const route = useRoute();
  const { producto, precompra, fecha, evento, puesto } = route.params;
  const Colors = useDynamicColors();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddProduct = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleAgregar = () => {
    const mensaje = count > 1 ? "Productos agregados al carrito" : "Producto agregado al carrito";
    ToastAndroid.show(mensaje, ToastAndroid.SHORT);
    handleAgregarAlCarrito();
    setModalVisible(false);
    navigation.goBack();
  };

  const handleAgregarAlCarrito = () => {
    dispatch(
      agregarProducto({
        producto,
        puesto: puesto?.id ?? producto.puestoId,
        puestoNombre: puesto?.nombreCarro,
        cantidad: count,
        preventa: precompra,
        fecha,
      })
    );
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: Colors.GrisClaro,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center', // Centra el contenido verticalmente si sobra espacio
    },
    imageContainer: {
      width: "100%",
      height: 220, // Altura un poco más compacta
      backgroundColor: Colors.GrisClaro, // Antes: Colors.Blanco
      justifyContent: "center",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: Colors.GrisClaroPeroNoTanClaro,
    },
    image: {
      width: "75%",
      height: "75%",
    },
    infoContainer: {
      padding: 20,
      backgroundColor: Colors.Blanco,
      marginTop: 15,
      marginHorizontal: 15,
      borderRadius: 25,
      alignSelf: 'center', // Hace que la card no se estire a todo el ancho
      width: '90%', // Ancho controlado
      ...Colors.Styles.card,
      borderColor: Colors.modoOscuroActivo ? Colors.BordeDorado : Colors.GrisClaroPeroNoTanClaro,
      borderWidth: 1,
      marginBottom: 100,
    },
    nombreProducto: {
      fontWeight: "bold",
      fontSize: 24,
      color: Colors.Negro,
      marginBottom: 5,
      textAlign: 'center',
    },
    precioYContador: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 15,
      paddingHorizontal: 10,
    },
    precioProducto: {
      fontSize: 28,
      fontWeight: "bold",
      color: Colors.Naranja,
    },
    descripcionContainer: {
      marginTop: 5,
    },
    descripcionLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.Negro,
      marginBottom: 3,
    },
    descripcionProducto: {
      fontSize: 15,
      color: Colors.Gris,
      lineHeight: 20,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      backgroundColor: Colors.Blanco,
      borderTopWidth: 1,
      borderTopColor: Colors.GrisClaroPeroNoTanClaro,
    },
    botonCompra: {
      backgroundColor: Colors.Naranja,
      borderRadius: 15,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      elevation: 4,
    },
    textoBoton: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 10,
    },
  });

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={producto?.img ? { uri: producto?.img } : logoevento}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.nombreProducto}>{producto.nombre}</Text>
          
          <View style={styles.precioYContador}>
            <Text style={styles.precioProducto}>${producto.precio}</Text>
            <Counter />
          </View>

          <View style={styles.descripcionContainer}>
            <Text style={styles.descripcionLabel}>Descripción</Text>
            <Text style={styles.descripcionProducto}>
              {producto.descripcion || "Sin descripción disponible."}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.botonCompra} onPress={handleAddProduct}>
          <FontAwesomeIcon icon={faCartPlus} color="white" size={20} />
          <Text style={styles.textoBoton}>Agregar al Carrito</Text>
        </TouchableOpacity>
      </View>

      <ThemedModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Confirmar"
        buttons={[
          { text: "Cancelar", variant: "secondary", onPress: () => setModalVisible(false) },
          { text: "Confirmar", onPress: handleAgregar },
        ]}
      >
        <Text style={{ fontSize: 16, color: Colors.Gris, marginBottom: 25, textAlign: 'center' }}>
          ¿Deseas agregar {count} {producto.nombre} al carrito?
        </Text>
      </ThemedModal>
    </View>
  );
};

export default Detalle;
