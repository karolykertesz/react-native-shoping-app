import React from "react";
import { FlatList, View, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as ProductAction from "../store/actions/products";
import UserProductItem from "../components/UserProductItem";

const UserProductScreen = (props) => {
  const deleteItem = (id) => {
    Alert.alert("You're about to delete your product", "Procced?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => dispatch(ProductAction.deleteProduct(id)),
      },
    ]);
  };
  const dispatch = useDispatch();
  const userPr = useSelector((state) => state.product.userProduct);
  return (
    <View>
      <FlatList
        data={userPr}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <UserProductItem
            title={itemData.item.title}
            id={itemData.item.id}
            navigation={props.navigation}
            imgUrl={itemData.item.imageUrl}
            price={itemData.item.price}
            viewdetail={() => {}}
            toDelete={() => deleteItem(itemData.item.id)}
          />
        )}
      />
    </View>
  );
};
export default UserProductScreen;
