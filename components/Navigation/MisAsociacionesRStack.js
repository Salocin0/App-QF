import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MisAsociacionesR from "../../Views/AsociacionesR/MisAsociaciones";
import ConfigNotifiButtom from "./ConfigNotifiButtom";
import Config from "../../Views/Config/Config";
import Notificaciones from "../../Views/Notificaciones/Notificaciones";
import useDynamicColors from "../../Styles/useDynamicColors";
import AsociarseEvento from "@/Views/AsociacionesR/AsociarseEvento";

const Stack = createNativeStackNavigator();

const MisAsociacionesRStack = () => {
  const Colors = useDynamicColors();
  return (
    <Stack.Navigator
      initialRouteName="Mis Asociaciones"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors?.Blanco,
        },
        headerTintColor: Colors?.Negro,
      }}
    >
      <Stack.Screen
        name="Mis Asociaciones"
        component={MisAsociacionesR}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />
      <Stack.Screen name="Asociarse a Evento" component={AsociarseEvento} />
      <Stack.Screen name="Config" component={Config} />
      <Stack.Screen name="Notificaciones" component={Notificaciones} />
    </Stack.Navigator>
  );
};

export default MisAsociacionesRStack;
