import * as React from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  MainStackNavigation,
  OrdersNavigator,
  AdminNavigation,
} from "./StackNavigation";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import Colors from "../helpers/Colors";

const Drawer = createDrawerNavigator();
const dimWidth = Dimensions.width > 768;
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      overlayColor="#dde3ed"
      drawerType={dimWidth ? "permanent" : "back"}
      drawerStyle={{
        backgroundColor: "#f2f4f5",
        width: dimWidth ? null : "100%",
      }}
      drawerContentOptions={{
        activeTintColor: "#d9b43b",
        itemStyle: {
          marginVertical: 2,
          marginHorizontal: 8,
        },
        labelStyle: {
          fontSize: 18,
          fontFamily: "merri-bold",
          color: "#8f9394",
        },
        inactiveTintColor: "#e8dded",
      }}
    >
      <Drawer.Screen
        name="Products"
        component={MainStackNavigation}
        options={{
          drawerLabel: "Products",
          drawerIcon: () => (
            <Entypo name={"shop"} size={21} color={Colors.primary} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerLabel: "Orders",
          drawerIcon: () => (
            <Entypo name="shopping-cart" size={21} color={Colors.primary} />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin"
        options={{
          drawerLabel: "Admin Home",
          drawerIcon: () => (
            <Fontisto name="propeller-4" size={21} color={Colors.primary} />
          ),
        }}
        component={AdminNavigation}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
