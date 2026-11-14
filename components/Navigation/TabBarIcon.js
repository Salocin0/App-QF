import { StyleSheet, Text, View, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useDynamicColors from "./../../Styles/useDynamicColors";

const BASE_WIDTH = 375;
const scale = Dimensions.get("window").width / BASE_WIDTH;
const ICON_SIZE = Math.round(21 * scale);
const FONT_SIZE = Math.round(10.5 * scale);

const TabBarIcon = ({ title, nameIcon, focused, badge = 0 }) => {
  const Colors = useDynamicColors();

  const styles = {
    container: {
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    iconWrap: {
      position: "relative",
    },
    badge: {
      position: "absolute",
      top: -7,
      right: -12,
      minWidth: 18,
      height: 18,
      paddingHorizontal: 4,
      borderRadius: 9,
      backgroundColor: "#D7263D",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: Colors?.HeaderBackground,
    },
    badgeText: {
      color: "#ffffff",
      fontSize: 10,
      lineHeight: 12,
      fontWeight: "bold",
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
      <View style={styles.iconWrap}>
        <FontAwesome5
          name={nameIcon}
          size={ICON_SIZE}
          color={focused ? (Colors?.modoOscuroActivo ? Colors?.BordeDorado : Colors?.Naranja) : Colors?.GrisOscuro}
        />
        {badge > 0 && (
          <View
            style={styles.badge}
            testID="tab-badge"
            accessibilityLabel={`${badge} ${badge === 1 ? "producto" : "productos"} en el carrito`}
          >
            <Text style={styles.badgeText}>{badge > 99 ? "99+" : badge}</Text>
          </View>
        )}
      </View>
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
