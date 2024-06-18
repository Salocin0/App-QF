import React from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useNavigation } from "@react-navigation/native";

const EventoCard = ({ evento }) => {
  const Colors = useDynamicColors();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: Colors.Blanco,
      borderRadius: 10,
      overflow: "hidden",
      marginBottom: 20,
      shadowColor: Colors.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
      flexDirection: "row",
    },
    image: {
      width: 100,
      height: "auto",
    },
    infoContainer: {
      padding: 10,
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: Colors.Negro,
    },
    description: {
      fontSize: 14,
      color: Colors.Gris,
      marginVertical: 5,
    },
    detail: {
      fontSize: 12,
      color: Colors.GrisOscuro,
    },
  });

  return (
    <TouchableOpacity onPress={() => navigation.navigate("EventoDetalle", { evento })}>
      <View style={styles.card}>
        <Image source={{ uri: evento.img }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{evento.nombre}</Text>
          <Text style={styles.description}>{evento.descripcion}</Text>
          <Text style={styles.detail}>Tipo: {evento.tipoEvento}</Text>
          <Text style={styles.detail}>Estado: {evento.estado}</Text>
          <Text style={styles.detail}>Fecha de inicio: {new Date(evento.fechaInicio).toLocaleDateString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventoCard;
