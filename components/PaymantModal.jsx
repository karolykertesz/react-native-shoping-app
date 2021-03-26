import React, { useState, useCallback, useReducer } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";

import {
  StyleSheet,
  Text,
  Platform,
  View,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card } from "react-native-elements";

const UPDATE_FORM = "UPDATE_FORM";
const Formreducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const updatedItem = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      return {
        ...state,
        inputValues: updatedItem,
      };
  }
};

const PaymantModal = (props) => {
  const nameRef = React.useRef();
  const cardRef = React.useRef();
  const creditCardField = React.useRef();

  const [cardState, addValue] = useReducer(Formreducer, {
    inputValues: {
      name: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    },
  });
  console.log(cardState.inputValues.expDate);

  const toUpdateInput = (text, input) => {
    addValue({
      type: UPDATE_FORM,
      value: text,
      input,
    });
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={70}
        style={{ padding: 30 }}
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
              ref={nameRef}
              name="cname"
              placeholder="CARDHOLDER NAME"
              leftIcon={<Icon name="user" size={24} color="black" />}
              onChangeText={(text) => toUpdateInput(text, "name")}
              value={cardState.inputValues.name}
              returnKeyType="next"
              onSubmitEditing={() => cardRef.getElement().focus()}
              blurOnSubmit={false}
            />

            <View style={styles.passwordContainer}>
              <FontAwesome
                name="cc-visa"
                size={24}
                color="black"
                style={{ marginRight: 5 }}
              />
              <TextInputMask
                style={styles.inp}
                placeholder="CREDITCARD NUMBER"
                type={"credit-card"}
                options={{
                  obfuscated: false,
                  getRawValue: (value) => value.replace(/\s/g, ""),
                }}
                value={cardState.inputValues.cardNumber}
                onChangeText={(value) => toUpdateInput(value, "cardNumber")}
                ref={cardRef}
                maxLength={19}
                returnKeyType="next"
                autoFocus={true}
              />
            </View>
            <View style={styles.row}>
              <Fontisto name="date" size={24} color="black" />
              <TextInputMask
                onChangeText={(value) => toUpdateInput(value, "expDate")}
                value={cardState.inputValues.expDate}
                style={styles.inpl}
                type={"datetime"}
                options={{
                  format: "YY/MM",
                }}
                blurOnSubmit={false}
                placeholder="Y/M"
              />
              <TextInputMask
                value={cardState.inputValues.cvv}
                onChangeText={(value) => toUpdateInput(value, "cvv")}
                style={styles.inpl}
                maxLength={3}
                type={"only-numbers"}
                options={{
                  mask: "999",
                }}
                // value={this.state.dt}
                placeholder="CVV"
              />
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 10,
  },

  input: {
    fontSize: 16,
    fontFamily: "merri-regular",
  },
  inp: {
    flex: 1,
    fontFamily: "merri-regular",
    fontSize: 16,
    textTransform: "capitalize",
    fontWeight: "900",
  },
  inpl: {
    flex: 1,
    fontFamily: "merri-regular",
    fontSize: 16,
    textTransform: "capitalize",
    fontWeight: "900",
    marginLeft: 20,
  },

  image: {
    height: 150,
    width: "100%",
  },
  container: {
    flex: 1,
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    margin: 36,
    marginTop: 0,
  },
});

export default PaymantModal;
