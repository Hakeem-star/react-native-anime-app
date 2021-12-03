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
  styles?: {
    xInterpolate: Animated.AnimatedInterpolation;
    yInterpolate: Animated.AnimatedInterpolation;
    zInterpolate: Animated.AnimatedInterpolation;
  };
}

const AnimeResult = ({ anime, rotation, styles }: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Anime Details">>();
  const ref = useRef<View>(null);
  const [animate, setAnimate] = useState<boolean>(true);
  console.log(animate);

  useEffect(() => {
    if (ref.current)
      ref.current?.measure((x, y, width, height, pageX, pageY) => {
        setAnimate(!!pageY);
        // return console.log({ x, y, width, height, pageX, pageY });
      });
  });
  useEffect(() => {
    return () => setAnimate(false);
  }, []);

  //extract to hook TODO
  const x = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(0)).current;
  const z = useRef(new Animated.Value(0)).current;

  const count = useRef(0);
  useEffect(() => {
    if (rotation.y !== 0) {
      // Animated.spring(x, {
      //   toValue: -rotation.x,
      //   useNativeDriver: true,
      //   delay: Math.random() * 50,
      //   stiffness: 18,
      //   damping: 2,
      //   mass: 1,
      // }).start();
      Animated.spring(y, {
        useNativeDriver: true,
        toValue: -rotation.y + Math.random() * 0.3,
        delay: Math.random() * 0.3,
        stiffness: 200,
        damping: 0.21,
        mass: 0.6,
      }).start();
      // Animated.spring(z, {
      //   toValue: -rotation.z,
      //   useNativeDriver: true,
      //   delay: Math.random() * 10,
      //   stiffness: 18,
      //   damping: 2,
      //   mass: 1,
      // }).start();
    }
    count.current++;
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
          ...styless.container,
          transform: animate
            ? [
                { perspective: 350 },
                { rotateX: xInterpolate },
                { rotateY: yInterpolate },
                { rotateZ: zInterpolate },
              ]
            : [],
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
