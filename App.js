import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./navigation/StackNavigation";
import DrawerNavigator from "./navigation/DrawerNavigation";
import { OverflowMenuProvider } from "react-navigation-header-buttons";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ProductReducer from "./store/reducers/products";
import authReducer from "./store/reducers/auth";
import UserOrders from "./store/reducers/UserOrder";
import Cart from "./store/reducers/cart";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useSelector } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const reducers = combineReducers({
  product: ProductReducer,
  cart: Cart,
  orders: UserOrders,
  auth: authReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
const loadFont = () => {
  return Font.loadAsync({
    "merri-regular": require("./fonts/Merriweather-Regular.ttf"),
    "merri-bold": require("./fonts/Merriweather-Bold.ttf"),
  });
};
export default function App() {
  let tokken = null;
  const [isready, setReady] = useState(true);
  if (isready) {
    return (
      <AppLoading
        startAsync={() => loadFont()}
        onFinish={() => setReady(false)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <NavigationContainer>
      <Provider store={store}>
        <OverflowMenuProvider>
          {tokken === null ? <AuthNavigator /> : <DrawerNavigator />}
        </OverflowMenuProvider>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
