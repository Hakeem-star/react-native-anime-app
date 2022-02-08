import React from "react";
import {
  View,
  Text,
  FlatList,
  Linking,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import { MediaStreamingEpisode } from "../../generated/graphql";
import { LinearGradient } from "expo-linear-gradient";

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
        nestedScrollEnabled={true}
        contentContainerStyle={{ padding: 10 }}
        data={streamingEpisodes}
        keyExtractor={(item) => (item?.url || "") + item?.title}
        renderItem={({ item, index }) => {
          return (
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => {
                Linking.openURL(item?.url || "");
              }}
            >
              <View
                style={{
                  // overflow: "hidden",
                  // padding: 15,
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
                <ImageBackground
                  source={{ uri: item?.thumbnail || "" }}
                  resizeMode="cover"
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    borderRadius: 8,
                    overflow: "hidden",
                    borderTopLeftRadius: index % 2 ? 8 : 0,
                    borderBottomLeftRadius: index % 2 ? 8 : 0,
                    borderTopRightRadius: index % 2 ? 0 : 8,
                    borderBottomRightRadius: index % 2 ? 0 : 8,
                  }}
                >
                  <LinearGradient
                    start={{ x: index % 2 ? 0 : 1, y: 0 }}
                    end={{ x: index % 2 ? 1 : 0, y: 0 }}
                    colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,1)"]}
                    style={{ flex: 1 }}
                  >
                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        padding: 15,

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
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        {item?.title}
                      </Text>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </View>
            </TouchableHighlight>
          );
        }}
      />
    </View>
  );
};

export default Episodes;
