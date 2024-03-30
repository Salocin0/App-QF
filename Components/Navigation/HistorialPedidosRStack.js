import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HistorialPedidosR from '../Views/Pedidos/HistorialPedidosR'
import ConfigButtom from './ConfigButtom'
import Config from '../Views/Config/Config'

const Stack = createNativeStackNavigator()

const HistorialPedidosRStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Historial Pedidos' component={HistorialPedidosR} options={{ headerRight: () => <ConfigButtom /> }}/>
        <Stack.Screen name='Config' component={Config}/>
    </Stack.Navigator>
  )
}

export default HistorialPedidosRStack
