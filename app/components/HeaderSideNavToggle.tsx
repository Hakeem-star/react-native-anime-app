import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

interface Props {}

const NavToggle = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 6px;
  width: 30px;
  height: 30px;
  gap: 4;
  border: 1px solid black;
  border-radius: 100px;
`;

const NavLine = styled(View)`
  width: 100%;
  height: 2px;
  background-color: black;
`;

const HeaderSideNavToggle = (props: Props) => {
  return (
    <NavToggle>
      <NavLine />
      <NavLine />
      <NavLine />
    </NavToggle>
  );
};

export default HeaderSideNavToggle;
