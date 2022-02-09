import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  ScrollView,
  Modal,
  Alert,
  useWindowDimensions,
} from "react-native";
import { RootStackPropsDetails } from "../../App";
import { useAnimeQuery } from "../../generated/graphql";
import styled from "styled-components";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from "@react-navigation/material-top-tabs";
import Description from "./Description";
import Episodes from "./Episodes";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Wrapper = styled(View)`
  background-color: white;
  flex: 1;
  display: flex;
`;

const DetailsWrapper = styled(View)`
  /* margin-top: 70px; */
  padding: 15px;
  display: flex;
  flex: 1;
`;

const InnerWrap = styled(View)`
  width: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BackIconWrapper = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  background-color: #1b1b1bce;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundImageWrapper = styled(TouchableWithoutFeedback)`
  position: relative;
`;

interface Props {}

type TopNavParamList = {
  Description: { description?: string | null };
  Episodes: undefined;
};
export type TopNavPropsDetails = MaterialTopTabScreenProps<
  TopNavParamList,
  "Description"
>;

const Tabs = createMaterialTopTabNavigator<TopNavParamList>();

const AnimeDetails = ({ navigation, route }: RootStackPropsDetails) => {
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const anime = useAnimeQuery({ id: route.params.animID });
  // const { height } = useWindowDimensions();

  const bannerImage = anime.data?.Media?.bannerImage;
  const coverImage = anime.data?.Media?.coverImage?.large;
  const coverImageColor = anime.data?.Media?.coverImage?.color;
  const title = anime.data?.Media?.title;
  const description = anime.data?.Media?.description;
  const tags = anime.data?.Media?.tags;
  const episodes = anime.data?.Media?.episodes;
  const streamingEpisodes = anime.data?.Media?.streamingEpisodes;
  const scale = useRef(new Animated.Value(1)).current;
  const imgRef = useRef<Image>(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    if (bannerImage || coverImage) {
      Image.getSize(bannerImage || coverImage || "", (width, height) => {
        if (width !== imgSize.width) setImgSize({ width, height });
      });
    }
  }, [anime]);

  useEffect(() => {
    if (imgSize.height) {
      Animated.timing(scale, {
        toValue: 1.1,
        useNativeDriver: true,
        duration: 500,
      }).start();
    }
  }, [imgSize]);

  // show loading
  if (!title) return null;

  return (
    <Wrapper>
      <Modal
        style={{ backgroundColor: "red", display: "flex", zIndex: 10 }}
        animationType="fade"
        transparent={true}
        visible={fullScreenImage}
        onRequestClose={() => {
          setFullScreenImage(false);
        }}
      >
        <TouchableHighlight
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            backgroundColor: "black",
          }}
          onPress={() => {
            setFullScreenImage(false);
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              // ...imgSize,
              width: "100%",
              height: "100%",
              maxHeight: "100%",
              maxWidth: "100%",
            }}
            source={{
              uri:
                anime.data?.Media?.bannerImage ||
                anime.data?.Media?.coverImage?.large ||
                "",
            }}
          />
        </TouchableHighlight>
      </Modal>
      {!!showBanner && (
        <BackgroundImageWrapper
          onPress={() => {
            setFullScreenImage(!fullScreenImage);
          }}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            maxHeight: 180,
            height: 180,
          }}
        >
          {(!!bannerImage || !!coverImage) && (
            <Animated.View
              style={{
                backgroundColor: "white",
                transform: [{ scale: scale }, { translateY: 30 }],

                maxWidth: "100%",
              }}
            >
              <Image
                ref={imgRef}
                resizeMode="contain"
                style={{
                  ...imgSize,
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
                source={{
                  uri:
                    anime.data?.Media?.bannerImage ||
                    anime.data?.Media?.coverImage?.large ||
                    "",
                }}
              />
            </Animated.View>
          )}
        </BackgroundImageWrapper>
      )}

      <BackIconWrapper
        style={{ ...styles.wrapper, shadowColor: coverImageColor || "" }}
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
            size={20}
            color="#ffffffc7"
            style={styles.touch}
            onPress={() => {
              navigation.navigate("TwoDimensionHome", {
                showSearchBar: true,
              });
            }}
          />
        </InnerWrap>
      </BackIconWrapper>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: 30,
          position: "relative",
        }}
      >
        <View
          style={{
            ...styles.title,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text>{title?.english || title?.romaji || title?.native}</Text>
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => {
              setShowBanner(!showBanner);
            }}
          >
            <MaterialIcons
              name={!showBanner ? "fullscreen" : "fullscreen-exit"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <DetailsWrapper>
        <View
          style={{
            flex: 1,
            marginTop: 40,
            overflow: "hidden",
          }}
        >
          <Tabs.Navigator>
            <Tabs.Screen
              name="Description"
              children={(props) => (
                <Description
                  description={description}
                  totalEpisodes={episodes}
                  tags={tags}
                  coverImageColor={coverImageColor || "#20232a"}
                  {...props}
                />
              )}
            />
            {!!streamingEpisodes?.length && (
              <Tabs.Screen
                name="Episodes"
                children={(props) => (
                  <Episodes
                    coverImageColor={coverImageColor || "#20232a"}
                    streamingEpisodes={streamingEpisodes}
                    {...props}
                  />
                )}
              />
            )}
          </Tabs.Navigator>
        </View>
      </DetailsWrapper>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  buttonText: { color: "white" },
  title: {
    fontSize: 24,
    fontWeight: "600",
    position: "relative",
    top: 34,

    textShadowColor: "rgba(255, 255, 255, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  touch: {
    alignItems: "center",
    justifyContent: "center",
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
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0,
    shadowRadius: 9.11,

    elevation: 14,
    marginTop: 20,
  },
});

export default AnimeDetails;
