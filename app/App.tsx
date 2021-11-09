import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Home from "./screens/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaView, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
// import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <AppLoading />;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}

        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </QueryClientProvider>
    );
  }
}
