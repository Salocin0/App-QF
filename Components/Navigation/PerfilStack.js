import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Perfil from '../Views/Perfil/Perfil'
import ConfigNotifiButtom from './ConfigNotifiButtom'
import Config from '../Views/Config/Config'
import Notificaciones from '../Views/Notificaciones/Notificaciones'

const Stack = createNativeStackNavigator()

const PerfilStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Perfil' component={Perfil} options={{ headerRight: () => <ConfigNotifiButtom /> }}/>
        <Stack.Screen name='Config' component={Config}/>
        <Stack.Screen name='Notificaciones' component={Notificaciones}/>
    </Stack.Navigator>
  )
}

export default PerfilStack
