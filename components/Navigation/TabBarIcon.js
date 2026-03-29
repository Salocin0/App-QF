import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
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
      color: Colors?.GrisOscuro,
    },
    textFocused: {
      color: Colors?.modoOscuroActivo ? Colors?.BordeDorado : Colors?.Naranja,
    },
  };

  return (
    <View style={styles.container}>
      <FontAwesome5
        name={nameIcon}
        size={25}
        color={focused ? (Colors?.modoOscuroActivo ? Colors?.BordeDorado : Colors?.Naranja) : Colors?.GrisOscuro}
      />
      <Text style={[styles.text, focused && styles.textFocused]}>{title}</Text>
    </View>
  );
};

export default TabBarIcon;
