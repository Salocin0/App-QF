import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Compra from '../Compra';
import Inicio from '../Inicio';

const Stack = createNativeStackNavigator()

const CompraStack = () => {
    return (
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Compra" component={Compra} />
        </Stack.Navigator>
      );
}

export default CompraStack