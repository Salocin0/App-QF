import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useDynamicColors from "../../Styles/useDynamicColors";
import ThemedModal from "../../components/ThemedModal/ThemedModal";
import ThemedAlert from "../../components/ThemedAlert/ThemedAlert";
import MapWithDirection from "./MapsEncuentro";
import { useRoute, useNavigation, useIsFocused } from "@react-navigation/native";
import { useCambiarEstadoPedidoMutation } from "../../components/App/Service/PedidosApi"
import usePedidoEnVivo from "../../hooks/usePedidoEnVivo";
import { buscarPedido, etiquetaEstado } from "../../components/Features/pedidos/estadosPedido";

const ESPERA_ENTRE_MODALES_MS = 350;

const UbicacionEntregaR = () => {
  const Colors = useDynamicColors();
  const route = useRoute();
  const navigation = useNavigation();  // Hook for navigation
  const isFocused = useIsFocused();
  const entregaPropia = useRef(false);
  const [alerta, setAlerta] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [errorCodigo, setErrorCodigo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [cambiarEstadoPedido] = useCambiarEstadoPedidoMutation();

  const { pedido, refetch } = usePedidoEnVivo(route.params?.pedido, {
    esRepartidor: true,
    onCambioEstado: (_anterior, estadoNuevo) => {
      if (entregaPropia.current || !isFocused) return;
      setModalVisible(false);
      setAlerta({
        tipo: "info",
        titulo: "El pedido cambió de estado",
        mensaje: `Este pedido ahora está ${etiquetaEstado(estadoNuevo)}.`,
        botones: [{ text: "Volver a mis pedidos", onPress: () => navigation.goBack() }],
      });
    },
  });
  const defaultMeetingPoint = { lat: pedido?.puntoEncuentro?.latitud || -32.63, lng: pedido?.puntoEncuentro?.longitud || -62.69 };
  const defaultUser2 = { lat: pedido?.consumidore?.usuario?.latitud || -32.636, lng: pedido?.consumidore?.usuario?.longitud || -63.692 };

  const abrirModalCodigo = () => {
    setCodigo("");
    setErrorCodigo("");
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    if (codigo.length !== 6) {
      setErrorCodigo("El código debe tener 6 caracteres.");
      return;
    }
    if (codigo.toUpperCase() !== String(pedido?.codigoEntrega || "").toUpperCase()) {
      setErrorCodigo("El código no coincide. Pedile al consumidor el código que ve en su app.");
      return;
    }
    setEnviando(true);
    try {
      entregaPropia.current = true;
      await cambiarEstadoPedido({ id: pedido.id, accion: "pedidoEntregado" }).unwrap();
      setModalVisible(false);
      setTimeout(
        () =>
          setAlerta({
            tipo: "exito",
            titulo: "¡Entrega confirmada!",
            mensaje: `El pedido #${pedido.id} quedó entregado a ${pedido?.consumidore?.nombre ?? "el consumidor"} ${pedido?.consumidore?.apellido ?? ""}.`.trim(),
            botones: [{ text: "Volver a mis pedidos", onPress: () => navigation.goBack() }],
          }),
        ESPERA_ENTRE_MODALES_MS
      );
    } catch (error) {
      entregaPropia.current = false;
      console.error("Error al actualizar el estado del pedido:", error);
      let estadoActual;
      try {
        const respuesta = await refetch();
        estadoActual = buscarPedido(respuesta?.data, pedido?.id)?.estado;
      } catch (_) {
        // Sin conexión: se informa el error genérico.
      }
      setErrorCodigo(
        estadoActual && estadoActual !== "EnCamino"
          ? `No se puede entregar: el pedido está ${etiquetaEstado(estadoActual)}.`
          : "No se pudo confirmar la entrega. Revisá la conexión e intentá de nuevo."
      );
    } finally {
      setEnviando(false);
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
    inputError: {
      borderColor: Colors.Rojo,
      marginBottom: 10,
    },
    errorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
    },
    errorText: {
      color: Colors.Rojo,
      fontSize: 14,
      marginLeft: 6,
      flex: 1,
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
          <TouchableOpacity style={styles.button} onPress={abrirModalCodigo}>
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
            text: enviando ? "Confirmando..." : "Confirmar", 
            onPress: handleConfirm,
            disabled: codigo.length !== 6 || enviando,
            closeOnPress: false,
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
          style={[styles.input, errorCodigo ? styles.inputError : null]}
          placeholder="Ingrese el código"
          placeholderTextColor="#666666"
          value={codigo}
          onChangeText={(texto) => {
            setCodigo(texto);
            if (errorCodigo) setErrorCodigo("");
          }}
          autoCapitalize="characters"
          autoCorrect={false}
          maxLength={6}
        />
        {errorCodigo ? (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle" size={18} color={Colors.Rojo} />
            <Text style={styles.errorText}>{errorCodigo}</Text>
          </View>
        ) : null}
      </ThemedModal>

      <ThemedAlert
        visible={Boolean(alerta)}
        tipo={alerta?.tipo}
        titulo={alerta?.titulo}
        mensaje={alerta?.mensaje}
        botones={alerta?.botones}
        onClose={() => setAlerta(null)}
      />
    </View>
  );
};

export default UbicacionEntregaR;
