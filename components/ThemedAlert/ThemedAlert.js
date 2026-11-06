import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ThemedModal from "../ThemedModal/ThemedModal";
import useDynamicColors from "../../Styles/useDynamicColors";

const ICONOS = { exito: "check-circle", error: "alert-circle", info: "information" };

/**
 * Aviso con el estilo de la app (reemplaza a Alert.alert del sistema).
 * `botones` usa el mismo formato que ThemedModal; si no se pasa, muestra "Entendido".
 */
const ThemedAlert = ({ visible, tipo = "info", titulo, mensaje, botones, onClose, children }) => {
  const Colors = useDynamicColors();
  const color = { exito: Colors.Verde, error: Colors.Rojo, info: Colors.BordeDorado }[tipo] || Colors.BordeDorado;

  const styles = StyleSheet.create({
    iconCircle: {
      alignSelf: "center",
      width: 76,
      height: 76,
      borderRadius: 38,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: `${color}22`,
      borderWidth: 2,
      borderColor: color,
      marginBottom: 14,
    },
    titulo: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#ffffff",
      textAlign: "center",
      marginBottom: 8,
    },
    mensaje: {
      fontSize: 16,
      color: "#cccccc",
      textAlign: "center",
      lineHeight: 22,
      marginBottom: 14,
    },
  });

  return (
    <ThemedModal
      visible={visible}
      onClose={onClose}
      modalStyle={{ backgroundColor: "#222222", borderWidth: 2, borderColor: Colors.BordeDorado }}
      buttons={botones || [{ text: "Entendido" }]}
    >
      <View style={styles.iconCircle} testID={`themed-alert-${tipo}`}>
        <Icon name={ICONOS[tipo] || ICONOS.info} size={44} color={color} />
      </View>
      {titulo ? <Text style={styles.titulo}>{titulo}</Text> : null}
      {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
      {children}
    </ThemedModal>
  );
};

ThemedAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  tipo: PropTypes.oneOf(["exito", "error", "info"]),
  titulo: PropTypes.string,
  mensaje: PropTypes.string,
  botones: PropTypes.array,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default ThemedAlert;
