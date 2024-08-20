import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useDynamicColors from "@/Styles/useDynamicColors";
import Aviso from "../Aviso";

const PedidosR = () => {
  const Colors = useDynamicColors();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 16,
      backgroundColor:Colors?.GrisClaro
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
      <View style={styles.contentContainer}>
        <Aviso>
          Pedidos asignados repartidor
        </Aviso>
      </View>
    </View>
  );
};


export default PedidosR;
