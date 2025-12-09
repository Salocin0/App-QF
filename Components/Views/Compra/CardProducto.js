import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import logoevento from "./../../../assets/logoevento.webp";
import useDynamicColors from "../../Styles/useDynamicColors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

const CardProducto = ({ item, navigation }) => {
  const Colors = useDynamicColors();
  const seleccionarPuesto = (producto) => navigation.navigate("Detalle", { producto, puesto: item });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        backgroundColor: Colors.Blanco,
        borderRadius: 12,
        shadowColor: Colors.Negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 3,
        flexDirection: "row",
        height: 140,
        marginVertical: 8,
        marginHorizontal: 20,
        borderColor: Colors?.GrisClaroPeroNoTanClaro,
        borderWidth: 1,
        overflow: 'hidden'
      }}
      onPress={() => seleccionarPuesto(item)}
    >
      <Image
        source={logoevento}
        style={{ width: 120, height: "100%" }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, padding: 12, justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: '700', color: Colors.Negro }}>{item.nombre}</Text>
          <Text numberOfLines={2} style={{ fontSize: 14, color: Colors.Negro, marginTop: 6 }}>{item.descripcion}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faMoneyBillWave} color={Colors.Verde} size={18} />
            <Text style={{ fontSize: 16, color: Colors.Negro, marginLeft: 8 }}>${item.precio ?? '5.99'}</Text>
          </View>
          <Text style={{ fontSize: 12, color: Colors.Gris }}>{item.categoria ?? ''}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardProducto;
