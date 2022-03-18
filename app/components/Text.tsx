import { StyleSheet, Text, TextStyle } from "react-native";
import React from "react";

type Props = {
  children: string | null | undefined;
  style?: TextStyle;
};

export const RegularText = ({ children = "", style }: Props) => {
  return <Text style={{ ...textStyles.regular, ...style }}>{children}</Text>;
};
export const RegularBoldText = ({ children = "", style }: Props) => {
  return <Text style={{ ...textStyles.bold, ...style }}>{children}</Text>;
};
export const RegularThinText = ({ children = "", style }: Props) => {
  return <Text style={{ ...textStyles.thin, ...style }}>{children}</Text>;
};

export const textStyles = StyleSheet.create({
  bold: {
    fontFamily: "roboto-slab-bold",
  },
  thin: {
    fontFamily: "roboto-slab-thin",
  },
  regular: {
    fontFamily: "roboto-slab-regular",
  },
});
