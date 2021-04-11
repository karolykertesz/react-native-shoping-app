import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
const validate = require("validate.js");
import { constraints } from "../helpers/shippingValidate";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Card, Input, Button, CheckBox } from "react-native-elements";
import DropDown from "./UI/DropDown";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import { addShipping } from "../store/actions/shipping ";
const ADD_INPUT = "ADD_INPUT";
const ShippREducer = (state, action) => {
  switch (action.type) {
    case ADD_INPUT:
      const updatedItem = {
        ...state.initiaState,
        [action.input]: action.value,
      };
      return {
        ...state,
        initiaState: updatedItem,
      };
    default:
      return state;
  }
};

const Shipping = ({ setIsShipping, updateS }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [city, setCity] = useState("");
  const [address, setAdrres] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [check, checkChecked] = useState(false);
  const [changeShipping, setChangeShipping] = useState(false);
  const initialErrors = {
    city: null,
    address: null,
    state: null,
    zip: null,
  };
  const [errors, setErrors] = useState(initialErrors);

  const sendShipping = useCallback(() => {
    setErrors(initialErrors);
    const valueR = validate(
      {
        city,
        address: address,
        state: state,
        zipp: zip,
      },
      constraints
    );

    if (valueR !== undefined) {
      setErrors(valueR);
      return;
    }
    const country = value === "HU" ? "NOT APPLICABLE" : state;
    dispatch(addShipping(city, address, zip, value, country, check, updateS));
    setIsShipping(false);
  }, [city, address, state, zip, dispatch, check, updateS]);

  return (
    <KeyboardAvoidingView
      style={{ width: "100%" }}
      keyboardVerticalOffset={200}
      behavior="padding"
    >
      <ScrollView>
        <View style={{ width: "100%" }}>
          <Card>
            <Card.Title>Your shipping Details</Card.Title>
            <Card.Divider />
            <DropDown setValue={setValue} />
            <Input
              keyboardType="default"
              placeholder="CITY"
              autoCapitalize="none"
              blurOnSubmit={false}
              value={city}
              autoFocus={true}
              clearButtonMode="unless-editing"
              errorStyle={{ color: "red" }}
              errorMessage={errors.city !== null && errors.city}
              autoCompleteType="off"
              leftIcon={
                <MaterialCommunityIcons
                  name="home-city"
                  size={23}
                  color="#4990e6"
                />
              }
              //   style={styles}
              onChangeText={(text) => setCity(text)}
            />
            <Input
              placeholder="ADDRESS LINE1"
              leftIcon={<FontAwesome5 name="city" size={23} color="#4990e6" />}
              //   style={styles}
              onChangeText={(text) => setAdrres(text)}
              clearButtonMode="unless-editing"
              errorStyle={{ color: "red" }}
              autoCapitalize="none"
              blurOnSubmit={false}
              autoCompleteType="off"
              value={address}
              errorMessage={errors.address !== null && errors.address}
            />
            <Input
              placeholder="ZIPP CODE"
              disabled={false}
              leftIcon={
                <Ionicons name="md-barcode-sharp" size={23} color="#4990e6" />
              }
              onChangeText={(text) => setZip(text)}
              clearButtonMode="unless-editing"
              errorStyle={{ color: "red" }}
              autoCapitalize="none"
              blurOnSubmit={false}
              autoCompleteType="off"
              value={zip}
              errorMessage={errors.zipp !== null && errors.zipp}
            />
            {value !== "HU" && (
              <View>
                <Input
                  placeholder="STATE"
                  leftIcon={<AntDesign name="flag" size={23} color="#4990e6" />}
                  //   style={styles}
                  onChangeText={(text) => setState(text)}
                  clearButtonMode="unless-editing"
                  errorStyle={{ color: "red" }}
                  autoCapitalize="none"
                  blurOnSubmit={false}
                  autoCompleteType="off"
                  value={state}
                  errorMessage={errors.state !== null && errors.state}
                />
              </View>
            )}
            <View style={styles.btnBox}>
              <Button
                onPress={() => sendShipping()}
                buttonStyle={styles.btn}
                icon={
                  <Icon
                    name="send"
                    size={14}
                    color="white"
                    style={{ paddingHorizontal: 5 }}
                  />
                }
                title={!updateS ? "Submit" : "Update"}
              />
              <CheckBox
                title="Save My Shipping"
                onPress={() => checkChecked((curr) => !curr)}
                checked={check}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  btn: {
    width: "100%",
  },
  btnBox: {
    width: "100%",
  },
});

export default Shipping;
