import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainStackNavigation, OrdersNavigator } from "./StackNavigation";

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{ width: "100%", backgroundColor: "#edf4f5" }}
      overlayColor="transparent"
    >
      <Drawer.Screen
        name="Products"
        component={MainStackNavigation}
        options={{ drawerLabel: "Products" }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{ drawerLabel: "Orders" }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
