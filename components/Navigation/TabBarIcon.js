import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useDynamicColors from "./../../Styles/useDynamicColors";

const TabBarIcon = ({ title, nameIcon, focused }) => {
  const Colors = useDynamicColors();

  const styles = {
    container: {
      alignItems: "center",
    },
    text: {
      textAlign: "center",
      fontSize: 12,
      color: Colors?.Azul,
    },
    textFocused: {
      color: Colors?.GrisOscuro,
    },
  };

  return (
    <View style={styles.container}>
      <FontAwesome
        name={nameIcon}
        size={25}
        color={focused ? Colors?.Azul : Colors?.GrisOscuro}
      />
      <Text style={[styles.text, !focused && styles.textFocused]}>{title}</Text>
    </View>
  );
};

export default TabBarIcon;
