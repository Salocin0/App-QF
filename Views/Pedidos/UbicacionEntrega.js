import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useDynamicColors from "../../Styles/useDynamicColors";
import MapWithDirection from "./MapsEncuentro";
import { useRoute } from "@react-navigation/native";

const UbicacionEntrega = () => {
  const Colors = useDynamicColors();
  const route = useRoute();
  const { pedido } = route.params;
  const defaultMeetingPoint = { lat: pedido?.puntoEncuentro?.latitud || -32.63, lng: pedido?.puntoEncuentro?.longitud || -62.69 };
  const defaultUser2 = { lat: pedido?.repartidore?.consumidore?.usuario?.latitud || -32.4261, lng: pedido?.repartidore?.consumidore?.usuario?.longitud || -63.2905 };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.Gris,
    },
    mapContainer: {
      flex: 2,
    },
    card: {
      flex: 1,
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
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapWithDirection
          meetingPoint={defaultMeetingPoint}
          user2={defaultUser2}
          isConsumerView={true}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Código del Pedido</Text>
        <Text style={styles.code}>{pedido.codigoEntrega}</Text>
        
        <View style={styles.infoContainer}>
          <Icon name="cube-outline" size={20} color={Colors.Negro} />
          <Text style={styles.info}><Text style={styles.label}>Nro pedido:</Text> #{pedido.id}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Icon name="account-outline" size={20} color={Colors.Negro} />
          <Text style={styles.info}><Text style={styles.label}>Repartidor:</Text> {pedido?.repartidore?.consumidore?.apellido +", "+pedido.repartidore?.consumidore.nombre}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Icon name="map-marker-outline" size={20} color={Colors.Negro}/>
          <Text style={styles.info}><Text style={styles.label}>Punto de encuentro:</Text> {pedido?.puntoEncuentro?.nombre}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Icon name="storefront-outline" size={20} color={Colors.Negro} />
          <Text style={styles.info}><Text style={styles.label}>Puesto:</Text> {pedido?.puesto?.nombreCarro}</Text>
        </View>
      </View>
    </View>
  );
};


export default UbicacionEntrega;
