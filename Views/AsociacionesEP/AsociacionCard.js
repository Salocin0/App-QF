import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useDynamicColors from "../../Styles/useDynamicColors";

const AsociacionCard = ({ asociacion, evento }) => {
  const Colors = useDynamicColors();
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: Colors?.Blanco,
      borderRadius: 10,
      marginVertical: 5,
      padding: 10,
      shadowColor: Colors?.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
      borderWidth: 1,
      borderColor: Colors?.GrisClaroPeroNoTanClaro,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: Colors?.Negro,
    },
    detail: {
      fontSize: 14,
      marginBottom: 5,
      color: Colors?.GrisOscuro,
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{evento.nombre}</Text>
      <Text style={styles.detail}>puesto: #{asociacion.puestoId}</Text>
      <Text style={styles.detail}>Estado: {asociacion.estado}</Text>
      <Text style={styles.detail}>Fecha de creación: {new Date(asociacion.createdAt).toLocaleDateString()}</Text>
    </View>
  );
};

export default AsociacionCard;
