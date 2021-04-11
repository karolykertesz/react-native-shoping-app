import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const IsDone = ({ isDone, setIsShipping, setUpdateS, ship }) => {
  const updateValues = () => {
    setUpdateS(true);
    setIsShipping((ship) => !ship);
  };
  return (
    <View style={styles.spButCont}>
      <Text style={styles.sptext}>
        {isDone
          ? "Update Your Shipping Details"
          : "Reset Your Shipping Details"}
      </Text>
      <TouchableOpacity onPress={() => updateValues()}>
        {!ship ? (
          <FontAwesome name="exchange" size={24} color="#4990e6" />
        ) : (
          <MaterialIcons name="cancel" size={24} color="#4990e6" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  excText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spButCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sptext: {
    textAlign: "center",
    fontFamily: "merri-bold",
    color: "#4990e6",
    marginHorizontal: 10,
  },
});

export default IsDone;
