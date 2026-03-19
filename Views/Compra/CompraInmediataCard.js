import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import useDynamicColors from "../../Styles/useDynamicColors";

const CompraInmediataCard = () => {
  const Colors = useDynamicColors();
  
  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: Colors.modoOscuroActivo ? Colors.BordeDorado : Colors.GrisClaroPeroNoTanClaro,
      borderRadius: 20,
      padding: 25,
      backgroundColor: Colors.Blanco,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 15,
      marginTop: 20,
      ...Colors.Styles.card,
    },
    iconContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: Colors.modoOscuroActivo ? "#3a2e10" : "#fff9e6",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
      borderWidth: 1,
      borderColor: Colors.modoOscuroActivo ? Colors.BordeDorado : "transparent",
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: Colors.Negro,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 15,
      color: Colors.Gris,
      textAlign: "center",
      lineHeight: 20,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <FontAwesomeIcon icon={faBolt} size={35} color={Colors.Naranja} />
      </View>
      <Text style={styles.title}>Compra Inmediata</Text>
      <Text style={styles.subtitle}>
        Retirá tu pedido en el momento dentro del predio del evento.
      </Text>
    </View>
  );
};

export default CompraInmediataCard;
