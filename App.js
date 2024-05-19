import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./Components/App/store";
import Main from "./Components/Main";

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}