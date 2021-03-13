import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItemIs from "../components/CartItemIs";
import { removeItemFromCart } from "../store/actions/cart";
import * as UserOrders from "../store/actions/userOrders";
const CartScreen = (props) => {
  const dispatch = useDispatch();
  const total = useSelector((state) => state.cart.sumItems);

  const cartItems = useSelector((state) => state.cart.items);
  const yy = Object.keys(cartItems)
    .map((i) => ({
      id: i,
      quantity: cartItems[i].quantity,
      title: cartItems[i].title,
      price: cartItems[i].price,
      key: Math.random(3) * 1000000,
    }))
    .sort((a, b) => (a.id > b.id ? 1 : -1));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.screen}>
        <View style={styles.allTotal}>
          <Text style={styles.textTotal}>
            Total:${Math.round(total.toFixed(2) * 100) / 100}
          </Text>
          <Button
            title="Place Your Order!"
            color="#f50a2d"
            disabled={yy.length === 0}
            onPress={() => dispatch(UserOrders.addUserOrder(yy, total))}
          />
        </View>
        <FlatList
          data={yy}
          renderItem={(itemData) => (
            <CartItemIs
              qua={itemData.item.quantity}
              title={itemData.item.title}
              total={itemData.item.price}
              removeItem={() => dispatch(removeItemFromCart(itemData.item.id))}
            />
          )}
          keyExtractor={(item) => item.key.toString()}
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
