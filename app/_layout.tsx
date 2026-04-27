import { Stack } from "expo-router";
import { ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "@/theme/theme";
import { TaskProvider } from "@/contexts/TaskContext";
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TaskProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
    </TaskProvider>
  );
}
