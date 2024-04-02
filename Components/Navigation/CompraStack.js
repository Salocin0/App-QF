import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Compra from '../Views/Compra/Compra';
import Inicio from '../Views/Compra/Inicio';
import ConfigButtom from './ConfigButtom';
import Config from '../Views/Config/Config';
import Puestos from '../Views/Compra/Puestos';
import Productos from '../Views/Compra/Productos';
import Detalle from '../Views/Compra/Detalle';

const Stack = createNativeStackNavigator()

const CompraStack = () => {
    return (
        <Stack.Navigator initialRouteName="Eventos">
          <Stack.Screen name="Eventos" component={Inicio} options={{ headerRight: () => <ConfigButtom /> }}/>
          <Stack.Screen name="Puestos" component={Puestos} options={{ headerRight: () => <ConfigButtom /> }}/>
          <Stack.Screen name="Productos" component={Productos} options={{ headerRight: () => <ConfigButtom /> }}/>
          <Stack.Screen name="Detalle" component={Detalle} options={{ headerRight: () => <ConfigButtom /> }}/>
          <Stack.Screen name="Compra" component={Compra} options={{ headerRight: () => <ConfigButtom /> }} />
          <Stack.Screen name='Config' component={Config}/>
        </Stack.Navigator>
      );
}

export default CompraStack