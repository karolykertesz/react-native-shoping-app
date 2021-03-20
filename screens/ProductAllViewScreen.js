import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ListProductItem from "../components/ListProductItem";
import { addItemToCart } from "../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonComp from "../components/UI/HeaderButton";
import { fetchFromDb } from "../store/actions/products";

const ProductAllViewScreen = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchFromDb()).then(() => setLoading(false));
  }, [dispatch]);
  const products = useSelector((state) => state.product.Allproducts);
  const dispatch = useDispatch();
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
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
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

export default ProductAllViewScreen;
