import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const IsDone = ({ updateAndReset, isDone }) => {
  return (
    <View>
      {isDone ? (
        <View style={styles.excText}>
          <Text style={styles.sptext}>Change Your Shipping Details</Text>
          <TouchableOpacity onPress={() => updateAndReset()}>
            <FontAwesome name="exchange" size={24} color="#4990e6" />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.sptext}>Your Shipping Details are set!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  excText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sptext: {
    textAlign: "center",
    fontFamily: "merri-bold",
    color: "#4990e6",
    marginHorizontal: 10,
  },
});

export default IsDone;
