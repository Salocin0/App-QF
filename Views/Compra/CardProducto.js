import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import logoevento from "./../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";

const CardProducto = ({ item, navigation, precompra, fecha, evento, puesto }) => {
  const Colors = useDynamicColors();

  const seleccionarPuesto = (producto) => {
    navigation.navigate("Detalle", {
      producto,
      puesto,
      precompra,
      fecha,
      evento,
    });
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#222222",
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 20,
        height: 130,
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
      {/* Imagen del producto */}
      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: 8,
          overflow: "hidden",
          backgroundColor: "#333333",
          marginRight: 15,
          borderWidth: 1,
          borderColor: Colors.BordeDorado,
        }}
      >
        <Image
          source={
            item?.img
              ? { uri: item?.img }
              : logoevento
          }
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      </View>

      {/* Información del producto */}
      <View style={{ flex: 1, justifyContent: "space-between", height: "100%" }}>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: 2,
            }}
            numberOfLines={1}
          >
            {item.nombre}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#cccccc",
              lineHeight: 16,
            }}
            numberOfLines={2}
          >
            {item.descripcion}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: Colors.BordeDorado,
                marginRight: 2,
              }}
            >
              $
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: Colors.BordeDorado,
              }}
            >
              {item.precio}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardProducto;
