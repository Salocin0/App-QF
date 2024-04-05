import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventosP from "../Views/Eventos/EventosP";
import ConfigNotifiButtom from "./ConfigNotifiButtom";
import config from "../Views/Config/Config";
import Notificaciones from "../Views/Notificaciones/Notificaciones";
import useDynamicColors from "../Styles/useDynamicColors";

const Stack = createNativeStackNavigator();

const EventosPStack = () => {
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
        name="Mis Eventos"
        component={EventosP}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />
      <Stack.Screen name="Config" component={config} />
      <Stack.Screen name="Notificaciones" component={Notificaciones} />
    </Stack.Navigator>
  );
};

export default EventosPStack;
