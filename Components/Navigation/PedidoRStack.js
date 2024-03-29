import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PedidosR from '../Views/Pedidos/PedidosR'

const Stack = createNativeStackNavigator()

const PedidoRStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Pedidos asignados' component={PedidosR}/>
    </Stack.Navigator>
  )
}

export default PedidoRStack