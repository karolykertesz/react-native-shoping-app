import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { Card, Input, Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import * as GoogleSignIn from "expo-google-sign-in";
import * as AppAuth from "expo-app-auth";
const { URLSchemes } = AppAuth;
import * as Google from "expo-google-app-auth";
const AuthScreen = () => {
  const [gUser, setGuser] = useState(null);

  async function signInWithGoogleAsync() {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        iosClientId:
          "632910480566-7mr5eicua4iocl7ek3alrospollralcr.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        console.log(accessToken);
        console.log(user);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  console.log(gUser);
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
            keyboardType="email-address"
            required
            autoCapitalize="none"
            errorMessage="Plese Enter a valid email"
            onChangeText={() => {}}
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
            errorMessage="Plese Enter a valid Password"
            onChangeText={() => {}}
            defaultValue=""
            secureTextEntry
          />
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
            onPress={() => {}}
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
            onPress={() => {}}
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
            onPress={() => signInWithGoogleAsync()}
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};
// fskVKZ0YLpQheqp052ueDpqN
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    borderRadius: 15,
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
});

export default AuthScreen;
