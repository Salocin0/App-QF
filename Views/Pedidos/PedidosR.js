import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import CardAsignacionPedido from "./CardAsignacionPedido";

const PedidosR = () => {
  const Colors = useDynamicColors();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 16,
      backgroundColor:Colors.GrisClaro
    },
    cardContainer: {
      width: '100%',
      marginBottom: 16,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <CardAsignacionPedido />
      </View>
      <View style={styles.contentContainer}>
        <Text style={{ color: Colors.Negro, textAlign: 'center' }}>
          Pedidos asignados repartidor
        </Text>
      </View>
    </View>
  );
};


export default PedidosR;
