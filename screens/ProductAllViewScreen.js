import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ListProductItem from "../components/ListProductItem";
import { addItemToCart } from "../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonComp from "../components/UI/HeaderButton";
import { fetchFromDb } from "../store/actions/products";
import { SignOutComp } from "../components/UI/HeaderButton";
import * as SecureStore from "expo-secure-store";
import { logOut } from "../store/actions/auth";
import { logAllOut } from "../store/actions/userOrders";

const ProductAllViewScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [errors, setErrors] = useState(null);
  const [token, setToken] = useState(null);
  const userOR = useSelector((state) => state.orders.orders.length);
  const dispatch = useDispatch();
  const signOut = () => {
    if (userOR > 0) {
      Alert.alert("ALERT", "You have items in your shopping cart!", [
        { text: "cancel", style: "default" },
        {
          text: "Log out",
          style: "destructive",
          onPress: () =>
            SecureStore.deleteItemAsync("token")
              .then(dispatch(logAllOut()))
              .then(dispatch(logOut())),
        },
      ]);
    } else {
      SecureStore.deleteItemAsync("token")
        .then(dispatch(logAllOut()))
        .then(dispatch(logOut()));
    }
  };

  const loadingPro = useCallback(async () => {
    setRefresh(true);
    setErrors(null);
    try {
      await dispatch(fetchFromDb());
    } catch (err) {
      setErrors(err.message);
    }
    setRefresh(false);
  }, [dispatch, setLoading, setErrors]);

  useEffect(() => {
    setLoading(true);
    loadingPro().then(() => setLoading(false));
  }, [dispatch, loadingPro, token]);
  useEffect(() => {
    const runHistory = props.navigation.addListener("willFocus", loadingPro);
    return () => {
      () => runHistory.remove();
    };
  }, [loadingPro]);
  const products = useSelector((state) => state.product.Allproducts);

  const lengOfItems = useSelector(
    (state) => Object.keys(state.cart.items).length
  );
  const color = lengOfItems > 0 ? "red" : "white";
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <HeaderButtons HeaderButtonComponent={HeaderButtonComp} color={color}>
            <Item
              title="cart"
              color={color}
              iconName={Platform.OS === "ios" ? "cart" : "md-cart"}
              onPress={() =>
                props.navigation.navigate("CartScreen", { title: "Cart" })
              }
            />
          </HeaderButtons>
          <HeaderButtons HeaderButtonComponent={SignOutComp}>
            <Item
              title="sign-out"
              color="white"
              iconName="sign-out"
              onPress={() => signOut()}
            />
          </HeaderButtons>
        </View>
      ),

      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComp}>
          <Item
            title="cart"
            color="white"
            iconName={Platform.OS === "ios" ? "menu-sharp" : "md-menu"}
            onPress={() => props.navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation, color]);

  if (errors) {
    return (
      <View style={styles.activity}>
        <ActivityIndicator size="large" />
        <Text>Possible Error!!</Text>
        <TouchableOpacity onPress={() => loadingPro()} style={styles.button}>
          <Text style={styles.text}>Reload Again!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.activity}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View>
      <FlatList
        onRefresh={() => loadingPro()}
        refreshing={refresh}
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(itemData) => (
          <ListProductItem
            id={itemData.item.id}
            navigation={props.navigation}
            imgUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            viewDetail={() => {
              props.navigation.navigate("ProductDetailScreen", {
                id: itemData.item.id,
                title: itemData.item.title,
              });
            }}
            toCart={() => dispatch(addItemToCart(itemData.item))}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  activity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: "#8ac8e3",
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 17,
  },
});

export default ProductAllViewScreen;
