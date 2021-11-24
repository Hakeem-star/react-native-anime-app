import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { RootStackProps } from "../App";

interface Props {}

const DimensionSelector = ({ navigation, route }: RootStackProps) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("TwoDimensionHome", { showSearchBar: true });
        }}
        style={styles.twoDimension}
      >
        {/* <View style={styles.twoDimension}> */}
        <Text style={styles.buttonText}>2D</Text>
        {/* </View> */}
      </TouchableHighlight>

      <TouchableHighlight style={styles.threeDimension}>
        <Text style={styles.buttonText}>3D</Text>
      </TouchableHighlight>
    </View>
  );
};

export default DimensionSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  twoDimension: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    width: 200,
    height: 50,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
  },
  threeDimension: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    width: 200,
    height: 50,
  },
});
