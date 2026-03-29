import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useCambiarEstadoAsociacionMutation } from '@/components/App/Service/AsociacionesApi';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faCity, faHashtag, faLocationDot, faPhone, faShop, faStar } from "@fortawesome/free-solid-svg-icons";
import useDynamicColors from "./../../Styles/useDynamicColors";

const CardAsociacion = ({ asociacion }) => {
  const [cambiarEstado] = useCambiarEstadoAsociacionMutation();
  const Colors = useDynamicColors();

  const handleAccept = () => {
    cambiarEstado({ asociacionId: asociacion.id, accion: 'aceptar' });
  };

  const handleReject = () => {
    cambiarEstado({ asociacionId: asociacion.id, accion: 'rechazada' });
  };

  const handleObservation = () => {
    cambiarEstado({ asociacionId: asociacion.id, accion: 'retornarda' });
  };

  const styles = StyleSheet.create({
    card: {
      padding: 15,
      marginVertical: 10,
      backgroundColor: "#222222",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
      shadowColor: Colors.BordeDorado,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: "#ffffff",
    },
    valoracion: {
      fontSize: 16,
      marginBottom: 10,
      fontStyle: 'italic',
      color: Colors.BordeDorado,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },
    infoText: {
      fontSize: 14,
      marginBottom: 5,
      color: "#cccccc",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 8,
      color: Colors.BordeDorado,
    },
    estadoContainer: {
      position: 'absolute',
      top: 15,
      right: 15,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 20,
    },
    estadoText: {
      fontWeight: 'bold',
      color: "#ffffff",
      fontSize: 12,
    },
    acceptButton: {
      flex: 1,
      backgroundColor: Colors.BordeDorado,
      borderRadius: 10,
      paddingVertical: 12,
      marginRight: 5,
      alignItems: 'center',
    },
    rejectButton: {
      flex: 1,
      backgroundColor: "transparent",
      borderRadius: 10,
      paddingVertical: 12,
      marginLeft: 5,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: Colors.Rojo,
    },
    observacionButton: {
      flex: 1,
      backgroundColor: Colors.BordeDorado,
      borderRadius: 10,
      paddingVertical: 12,
      marginLeft: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: "#000000",
      fontWeight: 'bold',
      fontSize: 14,
    },
    buttonTextRechazar: {
      color: Colors.Rojo,
      fontWeight: 'bold',
      fontSize: 14,
    },
  });

  const estadoStyles = {
    'PendienteDeAceptacion': { backgroundColor: Colors.Naranja }, // Naranja
    'Aceptada': { backgroundColor: Colors.Rosa }, // Rosa
    'ConObservacion': { backgroundColor: Colors.Purpura }, // Púrpura
    'Rechazada': { backgroundColor: Colors.Rojo }, // Rojo
  };

  const edad = asociacion.repartidor 
    ? new Date().getFullYear() - new Date(asociacion.repartidor.fechaNacimiento).getFullYear()
    : null;

  const generarValoracion = () => {
    return 4.2;
  };

  const valoracion = generarValoracion();

  return (
    <View style={styles.card}>
      <View style={[styles.estadoContainer, estadoStyles[asociacion.estado]]}>
        <Text style={styles.estadoText}>
          {asociacion.estado === "PendienteDeAceptacion" ? "Pendiente" : asociacion.estado === "ConObservacion" ? "Con Observación" : asociacion.estado}
        </Text>
      </View>

      <Text style={styles.title}>
        {asociacion.repartidor
          ? `${asociacion.repartidor.nombre}, ${asociacion.repartidor.apellido}`
          : `${asociacion.puesto.nombreCarro}`
        }
      </Text>

      <Text style={styles.valoracion}><FontAwesomeIcon icon={faStar} color={Colors.BordeDorado} size={18} /> {valoracion}</Text>

      {asociacion.repartidor && (
        <>
          <Text style={styles.sectionTitle}>Datos Repartidor</Text>
          <Text style={styles.infoText}><FontAwesomeIcon icon={faPhone} color={Colors.BordeDorado} size={14} />  {asociacion.repartidor.telefono}</Text>
          <Text style={styles.infoText}><FontAwesomeIcon icon={faLocationDot} color={Colors.BordeDorado} size={18} />  {asociacion.repartidor.localidad +", "+ asociacion.repartidor.provincia}</Text>
          <Text style={styles.infoText}>
          <FontAwesomeIcon icon={faCalendar} color={Colors.BordeDorado} size={18} />  {edad + " Años"}
          </Text>
        </>
      )}

      {asociacion.puesto && (
        <>
          <Text style={styles.sectionTitle}>Datos Puesto</Text>
          <Text style={styles.infoText}><FontAwesomeIcon icon={faPhone} color={Colors.BordeDorado} size={14} />  {asociacion?.puesto?.telefonoCarro}</Text>
          <Text style={styles.infoText}><FontAwesomeIcon icon={faShop} color={Colors.BordeDorado} size={18} />  {asociacion?.puesto?.tipoNegocio}</Text>
          <Text style={styles.infoText}><FontAwesomeIcon icon={faHashtag} color={Colors.BordeDorado} size={18} /> {asociacion?.puesto?.numeroCarro}</Text>
        </>
      )}

      {asociacion.estado === "PendienteDeAceptacion" && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Text style={styles.buttonTextRechazar}>Rechazar</Text> 
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  //falta agregar el motivo y falta agregar el modal
  //falta agregar los tabs para filtrar
};

export default CardAsociacion;
