import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import imgevento from "./../../../assets/eventoimg.jpeg";
import logoevento from "./../../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";

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
        height: 160,
        marginVertical: 20,
        marginHorizontal: 20,
        borderColor: Colors?.GrisClaroPeroNoTanClaro,
        borderWidth: 2,
      }}
      onPress={() => seleccionarPuesto(item)}
    >
      <View
        style={{
          position: "absolute",
          top: -15,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: "center",
        }}
      >
        <Image
          source={imgevento}
          style={{ width: "90%", height: "40%", borderRadius: 10 }}
          resizeMode="cover"
        />
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 75,
            height: 75,
            backgroundColor: Colors.Blanco,
            borderRadius: 10,
            shadowColor: Colors.Negro,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Image
            source={logoevento}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            resizeMode="cover"
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center", marginTop: 60 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 5,
              textAlign: "center",
              color: Colors.Negro,
            }}
          >
            {item.nombre}
          </Text>
          <Text
            style={{ fontSize: 16, textAlign: "center", color: Colors.Negro }}
          >
            {item.descripcion}
          </Text>
        </View>
      </View>
      {/*falta precio, favoritos y otra info*/}
    </TouchableOpacity>
  );
};

export default CardProducto;
