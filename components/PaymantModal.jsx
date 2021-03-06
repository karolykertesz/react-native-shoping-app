import React, { useState, useCallback, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { CheckBox } from "react-native-elements";
import axios from "axios";
import {
  StyleSheet,
  Text,
  Platform,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card } from "react-native-elements";
const validate = require("validate.js");
import { constraints } from "../helpers/cardValidate ";
import Paybutton from "./UI/PayButton";

import { cancelOrder } from "../store/actions/userOrders";
import { addPId } from "../store/actions/shipping ";

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
const PaymantModal = ({ total, dismiss, id, navigation }) => {
  const dispatch = useDispatch();
  const nameRef = React.useRef();
  const shipIde = useSelector((state) => state.shipping.city);
  const uid = useSelector((state) => state.auth.uid);
  const email = useSelector((state) => state.auth.email);

  let cardRef;
  let date;
  let cvv;
  const [succeed, setSucceed] = useState(false);
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
  const [errors, setError] = useState({
    creditCardNumber: null,
    name: null,
    date: null,
    cvv: null,
  });
  const [saveCard, setSaveCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dissabled, setDissabled] = useState(false);
  const [cardErrors, setCardErrors] = useState("");

  const submitPay = useCallback(async () => {
    setLoading(true);
    let creditCardNumber = cardState.inputValues.cardNumber.split(" ").join("");
    const name = cardState.inputValues.name;
    let r = cardState.inputValues.expDate.split("-");
    const year = parseInt(r[0]);
    const month = parseInt(r[1]);
    const cvv = cardState.inputValues.cvv;
    const value = validate(
      {
        name: name,
        creditCardNumber: creditCardNumber,
        cvv: cvv.toString(),
        year: year.toString(),
        month: month.toString(),
      },
      constraints
    );
    if (value !== undefined) {
      setError(value);
      return;
    }
    try {
      const request = await axios({
        method: "POST",
        url: "https://rn-shopping.herokuapp.com/one/onep",
        data: {
          creditCard: creditCardNumber,
          name,
          cardMonth: month,
          cardYear: year,
          cardCvc: cvv,
          amount: total,
          uid,
          email,
        },
        headers: { "Content-Type": "application/json" },
      });
      setDissabled(true);
      if (request.status === 200) {
        dispatch(addPId(request.data["p_id"]));
        setSucceed(true);
        setLoading(false);
        setError({
          creditCardNumber: null,
          name: null,
          date: null,
          cvv: null,
        });

        setCardErrors("");
        navigation.navigate("ThankYouScreen", {
          total,
          name,
          uid,
        });
        dispatch(cancelOrder(id));
      }
    } catch (err) {
      console.log(err.response.data.errors[0]);
      setCardErrors(err.response.data.errors[0]);
      setLoading(false);
    }
  }, [
    cardState.inputValues.cardNumber,
    cardState.inputValues.name,
    cardState.inputValues.date,
    cardState.inputValues.cvv,
    saveCard,
    errors,
    dispatch,
  ]);
  if (loading) {
    return (
      <View style={styles.activity}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView scrollable={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={{ flexGrow: 1 }}
      >
        <View style={styles.screen}>
          <Card>
            <TouchableWithoutFeedback onPress={() => dismiss()}>
              <Fontisto name="close" size={24} color="black" />
            </TouchableWithoutFeedback>
            <Card.Title>Place Your Payment</Card.Title>
            <Card.Divider />
            <View style={styles.invalid}>
              <Text style={styles.invalidText}>{cardErrors && cardErrors}</Text>
            </View>
            <Image
              source={{
                uri:
                  "https://cdn.pixabay.com/photo/2013/03/29/13/38/contact-97574_960_720.png",
              }}
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
              autoFocus={true}
              clearButtonMode="unless-editing"
              errorStyle={{ color: "red" }}
              errorMessage={errors["name"] ? errors["name"][0] : ""}
              autoCapitalize="none"
              autoCompleteType="off"
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
            <View>
              <Text style={styles.errorText}>
                {errors["creditCardNumber"]
                  ? errors["creditCardNumber"][0]
                  : ""}
              </Text>
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
                placeholder="YYYY/MM"
                onSubmitEditing={() => cvv.getElement().focus()}
                returnKeyType={Platform.OS === "ios" ? "done" : "next"}
                clearButtonMode="unless-editing"
                onChangeText={(value) => {
                  toUpdateInput(value, "expDate");
                  areTheyValid(date.isValid(), "expDate");
                }}
              />

              <TextInputMask
                value={cardState.inputValues.cvv}
                style={styles.inpl}
                maxLength={3}
                type={"only-numbers"}
                options={{
                  mask: "999",
                }}
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
            <View style={styles.fetchRow}>
              <View>
                <Text style={styles.errorText}>
                  {errors["year"] ? errors["year"] : ""}
                </Text>
                <Text style={styles.errorText}>
                  {errors["month"] ? errors["month"] : ""}
                </Text>
              </View>
              <View>
                <Text style={styles.errorText}>
                  {errors["cvv"] ? errors["cvv"][0] : ""}
                </Text>
              </View>
            </View>
            <CheckBox
              title="Save my card"
              checked={saveCard}
              containerStyle={{ width: "100%", backgroundColor: "white" }}
              onPress={() => setSaveCard(!saveCard)}
            />

            <Paybutton total={total} submitPay={submitPay} />
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

  invalidText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "red",
  },
  submitText: {
    color: "white",
    fontSize: 17,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 10,
  },
  fetchRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 10,
  },
  errorText: {
    color: "red",
    textTransform: "lowercase",
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
    height: 180,
    width: "100%",
    marginBottom: 10,

    alignSelf: "center",
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
  activity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PaymantModal;
