import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Location from 'expo-location';
import { useUpdateUbicacionMutation } from "./App/Service/locationApi";

const LocationTracker = () => {
  const user = useSelector((state) => state.auth); 
  const isLoggedIn = user?.id;
  const idUsuario = user?.id; 

  const [updateUbicacion] = useUpdateUbicacionMutation();

  useEffect(() => {
    let locationInterval;

    const startTrackingLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permiso de ubicación denegado');
        return;
      }

      const trackLocation = async () => {
        try {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude: latitud, longitude: longitud } = location.coords;
          const response = await updateUbicacion({ idUsuario, latitud, longitud });
        } catch (error) {
          console.error("Error al obtener o actualizar la ubicación:", error);
        }
      };
      locationInterval = setInterval(trackLocation, 5000);
    };

    if (isLoggedIn) {
      startTrackingLocation();
    }

    return () => {
      if (locationInterval) {
        clearInterval(locationInterval);
      }
    };
  }, [isLoggedIn, idUsuario, updateUbicacion]); 

  return null;
};

export default LocationTracker;
