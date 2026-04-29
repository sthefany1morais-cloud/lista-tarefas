import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color";
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
  onEdit?: (task: Task) => void;
};

export default function TaskItem({
  task,
  onToggle,
  onSelect,
  isSelected,
  showDragHandle = false,
  drag,
  isActive = false,
  onEdit,
}: TaskItemProps) {
  const glassColor = useThemeColor({}, "glass");
  const glassActiveColor = useThemeColor({}, "glassActive");
  const textColor = useThemeColor({}, "text");

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: glassColor },
        isSelected && { backgroundColor: glassActiveColor },
      ]}
      onLongPress={() => onEdit?.(task)}
      activeOpacity={0.8}
      delayLongPress={500}
    >
      <Checkbox checked={isSelected} onPress={onToggle} />

      <Text
        style={[
          styles.text,
          { color: textColor },
          task.completed && styles.textCompleted,
        ]}
        numberOfLines={2}
      >
        {task.text}
      </Text>

      {showDragHandle && (
        <Button icon="reorder-three" variant="ghost" onPress={drag} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 16,
  },
  textCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
});
