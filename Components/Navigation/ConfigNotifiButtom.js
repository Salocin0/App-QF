import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useDynamicColors from "../Styles/useDynamicColors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear, faBell } from "@fortawesome/free-solid-svg-icons";

const ConfigNotifiButtom = ({ islogin = true }) => {
  const Colors = useDynamicColors();
  const navigation = useNavigation();

  const goToConfig = () => {
    navigation.navigate("Config");
  };

  const goToNotify = () => {
    navigation.navigate("Notificaciones");
  };

  const iconStyle = { marginHorizontal: 8, padding: 6 };

  if (islogin === false) {
    return (
      <TouchableOpacity onPress={goToConfig} accessibilityLabel="Configuración" hitSlop={{top:10,bottom:10,left:10,right:10}} style={iconStyle}>
        <FontAwesomeIcon icon={faGear} color={Colors.Negro} size={20} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {/* Notifications first (bell), then settings (gear). Add spacing and larger touch area. */}
      <TouchableOpacity onPress={goToNotify} accessibilityLabel="Notificaciones" hitSlop={{top:10,bottom:10,left:10,right:10}} style={iconStyle}>
        <FontAwesomeIcon icon={faBell} color={Colors.Negro} size={20} />
      </TouchableOpacity>

      <TouchableOpacity onPress={goToConfig} accessibilityLabel="Configuración" hitSlop={{top:10,bottom:10,left:10,right:10}} style={iconStyle}>
        <FontAwesomeIcon icon={faGear} color={Colors.Negro} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default ConfigNotifiButtom;
