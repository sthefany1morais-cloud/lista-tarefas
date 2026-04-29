import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../atoms/Button";
import { useDesignSystem } from "@/hooks/useDesignSystem";
import { Task } from "../../types/task";

const { height: screenHeight } = Dimensions.get("window");

interface EditTaskModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (id: string, text: string) => void;
}

export default function EditTaskModal({
  visible,
  task,
  onClose,
  onSave,
}: EditTaskModalProps) {
  const [text, setText] = useState("");
  const { getColor } = useDesignSystem();
  const inputBg = getColor("glass");
  const inputColor = getColor("text");
  const placeholderColor = getColor("textTertiary");

  useEffect(() => {
    if (task) setText(task.text);
  }, [task]);

  const handleSave = () => {
    if (task && text.trim()) {
      onSave(task.id, text);
      onClose();
    } else {
      Alert.alert("Erro", "Digite um texto válido");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View
          style={[
            styles.modal,
            {
              backgroundColor: getColor("glass"),
              minHeight: 340,
              maxHeight: screenHeight * 0.7,
            },
          ]}
        >
          {/*HEADER*/}
          <View style={styles.header}>
            <Text style={[styles.title, { color: getColor("text") }]}>
              Editar tarefa
            </Text>
          </View>

          {/*INPUT*/}
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBg,
                color: inputColor,
                flex: 1,
                minHeight: 140,
              },
            ]}
            value={text}
            onChangeText={setText}
            placeholder="Digite a nova descrição..."
            placeholderTextColor={placeholderColor}
            multiline
            textAlignVertical="top"
            maxLength={200}
          />

          {/*FOOTER:*/}
          <View style={styles.actions}>
            <Button icon="close-outline" variant="primary" onPress={onClose} />
            <Button
              icon="checkmark-outline"
              variant="primary"
              onPress={handleSave}
              disabled={!text.trim()}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modal: {
    borderRadius: 20,
    padding: 24,
    width: "90%",
    flexDirection: "column",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlignVertical: "top",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-end",
  },
});
