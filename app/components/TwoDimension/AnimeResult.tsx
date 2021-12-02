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

const AnimeResult = ({ anime, rotation }: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Anime Details">>();

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
console.log({...rotation});

  useEffect(() => {
    if (rotation.y !== 0) {
      // Animated.timing(x, {
      //   toValue: rotation.x,
      //   duration: Math.random() * 200,
      //   useNativeDriver: false,
      //   delay: Math.random() * 100,
      // }).start();
      Animated.spring(x, {
        toValue: -rotation.x - (-rotation.y/2),
        useNativeDriver: false,
        delay: Math.random() * 50,
        stiffness:18,
        damping:1.5,
        mass:1
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
        delay: Math.random() * 300,
        stiffness:18,
        damping:1.5,
        mass:1
        
        // restDisplacementThreshold:1
      }).start();

      Animated.spring(z, {
        toValue: -rotation.z - (-rotation.y/2),
        useNativeDriver: false,
        delay: Math.random() * 100,
        stiffness:18,
        damping:1.5,
        mass:1
      }).start();
    }
  }, [rotation]);

  const xInterpolate = x.interpolate({
    inputRange: [-5, 0, 5],
    outputRange: ["-50deg", "0deg", "50deg"],
    // extrapolate:"clamp"

  });

  const yInterpolate = y.interpolate({
    inputRange: [-5, 0, 5],
    outputRange: ["-25deg", "0deg", "25deg"],
    extrapolate:"clamp",

  });
  const zInterpolate = z.interpolate({
    inputRange: [-10, 0, 10],
    outputRange: ["-5deg", "0deg", "5deg"],
    
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
        style={{
          ...styles.container,
          transform: [
            { perspective: 1000 },
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
