import React from "react";
import Inicio from "./Inicio";
import Login from "./Login";
import SeleccionRegister from "./RegistrarUsuario/SeleccionRegister";
import ProcesoRegistro from "./RegistrarUsuario/ProcesoRegistro";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecuperarContraseña from "./RecuperarContraseña";
import MainNavigator from "./Navigation/MainNavigator"

export default Main = () => {
  const Stack = createNativeStackNavigator();
  return (
    <MainNavigator/>
  );
};
