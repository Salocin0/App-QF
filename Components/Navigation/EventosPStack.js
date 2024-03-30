import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EventosP from '../Views/Eventos/EventosP'
import ConfigButtom from './ConfigButtom'
import config from '../Views/Config/Config'

const Stack = createNativeStackNavigator()

const EventosPStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Mis Eventos' component={EventosP} options={{ headerRight: () => <ConfigButtom /> }}/>
        <Stack.Screen name='Config' component={config}/>
    </Stack.Navigator>
  )
}

export default EventosPStack
