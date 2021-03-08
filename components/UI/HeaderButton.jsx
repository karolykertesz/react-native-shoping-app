import React from "react";
import { View } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

const HeaderButtonComp = (props) => {
  return (
    <View>
      <HeaderButton
        IconComponent={Ionicons}
        iconSize={23}
        {...props}
        color="white"
      />
    </View>
  );
};

export default HeaderButtonComp;
