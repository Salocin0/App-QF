import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PedidosR from '../Views/Pedidos/PedidosR'
import ConfigNotifiButtom from './ConfigNotifiButtom'
import Config from '../Views/Config/Config'
import Notificaciones from '../Views/Notificaciones/Notificaciones'

const Stack = createNativeStackNavigator()

const PedidoRStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Pedidos asignados' component={PedidosR} options={{ headerRight: () => <ConfigNotifiButtom /> }}/>
        <Stack.Screen name='Config' component={Config}/>
        <Stack.Screen name='Notificaciones' component={Notificaciones}/>
    </Stack.Navigator>
  )
}

export default PedidoRStack