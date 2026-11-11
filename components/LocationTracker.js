import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Location from 'expo-location';
import { useUpdateUbicacionMutation } from "./App/Service/locationApi";
import { iniciarSeguimientoUbicacion } from "./Features/ubicacion/seguimientoUbicacion";

// Consumers and couriers both need it: each one sees the other's location on the delivery map.
const LocationTracker = () => {
  const user = useSelector((state) => state.auth);
  const idUsuario = user?.id;

  const [updateUbicacion] = useUpdateUbicacionMutation();

  useEffect(() => {
    if (!idUsuario) return undefined;
    let cancelado = false;
    let detener = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de ubicación denegado');
        return;
      }
      // The user may have logged out while the permission prompt was open.
      if (cancelado) return;
      detener = iniciarSeguimientoUbicacion({
        obtenerUbicacion: async () => {
          const { coords } = await Location.getCurrentPositionAsync({});
          return { latitud: coords.latitude, longitud: coords.longitude };
        },
        enviarUbicacion: ({ latitud, longitud }) => updateUbicacion({ idUsuario, latitud, longitud }),
        onError: (error) => console.error("Error al obtener o actualizar la ubicación:", error),
      });
    })();

    return () => {
      cancelado = true;
      if (detener) detener();
    };
  }, [idUsuario, updateUbicacion]);

  return null;
};

export default LocationTracker;
