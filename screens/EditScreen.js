import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EditScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const productToEdit = useSelector((state) =>
    state.product.Allproducts.find((item) => item.id === id)
  );
  const [title, setTitle] = useState(productToEdit ? productToEdit.title : "");
  const [url, setUrl] = useState(productToEdit ? productToEdit.imageUrl : "");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState(
    productToEdit ? productToEdit.description : ""
  );
  const editSubmit = useCallback(() => {
    console.log("submited");
  }, []);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => editSubmit()}
        >
          <Ionicons name="save-sharp" size={23} color="white" />
        </TouchableOpacity>
      ),
      headerTitle: id ? "Edit" : "Add",
    });
  }, [navigation, editSubmit]);
  return (
    <SafeAreaView>
      <ScrollView style={styles.screen}>
        <View style={styles.input}>
          <Text style={styles.titleText}>Title</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.titleText}>URL</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => setUrl(text)}
            value={url}
          />
        </View>
        {!id && (
          <View style={styles.input}>
            <Text style={styles.titleText}>Price</Text>
            <TextInput
              style={styles.textinput}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.input}>
          <Text style={styles.titleText}>Description</Text>
          <TextInput
            style={styles.textinput}
            value={desc}
            onChangeText={(text) => setDesc(text)}
          />
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
