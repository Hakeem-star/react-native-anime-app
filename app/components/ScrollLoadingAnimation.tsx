import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import styled from "styled-components/native";

const StyledFlatList = styled(Animated.View)`
  background-color: red;
  width: 50%;
  height: 50%;
`;

interface Props {}

const ScrollLoadingAnimation = (props: Props) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  //   const rotate = () => {
  //     Animated.timing(rotateAnim, {
  //       useNativeDriver: true,
  //       toValue: 1,
  //       duration: 2000,
  //     }).start();
  //   };
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1deg"],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        useNativeDriver: true,
        toValue: 1,
        duration: 2000,
      })
    );
  }, []);

  return <StyledFlatList style={{ transform: [{ rotate: rotate }] }} />;
};

export default ScrollLoadingAnimation;
