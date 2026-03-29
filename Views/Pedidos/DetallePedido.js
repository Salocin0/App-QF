import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Asegúrate de haber instalado react-native-vector-icons
import useDynamicColors from "../../Styles/useDynamicColors";
import ThemedModal from "../../components/ThemedModal/ThemedModal";
import StarsBar from "./StarsBar";
import { useGetProductosQuery } from "./../../components/App/Service/ProductosApi";
import { useCreateValoracionMutation } from "./../../components/App/Service/ValoracionApi";
import { useNavigation } from "@react-navigation/native";
import { useCambiarEstadoPedidoMutation } from "../../components/App/Service/PedidosApi"

const DetallePedido = ({ route }) => {
  const Colors = useDynamicColors();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  // Extraer pedido primero para poder usarlo en los hooks
  const pedido = route?.params?.pedido;
  // Convertir a boolean explícitamente
  const isViewRepartidor = route?.params?.isViewRepartidor === true || route?.params?.isViewRepartidor === "true";
  const { data, isLoading, error } = useGetProductosQuery(pedido?.puestoId);
  const [CreateValoracionMutation] = useCreateValoracionMutation();
  const [ratingRepartidor, setRatingRepartidor] = useState(0);
  const [ratingPuesto, setRatingPuesto] = useState(0);
  const [opinion, setOpinion] = useState("");
  const [pedidoLocal, setPedidoLocal] = useState(pedido);
  const [cambiarEstadoPedido] = useCambiarEstadoPedidoMutation();
  const [modalVisible2, setModalVisible2] = useState(false);

  // Usar pedidoLocal para mostrar, con fallback a pedido
  const currentPedido = pedidoLocal || pedido;

  // Sincronizar pedidoLocal cuando pedido cambia
  useEffect(() => {
    if (pedido && !pedidoLocal) {
      setPedidoLocal(pedido);
    }
  }, [pedido, pedidoLocal]);

  const VerUbicacionPedido = () => {
    navigation.navigate("Ubicacion Pedido", { pedido: pedidoLocal || pedido });
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
      backgroundColor: "#1a1a1a",
    },
    card: {
      backgroundColor: "#222222",
      borderRadius: 10,
      padding: 20,
      elevation: 3,
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 15,
      color: "#ffffff",
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
      color: Colors.BordeDorado,
    },
    value: {
      fontSize: 16,
      color: "#ffffff",
    },
    link: {
      color: Colors.BordeDorado,
      fontWeight: "bold",
    },
    status: {
      color: "#ffffff",
      fontWeight: "bold",
      backgroundColor: Colors.BordeDorado,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
      overflow: "hidden",
    },
    productRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: "#333333",
      paddingBottom: 5,
    },
    productText: {
      fontSize: 16,
      color: "#cccccc",
      flex: 1,
    },
    productPrice: {
      fontSize: 16,
      color: Colors.BordeDorado,
      fontWeight: "bold",
    },
    totalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 15,
      padding: 10,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
      backgroundColor: "#1a1a1a",
    },
    totalLabel: {
      fontSize: 18,
      color: "#ffffff",
      fontWeight: "bold",
    },
    totalValue: {
      fontSize: 18,
      color: Colors.BordeDorado,
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
      borderWidth: 1,
      borderColor: Colors.BordeDorado,
    },
    rateButton: {
      backgroundColor: Colors.BordeDorado,
    },
    cancelButton: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: Colors.Rojo,
    },
    locationButton: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: Colors.Azul,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000000",
      marginLeft: 5,
    },
    buttonTextSecondary: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.Rojo,
      marginLeft: 5,
    },
    buttonTextBlue: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.Azul,
      marginLeft: 5,
    },
    // TextInput for valoration
    textInput: {
      borderColor: Colors.BordeDorado,
      backgroundColor: "#1a1a1a",
      color: "#ffffff",
      borderWidth: 1,
      borderRadius: 10,
      padding: 12,
      width: "100%",
      height: 100,
      marginBottom: 16,
      fontSize: 15,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      gap: 12,
    },
    submitButton: {
      backgroundColor: Colors.BordeDorado,
      flex: 1,
      padding: 14,
      borderRadius: 10,
      alignItems: "center",
    },
    closeButton: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: Colors.Rojo,
      flex: 1,
      padding: 14,
      borderRadius: 10,
      alignItems: "center",
    },
    confirmButton: {
      backgroundColor: Colors.Rojo,
      marginRight: 10,
      padding: 14,
      borderRadius: 10,
    },
    goBackButton: {
      backgroundColor: Colors.BordeDorado,
      padding: 14,
      borderRadius: 10,
    },
    textWhite: {
      fontWeight: "bold",
      fontSize: 15,
      color: "#000000",
    },
    textWhiteSecondary: {
      fontWeight: "bold",
      fontSize: 15,
      color: "#ffffff",
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
          <Text style={styles.value}>
            {pedido?.repartidore?.consumidore?.nombre} {pedido?.repartidore?.consumidore?.apellido}
          </Text>
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
          {pedido?.estado === "Entregado" && !isViewRepartidor && (
            <TouchableOpacity
              style={[styles.button, styles.rateButton]}
              onPress={() => setModalVisible(true)}
            >
              <Icon name="star" size={20} color="#000000" />
              <Text style={styles.buttonText}>Valorar Pedido</Text>
            </TouchableOpacity>
          )}
          {["Pendiente", "Aceptado"].includes(pedido?.estado) && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setModalVisible2(true)}
            >
              <Icon name="times-circle" size={20} color={Colors.Rojo} />
              <Text style={styles.buttonTextSecondary}>Cancelar Pedido</Text>
            </TouchableOpacity>
          )}
          {pedido?.estado === "EnCamino" && (
            <TouchableOpacity
              style={[styles.button, styles.locationButton]}
              onPress={VerUbicacionPedido}
            >
              <Icon name="map-marker" size={20} color={Colors.Azul} />
              <Text style={styles.buttonTextBlue}>Ver Ubicación</Text>
            </TouchableOpacity>
          )}
          {(pedido?.estado === "Precomprado") && (
            <TouchableOpacity disabled
              style={[styles.button, styles.rateButton]}
              onPress={{}} //falta implementar
            >
              <Icon name="check" size={20} color="#000000" />
              <Text style={styles.buttonText}>Solicitar Pedido</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ThemedModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        animationType="slide"
        title="Ingrese Valoraciones para mejorar el servicio"
        buttons={[
          { 
            text: "Cerrar", 
            variant: "secondary",
            onPress: () => setModalVisible(false),
          },
          { 
            text: "Enviar", 
            onPress: handleSubmitValoracion,
          },
        ]}
      >
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
          placeholderTextColor={Colors.Gris}
          value={opinion}
          onChangeText={(text) => setOpinion(text)}
          multiline
        />
      </ThemedModal>

      <ThemedModal
        visible={modalVisible2}
        onClose={() => setModalVisible2(false)}
        animationType="slide"
        title="¿Estás seguro que quieres cancelar el pedido?"
        buttons={[
          { 
            text: "Volver", 
            onPress: () => setModalVisible2(false),
          },
          { 
            text: "Cancelar Pedido", 
            onPress: handleCancelOrder,
            style: { backgroundColor: Colors.Rojo },
          },
        ]}
      />
    </View>
  );
};

export default DetallePedido;
