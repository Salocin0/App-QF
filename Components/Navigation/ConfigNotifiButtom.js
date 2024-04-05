import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import useDynamicColors from "../Styles/useDynamicColors";

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
        <Icon
          name="cog"
          size={25}
          color={Colors?.Negro}
          style={{ marginHorizontal: 5 }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={goToNotify}>
          <Icon
            name="bell"
            size={25}
            color={Colors?.Negro}
            style={{ marginHorizontal: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToConfig}>
          <Icon
            name="cog"
            size={25}
            color={Colors?.Negro}
            style={{ marginHorizontal: 5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfigNotifiButtom;
