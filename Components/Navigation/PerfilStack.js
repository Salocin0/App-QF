import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Perfil from "../Views/Perfil/Perfil";
import ConfigNotifiButtom from "./ConfigNotifiButtom";
import Config from "../Views/Config/Config";
import Notificaciones from "../Views/Notificaciones/Notificaciones";
import useDynamicColors from "../Styles/useDynamicColors";
import EditarPerfil from "../Views/Perfil/EditarPerfil";

const Stack = createNativeStackNavigator();

const PerfilStack = () => {
  const Colors = useDynamicColors();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.Blanco,
        },
        headerTintColor: Colors.Negro,
      }}
    >
      <Stack.Screen name="Perfil" component={Perfil} options={{ headerRight: () => <ConfigNotifiButtom /> }} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ headerRight: () => <ConfigNotifiButtom /> }} />
      <Stack.Screen name="Config" component={Config} />
      <Stack.Screen name="Notificaciones" component={Notificaciones} />
    </Stack.Navigator>
  );
};

export default PerfilStack;
