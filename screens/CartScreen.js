import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import CartItemIs from "../components/CartItemIs";
const CartScreen = (props) => {
  const total = useSelector((state) => state.cart.sumItems);
  const cartItems = useSelector((state) => state.cart.items);
  const cartIt = Object.values(cartItems).map((it) => ({
    quantity: it.quantity,
    total: it.total,
    title: it.title,
    key: Math.random(3) * 100,
  }));
  // console.log(cartIt);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.screen}>
        <View style={styles.allTotal}>
          <Text style={styles.textTotal}>Total: ${total.toFixed(2)}</Text>
          <Text style={styles.textTotal}></Text>
          <Button
            title="Place Your Order!"
            color="#f50a2d"
            disabled={cartIt.length === 0}
          />
        </View>
        <FlatList
          data={cartIt}
          renderItem={(itemData) => (
            <CartItemIs
              qua={itemData.item.quantity}
              title={itemData.item.title}
              total={itemData.item.total}
              removeItem={() => {}}
            />
          )}
          key={(item) => item.key}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
  },
  allTotal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 10,
    shadowColor: "#ccc",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1.6 },
    shadowRadius: 7,
    elevation: 5, // Android,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  textTotal: {
    fontFamily: "merri-bold",
    fontSize: 18,
    color: "#54cee3",
  },
});

export default CartScreen;
