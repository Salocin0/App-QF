import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./../../Views/Login/Login";
import ProcesoRegistro from "./../../Views/RegistrarUsuario/ProcesoRegistro";
import RecuperarContraseña from "./../../Views/Login/RecuperarContraseña";
import SeleccionRegister from "./../../Views/RegistrarUsuario/SeleccionRegister";
import ConfigNotifiButtom from "./ConfigNotifiButtom";
import Config from "./../../Views/Config/Config";
import useDynamicColors from "./../../Styles/useDynamicColors"
import TengoCodigo from "./../../Views/Login/TengoCodigo";
import CambioContraseña from "./../../Views/Login/CambioContraseña";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const Colors = useDynamicColors()
  const isLogin = false;
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.Blanco,
        },
        headerTintColor: Colors.Negro,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerRight: () => <ConfigNotifiButtom islogin={isLogin} />,
        }}
      />
      <Stack.Screen
        name="TengoCodigo"
        component={TengoCodigo}
        options={{
          headerRight: () => <ConfigNotifiButtom islogin={isLogin} />,
        }}
      />
      <Stack.Screen
        name="Recuperar Contraseña"
        component={RecuperarContraseña}
        options={{
          headerRight: () => <ConfigNotifiButtom islogin={isLogin} />,
        }}
      />
      <Stack.Screen
        name="Registrarse"
        component={ProcesoRegistro}
        options={{
          headerRight: () => <ConfigNotifiButtom islogin={isLogin} />,
        }}
      />
      <Stack.Screen
        name="Seleccion Perfil"
        component={SeleccionRegister}
        options={{
          headerRight: () => <ConfigNotifiButtom islogin={isLogin} />,
        }}
      />
      <Stack.Screen
        name="CambioContraseña"
        component={CambioContraseña}
        options={{
          headerRight: () => <ConfigNotifiButtom islogin={isLogin} />,
        }}
      />
      <Stack.Screen name="Config" component={Config} />
    </Stack.Navigator>
  );
};

export default AuthStack;
