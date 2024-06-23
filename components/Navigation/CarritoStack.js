import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Carrito from "./../../Views/Carrito/Carrito";
import ConfigNotifiButtom from "./ConfigNotifiButtom";
import Config from "./../../Views/Config/Config";
import Notificaciones from "./../../Views/Notificaciones/Notificaciones";
import useDynamicColors from "./../../Styles/useDynamicColors";

const Stack = createNativeStackNavigator();
const CarritoStack = () => {
  const Colors = useDynamicColors()
  return (
    <Stack.Navigator 
    initialRouteName="Carrito"
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.Blanco,
      },
      headerTintColor: Colors.Negro,
    }}>
      <Stack.Screen
        name="Carrito"
        component={Carrito}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />
      <Stack.Screen name="Notificaciones" component={Notificaciones} />
      <Stack.Screen name="Config" component={Config} />
    </Stack.Navigator>
  );
};

export default CarritoStack;
