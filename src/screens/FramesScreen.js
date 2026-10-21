import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useApp } from "../context/AppContext";
import { COLORS } from "../theme/colors";
import i18n from "../i18n";

const FRAMES = [
  { id: "default", name: "Обычная", color: COLORS.primary, icon: null },
  { id: "gold", name: "Золотая", color: "#FFD700", icon: "crown" },
  { id: "purple", name: "Фиолетовая", color: "#9D4EDD", icon: "star" },
  { id: "green", name: "Зеленая", color: "#4ADE80", icon: "leaf" },
  { id: "fire", name: "Огненная", color: "#FF4500", icon: "fire" },
];

export const FramesScreen = () => {
  const router = useRouter();
  const { userData, setUserFrame, isPremium } = useApp();

  if (!isPremium) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.lockText}>Рамки доступны только Premium</Text>
          <TouchableOpacity
            onPress={() => router.push("/premium")}
            style={styles.upgradeBtn}
          >
            <Text style={styles.upgradeText}>Стать Premium</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#FFF" />
          <Text style={styles.backText}>{i18n.t("back")}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Выбор рамки</Text>
        <View style={styles.grid}>
          {FRAMES.map((frame) => {
            const isActive =
              userData?.frame === frame.id ||
              (frame.id === "default" && !userData?.frame);
            return (
              <TouchableOpacity
                key={frame.id}
                style={styles.frameItem}
                onPress={() => setUserFrame(frame.id)}
              >
                <View
                  style={[styles.avatarPreview, { borderColor: frame.color }]}
                >
                  <Text style={styles.avatarPreviewText}>A</Text>
                  {frame.icon && (
                    <View
                      style={[
                        styles.iconBadge,
                        { backgroundColor: frame.color },
                      ]}
                    >
                      <FontAwesome5 name={frame.icon} size={10} color="#FFF" />
                    </View>
                  )}
                </View>
                <Text style={styles.frameName}>{frame.name}</Text>
                {isActive && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={COLORS.primary}
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: { flexDirection: "row", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 16, marginLeft: 4 },
  scrollContainer: { paddingHorizontal: 24 },
  title: { fontSize: 28, color: "#FFF", marginBottom: 24 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  frameItem: {
    width: "45%",
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },
  avatarPreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
  },
  avatarPreviewText: { color: "#FFF", fontSize: 30, fontWeight: "bold" },
  frameName: { color: "#FFF", marginTop: 8, fontSize: 14 },
  checkIcon: { position: "absolute", top: 0, right: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  lockText: { color: "#FFF", fontSize: 18, marginBottom: 20 },
  upgradeBtn: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 12,
  },
  upgradeText: { color: "#FFF", fontWeight: "bold" },
  iconBadge: {
    position: "absolute",
    bottom: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
