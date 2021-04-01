import React from "react";
import { View, StyleSheet, TouchableOpacity, Touchable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

const SuccessButton = ({ id, cancelOrder }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => dispatch(cancelOrder(id))}>
        <MaterialCommunityIcons name="check-decagram" size={35} color="green" />
      </TouchableOpacity>
    </View>
  );
};

export default SuccessButton;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
