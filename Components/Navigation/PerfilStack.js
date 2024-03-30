import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Perfil from '../Views/Perfil/Perfil'
import ConfigButtom from './ConfigButtom'
import Config from '../Views/Config/Config'

const Stack = createNativeStackNavigator()

const PerfilStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Perfil' component={Perfil} options={{ headerRight: () => <ConfigButtom /> }}/>
        <Stack.Screen name='Config' component={Config}/>
    </Stack.Navigator>
  )
}

export default PerfilStack
