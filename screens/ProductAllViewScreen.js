import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ListProductItem from "../components/ListProductItem";
import { addItemToCart } from "../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonComp from "../components/UI/HeaderButton";
import { fetchFromDb } from "../store/actions/products";

const ProductAllViewScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const loadingPro = useCallback(async () => {
    setErrors(null);
    setLoading(true);
    try {
      await dispatch(fetchFromDb());
    } catch (err) {
      setErrors(err.message);
    }
    setLoading(false);
  }, [dispatch, setLoading, setErrors]);

  useEffect(() => {
    loadingPro();
  }, [dispatch, loadingPro]);
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
