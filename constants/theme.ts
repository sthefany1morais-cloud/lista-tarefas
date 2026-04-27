import { colors } from "@/theme/colors";

export type ColorPalette = {
  primary: string;
  primaryLight: string;
  secondary: string;
  secondaryDark: string;
  success: string;
  danger: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  background: string;
  surface: string;
  border: string;
  glass: string;
  glassActive: string;
  gradient: readonly [string, string];
  // ✅ Cores para Button
  primaryBg: string;
  successBg: string;
  dangerBg: string;
  ghostBg: string;
};

export const Colors: Record<"light" | "dark", ColorPalette> = {
  light: {
    primary: colors.primary[500],
    primaryLight: colors.primary[400],
    secondary: colors.secondary[400],
    secondaryDark: colors.secondary[500],
    success: colors.success[400],
    danger: colors.danger[500],
    text: colors.neutral[900],
    textSecondary: colors.neutral[600],
    textTertiary: colors.neutral[400],
    background: colors.background.light,
    surface: colors.surface.light,
    border: colors.neutral[200],
    glass: "rgba(255,255,255,0.1)",
    glassActive: "rgba(255,255,255,0.2)",
    gradient: ["#667eea", "#764ba2"] as const,
    // ✅ Button backgrounds
    primaryBg: colors.primary[500],
    successBg: colors.success[400],
    dangerBg: colors.danger[500],
    ghostBg: colors.neutral[100],
  },
  dark: {
    primary: colors.primary[400],
    primaryLight: colors.primary[400],
    secondary: colors.neutral[800],
    secondaryDark: colors.neutral[900],
    success: colors.success[400],
    danger: colors.danger[500],
    text: colors.neutral[100],
    textSecondary: colors.neutral[300],
    textTertiary: colors.neutral[500],
    background: colors.background.dark,
    surface: colors.surface.dark,
    border: colors.neutral[700],
    glass: "rgba(255,255,255,0.05)",
    glassActive: "rgba(255,255,255,0.1)",
    gradient: ["#1e293b", "#334155"] as const,
    // ✅ Button backgrounds
    primaryBg: colors.primary[400],
    successBg: colors.success[400],
    dangerBg: colors.danger[500],
    ghostBg: colors.neutral[700],
  },
};
