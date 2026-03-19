import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import logoevento from "./../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";

const CardProducto = ({ item, navigation, precompra, fecha, evento }) => {
  const Colors = useDynamicColors();

  const seleccionarPuesto = (producto) => {
    navigation.navigate("Detalle", { producto, puesto: item, precompra, fecha, evento });
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.Blanco,
        borderRadius: 10,
        shadowColor: Colors.Negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: Colors.GrisClaroPeroNoTanClaro,
        borderWidth: 1,
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      }}
      onPress={() => seleccionarPuesto(item)}
    >
      {/* Imagen del producto */}
      <Image
        source={logoevento}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          marginRight: 10,
        }}
        resizeMode="cover"
      />

      {/* Información del producto */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: Colors.Negro,
            marginBottom: 5,
          }}
        >
          {item.nombre}
        </Text>
        <Text style={{ fontSize: 14, color: Colors.Negro, marginBottom: 10 }}>
          {item.descripcion}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesomeIcon
            icon={faMoneyBillWave}
            color={Colors.Verde}
            size={20}
            style={{ marginRight: 5 }}
          />
          <Text style={{ fontSize: 16, color: Colors.Negro }}>
            {item.precio || "5.99"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardProducto;
