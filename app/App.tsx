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

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Home from "./screens/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaView, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import Header from "./components/Header";
import { Ionicons } from "@expo/vector-icons";
// import { ReactQueryDevtools } from "react-query/devtools";
import { StatusBar as StatusBarC } from "expo-status-bar";

const queryClient = new QueryClient();

type RootStackParamList = {
  Home: { showSearchBar: boolean };
};

export type RootStackProps = StackScreenProps<RootStackParamList, "Home">;

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
        <StatusBarC backgroundColor="red" />
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                initialParams={{ showSearchBar: false }}
                name="Home"
                component={Home}
                options={(props) => {
                  const { navigation: n, route } = props;
                  const navigation = n as StackNavigationProp<
                    RootStackParamList,
                    "Home"
                  >;

                  return {
                    headerRight: () => {
                      return (
                        <Ionicons name="menu-sharp" size={24} color="black" />
                      );
                    },
                    headerLeft: () => {
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

                    headerLeftContainerStyle: { paddingLeft: 10 },
                    headerRightContainerStyle: { paddingRight: 10 },
                    title: "Hakeems' Anime App",
                  };
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </QueryClientProvider>
    );
  }
}
