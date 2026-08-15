import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import imgevento from "./../../assets/eventoimg.jpeg";
import logoevento from "./../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { getDistance } from "geolib";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const CardEvento = ({ item, navigation }) => {
  const Colors = useDynamicColors();
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);


  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === "granted");
    };

    getLocationPermission();
  }, []);

  useEffect(() => {
    if (locationPermission) {
      const getLocation = async () => {
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      };

      getLocation();
    }
  }, [locationPermission]);

  useEffect(() => {
    if (location) {
      const eventoCoords = item?.coords
        ? { latitude: item?.coords?.latitude, longitude: item?.coords?.longitude }
        : { latitude: -32.410563, longitude: -63.243426 }; // Default coordinates if item.coords is undefined
      const distancia = getDistance(location, eventoCoords) / 1000;
      setDistance(distancia.toFixed(1));
    }
  }, [location, item?.coords]);

  const seleccionarPuesto = (evento) => {
    // Siempre mostrar la ventana intermedia para elegir el tipo de compra
    navigation.navigate("TipoCompra", { evento });
  };

  const calcularHorasRestantes = (fecha) => {
    const ahora = new Date();
    const diferencia = fecha - ahora;
    const horasRestantes = Math.round(diferencia / (1000 * 60 * 60));
    return horasRestantes;
  };

  // Safeguard against undefined diaEventos
  const fechaInicio = item?.diaEventos?.length
    ? new Date(Math.min(...item.diaEventos.map(d => new Date(d.fechaHoraInicioDiaEvento))))
    : null;
  const fechaFin = item?.diaEventos?.length
    ? new Date(Math.max(...item.diaEventos.map(d => new Date(d.fechaHoraFinDiaEvento))))
    : null;

  const tiempoHastaInicio = fechaInicio
    ? formatDistanceToNow(fechaInicio, { addSuffix: true, locale: es })
    : "Fecha no disponible";
  const tiempoHastaFin = fechaFin
    ? `Termina en ${calcularHorasRestantes(fechaFin)} horas`
    : "Fecha no disponible";

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#222222",
        flexDirection: "column",
        height: 200,
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: Colors.BordeDorado,
        shadowColor: Colors.BordeDorado,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}
      onPress={() => seleccionarPuesto(item)}
    >
      <View style={{ flex: 2 }}>
        <Image
          source={imgevento}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      </View>
      <View style={{ flex: 3, flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={
              item?.img
                ? { uri: item?.img }
                : logoevento
            }
            style={{
              width: 75,
              height: 75,
              borderRadius: 5,
              margin: 10,
              borderWidth: 2,
              borderColor: Colors.BordeDorado,
            }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            flex: 2,
            paddingVertical: 10,
            justifyContent: "center",
            paddingEnd: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 5,
              textAlign: "left",
              color: "#ffffff",
            }}
          >
            {item?.nombre}
          </Text>
          <Text
            style={{ fontSize: 14, textAlign: "left", color: "#cccccc" }}
          >
            {item?.descripcion}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderTopWidth: 1,
          borderColor: Colors.BordeDorado,
          backgroundColor: "#1a1a1a",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesomeIcon
            icon={faCalendarAlt}
            color={Colors.BordeDorado}
            size={16}
          />
          <Text style={{ fontSize: 16, color: "#cccccc", marginLeft: 5 }}>
            {fechaInicio > new Date() ? `Empieza ${tiempoHastaInicio}` : tiempoHastaFin}
          </Text>
        </View>
        {locationPermission && location && distance !== null && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              color={Colors.BordeDorado}
              size={16}
            />
            <Text style={{ fontSize: 16, color: "#cccccc", marginLeft: 5 }}>
              A {distance} km
            </Text>
          </View>
        )}
      </View>

      {item?.tienePreventa && (
        <View
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: Colors.BordeDorado,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "#000000", fontWeight: "bold" }}>
            Precompra
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CardEvento;
