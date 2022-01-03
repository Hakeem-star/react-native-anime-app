import React from "react";
import { View, Text, FlatList } from "react-native";
import { MediaStreamingEpisode } from "../../generated/graphql";

interface Props {
  streamingEpisodes?: (MediaStreamingEpisode | null)[] | null;
}

const Episodes = ({ streamingEpisodes }: Props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={streamingEpisodes}
        keyExtractor={(item) => (item?.url || "") + item?.title}
        renderItem={(val) => <Text>{val.item?.title}</Text>}
      />
    </View>
  );
};

export default Episodes;
