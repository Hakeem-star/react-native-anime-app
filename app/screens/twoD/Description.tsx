import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { AnimeDetailsFragment, MediaTag } from "../../generated/graphql";
import { getHTMLText } from "../../util/getHTMLText";
import { TopNavPropsDetails } from "./AnimeDetails";

interface Props {
  description?: string | null;
  totalEpisodes?: number | null;
  tags?: AnimeDetailsFragment["tags"];
}

const Description = ({
  navigation,
  route,
  description,
  totalEpisodes,
  tags,
}: TopNavPropsDetails & Props) => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        keyExtractor={(item) => item?.name || ""}
        data={tags}
        renderItem={(item) => <Text>{item.item?.name}</Text>}
        ListHeaderComponent={() => (
          <>
            {!!totalEpisodes && <Text>Total episodes: {totalEpisodes}</Text>}
            <Text>{getHTMLText(description)}</Text>
          </>
        )}
      />
    </View>
  );
};

export default Description;
