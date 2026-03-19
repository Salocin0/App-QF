import React from "react";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";
import MainNavigator from "./Navigation/MainNavigator";
import useDynamicColors from "./../Styles/useDynamicColors";
import LocationTracker from "./LocationTracker";

const Main = () => {
  const Colors = useDynamicColors();
  const modoOscuroActivo = useSelector((state) => state.modoOscuro.modoOscuroActivo);

  return (
    <>
      <StatusBar
        barStyle={modoOscuroActivo ? "light-content" : "dark-content"}
        backgroundColor={modoOscuroActivo ? Colors.Blanco : Colors.Blanco}
      />
      <MainNavigator />
      <LocationTracker/>
    </>
  );
};

export default Main;
