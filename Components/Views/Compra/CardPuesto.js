import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import imgevento from "./../../../assets/eventoimg.jpeg";
import logoevento from "./../../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faClock } from "@fortawesome/free-solid-svg-icons";

const CardPuesto = ({ item, navigation }) => {
  const Colors = useDynamicColors();
  const seleccionarPuesto = (evento) => {
    navigation.navigate("Productos", { evento });
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
        height: 200,
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
          right: 0,
          bottom: 0,
          alignItems: "center",
        }}
      >
        <Image
          source={imgevento}
          style={{
            width: "100%",
            height: "40%",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
          resizeMode="cover"
        />
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 80,
            height: 80,
            backgroundColor: Colors.Blanco,
            borderTopLeftRadius: 5,
          }}
        >
          <Image source={logoevento} style={{ width: "100%", height: "100%", borderTopLeftRadius: 5 }} resizeMode="cover" />
        </View>
        <View style={{ flex: 1, justifyContent: "center", marginTop: 75 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 5,
              textAlign: "center",
              color: Colors.Negro,
            }}
          >
            {item.nombreCarro}
          </Text>
          <Text style={{ fontSize: 16, textAlign: "center", color: Colors.Negro }}>{item.tipoNegocio}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              <View style={{ marginRight: 5 }}>
                <FontAwesomeIcon icon={faClock} color={Colors.Negro} size={20} />
              </View>
              <Text style={{ fontSize: 16, color: Colors.Negro }}>{item.time || "32 min"}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              <View style={{ marginRight: 5 }}>
                <FontAwesomeIcon icon={faStar} color={Colors.NaranjaDetalle} size={20} />
              </View>
              <Text style={{ fontSize: 16, color: Colors.Negro }}>{item.estrellas || "4.4"}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardPuesto;
