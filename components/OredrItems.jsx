import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Colors from "../helpers/Colors";
const OrderItems = ({ total, date }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.textCont}>
        <Text style={styles.totalText}>$ {total.toFixed(2)}</Text>
        <Text style={styles.textDate}>{date}</Text>
      </View>
      <Button color={Colors.secondary} title="Check!" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    elevation: 5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, heigh: 1.4 },
    shadowRadius: 6,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#8888",
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  textCont: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalText: {
    fontFamily: "merri-bold",
    fontSize: 17,
  },
  textDate: {
    fontFamily: "merri-regular",
    fontSize: 16,
    color: "#8888",
  },
});

export default OrderItems;
