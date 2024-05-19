import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Modal } from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";
import StarsBar from "./StarsBar";
import { useGetProductosQuery } from "../../App/Service/ProductosApi";
import { useCreateValoracionMutation } from "../../App/Service/ValoracionApi";

const CustomButton = ({ title, onPress, color, style }) => (
  <View style={style}>
    <Button title={title} onPress={onPress} color={color} />
  </View>
);

const DetallePedido = ({ route }) => {
  const Colors = useDynamicColors();
  const { pedido } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const { data, isLoading, error } = useGetProductosQuery(pedido.puestoId);
  const [ratingPuntualidad, setRatingPuntualidad] = useState(1);
  const [ratingEficiencia, setRatingEficiencia] = useState(1);
  const [ratingCalidad, setRatingCalidad] = useState(1);
  const [ratingTiempo, setRatingTiempo] = useState(1);
  const [CreateValoracionMutation] = useCreateValoracionMutation();

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

  const handleSubmitValoracion = async () => {
    const valoracion = {
      puntualidad: ratingPuntualidad,
      eficiencia: ratingEficiencia,
      calidad: ratingCalidad,
      tiempo: ratingTiempo,
    };
  
    setModalVisible(false);
    console.log(valoracion, pedido.id);
  
    try {
      await CreateValoracionMutation({valoracion, idPuesto:pedido?.id}).unwrap();
      console.log('Valoración creada exitosamente');
    } catch (error) {
      console.error('Error al crear la valoración:', error);
    }
  };
  

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
      fontSize: 24,
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
      paddingHorizontal: 25,
      paddingVertical:15,
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
        <Text style={styles.text}>Repartidor: {pedido?.repartidorId}</Text>
        <Text style={styles.text}>Puesto: {pedido?.puesto?.nombreCarro}</Text>
        <Text style={styles.text}>Estado: {pedido?.estado}</Text>
        <Text style={styles.text}>Productos:</Text>
        {pedido?.detalles?.map((detalle, index) => (
          <Text key={index} style={styles.text}>
             - {data?.filter((producto) => producto.id === detalle.id)[0]?.nombre} - {detalle?.cantidad} x {detalle?.precio}
          </Text>
        ))}
        <Text style={styles.text}>Total: ${pedido?.total}</Text>
        <CustomButton title="Valorar Pedido" onPress={() => setModalVisible(true)} style={styles.buttonStyle} color={Colors.Azul} />
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.titleModal}>Repartidor</Text>
            <StarsBar pregunta="Puntualidad" rating={ratingPuntualidad} onRatingChange={handleRatingPuntualidadChange}/>
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
