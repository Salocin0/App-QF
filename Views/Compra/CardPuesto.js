import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import imgevento from "./../../assets/eventoimg.jpeg";
import logoevento from "./../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faClock } from "@fortawesome/free-solid-svg-icons";

const CardPuesto = ({ item, navigation,precompra,fecha, evento}) => {
  const Colors = useDynamicColors();
  const seleccionarPuesto = (puesto) => {
    navigation.navigate("Productos", { evento, puesto: puesto,precompra,fecha });
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
      <View style={{ flex: 1, padding: 10,marginTop:70 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <Image
            source={logoevento}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginRight: 10,
            }}
            resizeMode="cover"
          />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 5,
                color: Colors.Negro,
              }}
            >
              {item.nombreCarro}
            </Text>
            <Text style={{ fontSize: 16, color: Colors.Negro }}>{item.tipoNegocio}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: 5 }}>
              <FontAwesomeIcon icon={faClock} color={Colors.Negro} size={20} />
            </View>
            <Text style={{ fontSize: 16, color: Colors.Negro }}>{item.time || "32 min"}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: 5 }}>
              <FontAwesomeIcon icon={faStar} color={Colors.NaranjaDetalle} size={20} />
            </View>
            <Text style={{ fontSize: 16, color: Colors.Negro }}>{item.estrellas || "4.4"}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardPuesto;
