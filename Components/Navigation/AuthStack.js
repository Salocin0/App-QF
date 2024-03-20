import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Login";
import ProcesoRegistro from "../RegistrarUsuario/ProcesoRegistro";
import RecuperarContraseña from "../RecuperarContraseña";
import SeleccionRegister from "../RegistrarUsuario/SeleccionRegister";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Recuperar Contraseña"
        component={RecuperarContraseña}
      />
      <Stack.Screen name="Registrarse" component={ProcesoRegistro} />
      <Stack.Screen name="Seleccion Perfil" component={SeleccionRegister} />
    </Stack.Navigator>
  );
};

export default AuthStack;
