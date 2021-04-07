import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Card, Button } from "react-native-elements";
import Colors from "../helpers/Colors";
import TextComp from "../components/UI/TextComp";
import { Ionicons } from "@expo/vector-icons";

const ThankYouScreen = ({ route }) => {
  const { success, name, uid, total } = route.params;
  const tax = 27;
  const paid = (tax * total) / 100 + total;
  return (
    <View style={styles.screen}>
      <Card>
        <Card.Title style={styles.titleStyle}>
          Thank You For Choosing RN-Shopping-APP
        </Card.Title>
        <Card.Divider />
        <Text style={styles.successText}>Your Invoice:</Text>
        <Card.Divider />
        <TextComp>
          <Text style={styles.successText}>Summary for</Text>
          <Text style={styles.successText}>{name}</Text>
        </TextComp>
        <Card.Divider />
        <TextComp>
          <Text style={styles.successText}>Account credit applied</Text>
          <Text style={styles.successText}>$ {total}</Text>
        </TextComp>
        <Card.Divider />
        <TextComp>
          <Text style={styles.successText}>Total</Text>
          <Text style={styles.successText}>${total}</Text>
        </TextComp>
        <Card.Divider />
        <TextComp>
          <Text style={styles.successText}>Tax country </Text>
          <Text style={styles.successText}>{tax}%</Text>
        </TextComp>
        <Card.Divider />
        <TextComp>
          <Text style={styles.totalAm}>Amount paid with Tax:</Text>
          <Text style={styles.totalAm}>$ {paid}</Text>
        </TextComp>
        <Button
          style={{ width: "60%", marginVertical: 5 }}
          icon={
            <Ionicons
              name="mail-open-outline"
              size={24}
              color="white"
              onPress={() => {}}
            />
          }
          title="Email My Invoice"
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { width: 400, height: 400 },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textShadowColor: "#ccc",
    shadowColor: "#ccc",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2.6 },
    shadowRadius: 7,
    elevation: 5, // Android
  },
  titleStyle: {
    color: "#2570cc",
  },
  totalAm: {
    fontFamily: "merri-bold",
  },
  successText: {
    fontFamily: "merri-regular",
    fontSize: 15,
    textAlign: "left",
  },
});

export default ThankYouScreen;
