import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import Colors from "../helpers/Colors";
import TextComp from "../components/UI/TextComp";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

const ThankYouScreen = ({ route }) => {
  const { success, name, uid, total } = route.params;
  const dispatch = useDispatch();
  const { city, county, address, zip, state } = useSelector(
    (state) => state.shipping
  );
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
        <Card.Divider />
        <TextComp>
          <Text style={{ color: "#2570cc", fontFamily: "merri-bold" }}>
            Your Shippment details
          </Text>
        </TextComp>
        <Card.Divider />

        <TextComp>
          <Text style={styles.totalAm}>Country:</Text>
          <Text style={styles.totalAm}>{county}</Text>
        </TextComp>
        <Card.Divider />

        <TextComp>
          <Text style={styles.totalAm}>City:</Text>
          <Text style={styles.totalAm}>{city}</Text>
        </TextComp>
        <Card.Divider />

        <TextComp>
          <Text style={styles.totalAm}>State:</Text>
          <Text style={styles.totalAm}>{state}</Text>
        </TextComp>
        <Card.Divider />

        <TextComp>
          <Text style={styles.totalAm}>Your Home Address:</Text>
          <Text style={styles.totalAm}>{address}</Text>
        </TextComp>
        <Card.Divider />

        <TextComp>
          <Text style={styles.totalAm}>Zipp Code:</Text>
          <Text style={styles.totalAm}>{zip}</Text>
        </TextComp>
        <Card.Divider />

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
