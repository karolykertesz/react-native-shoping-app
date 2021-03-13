import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Touchable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EditScreen = (props) => {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginHorizontal: 15 }}>
          <Ionicons name="save-sharp" size={23} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);
  return (
    <SafeAreaView>
      <ScrollView style={styles.screen}>
        <View style={styles.input}>
          <Text style={styles.titleText}>Title</Text>
          <TextInput style={styles.textinput} />
        </View>
        <View style={styles.input}>
          <Text style={styles.titleText}>URL</Text>
          <TextInput style={styles.textinput} />
        </View>
        <View style={styles.input}>
          <Text style={styles.titleText}>Price</Text>
          <TextInput style={styles.textinput} />
        </View>
        <View style={styles.input}>
          <Text style={styles.titleText}>Description</Text>
          <TextInput style={styles.textinput} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: "#333333",
    // textAlign: "center",
    fontFamily: "merri-bold",
    fontSize: 17,
    marginVertical: 9,
  },
  screen: {
    margin: 30,
  },
  input: {
    width: "100%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#bfbfbf",
    borderBottomWidth: 1,
  },
});

export default EditScreen;
