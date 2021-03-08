import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  ScrollView,
  Image,
  Button,
  Text,
  StyleSheet,
} from "react-native";
import Colors from "../helpers/Colors";
import * as CartAction from "../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonComp from "../components/UI/HeaderButton";

const ProductDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const item = useSelector((state) =>
    state.product.Allproducts.find((it) => it.id === id)
  );
  const dispatch = useDispatch();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComp}>
          <Item
            title="cart"
            iconName={Platform.OS === "ios" ? "cart-outline" : "md-cart"}
            onPress={() => navigation.navigate("CartScreen", { title: "Cart" })}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: item.imageUrl }} />
      <View style={styles.buttonAction}>
        <Button
          color={Colors.primary}
          title="Add to Cart!"
          onPress={() => dispatch(CartAction.addItemToCart(item))}
        />
      </View>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <Text style={styles.descr}>{item.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 260,
  },
  price: {
    fontSize: 20,
    textAlign: "center",
    color: "#888",
    marginVertical: 20,
  },
  descr: {
    textAlign: "center",
    fontSize: 14,
    marginHorizontal: 10,
    fontFamily: "merri-regular",
  },
  buttonAction: {
    alignItems: "center",
    marginVertical: 10,
  },
});

export default ProductDetailScreen;
