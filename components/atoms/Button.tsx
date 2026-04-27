import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/use-theme-color";

type ButtonProps = TouchableOpacityProps & {
  icon: keyof typeof Ionicons.glyphMap;
  variant?: "primary" | "success" | "danger" | "ghost";
};

export default function Button({
  icon,
  variant = "primary",
  style,
  ...props
}: ButtonProps) {
  const bgColor = useThemeColor({}, `${variant}Bg` as const);

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }, style]}
      {...props}
    >
      <Ionicons name={icon} size={20} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
