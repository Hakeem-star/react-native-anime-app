import React from "react";
import {
  View,
  Text,
  FlatList,
  Linking,
  TouchableHighlight,
} from "react-native";
import { MediaStreamingEpisode } from "../../generated/graphql";

interface Props {
  streamingEpisodes?: (MediaStreamingEpisode | null)[] | null;
  coverImageColor?: string;
}

const borderAlignmentOffset = 5;

const Episodes = ({ streamingEpisodes, coverImageColor }: Props) => {
  // console.log({ streamingEpisodes });

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingVertical: 10 }}>
      <FlatList
        contentContainerStyle={{ padding: 10 }}
        data={streamingEpisodes}
        keyExtractor={(item) => (item?.url || "") + item?.title}
        renderItem={({ item, index }) => (
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              Linking.openURL(item?.url || "");
            }}
          >
            <View
              style={{
                padding: 15,
                marginBottom: -2,
                minHeight: 50,
                borderRadius: 10,
                borderColor: coverImageColor,
                borderTopWidth: 2,
                borderBottomWidth: 2,
                borderRightWidth: index % 2 ? 0 : 2,
                borderLeftWidth: index % 2 ? 2 : 0,
                transform: [
                  {
                    translateX:
                      index % 2
                        ? -borderAlignmentOffset
                        : borderAlignmentOffset,
                  },
                ],
                borderTopLeftRadius: index % 2 ? 10 : 0,
                borderBottomLeftRadius: index % 2 ? 10 : 0,
              }}
            >
              <Text
                style={{
                  // reposition the text so they are correctly aligned
                  transform: [
                    {
                      translateX:
                        index % 2
                          ? borderAlignmentOffset
                          : -borderAlignmentOffset,
                    },
                  ],
                }}
              >
                {item?.title}
              </Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

export default Episodes;
