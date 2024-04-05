import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Compra from "../Views/Compra/Compra";
import Inicio from "../Views/Compra/Inicio";
import ConfigNotifiButtom from "./ConfigNotifiButtom";
import Config from "../Views/Config/Config";
import Puestos from "../Views/Compra/Puestos";
import Productos from "../Views/Compra/Productos";
import Detalle from "../Views/Compra/Detalle";
import Notificaciones from "../Views/Notificaciones/Notificaciones";
import useDynamicColors from "../Styles/useDynamicColors";

const Stack = createNativeStackNavigator();

const CompraStack = () => {
  const Colors = useDynamicColors();
  return (
    <Stack.Navigator
      initialRouteName="Eventos"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.Blanco,
        },
        headerTintColor: Colors.Negro,
      }}
    >
      <Stack.Screen
        name="Eventos"
        component={Inicio}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />
      <Stack.Screen
        name="Puestos"
        component={Puestos}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />
      <Stack.Screen
        name="Productos"
        component={Productos}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />
      <Stack.Screen
        name="Detalle"
        component={Detalle}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />
      <Stack.Screen
        name="Compra"
        component={Compra}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />
      <Stack.Screen name="Config" component={Config} />
      <Stack.Screen name="Notificaciones" component={Notificaciones} />
    </Stack.Navigator>
  );
};

export default CompraStack;
