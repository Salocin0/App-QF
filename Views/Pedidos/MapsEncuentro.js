import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import useDynamicColors from '@/Styles/useDynamicColors';

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN);

const { width, height } = Dimensions.get('window');

const MapWithDirection = ({ meetingPoint, user2, isConsumerView }) => {
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [magnetometerData, setMagnetometerData] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [initialCamera, setInitialCamera] = useState(null);
  const cameraRef = useRef(null);
  const Colors = useDynamicColors();
  const [imageLoaded, setImageLoaded] = useState(false);

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
    }
  }, [location, meetingPoint, user2]);

  const handleMapLoad = () => {
    setIsMapLoaded(true);
    if (bounds) {
      setInitialCamera({
        bounds: {
          ne: bounds.northEast,
          sw: bounds.southWest,
        },
        padding: 100,
        animationMode: 'flyTo',
        heading: heading,
      });
    }
  };

  const recenterMap = () => {
    if (initialCamera && cameraRef.current) {
      cameraRef.current.setCamera(initialCamera);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width,
      height: height - 50,
    },
    loadingIndicator: {
      position: 'absolute',
    },
    recenterButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 25,
      padding: 10,
      shadowColor: Colors.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    recenterButtonText: {
      fontSize: 16,
      color: Colors.Negro,
    },
  });

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
        <MapboxGL.Images images={{
          markUser: require('./../../assets/markUser.png'),
          markR: isConsumerView ? require('./../../assets/markR.png') : require('./../../assets/markAnother.png'),
        }} />
        
        {bounds && (
          <MapboxGL.Camera
            ref={cameraRef}
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
        <MapboxGL.ShapeSource 
          id="currentLocationSource" 
          shape={{
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
              iconAllowOverlap: true, // Permite que se superpongan iconos
            }}
            onImageLoad={() => setImageLoaded(true)} // Cambia el estado al cargar la imagen
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
      <TouchableOpacity style={styles.recenterButton} onPress={recenterMap}>
        <Text style={styles.recenterButtonText}>Recentrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapWithDirection;
