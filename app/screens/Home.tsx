import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styled from "styled-components/native";
import Box from "../components/Box";
import Header from "../components/Header";
import Page from "../components/Page";
import { Canvas } from "@react-three/fiber";
import { Room } from "../components/Room";

const StyledInput = styled(TextInput)`
  border: 1px solid black;
`;

const StyledCanvas = styled(Canvas)`
  border: 1px solid black;
`;

interface Props {}

const Home = (props: Props) => {
  const [text, setText] = useState("");

  return (
    <>
      <Header />
      <Page>
        <Text>Search for Anime</Text>
        <StyledInput
          onChangeText={(text: string) => {
            setText(text);
          }}
          value={text}
        />
        {/* results */}
        {/* <View></View> */}
        <Canvas style={{ height: "100vh" }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Room />
        </Canvas>
        ,
      </Page>
    </>
  );
};

export default Home;
