import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const ThankYouScreen = ({ route }) => {
  const { success } = route.params;
  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.image}
        source={{
          uri:
            "https://www.nicepng.com/png/detail/361-3611682_thank-you-balloons.png",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: { width: 400, height: 400 },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#8888",
  },
  successText: {
    fontFamily: "merri-regular",
    fontSize: 17,
    textAlign: "left",
    textShadowColor: "#ccc",
    shadowColor: "#ccc",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2.6 },
    shadowRadius: 7,
    elevation: 5, // Android
  },
});

export default ThankYouScreen;
