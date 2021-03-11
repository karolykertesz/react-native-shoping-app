import React from "react";
import { SafeAreaView, FlatList, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import OrderItems from "../components/OredrItems.jsx";

const OrdersScreen = ({ navigation }) => {
  const orders = useSelector((state) => state.orders.orders);
  const lengOfItems = useSelector(
    (state) => Object.keys(state.cart.items).length
  );

  return (
    <SafeAreaView>
      <FlatList
        data={orders}
        renderItem={(itemData) => (
          <OrderItems
            total={itemData.item.total}
            date={itemData.item.getterDate}
            items={itemData.item.items}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;
