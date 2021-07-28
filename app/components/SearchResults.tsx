import React, { useEffect, useLayoutEffect, useRef } from "react";
import { View, Text, FlatList } from "react-native";
import { AnimeMediaFragment } from "../generated/graphql";
import styled from "styled-components/native";

const StyledFlatList = styled(FlatList)`
  flex-shrink: 0;
` as unknown as typeof FlatList;

const StyledLoadingView = styled(View)`
  height: 10px;
  background-color: blue;
`;

const StyledView = styled(View)`
  padding: 20px;
  border: 2px solid red;
`;

const Wrapper = styled(View)`
  flex: 1;
  width: 100%;
  background-color: yellow;
  overflow: auto;
`;
interface Props {
  results?: (AnimeMediaFragment | null)[];
}

const SearchResults = ({ results }: Props) => {
  const ref = useRef(null!);
  const ref2 = useRef(null!);

  useLayoutEffect(() => {
    function buildThresholdList() {
      let thresholds = [];
      let numSteps = 10;

      for (let i = 1.0; i <= numSteps; i++) {
        let ratio = i / numSteps;
        thresholds.push(ratio);
      }

      thresholds.push(0);
      return thresholds;
    }

    const handleObserver: IntersectionObserverCallback = function (
      entities,
      observer
    ) {
      const y = entities[0].boundingClientRect.y;
      console.log({ y, entities });

      // if (state.prevY > y) {
      //   const lastPhoto = state.photos[state.photos.length - 1];
      //   const curPage = lastPhoto.albumId;
      //   getPhotos(curPage);
      //   setState({ page: curPage });
      // }
      // setState({ prevY: y });
    };

    const options = {
      root: document.querySelector("#root"),
      rootMargin: "0px",
      threshold: [0.1],
    };
    const obs = new IntersectionObserver(handleObserver, options);
    console.log(ref.current);

    obs.observe(ref.current);

    return () => {
      obs.disconnect();
    };
  }, []);
  return (
    <Wrapper ref={ref2}>
      <StyledFlatList
        data={results}
        keyExtractor={(item) => item?.id + ""}
        renderItem={({ item }) => {
          return (
            <StyledView>
              <Text>{item?.title?.english}</Text>
              <Text>{item?.title?.romaji}</Text>
            </StyledView>
          );
        }}
      />
      <StyledLoadingView ref={ref}></StyledLoadingView>
    </Wrapper>
  );
};

export default SearchResults;
