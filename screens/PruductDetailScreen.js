import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  ScrollView,
  Image,
  Button,
  Text,
  StyleSheet,
} from "react-native";
import Colors from "../helpers/Colors";

const ProductDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const item = useSelector((state) =>
    state.product.Allproducts.find((it) => it.id === id)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: item.imageUrl }} />
      <Button color={Colors.primary} title="Add to Cart!" onPress={() => {}} />
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
  },
});

export default ProductDetailScreen;
