import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import SearchResults from "../components/SearchResults";
import ThreeDimensionResults from "../components/ThreeDimensionResults";

const Tab = createMaterialTopTabNavigator();

export function ResultTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="2D" component={SearchResults} />
      <Tab.Screen name="3D" component={ThreeDimensionResults} />
    </Tab.Navigator>
  );
}
