import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Card, Input, Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
const validate = require("validate.js");
import { constraints } from "../helpers/authValidate";
import { createUser, signUpWithGoogle, signIn } from "../store/actions/auth";

const AuthScreen = () => {
  const dispatch = useDispatch();
  const [email, SetEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(undefined);
  const [signError, setSignError] = useState(null);
  const signInUser = useCallback(async () => {
    setSignError(null);
    setLoading(true);
    const value = validate({ email, password }, constraints);
    if (value !== undefined) {
      setError(value);
      setLoading(false);
      return;
    }
    dispatch(signIn(email, password))
      .then((e) => {
        if (e === "Invalid credencial") {
          setSignError("Invalid credencial");
        }
      })
      .then(setLoading(false));
  }, [email, password, dispatch, validate, error]);
  const handleSubmit = useCallback(async () => {
    setLoading(true);
    const value = validate({ email, password }, constraints);
    if (value !== undefined) {
      setError(value);
      setSignError(null);
      setLoading(false);
      return;
    }
    setError(undefined);
    dispatch(createUser(email, password))
      .then((re) => {
        setSignError(re);
      })
      .then(setLoading(false))
      .catch((err) => {
        console.log(err);
      });
  }, [email, password, createUser, loading, error]);
  if (loading) {
    return (
      <View style={styles.activity}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      keyboardVerticalOffset={50}
      behavior="padding"
    >
      <Card style={styles.screen}>
        <Card.Title>Sign in</Card.Title>
        <Card.Divider />
        <ScrollView>
          <Input
            labelStyle={styles.label}
            leftIcon={<Entypo name="mail" size={24} color="#4d4d33" />}
            label="Email"
            autoCompleteType="off"
            autoCorrect={false}
            keyboardType="email-address"
            required
            autoCapitalize="none"
            errorMessage={error !== undefined ? error["email"] : ""}
            errorStyle={{
              fontSize: 16,
            }}
            onChangeText={(text) => {
              SetEmail(text);
            }}
            defaultValue=""
          />
          <Input
            leftIcon={
              <MaterialCommunityIcons
                name="onepassword"
                size={23}
                color="#4d4d33"
              />
            }
            label="PASSWORD"
            labelStyle={styles.label}
            keyboardType="default"
            required
            autoCapitalize="none"
            errorMessage={error !== undefined ? error["password"] : ""}
            errorStyle={{
              fontSize: 16,
            }}
            onChangeText={(text) => {
              setPassword(text);
            }}
            defaultValue=""
            secureTextEntry
          />
          <View>
            <Text style={styles.fechError}>{signError ?? signError}</Text>
          </View>
          <Button
            style={styles.button}
            icon={
              <Octicons
                name="sign-in"
                size={24}
                color="white"
                style={{ paddingHorizontal: 5 }}
              />
            }
            title="Log in"
            onPress={() => signInUser()}
          />
          <Button
            style={styles.button}
            icon={
              <FontAwesome
                name="sign-in"
                size={24}
                color="white"
                style={{ paddingHorizontal: 5 }}
              />
            }
            title="Sign Up"
            onPress={() => handleSubmit()}
          />
          <Button
            color="red"
            buttonStyle={{ backgroundColor: "red" }}
            icon={
              <Fontisto
                name="google"
                size={24}
                color="white"
                style={{ paddingHorizontal: 5 }}
              />
            }
            title="Sign in With Google"
            onPress={() => dispatch(signUpWithGoogle())}
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    borderRadius: 15,
  },
  activity: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
    fontFamily: "merri-regular",
    fontSize: 15,
    color: "#4d4d33",
  },
  button: {
    marginVertical: 5,
  },
  Gbutton: {
    color: "red",
    backgroundColor: "red",
  },
  fechError: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    fontFamily: "merri-bold",
  },
});

export default AuthScreen;
