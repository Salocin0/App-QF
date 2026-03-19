import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./components/App/store";
import Main from "./components/Main"

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
