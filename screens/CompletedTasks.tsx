import React from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDesignSystem } from "@/hooks/useDesignSystem";
import Header from "../components/molecules/Header";
import TaskItem from "../components/molecules/TaskItem";
import Button from "../components/atoms/Button";
import { useTasks } from "../contexts/TaskContext";
import { Task } from "../types/task";

export default function CompletedTasks() {
  const {
    completedTasks,
    completedSelectedIds,
    toggleCompletedSelection,
    deleteCompletedTasks,
    toggleTask,
    clearCompletedSelection,
  } = useTasks();

  const { getGradient, getColor, isDark } = useDesignSystem();
  const gradientColors = getGradient(); // ✅ string[] perfeito
  const actionsBg = getColor("glassActive");

  const handleDeleteSelected = () => {
    if (completedSelectedIds.length === 0) return;
    Alert.alert(
      "Excluir tarefas",
      `Excluir ${completedSelectedIds.length} tarefa(s) concluídas?`,
      [
        { text: "Cancelar" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deleteCompletedTasks(completedSelectedIds),
        },
      ],
    );
  };

  const handleReactivateSelected = () => {
    if (completedSelectedIds.length === 0) return;
    completedSelectedIds.forEach((id) => toggleTask(id));
    clearCompletedSelection();
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggle={() => toggleCompletedSelection(item.id)}
      onSelect={toggleCompletedSelection}
      isSelected={completedSelectedIds.includes(item.id)}
      showDragHandle={false}
    />
  );

  const hasSelection = completedSelectedIds.length > 0;

  return (
    <LinearGradient colors={gradientColors as any} style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <SafeAreaView style={styles.safeArea}>
        <Header title="Concluídas" count={completedTasks.length} />

        {hasSelection && (
          <View style={[styles.actionsRow, { backgroundColor: actionsBg }]}>
            <Button
              icon="radio-button-off"
              variant="primary"
              onPress={handleReactivateSelected}
            />
            <Button
              icon="trash-outline"
              variant="danger"
              onPress={handleDeleteSelected}
            />
            <Button icon="close-outline" onPress={clearCompletedSelection} />
          </View>
        )}

        <FlatList
          data={completedTasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, paddingHorizontal: 24 },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
    gap: 12,
    padding: 12,
    borderRadius: 16,
  },
  list: { flex: 1 },
});
