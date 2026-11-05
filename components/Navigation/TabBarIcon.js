import { StyleSheet, Text, View, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useDynamicColors from "./../../Styles/useDynamicColors";

const BASE_WIDTH = 375;
const scale = Dimensions.get("window").width / BASE_WIDTH;
const ICON_SIZE = Math.round(21 * scale);
const FONT_SIZE = Math.round(10.5 * scale);

const TabBarIcon = ({ title, nameIcon, focused }) => {
  const Colors = useDynamicColors();

  const styles = {
    container: {
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      textAlign: "center",
      fontSize: FONT_SIZE,
      lineHeight: FONT_SIZE + 2,
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
        size={ICON_SIZE}
        color={focused ? (Colors?.modoOscuroActivo ? Colors?.BordeDorado : Colors?.Naranja) : Colors?.GrisOscuro}
      />
      <Text
        style={[styles.text, focused && styles.textFocused]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </View>
  );
};

export default TabBarIcon;
