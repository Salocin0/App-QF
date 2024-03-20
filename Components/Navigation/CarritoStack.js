import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Carrito from '../Views/Carrito/Carrito'

const Stack = createNativeStackNavigator()
const CarritoStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Carrito' component={Carrito}/>
    </Stack.Navigator>
  )
}

export default CarritoStack