import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import useDynamicColors from '@/Styles/useDynamicColors';

Mapbox.setAccessToken('pk.eyJ1Ijoic2Fsb2NpbjAiLCJhIjoiY2x5MzM3cTNjMDRjZTJpb2V6YjIwang2aiJ9.EwY5bcY30BY-DTIeYJzAPg');

const Maps = ({ points }) => {
  const [region, setRegion] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const Colors = useDynamicColors();

  useEffect(() => {
    if (points.length > 0) {
      const latitudes = points.map(point => point.lat);
      const longitudes = points.map(point => point.lng);
      const latitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
      const longitude = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
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
      {region && (
        <Mapbox.MapView
          style={styles.map}
          styleURL={Mapbox.StyleURL.Street}
          onDidFinishLoadingMap={handleMapLoad}
        >
          <Mapbox.Camera
            centerCoordinate={[region.longitude, region.latitude]}
            zoomLevel={17}
          />
          {points.map((point, index) => (
            <Mapbox.PointAnnotation
              key={index}
              id={`point-${index}`}
              coordinate={[point.lng, point.lat]}
            />
          ))}
        </Mapbox.MapView>
      )}
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
