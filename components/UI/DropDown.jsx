import React from "react";
import { Picker, StyleSheet, View } from "react-native";
const DropDown = ({ setValue }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={"US"}
        onValueChange={(value) => setValue(value)}
        style={{ width: "100%" }}
        mode="dialog"
        itemStyle={{
          fontFamily: "merri-regular",
          fontSize: 15,
          color: "#4990e6",
        }}
      >
        <Picker.Item label="HUNGARY" value="HU" />
        <Picker.Item label="UNITED STATES" value="US" />
        <Picker.Item label="CANADA" value="CA" />
        <Picker.Item label="UNITED KINGDOM" value="GB" />
      </Picker>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 0,
  },
});
export default DropDown;
