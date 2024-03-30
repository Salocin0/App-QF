import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../Styles/Colors";

const ConfigButton = () => {
  const navigation = useNavigation();

  const goToConfig = () => {
    navigation.navigate("Config");
  };

  return (
    <TouchableOpacity onPress={goToConfig}>
      <Icon name="cog" size={25} color={Colors.Negro} />
    </TouchableOpacity>
  );
};

export default ConfigButton;
