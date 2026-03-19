import React, { useState } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import CompraInmediataCard from "./CompraInmediataCard";
import PrecompraCard from "./PrecompraCard";
import useDynamicColors from "@/Styles/useDynamicColors";
import { useRoute } from "@react-navigation/native";

const TipoCompra = ({ navigation }) => {
  const Colors = useDynamicColors();
  const route = useRoute();
  const { evento } = route.params;
  const [fecha, setfecha] = useState();

  const handleNavigateCompra = () => {
    const precompra = false;
    navigation.navigate("Puestos", { evento, precompra });
  };

  const handleNavigatePreCompra = () => {
    const precompra = true;

    navigation.navigate("Puestos", { evento, precompra, fecha });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro }}>
      {evento.estado !== "Confirmado" && (
        <TouchableOpacity onPress={handleNavigateCompra}>
          <CompraInmediataCard />
        </TouchableOpacity>
      )}
      <PrecompraCard setfecha={setfecha} nextNavigate={handleNavigatePreCompra} evento={evento} />
    </View>
  );
};

export default TipoCompra;
