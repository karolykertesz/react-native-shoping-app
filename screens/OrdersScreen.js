import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { useSelector } from "react-redux";
import OrderItems from "../components/OredrItems.jsx";

const OrdersScreen = ({ navigation }) => {
  const [isTrure, setIsTrue] = useState(false);
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
            id={itemData.item.id}
            total={itemData.item.total}
            date={itemData.item.getterDate}
            items={itemData.item.items}
            navigation={navigation}
            quantity={itemData.item.quantity}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;
