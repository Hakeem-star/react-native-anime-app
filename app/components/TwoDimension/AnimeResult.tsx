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
  rotation: ThreeAxisMeasurement;
  index: number;
  animatedStyles: any;
}

// Add tilt when scrolling up or down - TODO
const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

const AnimeResult = ({
  anime,
  rotation,
  index,
  animatedStyles,
}: Props): JSX.Element => {
  const [randomValue, _] = useState(Math.random() * 2);
  const [canAnimate, setCanAnimate] = useState(false);
  const wrapperRef = useRef<View | null>(null);
  // useCreateUserMutation;
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Anime Details">>();
  // useEffect(() => {
  //   setTimeout(
  //     () =>
  //       wrapperRef?.current?.measure((x, y, width, height, pageX, pageY) => {
  //         if (index === 1) {
  //           console.log({ x, y, pageX, pageY });
  //         }
  //       }),
  //     0
  //   );
  // }, []);

  return (
    <View
      ref={wrapperRef}
      // onLayout={(event) => {

      // }}
    >
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
              style={[styles.container, animatedStyles]}
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
