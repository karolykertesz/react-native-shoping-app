import React from "react";
import { View, Text,  SafeAreaView, FlatList } from "react-native";
import { useSelector } from "react-redux";
import OrderItems from "../components/OredrItems.jsx";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <SafeAreaView>
      <FlatList
        data={orders}
        renderItem={(itemData) => <OrderItems />}
        keyExtractor={(item) => item.id.toStirng()}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;
