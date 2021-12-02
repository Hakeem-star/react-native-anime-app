import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ThreeAxisMeasurement } from "expo-sensors";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  Touchable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  RootStackParamList,
  RootStackProps,
  RootStackPropsDetails,
} from "../../App";
import {
  AnimeMediaFragment,
  CoverImageFragment,
} from "../../generated/graphql";

interface Props {
  anime: (AnimeMediaFragment & CoverImageFragment) | null;
  rotation: ThreeAxisMeasurement;
  styles:{
    xInterpolate: Animated.AnimatedInterpolation;
    yInterpolate: Animated.AnimatedInterpolation;
    zInterpolate: Animated.AnimatedInterpolation;
};
}

const AnimeResult = ({ anime, rotation,styles }: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Anime Details">>();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (anime?.id) {
          navigation.navigate("Anime Details", { animID: anime?.id });
        }
      }}
    >
      <Animated.View
        style={{
          ...styless.container,
          transform: [
            { perspective: 1000 },
            { rotateX: styles.xInterpolate },
            { rotateY:  styles.yInterpolate },
            { rotateZ:  styles.zInterpolate },
          ],
        }}
      >
        {!!anime?.coverImage?.large && (
          <ImageBackground
            style={styless.container}
            source={{ uri: anime.coverImage?.large }}
          />
        )}
        <View style={styless.titleContainer}>
          <Text style={styless.title}>
            {anime?.title?.english || anime?.title?.romaji}
          </Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimeResult;

const styless = StyleSheet.create({
  container: {
    width: 180,
    height: 180,
    backgroundColor: "transparent",
    margin: 4,
    borderRadius: 10,
    overflow: "hidden",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
    padding: 5,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    textAlign: "center",
    fontWeight: "400",
  },
});
