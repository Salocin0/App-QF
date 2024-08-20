import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pedidos from "./../../Views/Pedidos/Pedidos";
import ConfigNotifiButtom from "./ConfigNotifiButtom";
import Config from "./../../Views/Config/Config";
import Notificaciones from "./../../Views/Notificaciones/Notificaciones";
import useDynamicColors from "./../../Styles/useDynamicColors";
import DetallePedido from "./../../Views/Pedidos/DetallePedido";
import UbicacionEntrega from "./../../Views/Pedidos/UbicacionEntrega"

const Stack = createNativeStackNavigator();

const PedidoStack = () => {
  const Colors = useDynamicColors();
  return (
    <Stack.Navigator
    initialRouteName="Pedidos"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors?.Blanco,
        },
        headerTintColor: Colors?.Negro,
      }}
    >
      <Stack.Screen name="Pedidos" component={Pedidos} options={{ headerRight: () => <ConfigNotifiButtom /> }} />
      <Stack.Screen name="Config" component={Config} />
      <Stack.Screen name="Notificaciones" component={Notificaciones} />
      <Stack.Screen name="Detalle Pedido" component={DetallePedido} options={{ headerRight: () => <ConfigNotifiButtom /> }} />
      <Stack.Screen name="Ubicacion Pedido" component={UbicacionEntrega} options={{ headerRight: () => <ConfigNotifiButtom /> }} />
    </Stack.Navigator>
  );
};

export default PedidoStack;
