import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Asegúrate de haber instalado react-native-vector-icons
import useDynamicColors from "../../Styles/useDynamicColors";
import StarsBar from "./StarsBar";
import { useGetProductosQuery } from "./../../components/App/Service/ProductosApi";
import { useCreateValoracionMutation } from "./../../components/App/Service/ValoracionApi";
import { useNavigation } from "@react-navigation/native";
import { useCambiarEstadoPedidoMutation } from "../../components/App/Service/PedidosApi"

const DetallePedido = ({ route }) => {
  const Colors = useDynamicColors();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { data, isLoading, error } = useGetProductosQuery(pedido?.puestoId);
  const [CreateValoracionMutation] = useCreateValoracionMutation();
  const [ratingRepartidor, setRatingRepartidor] = useState(0);
  const [ratingPuesto, setRatingPuesto] = useState(0);
  const [opinion, setOpinion] = useState("");
  const [pedido, setPedidoLocal] = useState(route.params.pedido);
  const [cambiarEstadoPedido] = useCambiarEstadoPedidoMutation();
  const [modalVisible2, setModalVisible2] = useState(false);

  const VerUbicacionPedido = () => {
    navigation.navigate("Ubicacion Pedido", {pedido});
  };

  useEffect(() => {}, [pedido]);

  const handleRatingRepartidorChange = (value) => {
    setRatingRepartidor(value);
  };

  const handleRatingPuestoChange = (value) => {
    setRatingPuesto(value);
  };

  const handleSubmitValoracion = async () => {
    const valoracion = {
      valoracionRepartidor: ratingRepartidor,
      valoracionPuesto: ratingPuesto,
      opinion: opinion,
    };
    try {
      await CreateValoracionMutation({
        valoracion,
        idPuesto: pedido?.id,
      }).unwrap();

      setModalVisible(false);

      setPedidoLocal({ ...pedido, estado: "Valorado" });
    } catch (error) {
      console.error("Error al crear la valoración:", error);
    }
  };

  const handleCancelOrder = async () => {
    try {
      await cambiarEstadoPedido({ id: pedido?.id, accion: "cancelar" }).unwrap();
      setModalVisible2(false);
      setPedidoLocal({ ...pedido, estado: "Cancelado" });
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error);
      Alert.alert("Error", "Hubo un problema al actualizar el estado del pedido.");
    }
  };

  const getFormattedDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const today = getFormattedDate(new Date());

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: Colors.GrisClaro,
    },
    card: {
      backgroundColor: Colors.Blanco, // Dark card background
      borderRadius: 10,
      padding: 20,
      elevation: 3,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 15,
      color: Colors.Negro, // Light text
      textAlign: "center",
    },
    section: {
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.GrisOscuro, // Grayish label color
    },
    value: {
      fontSize: 16,
      color: Colors.Negro, // Lighter text color
    },
    link: {
      color: Colors.Negro,
      fontWeight: "bold",
    },
    status: {
      color: Colors.Negro,
      fontWeight: "bold",
    },
    productRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    productText: {
      fontSize: 16,
      color: Colors.Negro,
    },
    productPrice: {
      fontSize: 16,
      color: Colors.Negro,
      fontWeight: "bold",
    },
    totalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 15,
      padding: 10,
      borderRadius: 8,
    },
    totalLabel: {
      fontSize: 18,
      color: Colors.Negro,
      fontWeight: "bold",
    },
    totalValue: {
      fontSize: 18,
      color: Colors.Negro,
      fontWeight: "bold",
    },
    buttonGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      padding: 10,
      borderRadius: 8,
      margin: 5,
    },
    rateButton: {
      backgroundColor: Colors.Verde, // Green color
    },
    cancelButton: {
      backgroundColor: Colors.Rojo, // Red color
    },
    locationButton: {
      backgroundColor: Colors.Azul, // Blue color
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.Blanco,
      marginLeft: 5,
    },
    modalView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark transparent background
    },
    modalContent: {
      backgroundColor: Colors.Blanco, // Modal card background
      borderRadius: 10,
      padding: 20,
      width: "90%",
      alignItems: "center",
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
      color: Colors.Negro,
      textAlign: "center",
    },
    textInput: {
      borderColor: Colors.Gris,
      backgroundColor: Colors.GrisClaro,
      color: Colors.Negro,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      width: "100%",
      height: 100,
      marginBottom: 15,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    submitButton: {
      backgroundColor: Colors.Verde,
      flex: 1,
      marginRight: 5,
    },
    closeButton: {
      backgroundColor: Colors.Rojo,
      flex: 1,
      marginLeft: 5,
    },
    confirmButton: {
      backgroundColor: Colors.Rojo,
      marginRight: 10,
    },
    goBackButton: {
      backgroundColor: Colors.Info,
    },
    buttonText: {
      color: Colors.Blanco,
      marginLeft: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: Colors.Blanco,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      width: 300,
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Detalle del Pedido</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Número de Pedido:</Text>
          <Text style={styles.value}>{pedido?.id}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Repartidor:</Text>
          <Text style={styles.value}>{pedido?.repartidorId}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Puesto:</Text>
          <Text style={[styles.value, styles.link]}>
            {pedido?.puesto?.nombreCarro}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Estado:</Text>
          <Text style={[styles.value, styles.status]}>{pedido?.estado}</Text>
        </View>

        <Text style={[styles.label, styles.section]}>Productos:</Text>
        {pedido?.detalles?.map((detalle, index) => (
          <View key={index} style={styles.productRow}>
            <Text style={styles.productText}>
              {detalle.cantidad}x {detalle.producto?.nombre}
            </Text>
            <Text style={styles.productPrice}>
              ${detalle.precio.toFixed(2)}
            </Text>
          </View>
        ))}

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>${pedido?.total.toFixed(2)}</Text>
        </View>

        <View style={styles.buttonGroup}>
          {pedido?.estado === "Entregado" && (
            <TouchableOpacity
              style={[styles.button, styles.rateButton]}
              onPress={() => setModalVisible(true)}
            >
              <Icon name="star" size={20} color={Colors.Blanco} />
              <Text style={styles.buttonText}>Valorar Pedido</Text>
            </TouchableOpacity>
          )}
          {["Pendiente", "Aceptado"].includes(pedido?.estado) && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setModalVisible2(true)}
            >
              <Icon name="times-circle" size={20} color={Colors.Blanco} />
              <Text style={styles.buttonText}>Cancelar Pedido</Text>
            </TouchableOpacity>
          )}
          {pedido?.estado === "EnCamino" && (
            <TouchableOpacity
              style={[styles.button, styles.locationButton]}
              onPress={VerUbicacionPedido}
            >
              <Icon name="map-marker" size={20} color={Colors.Blanco} />
              <Text style={styles.buttonText}>Ver Ubicación de Entrega</Text>
            </TouchableOpacity>
          )}
          {(pedido?.estado === "Precomprado") && (
            <TouchableOpacity disabled
              style={[styles.button, styles.rateButton]}
              onPress={{}} //falta implementar
            >
              <Icon name="check" size={20} color={Colors.Blanco} />
              <Text style={styles.buttonText}>Solicitar Pedido</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Ingrese Valoraciones para mejorar el servicio
            </Text>
            <StarsBar
              pregunta="Calificación del Puesto"
              rating={ratingPuesto}
              onRatingChange={handleRatingPuestoChange}
            />
            <StarsBar
              pregunta="Calificación del Repartidor"
              rating={ratingRepartidor}
              onRatingChange={handleRatingRepartidorChange}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Escribe una opinión opcional..."
              value={opinion}
              onChangeText={(text) => setOpinion(text)}
              multiline
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmitValoracion}
              >
                <Icon name="paper-plane" size={20} color="#ffffff" />
                <Text style={styles.buttonText}>Enviar Valoración</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close" size={20} color="#ffffff" />
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¿Estás seguro que quieres cancelar el pedido?</Text>
            <View style={styles.buttonContainer}>
              
              <TouchableOpacity
                style={[styles.button, styles.goBackButton]}
                onPress={() => setModalVisible2(false)}
              >
                <Text style={styles.buttonText}>Volver</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleCancelOrder}
              >
                <Text style={styles.buttonText}>Cancelar Pedido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetallePedido;
