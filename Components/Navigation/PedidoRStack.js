import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PedidosR from "../Views/Pedidos/PedidosR";
import ConfigNotifiButtom from "./ConfigNotifiButtom";
import Config from "../Views/Config/Config";
import Notificaciones from "../Views/Notificaciones/Notificaciones";
import useDynamicColors from "../Styles/useDynamicColors";

const Stack = createNativeStackNavigator();

const PedidoRStack = () => {
  const Colors = useDynamicColors()
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.Blanco,
        },
        headerTintColor: Colors.Negro,
      }}
    >
      <Stack.Screen
        name="Pedidos asignados"
        component={PedidosR}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />
      <Stack.Screen name="Config" component={Config} />
      <Stack.Screen name="Notificaciones" component={Notificaciones} />
    </Stack.Navigator>
  );
};

export default PedidoRStack;
