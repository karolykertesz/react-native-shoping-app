import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ListProductItem from "../components/shop/ListProductItem";

const ProductAllViewScreen = (props) => {
  const products = useSelector((state) => state.product.Allproducts);

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
            toCart={() => {}}
          />
        )}
      />
    </View>
  );
};

export default ProductAllViewScreen;
