import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light

  const [loaded] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
  
    if (!loaded) {
      // Async font loading only occurs in development.
      return null;
    }
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{headerStyle: {backgroundColor: theme.headerBackground}}}>
        <Stack.Screen name="index" options={{ title: "Home", headerShown: true, headerTintColor: "true" }} />
        <Stack.Screen name="create" options={{ title: "Create New List", headerShown: true, headerTintColor: "true" }} />
        <Stack.Screen name="allLists" options={{ title: "All Lists", headerShown: true, headerTintColor: "true" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaProvider>     
  );
}
