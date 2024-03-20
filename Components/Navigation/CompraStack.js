import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Compra from '../Views/Compra/Compra';
import Inicio from '../Views/Compra/Inicio';

const Stack = createNativeStackNavigator()

const CompraStack = () => {
    return (
        <Stack.Navigator initialRouteName="Eventos">
          <Stack.Screen name="Eventos" component={Inicio} />
          <Stack.Screen name="Compra" component={Compra} />
        </Stack.Navigator>
      );
}

export default CompraStack