import React from "react";
import Inicio from "./Inicio";
import Login from "./Login";
import SeleccionRegister from "./RegistrarUsuario/SeleccionRegister";
import ProcesoRegistro from "./RegistrarUsuario/ProcesoRegistro";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default Main = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Recuperar Contraseña" component={Inicio} />
      <Stack.Screen name="Registrarse" component={ProcesoRegistro} />
      <Stack.Screen name="Seleccion Perfil" component={SeleccionRegister} />
    </Stack.Navigator>
  );
};
