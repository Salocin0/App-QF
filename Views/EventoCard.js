import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import logoevento from "./../assets/logoevento.webp";
import useDynamicColors from "../Styles/useDynamicColors";
import { getDistance } from "geolib";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

// Card de evento compartida: la usan tanto la pantalla de "comprar" (elegir
// puesto de un evento) como las de "asociarse" (repartidor/encargado de
// puestos a un evento). Mismo diseño en las tres, cada pantalla solo le pasa
// su propio `onPress`.
const EventoCard = ({ item, onPress }) => {
  const Colors = useDynamicColors();
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [imgError, setImgError] = useState(false);

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

  const calcularTiempoRestante = (fecha) => {
    const horasTotales = Math.floor((fecha - new Date()) / (1000 * 60 * 60));
    const dias = Math.floor(horasTotales / 24);
    const horas = horasTotales % 24;
    if (dias > 0) {
      return `${dias} día${dias > 1 ? "s" : ""} y ${horas} hora${horas !== 1 ? "s" : ""}`;
    }
    return `${horas} hora${horas !== 1 ? "s" : ""}`;
  };

  const fechaInicio = item?.diaEventos?.length
    ? new Date(Math.min(...item.diaEventos.map((d) => new Date(d.fechaHoraInicioDiaEvento))))
    : null;
  const fechaFin = item?.diaEventos?.length
    ? new Date(Math.max(...item.diaEventos.map((d) => new Date(d.fechaHoraFinDiaEvento))))
    : null;

  const ahora = new Date();
  const eventoFinalizado = fechaFin && fechaFin <= ahora;
  const eventoEnProgreso = fechaInicio && fechaFin && fechaInicio <= ahora && fechaFin > ahora;

  const textoTiempo = !fechaInicio || !fechaFin
    ? "Fecha no disponible"
    : fechaInicio > ahora
    ? `Empieza en ${calcularTiempoRestante(fechaInicio)}`
    : fechaFin > ahora
    ? `Termina en ${calcularTiempoRestante(fechaFin)}`
    : "Finalizado";

  const textoBadge = eventoFinalizado
    ? "Finalizado"
    : eventoEnProgreso
    ? "En progreso"
    : fechaInicio
    ? "Empieza pronto"
    : null;

  const ubicacion = [item?.ubicacion, item?.localidad, item?.provincia]
    .map((part) => (typeof part === "string" ? part.trim() : ""))
    .filter(Boolean)
    .reduce((acc, part) => {
      if (!acc.some((existing) => existing.toLowerCase().includes(part.toLowerCase()))) acc.push(part);
      return acc;
    }, [])
    .join(", ");

  const fechaTexto = fechaInicio
    ? fechaInicio.toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })
    : null;

  const fondoCard = Colors.modoOscuroActivo ? "#2a2a2a" : "#ffffff";
  const fondoImagen = Colors.modoOscuroActivo ? "#1e1e1e" : "#f2f2f2";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        backgroundColor: fondoCard,
        marginVertical: 8,
        marginHorizontal: 20,
        borderRadius: 14,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: Colors.BordeDorado,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
      }}
      onPress={() => onPress?.(item)}
    >
      <View style={{ backgroundColor: fondoImagen, padding: 12 }}>
        <Image
          source={item?.img && !imgError ? { uri: item.img } : logoevento}
          onError={() => setImgError(true)}
          style={{ width: "100%", height: 150, borderRadius: 6, backgroundColor: "#f7f5ef" }}
          resizeMode="contain"
        />
        {textoBadge && (
          <View
            style={{
              position: "absolute",
              top: 18,
              left: 18,
              backgroundColor: eventoEnProgreso ? "#4caf50" : eventoFinalizado ? "#757575" : "#f5b942",
              borderRadius: 20,
              paddingVertical: 4,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#1a1a1a" }}>{textoBadge}</Text>
          </View>
        )}
        {item?.tienePreventa && (
          <View
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              backgroundColor: Colors.BordeDorado,
              borderRadius: 20,
              paddingVertical: 4,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#000000" }}>Preventa</Text>
          </View>
        )}
      </View>

      <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12 }}>
        <Text
          numberOfLines={2}
          style={{ fontSize: 19, fontWeight: "bold", color: Colors.BordeDorado, textAlign: "center", marginBottom: 6 }}
        >
          {item?.nombre}
        </Text>
        {!!item?.descripcion && (
          <Text
            numberOfLines={2}
            style={{ fontSize: 14, lineHeight: 20, color: Colors.modoOscuroActivo ? "#e0e0e0" : "#333333", textAlign: "center", marginBottom: 8 }}
          >
            {item.descripcion}
          </Text>
        )}

        {!!ubicacion && (
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 2 }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} color={Colors.BordeDorado} size={12} />
            <Text numberOfLines={1} style={{ flexShrink: 1, fontSize: 13, fontWeight: "600", color: Colors.BordeDorado, marginLeft: 5 }}>
              {ubicacion}
            </Text>
          </View>
        )}
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          {fechaTexto && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesomeIcon icon={faCalendarAlt} color={Colors.BordeDorado} size={12} />
              <Text style={{ fontSize: 13, fontWeight: "600", color: Colors.BordeDorado, marginLeft: 5 }}>{fechaTexto}</Text>
            </View>
          )}
          {locationPermission && location && distance !== null && (
            <Text style={{ fontSize: 13, fontWeight: "600", color: Colors.BordeDorado, marginLeft: fechaTexto ? 10 : 0 }}>
              · A {distance} km
            </Text>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 12,
            paddingTop: 10,
            borderTopWidth: 1,
            borderColor: Colors.BordeDorado,
          }}
        >
          <Text numberOfLines={1} style={{ flexShrink: 1, fontSize: 13, color: Colors.modoOscuroActivo ? "#cccccc" : "#555555", marginRight: 8 }}>
            {textoTiempo}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: Colors.BordeDorado }}>Ver evento →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventoCard;