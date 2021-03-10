import React from "react";
import { View, Text, FlatList, StyleSheet, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ListProductItem from "../components/ListProductItem";
import { addItemToCart } from "../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonComp from "../components/UI/HeaderButton";

const ProductAllViewScreen = (props) => {
  const products = useSelector((state) => state.product.Allproducts);
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComp}>
          <Item
            title="cart"
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
            iconName={Platform.OS === "ios" ? "menu-sharp" : "md-menu"}
            onPress={() => props.navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
    });
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
