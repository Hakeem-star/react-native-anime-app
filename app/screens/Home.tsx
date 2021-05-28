import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styled from "styled-components/native";
import Box from "../components/Box";
import Header from "../components/Header";
import Page from "../components/Page";
import { Canvas, useFrame } from "@react-three/fiber";
import { Room } from "../components/Room";
import {
  OrbitControls,
  PerspectiveCamera,
  softShadows,
} from "@react-three/drei";
import { useControls } from "leva";
import Scene from "../components/Scene";

softShadows();

const StyledInput = styled(TextInput)`
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
        {/* <Canvas shadows style={{ height: "100%", width: "100vw", flex: 1 }}>
          <Scene />
        </Canvas> */}
      </Page>
    </>
  );
};

export default Home;
