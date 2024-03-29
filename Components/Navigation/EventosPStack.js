import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EventosP from '../Views/Eventos/EventosP'

const Stack = createNativeStackNavigator()

const EventosPStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Mis Eventos' component={EventosP}/>
    </Stack.Navigator>
  )
}

export default EventosPStack
