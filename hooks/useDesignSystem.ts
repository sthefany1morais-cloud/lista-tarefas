import { useThemeColor } from "./use-theme-color";
import { useColorScheme } from "./use-color-scheme";
import { Colors } from "@/constants/theme";

export function useDesignSystem() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const getColor = (
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  ): string => {
    const color = Colors[colorScheme ?? "light"][colorName];
    return typeof color === "string" ? color : color[0];
  };

  const gradientColors = Colors[colorScheme ?? "light"].gradient as any;

  return {
    colorScheme,
    isDark,
    getColor,
    gradientColors,
    useThemeColor,
  };
}
