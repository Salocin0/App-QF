import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import imgevento from "./../../assets/eventoimg.jpeg";
import logoevento from "./../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";

const CardEvento = ({ item, navigation }) => {
  const Colors = useDynamicColors();
  const seleccionarPuesto = (evento) => {
    navigation.navigate("Puestos", { evento });
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
        flexDirection: "column",
        height: 200,
        marginVertical: 5,
        marginHorizontal: 20,
        borderColor: Colors?.Gris,
        borderWidth: 1,
      }}
      onPress={() => seleccionarPuesto(item)}
    >
      <View style={{ flex: 2 }}>
        <Image
          source={imgevento}
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          resizeMode="cover"
        />
      </View>
      <View style={{ flex: 3, flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={logoevento}
            style={{
              width: 75,
              height: 75,
              borderRadius: 10,
              margin: 10,
              borderWidth: 1,
              borderColor: Colors?.Gris,
            }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            flex: 2,
            paddingVertical: 10,
            justifyContent: "center",
            paddingEnd: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 5,
              textAlign: "center",
              color: Colors.Negro,
            }}
          >
            {item.nombre}
          </Text>
          <Text
            style={{ fontSize: 14, textAlign: "center", color: Colors.Negro }}
          >
            {item.descripcion}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 10,
          paddingHorizontal: 10,
          borderTopWidth: 1,
          borderColor: Colors?.GrisClaroPeroNoTanClaro,
          backgroundColor: Colors?.Info,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Text style={{ fontSize: 16, color: Colors.Blanco }}>
          Empieza en 3 días
        </Text>
        <Text style={{ fontSize: 16, color: Colors.Blanco }}>A 30 Km</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardEvento;
