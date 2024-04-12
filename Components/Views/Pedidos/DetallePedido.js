import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Modal } from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";
import StarsBar from "./StarsBar";

const CustomButton = ({ title, onPress, color, style }) => (
  <View style={style}>
    <Button title={title} onPress={onPress} color={color} />
  </View>
);

const DetallePedido = ({ route }) => {
  const Colors = useDynamicColors();
  const { pedido } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const [ratingPuntualidad, setRatingPuntualidad] = useState(1);
  const [ratingEficiencia, setRatingEficiencia] = useState(1);
  const [ratingCalidad, setRatingCalidad] = useState(1);
  const [ratingTiempo, setRatingTiempo] = useState(1);

  const handleRatingPuntualidadChange = (value) => {
    setRatingPuntualidad(value);
  };

  const handleRatingEficienciaChange = (value) => {
    setRatingEficiencia(value);
  };

  const handleRatingCalidadChange = (value) => {
    setRatingCalidad(value);
  };

  const handleRatingTiempoChange = (value) => {
    setRatingTiempo(value);
  };

  const handleSubmitValoracion = () => {
    const valoracion = {
      puntualidad: ratingPuntualidad,
      eficiencia: ratingEficiencia,
      calidad: ratingCalidad,
      tiempo: ratingTiempo,
    };

    console.log(valoracion);

    setModalVisible(false);
  }

  const styles = StyleSheet.create({
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
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      color: Colors.Negro,
    },
    modalView: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      alignItems: "center",
      justifyContent: "center",
    },
    modalContent: {
      backgroundColor: Colors.GrisClaroPeroNoTanClaro,
      borderRadius: 10,
      padding: 35,
      alignItems: "center",
      elevation: 5,
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
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Pedido #{pedido?.id}</Text>
        <Text style={styles.text}>Repartidor: {pedido?.repartidor}</Text>
        <Text style={styles.text}>Puesto: {pedido?.puesto}</Text>
        <Text style={styles.text}>Productos:</Text>
        {pedido?.productos?.map((producto, index) => (
          <Text key={index} style={styles.text}>
            - {producto?.cantidad} x {producto?.producto}
          </Text>
        ))}
        <Text style={styles.text}>Total: ${pedido?.total}</Text>
        <CustomButton title="Valorar Pedido" onPress={() => setModalVisible(true)} style={styles.buttonStyle} color={Colors.Azul} />
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.titleModal}>Repartidor</Text>
            <StarsBar pregunta="Puntualidad" rating={ratingPuntualidad} onRatingChange={handleRatingPuntualidadChange} />
            <StarsBar pregunta="Eficiencia en la entrega" rating={ratingEficiencia} onRatingChange={handleRatingEficienciaChange} />
            <Text style={styles.titleModal}>Puesto</Text>
            <StarsBar pregunta="Calidad del productos" rating={ratingCalidad} onRatingChange={handleRatingCalidadChange} />
            <StarsBar pregunta="Tiempo de preparación" rating={ratingTiempo} onRatingChange={handleRatingTiempoChange} />
            <CustomButton title="Enviar Valoracion" onPress={() => handleSubmitValoracion()} style={styles.buttonStyle} color={Colors.Azul} />
            <CustomButton title="Cerrar" onPress={() => setModalVisible(false)} style={styles.buttonStyle} color={Colors.Rojo} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetallePedido;
