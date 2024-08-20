import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useDynamicColors from "@/Styles/useDynamicColors";

const Aviso = ({ mensaje }) => {
  const Colors = useDynamicColors();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    texto: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      color: Colors?.Negro,
    },
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{mensaje}</Text>
    </View>
  );
};

export default Aviso;
