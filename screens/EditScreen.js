import React, { useCallback, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ProductDispatch from "../store/actions/products";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InputComp from "../components/UI/InputComp";
import { inputValuesObj } from "../helpers/inputValues";
const validate = require("validate.js");
import { constraints } from "../helpers/formvalidate";

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
  const dispatch = useDispatch();
  const { id } = route.params;
  const productToEdit = useSelector((state) =>
    state.product.userProduct.find((item) => item.id === id)
  );

  const [stateForm, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: productToEdit ? productToEdit.title : "",
      yourUrl: productToEdit ? productToEdit.imageUrl : "",
      description: productToEdit ? productToEdit.description : "",
      price: "",
    },
  });
  const [error, setError] = useState(undefined);
  const inputTextAdder = (inputId, text) => {
    formDispatch({
      type: ACTIONS.UPDATE,
      value: text,
      input: inputId,
    });
  };
  const editSubmit = useCallback(() => {
    const title = stateForm.inputValues.title;
    const description = stateForm.inputValues.description;
    const url = stateForm.inputValues.yourUrl;
    const price = stateForm.inputValues.price;
    const value = validate(
      {
        title: title,
        yourUrl: url,
        description: description,
        price: productToEdit ? "1" : price,
      },
      constraints
    );
    if (value !== undefined) {
      setError(value);
      return;
    }
    if (productToEdit) {
      dispatch(ProductDispatch.editProduct(id, title, description, url));
      navigation.goBack();
    } else {
      dispatch(ProductDispatch.createProduct(title, description, url, +price));
      navigation.goBack();
    }
  }, [
    dispatch,
    id,
    stateForm.inputValues.title,
    stateForm.inputValues.description,
    stateForm.inputValues.yourUrl,
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
        {id
          ? inputValuesObj
              .filter((item) => item.id !== "price")
              .map((i, indx) => (
                <View style={styles.input} key={indx}>
                  <InputComp
                    onChangeText={inputTextAdder.bind(this, i.id)}
                    placeholder={i.placeholder}
                    keyboardType={i.keyboardType}
                    value={stateForm.inputValues[i.id]}
                    title={i.title}
                    multiline={i.id === "description" && true}
                    error={error !== undefined ? error[i.id] : ""}
                  />
                </View>
              ))
          : inputValuesObj.map((i, indx) => (
              <View style={styles.input} key={indx}>
                <InputComp
                  onChangeText={inputTextAdder.bind(this, i.id)}
                  placeholder={i.placeholder}
                  keyboardType={i.keyboardType}
                  value={stateForm.inputValues[i.id]}
                  title={i.title}
                  multiline={i.id === "desc" && true}
                  error={error !== undefined ? error[i.id] : ""}
                />
              </View>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
