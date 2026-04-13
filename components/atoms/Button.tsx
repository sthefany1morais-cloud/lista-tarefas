import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ButtonProps = TouchableOpacityProps & {
  icon: keyof typeof Ionicons.glyphMap;
  variant?: "primary" | "danger" | "ghost";
};

export default function Button({
  icon,
  variant = "primary",
  style,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], style]}
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
  primary: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  danger: {
    backgroundColor: "rgba(255,107,107,0.3)",
  },
  ghost: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 8,
    width: "auto",
    height: "auto",
  },
});
