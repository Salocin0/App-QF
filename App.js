import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./components/App/store";
import MainNavigator from "./components/Navigation/MainNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}
