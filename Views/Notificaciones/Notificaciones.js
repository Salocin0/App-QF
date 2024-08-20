import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "@/Styles/useDynamicColors";
import Aviso from "../Aviso";

const Notificaciones = () => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  return (
    <View style={styles.container}>
      <Aviso>No hay notificaciones</Aviso>
    </View>
  );
};

export default Notificaciones;
