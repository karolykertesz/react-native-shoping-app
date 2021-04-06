import React from "react";
import { View } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

const HeaderButtonComp = (props) => {
  const lengOfItems = useSelector(
    (state) => Object.keys(state.cart.items).length
  );

  return (
    <View>
      <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
    </View>
  );
};

export const SignOutComp = (props) => {
  return (
    <View>
      <HeaderButton IconComponent={FontAwesome} iconSize={23} {...props} />
    </View>
  );
};

export default HeaderButtonComp;
