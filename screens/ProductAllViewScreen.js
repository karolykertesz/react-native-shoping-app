import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ListProductItem from "../components/ListProductItem";
import { addItemToCart } from "../store/actions/cart";
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";

const ProductAllViewScreen = (props) => {
  const products = useSelector((state) => state.product.Allproducts);
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    props.navigation.set
  }, [props.navigation]);

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
