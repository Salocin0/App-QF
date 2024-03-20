import Main from "./Components/Main";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./Components/App/store"

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
