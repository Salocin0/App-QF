import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./components/App/store";
import Main from "./components/Main"
import { inicializarModoOscuro } from "./components/Features/modoOscuro/modoOscuroSlice";
import { inicializarSesion } from "./components/Features/Auth/authSlice";
import {
  guardarCarritoPersistido,
  inicializarCarrito,
} from "./components/Features/carrito/carritoSlice";
import { usePushNotifications } from "./hooks/usePushNotifications";
import { useActualizarTokenMobileMutation } from "./components/App/Service/authApi";

export const navigationRef = createNavigationContainerRef();

const AppContent = () => {
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.carrito);
  const usuario = useSelector((state) => state.auth);
  const [carritoInicializado, setCarritoInicializado] = useState(false);
  const [actualizarTokenMobile] = useActualizarTokenMobileMutation();

  const handleNotificationTap = useCallback(() => {
    if (navigationRef.isReady()) {
      navigationRef.navigate("Notificaciones");
    }
  }, []);

  const { expoPushToken } = usePushNotifications(handleNotificationTap);

  useEffect(() => {
    dispatch(inicializarModoOscuro());
    dispatch(inicializarSesion());
    dispatch(inicializarCarrito()).finally(() => setCarritoInicializado(true));
  }, [dispatch]);

  useEffect(() => {
    if (!carritoInicializado) {
      return;
    }

    dispatch(guardarCarritoPersistido(carrito));
  }, [carrito, carritoInicializado, dispatch]);

  useEffect(() => {
    if (expoPushToken && usuario?.id) {
      actualizarTokenMobile({ id: usuario.id, tokenMobile: expoPushToken });
    }
  }, [expoPushToken, usuario?.id, actualizarTokenMobile]);

  return (
    <NavigationContainer independent={true} ref={navigationRef}>
      <Main />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
