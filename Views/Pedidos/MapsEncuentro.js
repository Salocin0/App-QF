import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import useDynamicColors from '@/Styles/useDynamicColors';

MapboxGL.setAccessToken('your-mapbox-access-token-here');

const { width, height } = Dimensions.get('window');

const MapWithDirection = ({ meetingPoint, user2 }) => {
  const Colors = useDynamicColors();
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [magnetometerData, setMagnetometerData] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Estado para manejar la carga de datos
  

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

      setIsDataLoaded(true); // Indica que los datos están listos
    }
  }, [location, meetingPoint, user2]);

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  if (!isDataLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors?.Naranja} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isMapLoaded && (
        <ActivityIndicator size="large" color={Colors?.Naranja} style={styles.loadingIndicator} />
      )}
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MapboxGL.StyleURL.Street}
        onDidFinishLoadingMap={handleMapLoad}
      >
        <MapboxGL.Images images={{
          markUser: require('./../../assets/markUser.png'),
          markR: require('./../../assets/markR.png'),
        }} />
        
        {bounds && (
          <MapboxGL.Camera
            bounds={{
              ne: bounds.northEast,
              sw: bounds.southWest
            }}
            padding={40}
            animationMode="flyTo"
            heading={heading}
          />
        )}
        {location && (
          <MapboxGL.ShapeSource id="currentLocationSource" shape={{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [location.longitude, location.latitude],
            },
          }}>
            <MapboxGL.SymbolLayer
              id="currentLocationLayer"
              style={{
                iconImage: 'markUser',
                iconSize: 0.05,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
        <MapboxGL.PointAnnotation
          coordinate={[meetingPoint.lng, meetingPoint.lat]}
          id="meetingPoint"
        >
          <MapboxGL.Callout title="Punto de encuentro" />
        </MapboxGL.PointAnnotation>
        
        {user2 && (
          <MapboxGL.ShapeSource id="user2Source" shape={{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [user2.lng, user2.lat],
            },
          }}>
            <MapboxGL.SymbolLayer
              id="user2Layer"
              style={{
                iconImage: 'markR',
                iconSize: 0.05,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Center the loading indicator
  },
});

export default MapWithDirection;
