import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialCommunityIcons,
  Ionicons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { COLORS } from "../theme/colors";
import i18n from "../i18n";
import { useApp } from "../context/AppContext";

export const ProfileScreen = () => {
  const router = useRouter();
  // Добавили themeColors из контекста
  const { isPremium, userData, themeColors } = useApp();
  const [user, setUser] = useState(null);

  // Цвет темы (по умолчанию фиолетовый)
  const primary = themeColors?.primary || COLORS.primary;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else router.replace("/login");
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      Alert.alert(i18n.t("error"), "Не удалось выйти из аккаунта");
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/workshop");
  };

  if (!user) return <View style={styles.safeArea} />;

  const frameColor =
    isPremium && userData?.frame !== "default"
      ? userData?.frame === "gold"
        ? "#FFD700"
        : userData?.frame === "purple"
        ? "#9D4EDD"
        : userData?.frame === "green"
        ? "#4ADE80"
        : userData?.frame === "fire"
        ? "#FF4500"
        : primary
      : primary;

  const initial = user.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : "U";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color="#FFF" />
          <Text style={styles.backText}>{i18n.t("back")}</Text>
        </TouchableOpacity>
        <View style={styles.orbitIndicator}>
          <MaterialCommunityIcons name="orbit" size={16} color={primary} />
          <Text style={styles.orbitText}>ORBIT</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <TouchableOpacity
            style={[
              styles.avatarContainer,
              { borderColor: frameColor, borderWidth: 4 },
            ]}
            onPress={() => router.push("/edit-profile")}
          >
            {userData?.photoURL ? (
              <Image
                source={{ uri: userData.photoURL }}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatar, { backgroundColor: primary }]}>
                <Text style={styles.avatarText}>{initial}</Text>
              </View>
            )}
            <View style={styles.editAvatarBtn}>
              <Feather name="camera" size={14} color="#FFF" />
            </View>
          </TouchableOpacity>

          <Text style={styles.name}>
            {user.displayName || i18n.t("profile")}
          </Text>
          <Text style={styles.email}>{user.email}</Text>

          {isPremium ? (
            <View style={styles.premiumBanner}>
              <FontAwesome5 name="crown" size={14} color="#FFD700" />
              <Text style={styles.premiumBannerText}>Orbit Premium</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.upgradeButton, { backgroundColor: primary }]}
              onPress={() => router.push("/premium")}
            >
              <Text style={styles.upgradeButtonText}>Стать Premium</Text>
            </TouchableOpacity>
          )}

          {isPremium && (
            <TouchableOpacity
              style={styles.frameButton}
              onPress={() => router.push("/frames")}
            >
              <Text style={[styles.frameButtonText, { color: primary }]}>
                Выбрать рамку
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.statusBadge}>
            <View style={styles.onlineDot} />
            <Text style={styles.statusText}>{i18n.t("in_network")}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{i18n.t("information")}</Text>
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Feather name="user" size={20} color="#8E8E93" />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardLabel}>{i18n.t("name")}</Text>
              <Text style={styles.cardValue}>{user.displayName || "—"}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.cardRow}>
            <Feather name="mail" size={20} color="#8E8E93" />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardLabel}>{i18n.t("email")}</Text>
              <Text style={styles.cardValue}>{user.email}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => router.push("/settings")}
        >
          <Ionicons name="settings-outline" size={22} color={primary} />
          <Text style={[styles.settingsText, { color: primary }]}>
            {i18n.t("settings")}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={primary}
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomPanel}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FF453A" />
          <Text style={styles.logoutText}>{i18n.t("logout")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#1A1A1E" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: { flexDirection: "row", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 14, marginLeft: 4 },
  orbitIndicator: { flexDirection: "row", alignItems: "center", gap: 4 },
  orbitText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
  },
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 20 },
  profileHeader: { alignItems: "center", marginVertical: 24 },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#FFF", fontSize: 36, fontWeight: "bold" },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2C2C2E",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1A1A1E",
    zIndex: 20,
  },
  name: { color: "#FFF", fontSize: 24, fontWeight: "600", marginBottom: 4 },
  email: { color: "#8E8E93", fontSize: 14, marginBottom: 12 },
  premiumBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.15)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFD700",
    marginTop: 10,
    marginBottom: 10,
    gap: 8,
  },
  premiumBannerText: {
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  upgradeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  upgradeButtonText: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  frameButton: {
    marginTop: 10,
    backgroundColor: "#2C2C2E",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  frameButtonText: { fontSize: 14, fontWeight: "600" },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4ADE80",
    marginRight: 6,
  },
  statusText: { color: "#4ADE80", fontSize: 12, fontWeight: "500" },
  sectionTitle: {
    fontSize: 12,
    color: "#666",
    letterSpacing: 1,
    marginBottom: 12,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#2C2C2E",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  cardRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  cardTextContainer: { marginLeft: 16 },
  cardLabel: { fontSize: 12, color: "#8E8E93", marginBottom: 2 },
  cardValue: { fontSize: 16, color: "#FFF" },
  divider: { height: 1, backgroundColor: "#3A3A3C", marginVertical: 8 },
  settingsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  settingsText: { fontSize: 16, fontWeight: "500", marginLeft: 12 },
  bottomPanel: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#2C2C2E",
    backgroundColor: "#1A1A1E",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 69, 58, 0.1)",
    padding: 16,
    borderRadius: 16,
  },
  logoutText: {
    color: "#FF453A",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
