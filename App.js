import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigation } from "./navigation/StackNavigation";
import { OverflowMenuProvider } from "react-navigation-header-buttons";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import ProductReducer from "./store/reducers/products";

const reducers = combineReducers({ product: ProductReducer });

const store = createStore(reducers);

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <OverflowMenuProvider>
          <MainStackNavigation />
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
