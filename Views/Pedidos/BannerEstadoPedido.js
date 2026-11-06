import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useDynamicColors from "../../Styles/useDynamicColors";

const DURACION_MS = 6000;

// Aviso breve y no bloqueante de que el pedido cambió de estado mientras se mira la pantalla.
const BannerEstadoPedido = ({ mensaje, onOcultar }) => {
  const Colors = useDynamicColors();
  const opacidad = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!mensaje) return undefined;
    Animated.timing(opacidad, { toValue: 1, duration: 250, useNativeDriver: true }).start();
    const timer = setTimeout(() => {
      Animated.timing(opacidad, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => onOcultar?.());
    }, DURACION_MS);
    return () => clearTimeout(timer);
  }, [mensaje]);

  if (!mensaje) return null;

  const styles = StyleSheet.create({
    banner: {
      position: "absolute",
      top: 16,
      left: 16,
      right: 16,
      zIndex: 10,
      elevation: 6,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#3a2e10",
      borderWidth: 1,
      borderColor: Colors.BordeDorado,
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 14,
    },
    texto: { color: "#ffffff", fontSize: 15, fontWeight: "bold", marginLeft: 8, flex: 1 },
  });

  return (
    <Animated.View style={[styles.banner, { opacity: opacidad }]} accessibilityLiveRegion="polite">
      <Icon name="bell-ring-outline" size={20} color={Colors.BordeDorado} />
      <Text style={styles.texto}>{mensaje}</Text>
    </Animated.View>
  );
};

export default BannerEstadoPedido;
