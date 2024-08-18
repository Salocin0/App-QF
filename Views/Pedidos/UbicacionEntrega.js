import React from "react";
import { StyleSheet, View } from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";
import MapWithDirection from "./MapsEncuentro"

const UbicacionEntrega = () => {
  const Colors = useDynamicColors();

  const defaultMeetingPoint = { lat: -32.4200, lng: -63.2805 };
  const defaultUser2 = { lat: -32.4261, lng: -63.2905 }; 
  
  return (
    <View style={styles.container}>
      <MapWithDirection
        meetingPoint={defaultMeetingPoint}
        user2={defaultUser2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UbicacionEntrega;
