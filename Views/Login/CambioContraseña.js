import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import useDynamicColors from "../../Styles/useDynamicColors";
import { ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import { useNuevaContraseñaMutation } from "./../../components/App/Service/authApi";

const CambioContraseña = () => {
  const route = useRoute();
  const Colors = useDynamicColors();
  const [contraseña, setContraseña] = useState("");
  const [RepetirContraseña, setRepetirContraseña] = useState("");
  const navigation = useNavigation();
  const [nuevaContraseña] = useNuevaContraseñaMutation();
  const codigo = route.params?.codigo;

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
    inputContainerAlternativa: {
      marginBottom: 8,
    },
    label: {
      color: Colors.Negro,
      fontWeight: "normal",
      marginRight: 10,
    },
    inputAlternativo: {
      width: "100%",
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
    buttonEndForm: {
      backgroundColor: Colors.Verde,
      borderRadius: 5,
      padding: 10,
      alignSelf: "flex-end",
      color: "white",
    },
  });

  const handleRecuperarContraseña = async () => {
    if(contraseña === RepetirContraseña && contraseña !==""){
      const result = await nuevaContraseña({contraseña,codigo});
      if (result) {
        ToastAndroid.show("Contraseña cambiada", ToastAndroid.SHORT);
        navigation.navigate("Login");
      } else {
        ToastAndroid.show("Error al cambiar la contraseña", ToastAndroid.SHORT);
        navigation.navigate("Login");
      }
    }else{
      ToastAndroid.show("Las contraseñas no son iguales", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={localStyles.containerCard}>
      <View style={localStyles.card}>
        <View style={localStyles.cardheader}>
          <Text style={localStyles.title}>Ingrese Codigo</Text>
        </View>
        <View style={localStyles.cardBody}>
          <View style={localStyles.inputContainerAlternativa}>
            <Text style={localStyles.label}>Contraseña </Text>
            <TextInput style={localStyles.inputAlternativo} value={contraseña} onChangeText={setContraseña} secureTextEntry placeholderTextColor={Colors.Gris} />
          </View>
          <View style={localStyles.inputContainerAlternativa}>
            <Text style={localStyles.label}>Repetir Contraseña </Text>
            <TextInput style={localStyles.inputAlternativo} value={RepetirContraseña} onChangeText={setRepetirContraseña} secureTextEntry placeholderTextColor={Colors.Gris} />
          </View>
        </View>
        <View style={localStyles.buttonsContainer}>
          <TouchableOpacity>
            <Text style={localStyles.buttonEndForm} onPress={() => handleRecuperarContraseña()}>
              Cambiar Contraseña
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CambioContraseña;
