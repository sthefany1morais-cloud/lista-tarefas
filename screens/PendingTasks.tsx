import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";
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

export default function PendingTasks() {
  const { pendingTasks, pendingSelectedIds, isLoading } = useTaskData();

  const {
    togglePendingSelection,
    deleteTasks,
    addTask,
    clearPendingSelection,
    toggleTask,
    updateTask,
  } = useTasks();

  const [inputText, setInputText] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { gradientColors, getColor, isDark } = useDesignSystem();
  const inputBg = getColor("glass");
  const inputColor = getColor("text");
  const placeholderColor = getColor("textTertiary");
  const actionsBg = getColor("glassActive");

  const handleAddTask = async () => {
    if (inputText.trim()) {
      await addTask(inputText.trim());
      setInputText("");
      Keyboard.dismiss();
    }
  };

  const handleDeleteSelected = async () => {
    if (pendingSelectedIds.length === 0) return;
    Alert.alert(
      "Excluir tarefas",
      `Excluir ${pendingSelectedIds.length} tarefa(s)?`,
      [
        { text: "Cancelar" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deleteTasks(pendingSelectedIds),
        },
      ],
    );
  };

  const handleMarkAsCompleted = async () => {
    if (pendingSelectedIds.length === 0) return;
    for (const id of pendingSelectedIds) {
      await toggleTask(id);
    }
    clearPendingSelection();
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
      onToggle={() => togglePendingSelection(item.id)}
      onSelect={togglePendingSelection}
      isSelected={pendingSelectedIds.includes(item.id)}
      showDragHandle={false}
      onEdit={openEditModal}
    />
  );

  const hasSelection = pendingSelectedIds.length > 0;

  if (isLoading) {
    return (
      <LinearGradient colors={gradientColors as any} style={styles.container}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        <SafeAreaView style={styles.safeArea}>
          <Header title="A fazer" count={0} />
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
        <Header title="A fazer" count={pendingTasks.length} />

        <View style={[styles.inputContainer, { backgroundColor: inputBg }]}>
          <TextInput
            style={[styles.input, { color: inputColor }]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Nova tarefa..."
            placeholderTextColor={placeholderColor}
            onSubmitEditing={handleAddTask}
          />
          <Button icon="add" onPress={handleAddTask} />
        </View>

        {hasSelection && (
          <View style={[styles.actionsRow, { backgroundColor: actionsBg }]}>
            <Button
              icon="checkmark-circle-outline"
              variant="primary"
              onPress={handleMarkAsCompleted}
            />
            <Button
              icon="trash-outline"
              variant="danger"
              onPress={handleDeleteSelected}
            />
            <Button icon="close-outline" onPress={clearPendingSelection} />
          </View>
        )}

        <FlatList
          data={pendingTasks}
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
  inputContainer: {
    flexDirection: "row",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 16,
  },
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
