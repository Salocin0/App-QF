import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useDynamicColors from "@/Styles/useDynamicColors";

const InfoPedidoC = ({ repartidor, ubicacion, codigoEntrega }) => {
  const Colors = useDynamicColors();

  const styles = StyleSheet.create({
    card: {
      flex: 1,
      margin: 20,
      padding: 20,
      backgroundColor: Colors?.Blanco, 
      borderRadius: 10,
      shadowColor: Colors?.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3, 
    },
    container: {
      alignItems: 'center',
    },
    label: {
      fontSize: 18,
      color: Colors?.Gris,
      marginBottom: 5,
      textAlign: 'center',
    },
    text: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: 'center',
      color:Colors?.Negro
    },
    code: {
      fontSize: 28,
      fontWeight: "bold",
      color: Colors?.Negro,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Text style={styles.label}>Nombre Repartidor:</Text>
        <Text style={styles.text}>{repartidor}</Text>
        <Text style={styles.label}>Ubicación de Entrega:</Text>
        <Text style={styles.text}>{ubicacion}</Text>
        <Text style={styles.label}>Código de Entrega:</Text>
        <Text style={styles.code}>{codigoEntrega}</Text>
      </View>
    </View>
  );
};



export default InfoPedidoC;
