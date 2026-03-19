import React from "react";
import { StyleSheet, View } from "react-native";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import AsociarseButton from "./AsociarseButton";
import AsociacionesTabs from "./AsociacionesTabs";

const MisAsociacionesEP = () => {
  const Colors = useDynamicColors();
  const styles = {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 8,
      backgroundColor: Colors?.GrisClaro,
    },
  };

  return (
    <View style={styles.container}>
      <AsociarseButton />
      <AsociacionesTabs />
    </View>
  );
};

export default MisAsociacionesEP;
