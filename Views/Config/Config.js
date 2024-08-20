import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activarModoOscuro,
  desactivarModoOscuro,
} from "./../../components/Features/modoOscuro/modoOscuroSlice";
import { Switch, Text, View } from "react-native";
import useDynamicColors from "@/Styles/useDynamicColors";

const Config = () => {
  const Colors = useDynamicColors();
  const modoOscuroActivo = useSelector(
    (state) => state.modoOscuro.modoOscuroActivo
  );
  const dispatch = useDispatch();

  const handleCambiarModoOscuro = () => {
    if (modoOscuroActivo) {
      dispatch(desactivarModoOscuro());
    } else {
      dispatch(activarModoOscuro());
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors?.GrisClaro,
      }}
    >
      <Text style={{ fontSize: 24, marginVertical: 10, marginLeft: 10,color:Colors?.Negro}}>
        Configuraciones
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 20, color: Colors?.Negro, flex: 1 }}>Modo Oscuro</Text>
        <Switch
          value={modoOscuroActivo}
          onValueChange={handleCambiarModoOscuro}
          thumbColor={Colors?.Info}
          trackColor={Colors?.Gris}
        />
      </View>
    </View>
  );
};

export default Config;
