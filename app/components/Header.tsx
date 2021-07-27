import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import HeaderSideNav from "./HeaderSideNav";

const StyledView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 40px;
`;

const HeaderContent = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 15px;
`;

const HeaderTextWrapper = styled(View)`
  margin-left: 30px;
  height: 100%;
  display: flex;
  align-items: center;

  justify-content: center;
`;

interface Props {}

const Header = (props: Props) => {
  return (
    <StyledView>
      <HeaderContent>
        <HeaderSideNav />
        <HeaderTextWrapper>
          <Text style={{fontWeight:"500"}}>Anime App</Text>
        </HeaderTextWrapper>
      </HeaderContent>
    </StyledView>
  );
};

export default Header;
