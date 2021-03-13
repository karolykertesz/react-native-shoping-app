import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

const CustomButton = (props) => {
  return <HeaderButton IconComponent={Ionicons} iconSize={23} />;
};

export default CustomButton;
