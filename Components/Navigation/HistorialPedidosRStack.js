import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HistorialPedidosR from '../Views/Pedidos/HistorialPedidosR'

const Stack = createNativeStackNavigator()

const HistorialPedidosRStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Historial Pedidos' component={HistorialPedidosR}/>
    </Stack.Navigator>
  )
}

export default HistorialPedidosRStack
