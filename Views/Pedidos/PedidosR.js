import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";

const PedidosR = () => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  return (
    <View style={styles.container}>
      <Text style={{ color: Colors.Negro }}>Pedidos asignados repartidor</Text>
    </View>
  );
};

export default PedidosR;
