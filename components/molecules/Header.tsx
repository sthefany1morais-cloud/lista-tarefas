import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color";

type HeaderProps = {
  title: string;
  count: number;
};

export default function Header({ title, count }: HeaderProps) {
  const titleColor = useThemeColor({}, "text");
  const subtitleColor = useThemeColor({}, "textSecondary");

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: subtitleColor }]}>
        {count} {count === 1 ? "tarefa" : "tarefas"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: { fontSize: 16 },
});
