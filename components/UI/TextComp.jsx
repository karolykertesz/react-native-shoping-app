import React from "react";
import { View, StyleSheet } from "react-native";
const TextComp = (props) => {
  return <View style={styles.screen}>{props.children}</View>;
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingVertical: 5,
  },
});

export default TextComp;
