import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useDynamicColors from "@/Styles/useDynamicColors";

const CompraInmediataCard = () => {
const Colors = useDynamicColors()
  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: Colors.Gris,
      borderRadius: 8,
      padding: 20,
      backgroundColor: Colors.Blanco,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      shadowColor: Colors.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      margin: 20,
      marginBottom: 0,
    },
    icon: {
      marginBottom: 15,
      color: Colors.Negro,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: Colors.Negro,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: Colors.Negro,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.card}>
      <Icon name="cart-outline" size={50} style={styles.icon} />
      <Text style={styles.title}>Compra Inmediata</Text>
      <Text style={styles.subtitle}>
        Haz clic para realizar una compra inmediata
      </Text>
    </View>
  );
};

export default CompraInmediataCard;
