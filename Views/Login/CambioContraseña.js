import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "@/Styles/useDynamicColors";
import { ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import { useNuevaContraseñaMutation } from "./../../components/App/Service/authApi";

const CambioContraseña = () => {
  const route = useRoute();
  const styles = useStyles();
  const Colors = useDynamicColors();
  const [contraseña, setContraseña] = useState("");
  const [RepetirContraseña, setRepetirContraseña] = useState("");
  const navigation = useNavigation();
  const [nuevaContraseña] = useNuevaContraseñaMutation();
  const codigo = route.params?.codigo;

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
    <ImageBackground source={require("./../../assets/QuickFoodCortado.png")} style={styles.backgroundImage}>
      <View style={styles.containerCard}>
        <View style={styles.card}>
          <View style={styles.cardheader}>
            <Text style={styles.title}>Ingrese Codigo</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.inputContainerAlternativa}>
              <Text style={styles.label}>Contraseña </Text>
              <TextInput style={styles.inputAlternativo} value={contraseña} onChangeText={setContraseña} secureTextEntry/>
            </View>
            <View style={styles.inputContainerAlternativa}>
              <Text style={styles.label}>Repetir Contraseña </Text>
              <TextInput style={styles.inputAlternativo} value={RepetirContraseña} onChangeText={setRepetirContraseña} secureTextEntry/>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.containerCard}>
              <Text style={styles.buttonEndForm} onPress={() => handleRecuperarContraseña()}>
                Cambiar Contraseña
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default CambioContraseña;
