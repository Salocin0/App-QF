import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EventosP from '../Views/Eventos/EventosP'
import ConfigNotifiButtom from './ConfigNotifiButtom'
import config from '../Views/Config/Config'
import Notificaciones from '../Views/Notificaciones/Notificaciones'

const Stack = createNativeStackNavigator()

const EventosPStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Mis Eventos' component={EventosP} options={{ headerRight: () => <ConfigNotifiButtom /> }}/>
        <Stack.Screen name='Config' component={config}/>
        <Stack.Screen name='Notificaciones' component={Notificaciones}/>
    </Stack.Navigator>
  )
}

export default EventosPStack
