import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import imgevento from "./../../assets/eventoimg.jpeg";
import logoevento from "./../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faClock } from "@fortawesome/free-solid-svg-icons";

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
        ...Colors.Styles.card,
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        height: 140, // Altura más compacta como en la web
        marginVertical: 8,
        marginHorizontal: 20,
        borderColor: Colors.modoOscuroActivo ? Colors.BordeDorado : Colors?.GrisClaroPeroNoTanClaro,
        borderWidth: 1,
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
            color: Colors.Naranja, // Título naranja como en la web
            marginBottom: 4,
          }}
        >
          {item.nombreCarro}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: Colors.Negro,
            marginBottom: 8,
          }}
        >
          {item.tipoNegocio}
        </Text>

        <View style={{ flexDirection: "row", gap: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesomeIcon icon={faClock} color={Colors.Negro} size={14} />
            <Text style={{ fontSize: 14, color: Colors.Negro, marginLeft: 5 }}>
              {item.time || "30"} Min
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesomeIcon icon={faStar} color={Colors.NaranjaDetalle} size={14} />
            <Text style={{ fontSize: 14, color: Colors.Negro, marginLeft: 5 }}>
              {item.estrellas || "4.5"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardPuesto;
