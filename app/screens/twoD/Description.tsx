import React, { useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { AnimeDetailsFragment, MediaTag } from "../../generated/graphql";
import { getHTMLText } from "../../util/getHTMLText";
import { TopNavPropsDetails } from "./AnimeDetails";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { Entypo } from "@expo/vector-icons";

interface Props {
  description?: string | null;
  totalEpisodes?: number | null;
  tags?: AnimeDetailsFragment["tags"];
  coverImageColor?: string;
}

const Description = ({
  navigation,
  route,
  description,
  totalEpisodes,
  tags,
  coverImageColor,
}: TopNavPropsDetails & Props) => {
  const { width } = useWindowDimensions();
  // replace <br> with <div>
  const cleanedDescription = description?.replace(/<br>/g, "<div></div>");

  const [showAllTags, setShowAllTags] = useState(false);

  return (
    <ScrollView
      style={{ backgroundColor: "white", flex: 1, paddingVertical: 10 }}
    >
      <View style={{ paddingBottom: 30 }}>
        {typeof totalEpisodes === "number" && totalEpisodes > 1 && (
          <Text>Total episodes: {totalEpisodes}</Text>
        )}
        {!!cleanedDescription && (
          <View style={{ marginBottom: 50, marginTop: 20 }}>
            <RenderHtml
              tagsStyles={{
                div: {
                  // Line break styles
                  maxHeight: 0,
                  height: "0px",
                  padding: 0,
                  marginBottom: 10,
                },
              }}
              contentWidth={width}
              source={{
                html: cleanedDescription,
              }}
            />
          </View>
        )}
        {/* <Text>
              {
                // TODO - This description should ideally be split into an array of strings by BRs so we can properly sort out spacing
                getHTMLText(description)
              }
            </Text> */}

        {!!tags?.length && (
          <>
            <Text
              style={{
                borderBottomColor: coverImageColor,
                borderBottomWidth: 1,
                paddingBottom: 5,
                marginBottom: 20,
                width: "20%",
              }}
            >
              Tags
            </Text>

            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                maxWidth: "100%",
                flexWrap: "wrap",
              }}
            >
              {tags?.map((tag, idx) => {
                if (idx > 4 && !showAllTags) return null;
                return (
                  <View
                    key={tag?.name}
                    style={{
                      marginRight: 10,
                      marginBottom: 10,
                      // padding: "0 5px",
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",

                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      borderColor: coverImageColor,
                      borderRadius: 8,
                    }}
                  >
                    <Entypo
                      style={{ marginRight: -2, marginLeft: -4 }}
                      name="dot-single"
                      size={20}
                      color={coverImageColor}
                    />
                    <Text>{tag?.name}</Text>
                  </View>
                );
              })}
            </View>
            {!showAllTags && !!(tags.length > 5) && (
              <Text
                style={{
                  marginTop: 20,
                  marginHorizontal: "auto",
                  alignSelf: "center",
                  fontWeight: "bold",
                }}
                onPress={() => {
                  setShowAllTags(true);
                }}
              >
                Show more...
              </Text>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Description;
