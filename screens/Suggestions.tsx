import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useDesignSystem } from "@/hooks/useDesignSystem";
import Header from "../components/molecules/Header";
import TaskItem from "../components/molecules/TaskItem";
import Button from "../components/atoms/Button";
import EditTaskModal from "../components/molecules/EditTaskModal";
import { useSuggestions } from "@/contexts/SuggestionContext";
import { Task, Suggestion } from "@/types/task";

export default function Suggestions() {
  const {
    suggestions,
    suggestionSelectedIds,
    toggleSuggestionSelection,
    deleteSuggestions,
    clearSuggestionSelection,
    loading,
    getNewSuggestion,
    acceptSuggestions,
  } = useSuggestions();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { gradientColors, getColor, isDark } = useDesignSystem();
  const actionsBg = getColor("glassActive");

  const handleAcceptSelected = () => {
    acceptSuggestions(suggestionSelectedIds);
  };

  const handleDeleteSelected = () => {
    if (suggestionSelectedIds.length === 0) return;
    Alert.alert(
      "Excluir sugestões",
      `Excluir ${suggestionSelectedIds.length} sugestão(ões)?`,
      [
        { text: "Cancelar" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deleteSuggestions(suggestionSelectedIds),
        },
      ],
    );
  };

  const openEditModal = () => {
    Alert.alert("Sugestões", "Sugestões não podem ser editadas");
  };

  const handleSaveEdit = () => {};

  const renderSuggestion = ({ item }: { item: Suggestion }) => {
    const fakeTask: Task = {
      id: item.id,
      text: `${item.text}`,
      completed: false,
      createdAt: item.createdAt || 0,
    };

    return (
      <TaskItem
        task={fakeTask}
        onToggle={() => toggleSuggestionSelection(item.id)}
        onSelect={toggleSuggestionSelection}
        isSelected={suggestionSelectedIds.includes(item.id)}
        showDragHandle={false}
        onEdit={openEditModal}
      />
    );
  };

  const hasSelection = suggestionSelectedIds.length > 0;

  return (
    <LinearGradient colors={gradientColors as any} style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <SafeAreaView style={styles.safeArea}>
        <Header title="Sugestões" count={suggestions.length} />

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[
              styles.newButton,
              { backgroundColor: getColor("primaryBg") },
            ]}
            onPress={getNewSuggestion}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Ionicons name="add-outline" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        {hasSelection && (
          <View style={[styles.actionsRow, { backgroundColor: actionsBg }]}>
            <Button
              icon="checkmark-circle-outline"
              variant="primary"
              onPress={handleAcceptSelected}
            />
            <Button
              icon="trash-outline"
              variant="danger"
              onPress={handleDeleteSelected}
            />
            <Button icon="close-outline" onPress={clearSuggestionSelection} />
          </View>
        )}

        <FlatList
          data={suggestions}
          renderItem={renderSuggestion}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />

        {/*MODAL (não abre pra sugestões)*/}
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
  headerActions: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  newButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
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
