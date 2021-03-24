import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigation";
import { OverflowMenuProvider } from "react-navigation-header-buttons";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ProductReducer from "./store/reducers/products";
import UserOrders from "./store/reducers/UserOrder";
import Cart from "./store/reducers/cart";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { LogBox } from "react-native";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// LogBox.ignoreLogs(["Require cycles are allowed"]);

const reducers = combineReducers({
  product: ProductReducer,
  cart: Cart,
  orders: UserOrders,
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
          <DrawerNavigator />
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
