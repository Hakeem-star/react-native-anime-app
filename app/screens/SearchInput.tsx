import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
import styled from "styled-components/native";

const StyledInput = styled(TextInput)`
  height: 50px;
  padding: 0 15px;
  border-radius: 3px;
  border: 1px solid #9fa5aa;
`;

interface Props {
  defaultText: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ defaultText = "", onChange, placeholder }: Props) => {
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    setText(text);
  }, [defaultText]);

  return (
    <View style={{ paddingHorizontal: 20, width: "100%" }}>
      <StyledInput
        autoFocus
        onChangeText={(text: string) => {
          setText(text);
          onChange(text);
        }}
        value={text}
        placeholder={placeholder}
        placeholderTextColor={"#ADB2B6"}
      />
      {!!text && (
        <TouchableHighlight
          onPress={() => {
            setText("");
          }}
          style={{
            position: "absolute",
            right: 25,
            top: 8,
          }}
          activeOpacity={0.6}
          underlayColor={"transparent"}
        >
          <View
            style={{
              display: "flex",
              backgroundColor: "#0000001d",
              overflow: "hidden",
              borderRadius: 50,
              padding: 5,
              opacity: 0.5,
            }}
          >
            <MaterialIcons name="clear" size={24} color="#000000c5" />
          </View>
        </TouchableHighlight>
      )}
    </View>
  );
};

export default SearchInput;
