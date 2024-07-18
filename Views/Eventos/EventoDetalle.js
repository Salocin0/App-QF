import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import useDynamicColors from "../../Styles/useDynamicColors";
import { useRoute } from "@react-navigation/native";

import {
  faLocationDot,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

const EventoDetalle = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const Colors = useDynamicColors();
  const evento = route.params?.evento;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.Blanco,
    },
    contentContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    card: {
      backgroundColor: Colors.GrisClaro,
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: Colors.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
      width: "100%",
      alignItems: "center",
      padding: 10,
    },
    image: {
      width: 150,
      height: 150,
      resizeMode: "contain",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colors.Gris,
    },
    infoContainer: {
      padding: 10,
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: Colors.Negro,
      textAlign: "center",
    },
    description: {
      fontSize: 16,
      color: Colors.Gris,
      marginVertical: 5,
      textAlign: "center",
    },
    detail: {
      fontSize: 14,
      color: Colors.GrisOscuro,
      textAlign: "center",
    },
    buttonContainer: {
      marginVertical: 10,
      backgroundColor: Colors.Info,
      padding: 10,
      width: 300,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: Colors.Blanco,
      marginLeft: 5,
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.card}>
        <Image source={{ uri: evento.img }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{evento.nombre}</Text>
          <Text style={styles.description}>{evento.descripcion}</Text>
          <Text style={styles.detail}>Tipo: {evento.tipoEvento}</Text>
          <Text style={styles.detail}>Estado: {evento.estado}</Text>
          <Text style={styles.detail}>
            Fecha de inicio: {new Date(evento.fechaInicio).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("Administrar Puntos de encuentro", { evento: evento });
        }}
      >
        <Text style={styles.buttonText}>Administrar Puntos de encuentro </Text>
        <FontAwesomeIcon icon={faLocationDot} color={Colors.Blanco} size={16} />
      </TouchableOpacity>
      {evento.estado !== "EnCurso" && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate("Administrar Asociaciones");
          }}
        >
          <Text style={styles.buttonText}>Administrar Asociaciones </Text>
          <FontAwesomeIcon icon={faAddressBook} color={Colors.Blanco} size={16} />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default EventoDetalle;
