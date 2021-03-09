import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OrdersScreen from "../screens/OrdersScreen";

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="OrdersScreen" component={OrdersScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
