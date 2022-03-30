import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ThreeAxisMeasurement } from "expo-sensors";
import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  Touchable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  call,
  Easing,
  Extrapolate,
  interpolate,
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  RootStackParamList,
  RootStackProps,
  RootStackPropsDetails,
} from "../../App";
import {
  AnimeMediaFragment,
  CoverImageFragment,
} from "../../generated/graphql";
import { useCreateUserMutation } from "../../generated/server/graphql";

interface Props {
  anime: (AnimeMediaFragment & CoverImageFragment) | null;
  index: number;
  animatedStyles: any;
  gryroAnimate: boolean;
}

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

const AnimeResult = ({
  anime,
  index,
  animatedStyles,
  gryroAnimate,
}: Props): JSX.Element => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Anime Details">>();

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {
          if (anime?.id) {
            navigation.navigate("Anime Details", { animID: anime?.id });
          }
        }}
      >
        <Animated.View
          style={[
            styles.container,
            { marginRight: index % 2 ? 0 : 8, marginBottom: 8 },
          ]}
        >
          {!!anime?.coverImage?.large && (
            <AnimatedImage
              style={[
                styles.container,
                gryroAnimate ? animatedStyles : undefined,
              ]}
              source={{ uri: anime.coverImage?.large }}
            />
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {anime?.title?.english || anime?.title?.romaji}
            </Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AnimeResult;

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 180,
    backgroundColor: "transparent",
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
