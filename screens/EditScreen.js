import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ProductDispatch from "../store/actions/products";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EditScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { id } = route.params;
  const productToEdit = useSelector((state) =>
    state.product.userProduct.find((item) => item.id === id)
  );

  const [title, setTitle] = useState(productToEdit ? productToEdit.title : "");
  const [url, setUrl] = useState(productToEdit ? productToEdit.imageUrl : "");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState(
    productToEdit ? productToEdit.description : ""
  );

  const editSubmit = useCallback(() => {
    if (productToEdit) {
      dispatch(ProductDispatch.editProduct(id, title, desc, url));
      navigation.goBack();
    } else {
      dispatch(ProductDispatch.createProduct(title, desc, url, +price));
      navigation.goBack();
    }
  }, [dispatch, id, title, desc, url, price]);
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
            keyboardType="default"
            autoFocus={true}
            autoCapitalize="sentences"
            autoCorrect
            clearButtonMode="unless-editing"
            placeholder="Title"
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.titleText}>URL</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => setUrl(text)}
            value={url}
            keyboardType="default"
            autoFocus={true}
            clearButtonMode="unless-editing"
            placeholder="Please Enter a valid URL"
          />
        </View>
        {!id && (
          <View style={styles.input}>
            <Text style={styles.titleText}>Price</Text>
            <TextInput
              style={styles.textinput}
              value={price}
              onChangeText={(text) => setPrice(text)}
              keyboardType="decimal-pad"
              autoFocus={true}
              placeholder="Please Enter a numeric value"
            />
          </View>
        )}
        <View style={styles.input}>
          <Text style={styles.titleText}>Description</Text>
          <TextInput
            style={styles.textinput}
            value={desc}
            onChangeText={(text) => setDesc(text)}
            keyboardType="default"
            autoCorrect
            autoFocus={true}
            clearButtonMode="unless-editing"
            multiline={true}
            placeholder="Description"
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
