import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import {
  AnimeMediaFragment,
  CoverImageFragment,
} from "../../generated/graphql";

interface Props {
  anime: (AnimeMediaFragment & CoverImageFragment) | null;
}

const AnimeResult = ({ anime }: Props) => {
  if (!anime) return null;
  return (
    <View style={styles.container}>
      {!!anime.coverImage?.medium && (
        <ImageBackground
          style={styles.container}
          source={{ uri: anime.coverImage?.medium }}
        />
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {anime?.title?.english || anime?.title?.romaji}
        </Text>
      </View>
    </View>
  );
};

export default AnimeResult;

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 180,
    backgroundColor: "red",
    margin: 4,
    borderRadius: 10,
    overflow: "hidden",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
    padding: 5,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    textAlign: "center",
    fontWeight: "400",
  },
});
