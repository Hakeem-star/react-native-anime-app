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
  AnimeMediaFragment,
  CoverImageFragment,
} from "../../generated/graphql";

interface Props {
  anime: (AnimeMediaFragment & CoverImageFragment) | null;
  rotation: ThreeAxisMeasurement;
}

const AnimeResult = ({ anime, rotation }: Props) => {
  const [prevItemRotation, setPrevItemRotation] =
    useState<ThreeAxisMeasurement>({
      x: 0,
      y: 0,
      z: 0,
    });

  // const fadeAnim = useRef(new Animated.ValueXY()).current;
  const x = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(0)).current;
  const z = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (rotation.y !== 0) {
      // Animated.timing(x, {
      //   toValue: rotation.x,
      //   duration: Math.random() * 200,
      //   useNativeDriver: false,
      //   delay: Math.random() * 100,
      // }).start();
      Animated.spring(x, {
        toValue: -rotation.x,
        useNativeDriver: false,
        delay: Math.random() * 50,
        bounciness: 16,
        speed: 1,
      }).start();

      // Animated.timing(y, {
      //   toValue: -rotation.y,
      //   duration: Math.random() * 200,
      //   useNativeDriver: false,
      //   delay: Math.random() * 100,
      // }).start();
      Animated.spring(y, {
        toValue: -rotation.y,
        useNativeDriver: false,
        delay: Math.random() * 50,
        bounciness: 5,
        speed: 0,
      }).start();

      Animated.spring(z, {
        toValue: -rotation.z,
        useNativeDriver: false,
        delay: Math.random() * 50,
        bounciness: 16,
        speed: 1,
      }).start();
    }
  }, [rotation]);

  const xInterpolate = x.interpolate({
    inputRange: [-5, 0, 5],
    outputRange: ["-10deg", "0deg", "10deg"],
  });

  const yInterpolate = y.interpolate({
    inputRange: [-5, 0, 5],
    outputRange: ["-10deg", "0deg", "10deg"],
  });
  const zInterpolate = z.interpolate({
    inputRange: [-10, 0, 10],
    outputRange: ["-5deg", "0deg", "5deg"],
  });

  return (
    <TouchableWithoutFeedback>
      <Animated.View
        style={{
          ...styles.container,
          transform: [
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
    backgroundColor: "red",
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
