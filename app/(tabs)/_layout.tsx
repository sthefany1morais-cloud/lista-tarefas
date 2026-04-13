import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { TaskProvider } from "../../contexts/TaskContext";

export default function TabLayout() {
  return (
    <TaskProvider>
      {" "}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#4ECDC4",
          tabBarInactiveTintColor: "rgba(255,255,255,0.6)",
          tabBarStyle: {
            backgroundColor: "#667eea",
            borderTopColor: "transparent",
            paddingBottom: 8,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "A fazer",
            tabBarIcon: ({ color }) => (
              <Ionicons name="radio-button-off" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="completed"
          options={{
            title: "Concluídas",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </TaskProvider>
  );
}
