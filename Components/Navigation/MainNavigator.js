import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PedidoStack from "./PedidoStack";
import CompraStack from "./CompraStack";
import CarritoStack from "./CarritoStack";
import { Colors } from "../Styles/Colors";
import { useSelector } from "react-redux";
import TabBarIcon from "./TabBarIcon";
import AuthStack from "./AuthStack";
import PerfilStack from "./PerfilStack";
import PedidoRStack from "./PedidoRStack";
import HistorialPedidosRStack from "./HistorialPedidosRStack";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const user = useSelector((state) => state.auth);

  const isAuthenticated = user.idToken;
  const userType = isAuthenticated ? user.tipoUsuario : null;

  return (
    <>
      {isAuthenticated ? (
        userType === "consumidor" ? (
          <Tab.Navigator screenOptions={{ tabBarStyle: styles.tabBar }}>
            <Tab.Screen
              name="CompraStack"
              component={CompraStack}
              options={{
                tabBarLabel: "",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    title="Eventos"
                    nameIcon="home"
                    focused={focused}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="CarritoStack"
              component={CarritoStack}
              options={{
                tabBarLabel: "",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    title="Carrito"
                    nameIcon="shopping-cart"
                    focused={focused}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="PedidoStack"
              component={PedidoStack}
              options={{
                tabBarLabel: "",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    title="Pedidos"
                    nameIcon="list"
                    focused={focused}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="PerfilStack"
              component={PerfilStack}
              options={{
                tabBarLabel: "",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    title="Perfil"
                    nameIcon="user"
                    focused={focused}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        ) : userType === "repartidor" ? (
          <Tab.Navigator screenOptions={{ tabBarStyle: styles.tabBar }}>
            <Tab.Screen
              name="PedidoStack"
              component={PedidoRStack}
              options={{
                tabBarLabel: "",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    title="Pedidos"
                    nameIcon="list"
                    focused={focused}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="HistorialStack"
              component={HistorialPedidosRStack}
              options={{
                tabBarLabel: "",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    title="Perfil"
                    nameIcon="user"
                    focused={focused}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="PerfilStack"
              component={PerfilStack}
              options={{
                tabBarLabel: "",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    title="Perfil"
                    nameIcon="user"
                    focused={focused}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        ) : userType === "productor" ? (
          <Tab.Navigator screenOptions={{ tabBarStyle: styles.tabBar }}>
            <Tab.Screen
              name="EventosPStack"
              component={CarritoStack}
              options={{
                tabBarLabel: "",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    title="Carrito"
                    nameIcon="shopping-cart"
                    focused={focused}
                  />
                ),
              }}
            />
             <Tab.Screen
              name="PerfilStack"
              component={PerfilStack}
              options={{
                tabBarLabel: "",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    title="Perfil"
                    nameIcon="user"
                    focused={focused}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        ) : null
      ) : (
        <AuthStack />
      )}
    </>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.Blanco,
    height: 60,
    paddingTop: 15,
  },
});
