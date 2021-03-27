import React, { useState, useCallback, useReducer } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { constraints } from "../helpers/cardValidate ";

import {
  StyleSheet,
  Text,
  Platform,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Touchable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card } from "react-native-elements";
const validate = require("validate.js");
const UPDATE_FORM = "UPDATE_FORM";
const VALIDATE = "VALIDATE";
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
const validateReducer = (state, action) => {
  switch (action.type) {
    case VALIDATE:
      const validatedItems = {
        [action.input]: action.value,
      };
      return {
        ...state,
        validValues: validatedItems,
      };
  }
};
const PaymantModal = (props) => {
  const nameRef = React.useRef();
  let cardRef;
  let date;
  let cvv;

  const [cardState, addValue] = useReducer(Formreducer, {
    inputValues: {
      name: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    },
  });
  const [valid, addValid] = useReducer(validateReducer, {
    validValues: {
      name: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    },
  });
  const toUpdateInput = (text, input) => {
    addValue({
      type: UPDATE_FORM,
      value: text,
      input,
    });
  };

  const areTheyValid = (v, input) => {
    addValid({
      type: VALIDATE,
      value: v,
      input,
    });
  };
  const submitPay = useCallback(() => {
    const creditnumber = parseInt(
      cardState.inputValues.creditnumber.split("-").join("")
    );
  });
  const creditnumber = cardState.inputValues.creditnumber;
  const v = creditnumber.split("-").join("");
  console.log(v);
  return (
    <ScrollView scrollable={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={{ flexGrow: 1 }}
      >
        <View style={styles.screen}>
          <Card>
            <TouchableWithoutFeedback onPress={() => props.dismiss()}>
              <Fontisto name="close" size={24} color="black" />
            </TouchableWithoutFeedback>
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
              // blurOnSubmit={false}
              autoFocus={true}
              clearButtonMode="unless-editing"
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
                value={cardState.inputValues.cardNumber}
                ref={(ref) => (cardRef = ref)}
                onChangeText={(value) => {
                  toUpdateInput(value, "cardNumber");
                  areTheyValid(cardRef.isValid(), "cardNumber");
                }}
                onSubmitEditing={() => date.getElement().focus()}
                maxLength={20}
                returnKeyType={Platform.OS === "ios" ? "done" : "next"}
                clearButtonMode="unless-editing"
                options={{
                  obfuscated: false,
                }}
              />
            </View>
            <View style={styles.row}>
              <Fontisto name="date" size={24} color="black" />
              <TextInputMask
                value={cardState.inputValues.expDate}
                ref={(ref) => (date = ref)}
                style={styles.inpl}
                type={"datetime"}
                options={{
                  format: "YYYY-MM",
                }}
                blurOnSubmit={false}
                placeholder="Y/M"
                onSubmitEditing={() => cvv.getElement().focus()}
                returnKeyType={Platform.OS === "ios" ? "done" : "next"}
                clearButtonMode="unless-editing"
                onChangeText={(value) => {
                  toUpdateInput(value, "expDate");
                  areTheyValid(date.isValid(), "expDate");
                }}
                defaultValue="huu"
              />
              <TextInputMask
                value={cardState.inputValues.cvv}
                style={styles.inpl}
                maxLength={3}
                type={"only-numbers"}
                options={{
                  mask: "999",
                }}
                // value={this.state.dt}
                placeholder="CVV"
                ref={(ref) => (cvv = ref)}
                keyboardType="numeric"
                clearButtonMode="unless-editing"
                enablesReturnKeyAutomatically={true}
                onChangeText={(value) => {
                  toUpdateInput(value, "cvv");
                  areTheyValid(cvv.isValid(), "cvv");
                }}
              />
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
