import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
const Paybutton = ({ submitPay, total }) => {
  return (
    <View style={styles.submit}>
      <TouchableOpacity onPress={() => submitPay()}>
        <Text style={styles.submitText}>Pay For ${total}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Paybutton;


const styles = StyleSheet.create({
  submit: {
    backgroundColor: "#3333ff",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 72,
    marginVertical: 4,
    height: 30,
    borderRadius: 8,
  },
  submitText: {
    color: "white",
  },
});
