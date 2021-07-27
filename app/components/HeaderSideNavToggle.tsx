import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styled from "styled-components/native";

interface Props {}

const NavToggle = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 3px;
  width: 15px;
  height: 15px;
  gap: 2px;
  border: 1px solid black;
  border-radius: 100px;
`;

const NavLine = styled(View)`
  width: 100%;
  height: 1px;
  background-color: black;
`;

const HeaderSideNavToggle = (props: Props) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => alert("Pressed!")}
    >
      <NavToggle>
        <NavLine />
        <NavLine />
        <NavLine />
      </NavToggle>
    </TouchableHighlight>
  );
};

export default HeaderSideNavToggle;
