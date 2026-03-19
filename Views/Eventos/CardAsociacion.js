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
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 3,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    valoracion: {
      fontSize: 16,
      marginBottom: 10,
      fontStyle: 'italic',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    infoText: {
      fontSize: 14,
      marginBottom: 5,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 5,
    },
    estadoContainer: {
      position: 'absolute',
      top: 15,
      right: 15,
      padding: 5,
      borderRadius: 25,
    },
    estadoText: {
      fontWeight: 'bold',
      color: '#fff',
    },
    acceptButton: {
      flex: 1,
      backgroundColor: Colors.Verde, // Verde
      borderRadius: 10,
      paddingVertical: 10,
      marginRight: 0,
      alignItems: 'center',
    },
    rejectButton: {
      flex: 1,
      backgroundColor: Colors.Rojo, // Rojo
      borderRadius: 10,
      paddingVertical: 10,
      marginLeft: 5,
      alignItems: 'center',
    },
    observacionButton: {
        flex: 1,
        backgroundColor: Colors.Info, // Rojo
        borderRadius: 10,
        paddingVertical: 10,
        marginLeft: 5,
        alignItems: 'center',
      },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize:12
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

      <Text style={styles.valoracion}><FontAwesomeIcon icon={faStar} color={Colors.Negro} size={18} /> {valoracion}</Text>

      {asociacion.repartidor && (
        <>
          <Text style={styles.sectionTitle}>Datos Repartidor</Text>
          <Text style={styles.infoText}><FontAwesomeIcon icon={faPhone} color={Colors.Negro} size={14} /> : {asociacion.repartidor.telefono}</Text>
          <Text style={styles.infoText}><FontAwesomeIcon icon={faLocationDot} color={Colors.Negro} size={18} /> : {asociacion.repartidor.localidad +", "+ asociacion.repartidor.provincia}</Text>
          <Text style={styles.infoText}>
          <FontAwesomeIcon icon={faCalendar} color={Colors.Negro} size={18} /> : {edad + " Años"}
          </Text>
        </>
      )}

      {asociacion.puesto && (
        <>
          <Text style={styles.sectionTitle}>Datos Puesto</Text>
          <Text style={styles.infoText}><FontAwesomeIcon icon={faPhone} color={Colors.Negro} size={14} /> : {asociacion?.puesto?.telefonoCarro}</Text>
          <Text style={styles.infoText}><FontAwesomeIcon icon={faShop} color={Colors.Negro} size={18} /> : {asociacion?.puesto?.tipoNegocio}</Text>
          <Text style={styles.infoText}><FontAwesomeIcon icon={faHashtag} color={Colors.Negro} size={18} /> {asociacion?.puesto?.numeroCarro}</Text>
        </>
      )}

      {asociacion.estado === "PendienteDeAceptacion" && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Text style={styles.buttonText}>Rechazar</Text> 
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  //falta agregar el motivo y falta agregar el modal
  //falta agregar los tabs para filtrar
};

export default CardAsociacion;
