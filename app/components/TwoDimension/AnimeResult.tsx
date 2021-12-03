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
}

// Add tilt when scrolling up or down - TODO

const AnimeResult = ({ anime, rotation }: Props): JSX.Element => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Anime Details">>();
  const ref = useRef<View>(null);

  const x = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(0)).current;
  const z = useRef(new Animated.Value(0)).current;

  const prevValues = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (ref.current)
      ref.current?.measure((_x, _y, width, height, pageX, pageY) => {
        if (pageY) {
          if (prevValues.current.y !== 0 && rotation.y < 0.001) {
            Animated.spring(x, {
              toValue: -prevValues.current.x,
              useNativeDriver: true,
              stiffness: 8,
              damping: 2,
              mass: 0.6,
            }).start();
            Animated.spring(y, {
              useNativeDriver: true,
              toValue: -prevValues.current.y + Math.random() * 0.3,
              // delay: Math.random() * 0.3,
              stiffness: 8,
              damping: 0.21,
              mass: 0.6,
            }).start();
            Animated.spring(z, {
              toValue: -prevValues.current.z,
              useNativeDriver: true,
              stiffness: 8,
              damping: 2,
              mass: 0.6,
            }).start();
          }
        }
      });

    prevValues.current = rotation;
  }, [rotation]);

  const xInterpolate = x.interpolate({
    inputRange: [-5, 0, 5],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "extend",
  });

  const yInterpolate = y.interpolate({
    inputRange: [-5, 0, 5],
    outputRange: ["-5deg", "0deg", "5deg"],
    extrapolate: "extend",
  });
  const zInterpolate = z.interpolate({
    inputRange: [-10, 0, 10],
    outputRange: ["-5deg", "0deg", "5deg"],
    extrapolate: "extend",
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (anime?.id) {
          navigation.navigate("Anime Details", { animID: anime?.id });
        }
      }}
    >
      <Animated.View
        ref={ref}
        style={{
          ...styles.container,
          transform: [
            { perspective: 350 },
            { rotateX: xInterpolate },
            { rotateY: yInterpolate },
            { rotateZ: zInterpolate },
          ],
        }}
      >
        {!!anime?.coverImage?.large && (
          <ImageBackground
            style={styles.container}
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
  );
};

export default AnimeResult;

const styles = StyleSheet.create({
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
