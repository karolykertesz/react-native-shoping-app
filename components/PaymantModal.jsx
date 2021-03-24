import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card } from "react-native-elements";

import Modal from "react-native-modal";

const PaymantModal = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={70}
    >
      <View style={styles.screen}>
        <Card>
          <Card.Title>Place Your Payment</Card.Title>
          <Card.Divider />
          <Image
            source={require("../assets/red-credit-card-template-design_48190-377.jpeg")}
            style={styles.image}
          />
          <Input
            placeholder="CARDHOLDER NAME"
            leftIcon={<Icon name="user" size={24} color="black" />}
          />

          <Input
            placeholder="CREDITCARD NUMBER"
            leftIcon={{ type: "font-awesome", name: "credit-card" }}
            // style={styles}
            //   onChangeText={(value) => this.setState({ comment: value })}
            keyboardType="numeric"
          />

          <Input
            placeholder="INPUT WITH ERROR MESSAGE"
            errorStyle={{ color: "red" }}
            errorMessage="ENTER A VALID ERROR HERE"
          />
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
  },

  image: {
    height: 150,
    width: "100%",
  },
});

export default PaymantModal;
