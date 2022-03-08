import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import Page from "../../components/Page";

import {
  AnimeMediaFragment,
  AnimesQuery,
  CoverImageFragment,
  useAnimesQuery,
  useInfiniteAnimesQuery,
} from "../../generated/graphql";
import debounce from "lodash.debounce";
import { useInfiniteGraphQLQuery } from "../../util/useInfiniteGraphQLQuery";
import { InfiniteData, useQueryClient } from "react-query";
import { RootStackProps } from "../../App";
import AnimeResult from "../../components/TwoDimension/AnimeResult";
import { Gyroscope, ThreeAxisMeasurement } from "expo-sensors";
import SearchInput from "../SearchInput";
import {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const EmptyState = styled(View)`
  margin-top: 50px;
`;

interface Props {}

const TwoDimensionHome = ({ navigation, route }: RootStackProps) => {
  const [text, setText] = useState("");
  const [offsetY, setOffsetY] = useState(0);
  const [finalData, setFinalData] = useState<
    InfiniteData<AnimesQuery> | undefined | null
  >(null);

  const [subscription, setSubscription] = useState<ReturnType<
    typeof Gyroscope.addListener
  > | null>(null);
  const [gyroData, setGyroData] = useState<ThreeAxisMeasurement>({
    x: 0,
    y: 0,
    z: 0,
  });

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        const data = { ...gyroscopeData };
        if (data.y < 0.01 && data.y > -0.01) {
          setGyroData({ ...gyroscopeData, y: 0 });
        } else setGyroData(gyroscopeData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    Gyroscope.setUpdateInterval(200);
    // TODO - This is causing slowdown when there are a lot of results
    _subscribe();
    return () => _unsubscribe();
  }, [setGyroData]);

  const { fetchNextPage, hasNextPage, data, isLoading, refetch, remove } =
    useInfiniteAnimesQuery(
      "page",
      { name: text.trim(), page: 1 },
      {
        enabled: false,
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage?.Page?.pageInfo?.hasNextPage) {
            return { page: (lastPage?.Page?.pageInfo?.currentPage || 0) + 1 };
          }
          return undefined;
        },
      }
    );

  useEffect(() => {
    if (text) {
      refetch();
    } else {
      console.log("OI");

      setFinalData(null);
    }
  }, [text]);
  useEffect(() => {
    setFinalData(data);
  }, [data]);

  const result = useMemo(
    () =>
      finalData?.pages?.reduce((acc, current) => {
        return [
          ...acc,
          ...(current.Page?.media?.filter((media) => {
            return (
              !!media &&
              (media?.title?.romaji
                ?.toLowerCase()
                ?.includes(text.trim().toLowerCase()) ||
                media?.title?.english
                  ?.toLowerCase()
                  ?.includes(text.trim().toLowerCase()))
            );
          }) || []),
        ];
      }, [] as ((AnimeMediaFragment & CoverImageFragment) | null)[]),
    [finalData]
  );

  const prev = useSharedValue({ x: 0, y: 0, z: 0 });

  const derivedTranslations = useDerivedValue(() => {
    "worklet";

    const MAX_X = 5;
    const MAX_Y = 5;
    const MAX_Z = 5;

    // This allows a smooth transition between movements
    let newX = prev.value.x + gyroData.x * -1;
    let newY = prev.value.y + gyroData.y * -1;
    let newZ = prev.value.z + gyroData.z * -1;

    if (Math.abs(newX) >= MAX_X) {
      newX = prev.value.x;
    }
    if (Math.abs(newY) >= MAX_Y) {
      newY = prev.value.y;
    }
    if (Math.abs(newZ) >= MAX_Z) {
      newZ = prev.value.z;
    }

    prev.value = {
      x: newX,
      y: newY,
      z: newZ,
    };

    return {
      x: newX,
      y: newY,
      z: newZ,
    };
  }, [gyroData]);

  // Having one instance is more performant than multiple instances within the AnimeResult
  const animatedStyles = useAnimatedStyle(() => {
    const inputRange = [-1, 0, 1];

    const outputRange = [-1.5, 0, 1.5];
    return {
      transform: [
        { perspective: 80 },
        { scale: 1.4 },
        {
          translateX: withSpring(derivedTranslations.value.x),
        },
        {
          translateY: withSpring(derivedTranslations.value.y),
        },
        {
          rotateX:
            interpolate(derivedTranslations.value.x, inputRange, outputRange) +
            "deg",
        },
        {
          rotateY:
            interpolate(derivedTranslations.value.y, inputRange, outputRange) +
            "deg",
        },
        {
          rotateZ:
            interpolate(
              derivedTranslations.value.z / 3,
              inputRange,
              outputRange
            ) + "deg",
        },
      ],
    };
  }, [gyroData]);

  return (
    <Page>
      <View
        style={{
          marginTop: 15,
          maxHeight: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          flex: 1,
        }}
      >
        {!!route?.params?.showSearchBar && (
          <SearchInput
            defaultText={text}
            onChange={(value) => {
              setText(value);
            }}
            placeholder={"Search for Anime"}
          />
        )}
        {result?.length ? (
          <>
            <View
              style={{
                flex: 1,
                marginTop: 20,
                borderRadius: 15,
                overflow: "hidden",
                marginBottom: 5,
              }}
            >
              <FlatList
                ListFooterComponent={
                  <View
                    style={{
                      display: !isLoading ? "flex" : "none",
                      marginLeft: "auto",
                      marginRight: "auto",
                      flex: 0.9,
                      width: "80%",
                      height: 1,
                      backgroundColor: "#7a0b0b39",
                      borderRadius: 50,
                    }}
                  />
                }
                ListFooterComponentStyle={
                  {
                    // width: "100%",
                    // height: 3,
                    // marginTop: 5,
                    // marginBottom: 5,
                  }
                }
                columnWrapperStyle={{
                  overflow: "visible",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // borderWidth: 2,
                  // borderColor: "red",
                }}
                showsVerticalScrollIndicator={false}
                style={{
                  flex: 1,
                }}
                onEndReached={() => {
                  fetchNextPage();
                }}
                contentContainerStyle={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
                data={result}
                renderItem={({ index, item }) => {
                  return item ? (
                    <AnimeResult
                      index={index}
                      anime={item}
                      rotation={gyroData}
                      animatedStyles={animatedStyles}
                    />
                  ) : null;
                }}
                numColumns={2}
                horizontal={false}
              />
            </View>
          </>
        ) : // We should only be showing this if we have stopped typing for a while
        text ? (
          <EmptyState>
            <Text>Nothing found</Text>
          </EmptyState>
        ) : null}
      </View>
    </Page>
  );
};

export default TwoDimensionHome;
