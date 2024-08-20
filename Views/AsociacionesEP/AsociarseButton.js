import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useNavigation } from "@react-navigation/native";

const AsociarseButton = () => {
  const Colors = useDynamicColors();
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Asociarse a Evento");
  };

  const styles = StyleSheet.create({
    button: {
      width: "100%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginVertical: 10,
      backgroundColor: Colors?.Verde,
      borderWidth: 1,
      borderColor: Colors?.GrisClaroPeroNoTanClaro,
      shadowColor: Colors?.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonText: {
      fontSize: 24,
      fontWeight: "bold",
      color: Colors?.Blanco,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>
        Asociarse a un evento
      </Text>
    </TouchableOpacity>
  );
};



export default AsociarseButton;
