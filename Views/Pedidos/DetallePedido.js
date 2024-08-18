import React, { useState, useEffect  } from "react";
import { StyleSheet, Text, View, Button, Modal, TextInput } from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";
import StarsBar from "./StarsBar";
import { useGetProductosQuery } from "./../../components/App/Service/ProductosApi";
import { useCreateValoracionMutation } from "./../../components/App/Service/ValoracionApi";
import { useNavigation } from "@react-navigation/native";

const CustomButton = ({ title, onPress, color, style }) => (
  <View style={style}>
    <Button title={title} onPress={onPress} color={color} />
  </View>
);

const DetallePedido = ({ route }) => {
  const Colors = useDynamicColors();
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const { data, isLoading, error } = useGetProductosQuery(pedido?.puestoId);
  const [CreateValoracionMutation] = useCreateValoracionMutation();
  const [ratingRepartidor, setRatingRepartidor] = useState(1);
  const [ratingPuesto, setRatingPuesto] = useState(1);
  const [opinion, setOpinion] = useState("");
  const [pedido, setPedidoLocal] = useState(route.params.pedido);

  const VerUbicacionPedido = (pedido) => {
    navigation.navigate("Ubicacion Pedido", { });
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
      console.log("Valoración creada exitosamente");
      setModalVisible(false);
  
      // Actualizar el estado local
      setPedidoLocal({ ...pedido, estado: "Valorado" });
    } catch (error) {
      console.error("Error al crear la valoración:", error);
    }
  };
  
  const handleCancelOrder = () => {
    console.log("Pedido cancelado");
    //cambiar el estado en el back
    setPedidoLocal({ ...pedido, estado: "Cancelado" });
  };

  const styles = StyleSheet.create({
    modalView: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 30,
    },
    modalContent: {
      backgroundColor: Colors.GrisClaroPeroNoTanClaro,
      borderRadius: 10,
      paddingHorizontal: 25,
      paddingVertical: 15,
      alignItems: "center",
      elevation: 5,
      width: "90%",
    },
    centeredTitle: {
      textAlign: "center",
      marginBottom: 15,
    },
    opinionContainer: {
      width: "100%",
      marginVertical: 15,
    },
    textInput: {
      borderColor: Colors.GrisOscuro,
      backgroundColor: Colors.Gris,
      color: Colors.Negro,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      width: "100%",
      Height: 50, // Adjust height as needed
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: 10,
    },
    buttonStyle: {
      borderRadius: 10,
      marginHorizontal: 5,
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: Colors.GrisClaro,
    },
    card: {
      flex: 1,
      padding: 20,
      backgroundColor: Colors.GrisClaro,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: Colors.Negro,
    },
    titleModal: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: Colors.Negro,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      color: Colors.Negro,
    },
    buttonStyle: {
      borderRadius: 10,
      marginTop: 10,
    },
    buttonText: {
      color: Colors.Blanco,
    },
    text: {
      fontSize: 16,
      color: Colors.Negro,
      marginBottom: 5,
    },
    texttotal: {
      fontSize: 28,
      color: Colors.Blanco,
      fontWeight: "bold",
    },
    texttotalcontainer: {
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 30,
      marginVertical: 10,
      backgroundColor: Colors.Verde,
      borderRadius: 10,
      padding: 10,
    },
    separator: {
      width: "100%",
      height: 1,
      backgroundColor: Colors.Negro,
      marginVertical: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Pedido #{pedido?.id}</Text>
        <Text style={styles.text}>Repartidor: {pedido?.repartidorId}</Text>
        <Text style={styles.text}>Puesto: {pedido?.puesto?.nombreCarro}</Text>
        <Text style={styles.text}>Estado: {pedido?.estado}</Text>
        <Text style={styles.text}>Productos:</Text>
        {pedido?.detalles?.map((detalle, index) => (
          <Text key={index} style={styles.text}>
            ◉ {detalle.producto?.nombre}: {detalle.cantidad} x {detalle.precio}
          </Text>
        ))}
        <View style={styles.texttotalcontainer}>
          <Text style={styles.texttotal}>Total: ${pedido?.total}</Text>
        </View>
        <View style={styles.separator} />
        {pedido?.estado === "Entregado" && (
          <CustomButton
            title="Valorar Pedido"
            onPress={() => setModalVisible(true)}
            style={styles.buttonStyle}
            color={Colors.Azul}
          />
        )}
        {["Pendiente", "Aceptado"].includes(pedido?.estado) && (
          <CustomButton
            title="Cancelar Pedido"
            onPress={handleCancelOrder}
            style={styles.buttonStyle}
            color={Colors.Rojo}
          />
        )}
        {pedido?.estado === "EnCamino" && (
          <CustomButton
            title="Ver Ubicación Entrega"
            onPress={VerUbicacionPedido}
            style={styles.buttonStyle}
            color={Colors.Azul}
          />
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.titleModal}>
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
              <CustomButton
                title="Enviar Valoracion"
                onPress={handleSubmitValoracion}
                style={styles.buttonStyle}
                color={Colors.Azul}
              />
              <CustomButton
                title="Cerrar"
                onPress={() => setModalVisible(false)}
                style={styles.buttonStyle}
                color={Colors.Rojo}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetallePedido;
