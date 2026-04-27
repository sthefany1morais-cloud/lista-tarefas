// ✅ Tipos completos para TODAS as cores
export type ColorShades50to900 = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type ColorShades400to700 = {
  400: string;
  500: string;
  600: string;
  700: string;
};

export const colors = {
  primary: {
    50: "#eff6ff",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
  } as ColorShades400to700,

  secondary: {
    400: "#667eea",
    500: "#764ba2",
    600: "#5a67d8",
    700: "#4c51bf",
  } as ColorShades400to700,

  success: {
    400: "#4ECDC4",
    500: "#22d3ee",
    600: "#06b6d4",
    700: "#0891b2",
  } as ColorShades400to700,

  danger: {
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
  } as ColorShades400to700,

  warning: {
    400: "#facc15",
    500: "#eab308",
  } as { 400: string; 500: string },

  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  } as ColorShades50to900,

  background: {
    light: "#ffffff",
    dark: "#0f172a",
  } as const,

  surface: {
    light: "rgba(255,255,255,0.95)",
    dark: "rgba(15,23,42,0.95)",
  } as const,
} as const;
