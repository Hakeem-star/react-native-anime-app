import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const StyledView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightblue;
`;

interface Props {}

const Header = (props: Props) => {
  return (
    <StyledView>
      <Text>Anime App</Text>
    </StyledView>
  );
};

export default Header;
