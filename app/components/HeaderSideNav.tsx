import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import HeaderSideNavToggle from "./HeaderSideNavToggle";

interface Props {}

const HeaderSideNav = (props: Props) => {
  return (
    <View>
      <HeaderSideNavToggle />
    </View>
  );
};

export default HeaderSideNav;
