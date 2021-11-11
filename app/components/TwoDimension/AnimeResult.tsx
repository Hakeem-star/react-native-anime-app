import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AnimeMediaFragment } from "../../generated/graphql";

interface Props {
  anime: AnimeMediaFragment | null;
}

const AnimeResult = ({ anime }: Props) => {
  if (!anime) return null;
  return (
    <View>
      <Text>{anime?.title?.english}</Text>
    </View>
  );
};

export default AnimeResult;

const styles = StyleSheet.create({});
