import React from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import { useSelector } from "react-redux";
import OrderItems from "../components/OredrItems.jsx";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={(itemData) => <Text>{itemData.item.total}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default OrdersScreen;
