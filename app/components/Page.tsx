import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const StyledView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: "center";
  width: 80%;
  margin: 0 auto;
  margin-top: 40px;
`;

interface Props {}

const Page: React.FC<Props> = ({ children }) => {
  return <StyledView>{children}</StyledView>;
};

export default Page;
