import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
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
import SearchResults from "../components/SearchResults";
import { createStackNavigator } from "@react-navigation/stack";
import { useAnimesQuery } from "../generated/graphql";
import { ANILIST_ENDPOINT } from "../constants/queryConfigs";
import debounce from "lodash.debounce";
const Stack = createStackNavigator();

softShadows();

const StyledInput = styled(TextInput)`
  border: 1px solid black;
  height: 50px;
  padding: 0 15px;
  border-radius: 3px;
  border: 1px solid #9fa5aa;
`;

interface Props {}

const Home = (props: Props) => {
  const [text, setText] = useState("");
  const [show3D, setShow3D] = useState(false);
  const { data, refetch } = useAnimesQuery(
    { name: text, page: 1 },
    { enabled: false }
  );

  const debouncedRefetch = useMemo(
    () =>
      debounce(() => {
        refetch();
      }, 250),
    [refetch]
  );

  useEffect(() => {
    if (!!text) {
      debouncedRefetch();
    }
  }, [text]);

  return (
    <Page>
      <Header />
      <View
        style={{
          marginTop: "15px",
          maxHeight: "calc(100vh - 55px)",
          height: "calc(100vh - 55px)",
          overflow: "hidden",
        }}
      >
        <View style={{ paddingHorizontal: "20px" }}>
          <StyledInput
            onChangeText={(text: string) => {
              setText(text);
            }}
            value={text}
            placeholder={"Search for Anime"}
            placeholderTextColor={"#ADB2B6"}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            marginTop: "15px",
            height: "50px",
          }}
        >
          <TouchableHighlight
            onPress={() => {
              setShow3D(false);
            }}
            underlayColor="#DDDDDD"
            style={{
              width: "50%",
              height: "100%",
              border: "1px solid #EEEEEE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: !show3D ? "#A6A6A6" : "transparent",
            }}
          >
            <Text style={{ fontWeight: "500", color: "#4A4A4A" }}>2D</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setShow3D(true);
            }}
            underlayColor="#DDDDDD"
            style={{
              width: "50%",
              height: "100%",
              border: "1px solid #EEEEEE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: show3D ? "#A6A6A6" : "transparent",
            }}
          >
            <Text style={{ fontWeight: "500", color: "#4A4A4A" }}>3D</Text>
          </TouchableHighlight>
        </View>
        {/* results */}
        {show3D ? (
          <Canvas shadows style={{ height: "100%", width: "100vw", flex: 1 }}>
            {/* <Scene /> */}
          </Canvas>
        ) : (
          <SearchResults
            results={data?.Page?.media?.filter((media) => {
              console.log(
                media?.title?.romaji?.includes(text),
                media?.title?.romaji,
                text
              );

              // return media?.title?.romaji?.includes(text);
              return true;
            })}
          />
        )}
      </View>
    </Page>
  );
};
812;
export default Home;
