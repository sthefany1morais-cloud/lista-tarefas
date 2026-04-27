import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function NotFound() {
  const iconColor = useThemeColor({}, "primary");
  const titleColor = useThemeColor({}, "text");
  const subtitleColor = useThemeColor({}, "textSecondary");
  const buttonBg = useThemeColor({}, "primaryBg");
  const linkColor = useThemeColor({}, "primary");
  const bgColor = useThemeColor({}, "background");

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Ionicons name="search-outline" size={64} color={iconColor} />
      <Text style={[styles.title, { color: titleColor }]}>
        Esta tela não existe
      </Text>
      <Text style={[styles.subtitle, { color: subtitleColor }]}>
        A página que você está procurando não foi encontrada.
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonBg }]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Voltar à tela anterior</Text>
      </TouchableOpacity>
      <Link href="/" style={styles.link}>
        <Text style={[styles.linkText, { color: linkColor }]}>
          Ir para Início
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
