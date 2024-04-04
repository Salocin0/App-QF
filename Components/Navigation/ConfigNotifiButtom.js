import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../Styles/Colors";
import { View } from "react-native";

const ConfigNotifiButtom = () => {
  const navigation = useNavigation();

  const goToConfig = () => {
    navigation.navigate("Config");
  };

  const goToNotify = () => {
    navigation.navigate("Notificaciones");
  };

  return (
    <View style={{flexDirection:"row"}}>
      <TouchableOpacity onPress={goToNotify}>
        <Icon name="bell" size={25} color={Colors.Negro} style={{ marginHorizontal:5}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToConfig}>
        <Icon name="cog" size={25} color={Colors.Negro} style={{ marginHorizontal:5}}/>
      </TouchableOpacity>
    </View>
  );
};

export default ConfigNotifiButtom;
