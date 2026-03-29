import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useRecuperarContraseniaMutation } from "./../../components/App/Service/authApi";
import { ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TengoCodigo = () => {
  const Colors = useDynamicColors();
  const [codigo, setCodigo] = useState("");
  const navigation = useNavigation();
  const [recuperarContraseña] = useRecuperarContraseniaMutation();

  const localStyles = StyleSheet.create({
    containerCard: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 5,
      backgroundColor: Colors.Blanco,
    },
    card: {
      width: "85%",
      backgroundColor: Colors.Blanco,
      padding: 15,
      borderRadius: 10,
      elevation: 3,
      borderWidth: Colors.modoOscuroActivo ? 1 : 0,
      borderColor: Colors.modoOscuroActivo ? Colors.BordeDorado : "transparent",
    },
    cardheader: {
      marginBottom: 10,
      alignSelf: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: Colors.Negro,
    },
    cardBody: {
      alignItems: "center",
      width: "100%",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    label: {
      color: Colors.Negro,
      fontWeight: "normal",
      marginRight: 10,
    },
    inputAlternativo: {
      width: 200,
      paddingHorizontal: 10,
      marginBottom: 3,
      color: Colors.Negro,
      backgroundColor: Colors.modoOscuroActivo ? Colors.FondoInputOscuro : Colors.FondoInputClaro,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: Colors.GrisClaroPeroNoTanClaro,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    buttonForm: {
      backgroundColor: Colors.Azul,
      borderRadius: 5,
      padding: 10,
      alignSelf: "flex-end",
      color: "white",
    },
  });

  const handleTengoCodigo = () => {
    navigation.navigate("CambioContraseña", { codigo: codigo });
  };

  return (
    <View style={localStyles.containerCard}>
      <View style={localStyles.card}>
        <View style={localStyles.cardheader}>
          <Text style={localStyles.title}>Ingrese Codigo</Text>
        </View>
        <View style={localStyles.cardBody}>
          <View style={localStyles.inputContainer}>
            <Text style={localStyles.label}>Codigo </Text>
            <TextInput style={localStyles.inputAlternativo} value={codigo} onChangeText={setCodigo} placeholderTextColor={Colors.Gris} />
          </View>
        </View>
        <View style={localStyles.buttonsContainer}>
          <TouchableOpacity>
            <Text style={localStyles.buttonForm} onPress={() => handleTengoCodigo()}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TengoCodigo;
