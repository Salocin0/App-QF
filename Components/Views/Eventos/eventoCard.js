import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
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
      width: 110,
      height: 110,
      resizeMode: 'cover',
      backgroundColor: Colors.GrisClaro,
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

  const safeDate = () => {
    try {
      const d = new Date(evento?.fechaInicio || evento?.fecha || evento?.createdAt);
      if (!d || isNaN(d.getTime())) return "-";
      return d.toLocaleDateString();
    } catch (e) {
      return "-";
    }
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate("EventoDetalle", { evento })} activeOpacity={0.8}>
      <View style={styles.card}>
        {evento?.img && String(evento.img).trim() ? (
          <Image source={{ uri: evento.img }} style={styles.image} />
        ) : (
          <View style={[styles.image, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: Colors.Gris }}>{'Sin imagen'}</Text>
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>{evento.nombre}</Text>
          <Text style={styles.description} numberOfLines={2}>{evento.descripcion}</Text>
          <Text style={styles.detail}>Tipo: {evento.tipoEvento ?? '-'}</Text>
          <Text style={styles.detail}>Estado: {evento.estado ?? '-'}</Text>
          <Text style={styles.detail}>Inicio: {safeDate()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventoCard;
