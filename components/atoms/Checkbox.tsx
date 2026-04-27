import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/use-theme-color";

type CheckboxProps = {
  checked: boolean;
  onPress: () => void;
};

export default function Checkbox({ checked, onPress }: CheckboxProps) {
  const borderColor = useThemeColor({}, "textTertiary");
  const successColor = useThemeColor({}, "success");

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.checkbox,
          checked && styles.checkboxChecked,
          { borderColor },
        ]}
      >
        {checked && <Ionicons name="checkmark" size={16} color="#fff" />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { width: 24, height: 24 },
  checkbox: {
    flex: 1,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#4ECDC4",
    borderColor: "#4ECDC4",
  },
});
