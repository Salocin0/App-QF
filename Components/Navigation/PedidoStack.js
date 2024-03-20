import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Pedidos from '../Views/Pedidos/Pedidos'

const Stack = createNativeStackNavigator()

const PedidoStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Pedidos' component={Pedidos}/>
    </Stack.Navigator>
  )
}

export default PedidoStack