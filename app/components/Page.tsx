import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const StyledView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: "center";
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`;

interface Props {}

const Page: React.FC<Props> = ({ children }) => {
  return <StyledView>{children}</StyledView>;
};

export default Page;
