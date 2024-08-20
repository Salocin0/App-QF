import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventosP from "./../../Views/Eventos/EventosP";
import ConfigNotifiButtom from "./ConfigNotifiButtom";
import config from "./../../Views/Config/Config";
import Notificaciones from "./../../Views/Notificaciones/Notificaciones";
import useDynamicColors from "./../../Styles/useDynamicColors";
import EventoDetalle from "./../../Views/Eventos/EventoDetalle";
import AdministrarAsociaciones from "./../../Views/Eventos/AdministrarAsociaciones"
import AdministrarPuntosEncuentro from "./../../Views/Eventos/AdministrarPuntosEncuentro"

const Stack = createNativeStackNavigator();

const EventosPStack = () => {
  const Colors = useDynamicColors()
  return (
    <Stack.Navigator
    initialRouteName="Mis Eventos"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors?.Blanco,
        },
        headerTintColor: Colors?.Negro,
      }}
    >
      <Stack.Screen
        name="Mis Eventos"
        component={EventosP}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />

      <Stack.Screen name="Config" component={config} />
      <Stack.Screen name="Notificaciones" component={Notificaciones} />
      <Stack.Screen
        name="Detalle Evento"
        component={EventoDetalle}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />
      <Stack.Screen
        name="Administrar Asociaciones"
        component={AdministrarAsociaciones}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />
      <Stack.Screen
        name="Administrar Puntos de encuentro"
        component={AdministrarPuntosEncuentro}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />
    </Stack.Navigator>
  );
};

export default EventosPStack;
