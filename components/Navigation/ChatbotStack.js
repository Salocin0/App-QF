import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Carrito from "./../../Views/Carrito/Carrito";
import ConfigNotifiButtom from "./ConfigNotifiButtom";
import Config from "./../../Views/Config/Config";
import Notificaciones from "./../../Views/Notificaciones/Notificaciones";
import useDynamicColors from "./../../Styles/useDynamicColors";
import Chatbot from "@/Views/Chatbot/ChatBot";

const Stack = createNativeStackNavigator();
const ChatBotStack = () => {
  const Colors = useDynamicColors()
  return (
    <Stack.Navigator 
    initialRouteName="ChatBot "
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.HeaderBackground,
      },
      headerTintColor: Colors.Negro,
    }}>
      <Stack.Screen
        name="ChatBot "
        component={Chatbot}
        options={{ headerRight: () => <ConfigNotifiButtom /> }}
      />
      <Stack.Screen name="Notificaciones" component={Notificaciones} />
      <Stack.Screen name="Config" component={Config} />
    </Stack.Navigator>
  );
};

export default ChatBotStack;
