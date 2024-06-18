import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useDynamicColors from "./../../Styles/useDynamicColors";
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

  if (islogin === false) {
    return (
      <TouchableOpacity onPress={goToConfig}>
        <FontAwesomeIcon icon={faGear} color={Colors.Negro} />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={goToNotify}>
          <FontAwesomeIcon icon={faGear} color={Colors.Negro} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToConfig}>
          <FontAwesomeIcon icon={faBell} color={Colors.Negro} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfigNotifiButtom;
