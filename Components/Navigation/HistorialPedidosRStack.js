import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HistorialPedidosR from '../Views/Pedidos/HistorialPedidosR'
import ConfigNotifiButtom from './ConfigNotifiButtom'
import Config from '../Views/Config/Config'
import Notificaciones from '../Views/Notificaciones/Notificaciones'

const Stack = createNativeStackNavigator()

const HistorialPedidosRStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Historial Pedidos' component={HistorialPedidosR} options={{ headerRight: () => <ConfigNotifiButtom /> }}/>
        <Stack.Screen name='Config' component={Config}/>
        <Stack.Screen name='Notificaciones' component={Notificaciones}/>
    </Stack.Navigator>
  )
}

export default HistorialPedidosRStack
