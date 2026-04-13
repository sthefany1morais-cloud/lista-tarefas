import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "../atoms/Checkbox";
import Button from "../atoms/Button";
import { Task } from "../../types/task";

type TaskItemProps = {
  task: Task;
  onToggle: () => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
  showDragHandle?: boolean;
  drag?: () => void;
  isActive?: boolean;
};

export default function TaskItem({
  task,
  onToggle,
  onSelect,
  isSelected,
  showDragHandle = false,
  drag,
  isActive = false,
}: TaskItemProps) {
  return (
    <View style={[styles.container, isActive && styles.containerActive]}>
      <Checkbox checked={isSelected} onPress={onToggle} />

      <Text
        style={[styles.text, task.completed && styles.textCompleted]}
        numberOfLines={2}
      >
        {task.text}
      </Text>

      {showDragHandle && (
        <Button icon="reorder-three" variant="ghost" onPress={drag} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  containerActive: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    lineHeight: 22,
    marginLeft: 16,
  },
  textCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
});
