import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useDynamicColors from "./../../Styles/useDynamicColors";

const TabBarIcon = ({ title, nameIcon, focused }) => {
  const Colors = useDynamicColors();

  const styles = {
    container: {
      alignItems: "center",
      justifyContent: "flex-start",
      width: 64,
    },
    text: {
      textAlign: "center",
      fontSize: 12,
      lineHeight: 14,
      width: "100%",
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
      <Text
        style={[styles.text, focused && styles.textFocused]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {title}
      </Text>
    </View>
  );
};

export default TabBarIcon;
