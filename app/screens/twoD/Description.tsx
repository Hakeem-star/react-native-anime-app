import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { AnimeDetailsFragment, MediaTag } from "../../generated/graphql";
import { getHTMLText } from "../../util/getHTMLText";
import { TopNavPropsDetails } from "./AnimeDetails";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

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
  const { width } = useWindowDimensions();
  console.log({ description });

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <>
        {!!totalEpisodes && totalEpisodes > 1 && (
          <Text>Total episodes: {totalEpisodes}</Text>
        )}
        {!!description && (
          <View style={{ marginBottom: 50, marginTop: 20 }}>
            <RenderHtml contentWidth={width} source={{ html: description }} />
          </View>
        )}
        {/* <Text>
              {
                // TODO - This description should ideally be split into an array of strings by BRs so we can properly sort out spacing
                getHTMLText(description)
              }
            </Text> */}
      </>
      {tags?.length && (
        <>
          <Text>Tags</Text>

          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              maxWidth: "100%",
              flexWrap: "wrap",
            }}
          >
            {tags?.map((tag) => (
              <View
                key={tag?.name}
                style={{
                  marginRight: 10,
                  marginBottom: 10,
                  padding: 5,
                  backgroundColor: "grey",
                }}
              >
                <Text>{tag?.name}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Description;
