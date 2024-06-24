import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfigNotifiButtom from "./ConfigNotifiButtom";
import Config from "../../Views/Config/Config";
import Notificaciones from "../../Views/Notificaciones/Notificaciones";
import useDynamicColors from "../../Styles/useDynamicColors";
import MisAsociacionesEP from "../../Views/AsociacionesEP/MisAsociaciones";
import AsociarseEventoEP from "../../Views/AsociacionesEP/AsociarseEventoEP";

const Stack = createNativeStackNavigator();

const MisAsociacionesEPStack = () => {
  const Colors = useDynamicColors();
  return (
    <Stack.Navigator
      initialRouteName="Mis Asociaciones"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.Blanco,
        },
        headerTintColor: Colors.Negro,
      }}
    >
      <Stack.Screen
        name="Mis Asociaciones"
        component={MisAsociacionesEP}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />
      <Stack.Screen name="Asociarse a Evento" component={AsociarseEventoEP} />
      <Stack.Screen name="Config" component={Config} />
      <Stack.Screen name="Notificaciones" component={Notificaciones} />
    </Stack.Navigator>
  );
};

export default MisAsociacionesEPStack;
