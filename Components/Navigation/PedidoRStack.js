import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PedidosR from '../Views/Pedidos/PedidosR'
import ConfigButtom from './ConfigButtom'
import Config from '../Views/Config/Config'

const Stack = createNativeStackNavigator()

const PedidoRStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Pedidos asignados' component={PedidosR} options={{ headerRight: () => <ConfigButtom /> }}/>
        <Stack.Screen name='Config' component={Config}/>
    </Stack.Navigator>
  )
}

export default PedidoRStack