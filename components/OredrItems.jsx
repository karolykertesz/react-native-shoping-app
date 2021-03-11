import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Touchable } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../helpers/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { cancelOrder } from "../store/actions/userOrders";
const OrderItems = ({ total, date, items }) => {
  console.log(items);
  const dispatch = useDispatch();
  const [viewItems, setViewItems] = useState(false);
  return (
    <View style={styles.screen}>
      <View style={styles.textCont}>
        <Text style={styles.textDate}>{date}</Text>
      </View>
      <Button
        color={Colors.secondary}
        title={!viewItems ? "Show Details" : "Hide Details"}
        onPress={() => setViewItems((prev) => !prev)}
      />
      {viewItems && (
        <View>
          {items.map((it) => (
            <View key={it.id} style={styles.inner}>
              <Text style={styles.text}>
                {it.quantity} {""} x ${""} {it.price}
              </Text>
              <Text style={styles.text}>{it.title}</Text>
            </View>
          ))}
          <View style={styles.btnCont}>
            <View style={styles.btnView}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#4990e6" }]}
                onPress={() => dispatch(cancelOrder())}
              >
                <Text style={[styles.totalText, { color: "#fff" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btnView}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#e34d42" }]}
              >
                <Text style={[styles.totalText, { color: "#fff" }]}>
                  Pay Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.totalText}>$ {total.toFixed(2)}</Text>
        </View>
      )}
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
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  textCont: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalText: {
    fontFamily: "merri-bold",
    fontSize: 17,
    textAlign: "center",
  },
  textDate: {
    fontFamily: "merri-regular",
    fontSize: 16,
    color: "#8888",
  },
  btnCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    width: "100%",
    height: "100%",
    borderRadius: 3,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnView: {
    margin: 40,
    width: 100,
    height: 30,
  },
  text: {
    textAlign: "center",
    fontFamily: "merri-regular",
    lineHeight: 16,
  },
});

export default OrderItems;
