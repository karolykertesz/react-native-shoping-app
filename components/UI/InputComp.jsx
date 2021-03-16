import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
const InputComp = (props) => {
  // console.log(props.error);
  return (
    <View>
      <View>
        <Text style={styles.titleText}>{props.title}</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={props.onChangeText}
          value={props.value}
          keyboardType={props.keyboardType}
          autoFocus={true}
          autoCapitalize="sentences"
          autoCorrect
          clearButtonMode="unless-editing"
          placeholder={props.placeholder}
          returnKeyType="next"
          multiline={props.multiline}
          numberOfLines={props.multiline === true ? 3 : 1}
          required
        />
      </View>
      <View>
        <Text>{props.error}</Text>
      </View>
    </View>
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
});

export default InputComp;
