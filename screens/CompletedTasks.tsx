import React, { useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDesignSystem } from "@/hooks/useDesignSystem";
import Header from "../components/molecules/Header";
import TaskItem from "../components/molecules/TaskItem";
import Button from "../components/atoms/Button";
import EditTaskModal from "../components/molecules/EditTaskModal";
import { useTasks } from "../contexts/TaskContext";
import { useTaskData } from "../hooks/useTaskData";
import { Task } from "../types/task";
import { Text } from "react-native";

export default function CompletedTasks() {
  const { completedTasks, completedSelectedIds, isLoading } = useTaskData();
  
  const {
    toggleCompletedSelection,
    deleteTasks,
    toggleTask,
    clearCompletedSelection,
    updateTask,
  } = useTasks();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { gradientColors, getColor, isDark } = useDesignSystem();
  const actionsBg = getColor("glassActive");

  const handleDeleteSelected = async () => {
    if (completedSelectedIds.length === 0) return;
    Alert.alert(
      "Excluir tarefas",
      `Excluir ${completedSelectedIds.length} tarefa(s) concluídas?`,
      [
        { text: "Cancelar" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deleteTasks(completedSelectedIds),
        },
      ],
    );
  };

  const handleReactivateSelected = async () => {
    if (completedSelectedIds.length === 0) return;
    for (const id of completedSelectedIds) {
      await toggleTask(id);
    }
    clearCompletedSelection();
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async (id: string, newText: string) => {
    await updateTask(id, newText);
    setEditModalVisible(false);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggle={() => toggleCompletedSelection(item.id)}
      onSelect={toggleCompletedSelection}
      isSelected={completedSelectedIds.includes(item.id)}
      showDragHandle={false}
      onEdit={openEditModal}
    />
  );

  const hasSelection = completedSelectedIds.length > 0;

  if (isLoading) {
    return (
      <LinearGradient colors={gradientColors as any} style={styles.container}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        <SafeAreaView style={styles.safeArea}>
          <Header title="Concluídas" count={0} />
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

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

        <EditTaskModal
          visible={editModalVisible}
          task={editingTask}
          onClose={() => setEditModalVisible(false)}
          onSave={handleSaveEdit}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
});