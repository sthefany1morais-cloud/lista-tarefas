import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Colors } from "@/constants/theme";

export default function TabLayout() {
  const activeTintColor = useThemeColor({}, "success");
  const inactiveTintColor = useThemeColor({}, "textTertiary");
  const tabBarColor = useThemeColor({}, "secondary");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: {
          backgroundColor: tabBarColor,
          borderTopColor: "transparent",
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          position: "absolute",
          borderRadius: 20,
          marginHorizontal: 12,
          marginBottom: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "A fazer",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "radio-button-on" : "radio-button-off"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="completed"
        options={{
          title: "Concluídas",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "checkmark-circle" : "checkmark-circle-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
