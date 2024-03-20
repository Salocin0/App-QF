import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Perfil from '../Perfil'

const Stack = createNativeStackNavigator()

const PerfilStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Perfil' component={Perfil}/>
    </Stack.Navigator>
  )
}

export default PerfilStack
