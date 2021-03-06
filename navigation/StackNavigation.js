import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import ProductAllViewScreen from "../screens/ProductAllViewScreen";
import ProductDetailScreen from "../screens/PruductDetailScreen";
import Colors from "../helpers/Colors";
const Stack = createStackNavigator();

export const MainStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ProductAllViewScreen}
        name="ProductAllViewScreen"
        options={({ route, navigation }) => ({
          headerTitle: "All Product",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        })}
      />
      <Stack.Screen
        component={ProductDetailScreen}
        name="ProductDetailScreen"
        options={({ route, navigation }) => ({
          headerTitle: route.params.title,
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        })}
      />
    </Stack.Navigator>
  );
};
