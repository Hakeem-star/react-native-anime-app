import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { RootStackPropsDetails } from "../../App";
import { useAnimeQuery } from "../../generated/graphql";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const InnerWrap = styled(View)`
  width: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BackIconWrapper = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 50px;
  height: 50px;
  background-color: #1b1b1bce;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundImageWrapper = styled(View)`
  position: relative;
`;

interface Props {}

const AnimeDetails = ({ navigation, route }: RootStackPropsDetails) => {
  const anime = useAnimeQuery({ id: route.params.animID });

  const bannerImage = anime.data?.Media?.bannerImage;
  const coverImage = anime.data?.Media?.coverImage?.large;
  const coverImageColor = anime.data?.Media?.coverImage?.color;
  const title = anime.data?.Media?.title;
  return (
    <View>
      <BackgroundImageWrapper>
        {(!!bannerImage || !!coverImage) && (
          <ImageBackground
            resizeMode="contain"
            style={{
              ...styles.container,
              backgroundColor: coverImageColor || "",
            }}
            source={{
              uri:
                anime.data?.Media?.bannerImage ||
                anime.data?.Media?.coverImage?.large ||
                "",
            }}
          />
        )}
        <BackIconWrapper
          style={styles.wrapper}
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate("TwoDimensionHome", {
              showSearchBar: true,
            });
          }}
        >
          <InnerWrap>
            <Ionicons
              name="chevron-back-sharp"
              size={30}
              color="#ffffffc7"
              style={styles.touch}
              onPress={() => {
                navigation.navigate("TwoDimensionHome", {
                  showSearchBar: true,
                });
              }}
            />
            <Ionicons
              name="chevron-back-sharp"
              size={30}
              color="#ffffffc7"
              style={{ ...styles.touch, marginLeft: -20 }}
            />
          </InnerWrap>
        </BackIconWrapper>

        <Text style={styles.title}>
          {title?.english || title?.romaji || title?.native}
        </Text>
      </BackgroundImageWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: { color: "white" },
  title: {
    fontSize: 30,
    fontWeight: "600",
    position: "absolute",
    bottom: -8,

    textShadowColor: "rgba(255, 255, 255, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  touch: {
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
    // left: 3,
  },
  container: {
    width: "100%",
    height: 180,
    overflow: "hidden",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    position: "relative",
  },
  wrapper: {
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 1,
    shadowRadius: 9.11,

    elevation: 14,
  },
});

export default AnimeDetails;
