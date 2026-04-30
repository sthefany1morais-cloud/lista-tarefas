import { Stack } from "expo-router";
import { ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { useEffect } from "react";
import { LightTheme, DarkTheme } from "@/theme/theme";
import { useTaskStore } from "@/store/taskStore";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const loadTasks = useTaskStore((state) => state.loadTasks);

  useEffect(() => {
    // ✅ Carrega tasks E esconde splash
    loadTasks().finally(async () => {
      await SplashScreen.hideAsync();
    });
  }, [loadTasks]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
