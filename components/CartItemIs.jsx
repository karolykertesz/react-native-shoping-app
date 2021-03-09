import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const CartItemIs = ({ qua, total, title, removeItem }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.itd}>
        <Text style={styles.qua}> {qua}</Text>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.itd}>
        <Text style={styles.total}>$ {total * qua}</Text>
        <TouchableOpacity onPress={() => removeItem()} style={styles.btnDelete}>
          <Ionicons
            size={23}
            name={Platform.OS === "ios" ? "ios-trash" : "md-trash"}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    marginHorizontal: 17,
  },
  itd: {
    flexDirection: "row",
    alignItems: "center",
  },
  qua: {
    fontFamily: "Verdana",
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  titleText: {
    fontFamily: "merri-bold",
    fontSize: 16,
    color: "#ccc",
    marginHorizontal: 8,
  },
  total: {
    fontFamily: "merri-bold",
    fontSize: 16,
  },
  btnDelete: {
    marginLeft: 20,
  },
});

export default CartItemIs;
