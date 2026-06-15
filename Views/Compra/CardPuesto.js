import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import imgevento from "./../../assets/eventoimg.jpeg";
import logoevento from "./../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";

const CardPuesto = ({ item, navigation, precompra, fecha, evento }) => {
  const Colors = useDynamicColors();
  const seleccionarPuesto = (puesto) => {
    navigation.navigate("Productos", {
      evento,
      puesto: puesto,
      precompra,
      fecha,
    });
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#222222",
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        height: 140,
        marginVertical: 8,
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.BordeDorado,
        shadowColor: Colors.BordeDorado,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}
      onPress={() => seleccionarPuesto(item)}
    >
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          overflow: "hidden",
          marginRight: 15,
          borderWidth: 1,
          borderColor: Colors.BordeDorado,
        }}
      >
        <Image
          source={
            item?.img
              ? { uri: item?.img }
              : require("./../../assets/logoevento.webp")
          }
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: Colors.BordeDorado,
            marginBottom: 4,
          }}
        >
          {item.nombreCarro}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#cccccc",
            marginBottom: 8,
          }}
        >
          {item.tipoNegocio}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardPuesto;
