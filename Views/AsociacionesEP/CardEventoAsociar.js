import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, ToastAndroid, StyleSheet } from "react-native";
import imgevento from "./../../assets/eventoimg.jpeg";
import logoevento from "./../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useCreateAsociacionMutation } from "@/components/App/Service/AsociacionesApi";
import { useSelector } from "react-redux";

const CardEventoAsociar = ({ item, navigation, selectedPuestoId }) => {
  const Colors = useDynamicColors();
  const [createAsociacion, { isLoading, error }] = useCreateAsociacionMutation();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;

  const seleccionarPuesto = async () => {
    try {
      await createAsociacion({ eventoId: item.id, puestoId: selectedPuestoId, consumidorId: userId }).unwrap();
      ToastAndroid.show("Asociación Enviada", ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      ToastAndroid.show("Error al enviar la asociación", ToastAndroid.SHORT);
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors?.Blanco,
      borderRadius: 10,
      shadowColor: Colors?.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      flexDirection: "column",
      height: 200,
      marginVertical: 5,
      marginHorizontal: 20,
      borderColor: Colors?.Gris,
      borderWidth: 1,
    },
    imageContainer: {
      flex: 2,
    },
    image: {
      width: "100%",
      height: "100%",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    infoContainer: {
      flex: 3,
      flexDirection: "row",
    },
    logoContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 75,
      height: 75,
      borderRadius: 10,
      margin: 10,
      borderWidth: 1,
      borderColor: Colors?.Gris,
    },
    textContainer: {
      flex: 2,
      paddingVertical: 10,
      justifyContent: "center",
      paddingEnd: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
      textAlign: "center",
      color: Colors?.Negro,
    },
    description: {
      fontSize: 14,
      textAlign: "center",
      color: Colors?.Negro,
    },
    footer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 10,
      paddingHorizontal: 10,
      borderTopWidth: 1,
      borderColor: Colors?.GrisClaroPeroNoTanClaro,
      backgroundColor: Colors?.Info,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    footerText: {
      fontSize: 16,
      color: Colors?.Blanco,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={seleccionarPuesto}
      disabled={isLoading}
    >
      <View style={styles.imageContainer}>
        <Image
          source={imgevento}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={logoevento}
            style={styles.logo}
            resizeMode="cover"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.nombre}</Text>
          <Text style={styles.description}>{item.descripcion}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Empieza en 3 días</Text>
        <Text style={styles.footerText}>A 30 Km</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardEventoAsociar;
