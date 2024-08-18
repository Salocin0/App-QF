import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import useDynamicColors from '@/Styles/useDynamicColors';

MapboxGL.setAccessToken('pk.eyJ1Ijoic2Fsb2NpbjAiLCJhIjoiY2x5MzM3cTNjMDRjZTJpb2V6YjIwang2aiJ9.EwY5bcY30BY-DTIeYJzAPg');

const { width, height } = Dimensions.get('window');

const MapWithDirection = ({ meetingPoint, user2 }) => {
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [magnetometerData, setMagnetometerData] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const Colors = useDynamicColors();

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    };

    getLocation();

    const magnetometerSubscription = Magnetometer.addListener((data) => {
      const { x, y } = data;
      if (x !== null && y !== null) {
        const orientation = Math.atan2(y, x) * (180 / Math.PI);
        setMagnetometerData(orientation);
      }
    });

    return () => {
      magnetometerSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (magnetometerData !== null) {
      let adjustment = magnetometerData - 90 - (rotation % 360);
  
      if (adjustment > 180) {
        adjustment -= 360;
      } else if (adjustment < -180) {
        adjustment += 360;
      }
  
      if (Math.abs(adjustment) >= 15) {
        const newRotation = (rotation + adjustment + 360) % 360;
        setRotation(newRotation);
        setHeading(newRotation);
        console.log('Rotación actualizada:', newRotation, adjustment);
      }
    }
  }, [magnetometerData]);

  useEffect(() => {
    if (location && meetingPoint && user2) {
      const coordinates = [
        [location.longitude, location.latitude],
        [meetingPoint.lng, meetingPoint.lat],
        [user2.lng, user2.lat]
      ];

      const latitudes = coordinates.map(([_, lat]) => lat);
      const longitudes = coordinates.map(([lng]) => lng);

      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);

      const latitudeDelta = maxLat - minLat;
      const longitudeDelta = maxLng - minLng;

      const margin = Math.max(latitudeDelta, longitudeDelta) * 0.2;

      setBounds({
        northEast: [maxLng + margin, maxLat + margin],
        southWest: [minLng - margin, minLat - margin]
      });
    }
  }, [location, meetingPoint, user2]);

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  if (!location || !bounds) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      {!isMapLoaded && (
        <ActivityIndicator size="large" color={Colors.Naranja} style={styles.loadingIndicator} />
      )}
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MapboxGL.StyleURL.Street}
        onDidFinishLoadingMap={handleMapLoad}
      >
        {bounds && (
          <MapboxGL.Camera
            bounds={{
              ne: bounds.northEast,
              sw: bounds.southWest
            }}
            padding={40} // Ajusta el padding si es necesario
            animationMode="flyTo" // Opcional: para animaciones suaves
            heading={heading} // Mantiene la rotación basada en la orientación del dispositivo
          />
        )}
        {/* Marcador para la ubicación actual */}
        <MapboxGL.PointAnnotation
          coordinate={[location.longitude, location.latitude]}
          id="currentLocation"
        >
          <MapboxGL.Callout title="Tu ubicación actual" />
        </MapboxGL.PointAnnotation>
        {/* Marcador para el punto de encuentro */}
        <MapboxGL.PointAnnotation
          coordinate={[meetingPoint.lng, meetingPoint.lat]}
          id="meetingPoint"
        >
          <MapboxGL.ImageSource id="meetingPointImage" url="url-de-tu-imagen-de-punto-de-encontro" />
          <MapboxGL.Callout title="Punto de encuentro" />
        </MapboxGL.PointAnnotation>
        {/* Marcador para el segundo usuario */}
        <MapboxGL.PointAnnotation
          coordinate={[user2.lng, user2.lat]}
          id="user2"
        >
          <MapboxGL.ImageSource id="user2Image" url="url-de-tu-imagen-de-usuario2" />
          <MapboxGL.Callout title="Usuario 2" />
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width,
    height: height - 50, // Ajustado para hacer espacio para el botón
  },
  loadingIndicator: {
    position: 'absolute',
  },
});

export default MapWithDirection;
