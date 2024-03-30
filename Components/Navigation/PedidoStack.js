import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Pedidos from '../Views/Pedidos/Pedidos'
import ConfigButtom from './ConfigButtom'
import Config from '../Views/Config/Config'

const Stack = createNativeStackNavigator()

const PedidoStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Pedidos' component={Pedidos} options={{ headerRight: () => <ConfigButtom /> }}/>
        <Stack.Screen name='Config' component={Config}/>
    </Stack.Navigator>
  )
}

export default PedidoStack