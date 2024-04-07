import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import logoevento from "./../../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

const CardProducto = ({ item, navigation }) => {
  const Colors = useDynamicColors();
  const seleccionarPuesto = (evento) => {
    navigation.navigate("Detalle", { evento });
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
        flexDirection: "row",
        height: 170,
        marginVertical: 5,
        marginHorizontal: 20,
        borderColor: Colors?.GrisClaroPeroNoTanClaro,
        borderWidth: 2,
      }}
      onPress={() => seleccionarPuesto(item)}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 75,
          height: 75,
          backgroundColor: Colors.Blanco,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          borderBottomWidth:1,
          borderColor:Colors.Negro
        }}
      >
        <Image source={logoevento} style={{ maxWidth: 75, height: "100%", borderTopLeftRadius: 5 }} resizeMode="cover" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 5,
            textAlign: "center",
            color: Colors.Negro,
            width: "100%",
            paddingRight: 75,
          }}
        >
          {item.nombre}
        </Text>
      </View>
      <View style={{ flex: 1, paddingTop: 80, backgroundColor: Colors.GrisClaro, borderRadius: 5, zIndex: -1 }}>
        <Text style={{ fontSize: 16, textAlign: "center", color: Colors.Negro }}>{item.descripcion}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10,justifyContent: "center" }}>
          <View style={{ marginRight: 5 }}>
            <FontAwesomeIcon icon={faMoneyBillWave} color={Colors.Verde} size={20} />
          </View>
          <Text style={{ fontSize: 16, color: Colors.Negro }}>{item.precio || "5.99"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardProducto;
