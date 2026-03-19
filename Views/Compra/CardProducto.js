import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import logoevento from "./../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";

const CardProducto = ({ item, navigation, precompra, fecha, evento }) => {
  const Colors = useDynamicColors();

  const seleccionarPuesto = (producto) => {
    navigation.navigate("Detalle", {
      producto,
      puesto: item,
      precompra,
      fecha,
      evento,
    });
  };

  return (
    <TouchableOpacity
      style={{
        ...Colors.Styles.card,
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 20,
        height: 130, // Más compacto como en la web
        borderColor: Colors.modoOscuroActivo ? Colors.BordeDorado : Colors.GrisClaroPeroNoTanClaro,
        borderWidth: 1,
        backgroundColor: Colors.Blanco,
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
          backgroundColor: Colors.GrisClaro,
          marginRight: 15,
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
              color: Colors.Negro,
              marginBottom: 2,
            }}
            numberOfLines={1}
          >
            {item.nombre}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: Colors.Gris,
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
                color: Colors.Naranja,
                marginRight: 2,
              }}
            >
              $
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: Colors.Negro,
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
