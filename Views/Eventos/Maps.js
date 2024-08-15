import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import useDynamicColors from '@/Styles/useDynamicColors';

Mapbox.setAccessToken('pk.eyJ1Ijoic2Fsb2NpbjAiLCJhIjoiY2x5MzM3cTNjMDRjZTJpb2V6YjIwang2aiJ9.EwY5bcY30BY-DTIeYJzAPg');

const Maps = ({ points }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [bounds, setBounds] = useState(null);
  const Colors = useDynamicColors();

  useEffect(() => {
    if (points.length > 0) {
      const latitudes = points.map(point => point.lat);
      const longitudes = points.map(point => point.lng);

      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);

      const latitudeDelta = maxLat - minLat;
      const longitudeDelta = maxLng - minLng;

      // Calcular un margen proporcional
      const margin = Math.max(latitudeDelta, longitudeDelta) * 0.2; // Ajusta el factor si es necesario

      setBounds({
        northEast: [maxLng + margin, maxLat + margin],
        southWest: [minLng - margin, minLat - margin]
      });
    }
  }, [points]);

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  return (
    <View style={styles.container}>
      {!isMapLoaded && (
        <ActivityIndicator size="large" color={Colors.Naranja} style={styles.loadingIndicator} />
      )}
      <Mapbox.MapView
        style={styles.map}
        styleURL={Mapbox.StyleURL.Street}
        onDidFinishLoadingMap={handleMapLoad}
      >
        {bounds && (
          <Mapbox.Camera
            bounds={{
              ne: bounds.northEast,
              sw: bounds.southWest
            }}
            padding={40} // Ajusta el padding si es necesario
          />
        )}
        {points.map((point, index) => (
          <Mapbox.PointAnnotation
            key={index}
            id={`point-${index}`}
            coordinate={[point.lng, point.lat]}
          />
        ))}
      </Mapbox.MapView>
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
    width: 300,
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
  },
  loadingIndicator: {
    position: 'absolute',
  },
});

export default Maps;
