import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, Button } from "react-native";
import ProductAllViewScreen from "../screens/ProductAllViewScreen";
import ProductDetailScreen from "../screens/PruductDetailScreen";
import CartScreen from "../screens/CartScreen";
import Colors from "../helpers/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import DrawerNavigator from "./DrawerNavigation";
import OrdersScreen from "../screens/OrdersScreen";
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
          headerTitleStyle: {
            fontFamily: "merri-bold",
          },
          headerBackTitleStyle: {
            fontFamily: "merri-regular",
          },
        })}
      />
      <Stack.Screen
        component={ProductDetailScreen}
        name="ProductDetailScreen"
        options={({ route, navigation }) => ({
          headerTitle: route.params.title,
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "merri-bold",
          },
          headerBackTitleStyle: {
            fontFamily: "merri-regular",
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        })}
      />
      <Stack.Screen
        component={CartScreen}
        name="CartScreen"
        options={({ route, navigation }) => ({
          headerTitle: route.params.title,
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "merri-bold",
          },
          headerBackTitleStyle: {
            fontFamily: "merri-regular",
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export const OrdersNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="order"
        component={OrdersScreen}
        options={({ route, navigation }) => ({
          headerTitle: "Your Orders",
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "merri-bold",
          },
          headerBackTitleStyle: {
            fontFamily: "merri-regular",
            color: "white",
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerLeft: () => (
            <Button
              title="Back Home"
              color="white"
              onPress={() => navigation.navigate("ProductAllViewScreen")}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
