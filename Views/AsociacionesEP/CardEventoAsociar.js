import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
} from "react-native";
import imgevento from "./../../assets/eventoimg.jpeg";
import logoevento from "./../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useCreateAsociacionMutation } from "@/components/App/Service/AsociacionesApi";
import { useSelector } from "react-redux";

const CardEventoAsociar = ({ item, navigation, selectedPuestoId }) => {
  const Colors = useDynamicColors();
  const [useCreateAsociacion] = useCreateAsociacionMutation();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;
  const seleccionarPuesto = (evento) => {
    const resultado = useCreateAsociacion({
      eventoId: item.id,
      puestoId: selectedPuestoId,
      consumidorId: userId,
    });
    ToastAndroid.show("Asociacion Enviada", ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#222222",
        borderRadius: 10,
        shadowColor: Colors.BordeDorado,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: "column",
        height: 200,
        marginVertical: 5,
        marginHorizontal: 20,
        overflow: "hidden",
        borderColor: Colors.BordeDorado,
        borderWidth: 2,
      }}
      onPress={() => seleccionarPuesto(item)}
    >
      <View style={{ flex: 2 }}>
        <Image
          source={item?.img ? { uri: item.img } : imgevento}
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
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
            source={item?.img ? { uri: item.img } : logoevento}
            style={{
              width: 75,
              height: 75,
              borderRadius: 10,
              margin: 10,
              borderWidth: 2,
              borderColor: Colors.BordeDorado,
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
              color: "#ffffff",
            }}
          >
            {item.nombre}
          </Text>
          <Text
            style={{ fontSize: 14, textAlign: "center", color: "#cccccc" }}
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
          borderColor: Colors.BordeDorado,
          backgroundColor: "#1a1a1a",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <Text style={{ fontSize: 16, color: Colors.BordeDorado }}>
          Empieza en 3 días
        </Text>
        <Text style={{ fontSize: 16, color: Colors.BordeDorado }}>A 30 Km</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardEventoAsociar;
