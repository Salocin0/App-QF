import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Aviso = ({ mensaje }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{mensaje}</Text>
    </View>
  );
};

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
  },
});

export default Aviso;
