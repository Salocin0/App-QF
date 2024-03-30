import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Carrito from '../Views/Carrito/Carrito'
import ConfigButtom from './ConfigButtom'
import Config from '../Views/Config/Config'

const Stack = createNativeStackNavigator()
const CarritoStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Carrito' component={Carrito} options={{ headerRight: () => <ConfigButtom /> }}/>
        <Stack.Screen name='Config' component={Config}/>
    </Stack.Navigator>
  )
}

export default CarritoStack