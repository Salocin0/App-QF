import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useDynamicColors from "../../Styles/useDynamicColors";
import MapWithDirection from "./MapsEncuentro";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useCambiarEstadoPedidoMutation } from "../../components/App/Service/PedidosApi"

const UbicacionEntregaR = () => {
  const Colors = useDynamicColors();
  const route = useRoute();
  const navigation = useNavigation();  // Hook for navigation
  const { pedido } = route.params;
  const defaultMeetingPoint = { lat: pedido?.puntoEncuentro?.latitud || -32.63, lng: pedido?.puntoEncuentro?.longitud || -62.69 };
  const defaultUser2 = { lat: pedido?.consumidore?.usuario?.latitud || -32.636, lng: pedido?.consumidore?.usuario?.longitud || -63.692 };

  const [modalVisible, setModalVisible] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [cambiarEstadoPedido] = useCambiarEstadoPedidoMutation();

  const handleConfirm = async () => {
    if (codigo.length === 6) {
      if (codigo.toUpperCase() === pedido.codigoEntrega.toUpperCase()) { 
        try {
          await cambiarEstadoPedido({ id: pedido.id, accion: "pedidoEntregado" }).unwrap();
          Alert.alert("Éxito", "El pedido ha sido marcado como Entregado.", [
            { text: "OK", onPress: () => navigation.goBack() }
          ]);
        } catch (error) {
          console.error("Error al actualizar el estado del pedido:", error);
          Alert.alert("Error", "Hubo un problema al actualizar el estado del pedido.");
        }
      } else {
        Alert.alert("Error", "El código ingresado no es correcto.");
      }
    } else {
      Alert.alert("Error", "El código debe tener 6 caracteres.");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.Gris,
    },
    mapContainer: {
      flex: 1,
    },
    card: {
      flex: 0,
      backgroundColor: Colors.Blanco,
      padding: 20,
      shadowColor: Colors.Negro,
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    title: {
      fontSize: 16,
      color: Colors.Gris,
      alignSelf: "center"
    },
    code: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.Negro,
      marginVertical: 10,
      alignSelf: "center"
    },
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    info: {
      fontSize: 16,
      color: Colors.Gris,
      marginLeft: 10,
    },
    label: {
      fontWeight: 'bold',
      color: Colors.Negro,
    },
    buttonContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    button: {
      backgroundColor: Colors.Negro,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: Colors.Blanco,
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: Colors.Blanco,
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    input: {
      borderWidth: 1,
      borderColor: Colors.Gris,
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      marginBottom: 20,
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButton: {
      backgroundColor: Colors.Negro,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    modalButtonText: {
      color: Colors.Blanco,
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalButtonDisabled: {
      backgroundColor: Colors.Gris,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapWithDirection
          meetingPoint={defaultMeetingPoint}
          user2={defaultUser2}
          isConsumerView={false}
        />
      </View>
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <Icon name="cube-outline" size={20} color={Colors.Negro} />
          <Text style={styles.info}><Text style={styles.label}>Nro pedido:</Text> #{pedido.id}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Icon name="account-outline" size={20} color={Colors.Negro} />
          <Text style={styles.info}><Text style={styles.label}>Consumidor:</Text> {pedido?.consumidore?.apellido +", "+pedido?.consumidore?.nombre}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Icon name="map-marker-outline" size={20} color={Colors.Negro}/>
          <Text style={styles.info}><Text style={styles.label}>Punto de encuentro:</Text> {pedido?.puntoEncuentro?.nombre}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Icon name="storefront-outline" size={20} color={Colors.Negro} />
          <Text style={styles.info}><Text style={styles.label}>Puesto:</Text> {pedido?.puesto?.nombreCarro}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Entregar Pedido</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Ingrese el código de entrega</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese el código"
              value={codigo}
              onChangeText={setCodigo}
              maxLength={6}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, codigo.length !== 6 && styles.modalButtonDisabled]}
                onPress={handleConfirm}
                disabled={codigo.length !== 6}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UbicacionEntregaR;
