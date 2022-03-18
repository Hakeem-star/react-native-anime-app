import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from "@react-navigation/stack";

import React from "react";
import { useFonts } from "expo-font";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import TwoDimensionHome from "./screens/twoD/TwoDimensionHome";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaView, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import Header from "./components/Header";
import { Ionicons } from "@expo/vector-icons";
// import { ReactQueryDevtools } from "react-query/devtools";
import { StatusBar as StatusBarC } from "expo-status-bar";
import DimensionSelector from "./screens/DimensionSelector";
import AnimeDetails from "./screens/twoD/AnimeDetails";
import { LogBox } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ThreeDimensionHome from "./screens/threeD/ThreeDimensionHome";
import { textStyles } from "./components/Text";

LogBox.ignoreLogs(["Setting a timer"]);
const queryClient = new QueryClient();

export type RootStackParamList = {
  "Two Dimension Home": { showSearchBar: boolean };
  "Dimension Selector": undefined;
  "Anime Details": { animID: number };
  "Three Dimension Home": undefined;
};

export type RootStackProps = StackScreenProps<
  RootStackParamList,
  "Two Dimension Home"
>;
export type RootStackPropsDetails = StackScreenProps<
  RootStackParamList,
  "Anime Details"
>;

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <AppLoading />;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {/* <StatusBarC backgroundColor="red" /> */}
        <SafeAreaView
          style={{
            flex: 1,
            marginTop: StatusBar.currentHeight,
          }}
        >
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Dimension Selector">
              <Stack.Screen
                name="Dimension Selector"
                component={DimensionSelector}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                initialParams={{ showSearchBar: true }}
                name="Two Dimension Home"
                component={TwoDimensionHome}
                options={(props) => {
                  const { navigation: n, route } = props;
                  const navigation = n as StackNavigationProp<
                    RootStackParamList,
                    "Two Dimension Home"
                  >;

                  return {
                    headerRight: () => {
                      return (
                        <Ionicons
                          name="search-sharp"
                          size={24}
                          color="black"
                          onPress={() => {
                            navigation.setParams({
                              showSearchBar: !route.params?.showSearchBar,
                            });
                          }}
                        />
                      );
                    },
                    headerLeft: () => {
                      return (
                        <Ionicons
                          name="menu-sharp"
                          size={24}
                          color="black"
                          onPress={() => {
                            // navigation.navigate("Dimension Selector");
                          }}
                        />
                      );
                    },

                    headerLeftContainerStyle: { paddingLeft: 10 },
                    headerRightContainerStyle: { paddingRight: 10 },
                    title: "Hakeems' Anime App",
                    headerTitleStyle: { ...textStyles.bold },
                  };
                }}
              />
              <Stack.Screen
                name="Anime Details"
                component={AnimeDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Three Dimension Home"
                component={ThreeDimensionHome}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </QueryClientProvider>
    );
  }
}
