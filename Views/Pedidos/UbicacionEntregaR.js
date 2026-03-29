import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useDynamicColors from "../../Styles/useDynamicColors";
import ThemedModal from "../../components/ThemedModal/ThemedModal";
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
      backgroundColor: "#1a1a1a",
    },
    mapContainer: {
      flex: 1,
    },
    card: {
      flex: 0,
      backgroundColor: "#222222",
      padding: 20,
      shadowColor: Colors.BordeDorado,
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
      borderTopWidth: 2,
      borderTopColor: Colors.BordeDorado,
    },
    title: {
      fontSize: 16,
      color: "#cccccc",
      alignSelf: "center"
    },
    code: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.BordeDorado,
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
      color: "#cccccc",
      marginLeft: 10,
    },
    label: {
      fontWeight: 'bold',
      color: Colors.BordeDorado,
    },
    buttonContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    button: {
      backgroundColor: Colors.BordeDorado,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors.BordeDorado,
    },
    buttonText: {
      color: "#000000",
      fontSize: 16,
      fontWeight: 'bold',
    },
    input: {
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
      borderRadius: 10,
      padding: 15,
      fontSize: 16,
      marginBottom: 20,
      color: "#ffffff",
      backgroundColor: "#1a1a1a",
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
          <Icon name="cube-outline" size={20} color={Colors.BordeDorado} />
          <Text style={styles.info}><Text style={styles.label}>Nro pedido:</Text> #{pedido.id}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Icon name="account-outline" size={20} color={Colors.BordeDorado} />
          <Text style={styles.info}><Text style={styles.label}>Consumidor:</Text> {pedido?.consumidore?.apellido +", "+pedido?.consumidore?.nombre}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Icon name="map-marker-outline" size={20} color={Colors.BordeDorado}/>
          <Text style={styles.info}><Text style={styles.label}>Punto de encuentro:</Text> {pedido?.puntoEncuentro?.nombre}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Icon name="storefront-outline" size={20} color={Colors.BordeDorado} />
          <Text style={styles.info}><Text style={styles.label}>Puesto:</Text> {pedido?.puesto?.nombreCarro}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Entregar Pedido</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ThemedModal
        visible={modalVisible}
        title="Ingrese el código de entrega"
        onClose={() => setModalVisible(false)}
        animationType="slide"
        buttons={[
          { 
            text: "Confirmar", 
            onPress: handleConfirm,
            disabled: codigo.length !== 6,
          },
          { 
            text: "Cerrar", 
            variant: "secondary", 
            onPress: () => setModalVisible(false),
            closeOnPress: true,
          },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Ingrese el código"
          placeholderTextColor="#666666"
          value={codigo}
          onChangeText={setCodigo}
          maxLength={6}
        />
      </ThemedModal>
    </View>
  );
};

export default UbicacionEntregaR;
