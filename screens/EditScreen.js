import React, { useCallback, useReducer } from "react";
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

const ACTIONS = {
  UPDATE: "UPDATE",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE:
      const itemsToUppdate = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      return {
        ...state,
        inputValues: itemsToUppdate,
      };
  }
  return state;
};

const EditScreen = ({ route, navigation }) => {
  const [stateForm, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: productToEdit ? productToEdit.title : "",
      url: productToEdit ? productToEdit.imageUrl : "",
      desc: productToEdit ? productToEdit.description : "",
      price: "",
    },
  });
  const dispatch = useDispatch();
  const { id } = route.params;
  const productToEdit = useSelector((state) =>
    state.product.userProduct.find((item) => item.id === id)
  );

  const inputTextAdder = (inputId, text) => {
    formDispatch({
      type: ACTIONS.UPDATE,
      value: text,
      input: inputId,
    });
  };
  const editSubmit = useCallback(() => {
    if (productToEdit) {
      dispatch(
        ProductDispatch.editProduct(
          id,
          stateForm.inputValues.title,
          stateForm.inputValues.desc,
          stateForm.inputValues.url
        )
      );
      navigation.goBack();
    } else {
      dispatch(
        ProductDispatch.createProduct(
          stateForm.inputValues.title,
          stateForm.inputValues.desc,
          stateForm.inputValues.url,
          +stateForm.inputValues.price
        )
      );
      navigation.goBack();
    }
  }, [
    dispatch,
    id,
    stateForm.inputValues.title,
    stateForm.inputValues.desc,
    stateForm.inputValues.url,
    stateForm.inputValues.price,
  ]);
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
            onChangeText={inputTextAdder.bind(this, "this")}
            value={stateForm.inputValues.title}
            keyboardType="default"
            autoFocus={true}
            autoCapitalize="sentences"
            autoCorrect
            clearButtonMode="unless-editing"
            placeholder="Title"
            returnKeyType="next"
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.titleText}>URL</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={inputTextAdder.bind(this, "url")}
            value={stateForm.inputValues.url}
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
              value={stateForm.inputValues.price}
              onChangeText={inputTextAdder.bind(this, "price")}
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
            value={stateForm.inputValues.desc}
            onChangeText={inputTextAdder.bind(this, "desc")}
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
