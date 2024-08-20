import React from "react";
import { StyleSheet, View } from "react-native";
import useDynamicColors from "@/Styles/useDynamicColors";
import MapWithDirection from "./MapsEncuentro";
import InfoPedidoC from "./InfoPedidoC";

const UbicacionEntrega = () => {
  const Colors = useDynamicColors();
  //buscar el pedido
  //buscar el punto de encuentro
  //buscar al repartidor para saber la coordenada
  const defaultMeetingPoint = { lat: -32.4200, lng: -63.2805 };
  const defaultUser2 = { lat: -32.4261, lng: -63.2905 }; 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor:Colors?.GrisClaro
    },
    square: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.square}>
        <MapWithDirection
          meetingPoint={defaultMeetingPoint}
          user2={defaultUser2}
        />
      </View>
      <View style={styles.square}>
        <InfoPedidoC
          repartidor="Juan Pérez"
          ubicacion="Punto de Encuentro 1"
          codigoEntrega="ABC123"
        />
      </View>
    </View>
  );
};



export default UbicacionEntrega;
