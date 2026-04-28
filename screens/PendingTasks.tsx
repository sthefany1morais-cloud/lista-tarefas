import React, { useState } from "react";
import { View, TextInput, FlatList, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDesignSystem } from "@/hooks/useDesignSystem";
import Header from "../components/molecules/Header";
import TaskItem from "../components/molecules/TaskItem";
import Button from "../components/atoms/Button";
import { useTasks } from "../contexts/TaskContext";
import { Task } from "../types/task";

export default function PendingTasks() {
  const {
    pendingTasks,
    pendingSelectedIds,
    togglePendingSelection,
    deletePendingTasks,
    addTask,
    clearPendingSelection,
    toggleTask,
  } = useTasks();

  const [inputText, setInputText] = useState("");

  const { gradientColors, getColor, isDark } = useDesignSystem();
  const inputBg = getColor("glass");
  const inputColor = getColor("text");
  const placeholderColor = getColor("textTertiary");
  const actionsBg = getColor("glassActive");

  const handleAddTask = () => {
    if (inputText.trim()) {
      addTask(inputText);
      setInputText("");
    }
  };

  const handleDeleteSelected = () => {
    if (pendingSelectedIds.length === 0) return;
    Alert.alert(
      "Excluir tarefas",
      `Excluir ${pendingSelectedIds.length} tarefa(s)?`,
      [
        { text: "Cancelar" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deletePendingTasks(pendingSelectedIds),
        },
      ],
    );
  };

  const handleMarkAsCompleted = () => {
    pendingSelectedIds.forEach((id) => toggleTask(id));
    clearPendingSelection();
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggle={() => togglePendingSelection(item.id)}
      onSelect={togglePendingSelection}
      isSelected={pendingSelectedIds.includes(item.id)}
      showDragHandle={false}
    />
  );

  const hasSelection = pendingSelectedIds.length > 0;

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
});
