import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import Page from "../components/Page";

import {
  AnimeMediaFragment,
  AnimesQuery,
  CoverImageFragment,
  useAnimesQuery,
  useInfiniteAnimesQuery,
} from "../generated/graphql";
import debounce from "lodash.debounce";
import { useInfiniteGraphQLQuery } from "../util/useInfiniteGraphQLQuery";
import { InfiniteData, useQueryClient } from "react-query";
import { RootStackProps } from "../App";
import AnimeResult from "../components/TwoDimension/AnimeResult";
import { Gyroscope, ThreeAxisMeasurement } from "expo-sensors";
import SearchInput from "./SearchInput";

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

  const queryClient = useQueryClient();

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
    Gyroscope.setUpdateInterval(300);
    // TODO - This is causing slowdown when there are a lot of results
    // _subscribe();
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
                ListFooterComponentStyle={{
                  width: "100%",
                  height: 3,
                  marginTop: 5,
                  marginBottom: 5,
                }}
                columnWrapperStyle={{
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
