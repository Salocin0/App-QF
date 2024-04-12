import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";

const Perfil = () => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  return (
    <View style={styles.container}>
      <Text style={{ color: Colors.Negro }}>No hay datos en el perfil</Text>
    </View>
  );
};

export default Perfil;

const styles = StyleSheet.create({});
