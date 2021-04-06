import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./navigation/StackNavigation";
import DrawerNavigator from "./navigation/DrawerNavigation";
import { OverflowMenuProvider } from "react-navigation-header-buttons";
// import { createStore, combineReducers, applyMiddleware } from "redux";
// import { useDispatch } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";
import { RootStack } from "./navigation/DrawerNavigation";

const loadFont = () => {
  return Font.loadAsync({
    "merri-regular": require("./fonts/Merriweather-Regular.ttf"),
    "merri-bold": require("./fonts/Merriweather-Bold.ttf"),
  });
};
export default function App() {
  const [isready, setReady] = useState(true);
  const token = useSelector((state) => state.auth.token);
  console.log(useSelector((state) => state.auth));
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
      <OverflowMenuProvider>
        <RootStack.Navigator headerMode="none">
          {token !== null ? (
            <RootStack.Screen name="Auth" component={DrawerNavigator} />
          ) : (
            <RootStack.Screen name="Drawer" component={AuthNavigator} />
          )}
        </RootStack.Navigator>
      </OverflowMenuProvider>
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
