import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const ThankYouScreen = ({ route }) => {
  const { success } = route.params;
  return (
    <View style={styles.screen}>
      <Text style={styles.successText}>{success}</Text>
      <ImageBackground
        style={styles.image}
        source={{
          uri:
            "https://cdn.pixabay.com/photo/2013/07/13/10/08/green-156618_960_720.png",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: { width: 300, height: 300 },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    fontFamily: "merri-regular",
    fontSize: 17,
    textAlign: "left",
  },
});

export default ThankYouScreen;
