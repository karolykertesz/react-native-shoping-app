import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
const InputComp = (props) => {
 
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
          autoCapitalize="none"
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
        <Text style={styles.error}>{props.error}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: "#333333",
    
    fontFamily: "merri-bold",
    fontSize: 17,
    marginVertical: 9,
  },
  error: {
    textAlign: "center",
    color: "orange",
    fontSize: 17,
  },
});

export default InputComp;
