import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useApp } from "../context/AppContext";
import { COLORS } from "../theme/colors";
import i18n from "../i18n";

export const ServerSettingsScreen = () => {
  const router = useRouter();
  const { activeServer, deleteServer, renameServer } = useApp();
  const [isRenameModalVisible, setRenameModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/workshop");
  };

  if (!activeServer) {
    router.replace("/workshop");
    return null;
  }

  const handleDelete = () => {
    Alert.alert(
      i18n.t("delete_server") || "Удалить сервер?",
      "Это действие нельзя отменить.",
      [
        { text: i18n.t("cancel") || "Отмена", style: "cancel" },
        {
          text: i18n.t("delete") || "Удалить",
          style: "destructive",
          onPress: async () => {
            await deleteServer(activeServer.id);
            router.replace("/workshop");
          },
        },
      ]
    );
  };

  const handleOpenRename = () => {
    setNewName(activeServer.name);
    setRenameModalVisible(true);
  };

  const handleSaveName = async () => {
    if (newName.trim()) {
      await renameServer(activeServer.id, newName.trim());
      setRenameModalVisible(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const SettingItem = ({ title, section }) => {
    const isExpanded = expandedSection === section;
    return (
      <View>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => toggleSection(section)}
        >
          <Text style={styles.settingText}>{title}</Text>
          <Ionicons
            name={isExpanded ? "chevron-down" : "chevron-forward"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.placeholderText}>
              {i18n.t("empty_section")}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
          <Text style={styles.backText}>{i18n.t("back")}</Text>
        </TouchableOpacity>
        <View style={styles.orbitIndicator}>
          <MaterialCommunityIcons
            name="orbit"
            size={16}
            color={COLORS.primary}
          />
          <Text style={styles.orbitText}>ORBIT</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          {i18n.t("server_settings") || "Настройки сервера"}
        </Text>

        <View style={styles.serverCard}>
          <View style={styles.serverIconBg}>
            <MaterialCommunityIcons
              name="hexagon-multiple"
              size={24}
              color={COLORS.primary}
            />
          </View>
          <View style={styles.serverInfo}>
            <Text style={styles.serverName}>{activeServer.name}</Text>
            <Text style={styles.serverDesc}>
              {i18n.t("server_type") || "Сервер для совместных проектов"}
            </Text>
          </View>
          <TouchableOpacity onPress={handleOpenRename}>
            <Feather name="edit-2" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statText}>
            8 {i18n.t("members") || "участников"}
          </Text>
          <View style={styles.dot} />
          <Text style={styles.statText}>
            7 {i18n.t("channels") || "каналов"}
          </Text>
          <View style={styles.dot} />
          <Text style={styles.statText}>
            {i18n.t("you_are_owner") || "Вы владелец"}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          {i18n.t("management") || "Управление"}
        </Text>
        <View style={styles.settingsGroup}>
          <SettingItem
            title={i18n.t("channels") || "Каналы"}
            section="channels"
          />
          <SettingItem title={i18n.t("roles") || "Роли"} section="roles" />
          <SettingItem
            title={i18n.t("members") || "Участники"}
            section="members"
          />
          <SettingItem
            title={i18n.t("invites") || "Приглашения"}
            section="invites"
          />
          <SettingItem
            title={i18n.t("moderation") || "Модерация"}
            section="moderation"
          />
          <SettingItem
            title={i18n.t("notifications") || "Уведомления"}
            section="notifications"
          />
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>
            {i18n.t("delete_server") || "Удалить сервер"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          {i18n.t("delete_warning") ||
            "Все каналы, сообщения и приглашения будут удалены. Это действие нельзя отменить."}
        </Text>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isRenameModalVisible}
        onRequestClose={() => setRenameModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {i18n.t("server_name") || "Название сервера"}
            </Text>
            <TextInput
              style={styles.modalInput}
              value={newName}
              onChangeText={setNewName}
              placeholder={i18n.t("enter_new_name") || "Введите новое название"}
              placeholderTextColor="#666"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalBtnCancel}
                onPress={() => setRenameModalVisible(false)}
              >
                <Text style={styles.modalBtnCancelText}>
                  {i18n.t("cancel") || "Отмена"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtnSave}
                onPress={handleSaveName}
              >
                <Text style={styles.modalBtnSaveText}>
                  {i18n.t("save") || "Сохранить"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 40 },
  title: {
    fontSize: 28,
    fontWeight: "400",
    color: "#FFF",
    marginBottom: 20,
    marginTop: 10,
  },
  serverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  serverIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#1A1A1E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  serverInfo: { flex: 1 },
  serverName: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  serverDesc: { color: "#8E8E93", fontSize: 12 },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  statText: { color: "#8E8E93", fontSize: 12 },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#666",
    marginHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 12,
    color: "#666",
    letterSpacing: 1,
    marginBottom: 12,
    fontWeight: "600",
  },
  settingsGroup: {
    backgroundColor: "#2C2C2E",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 32,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3C",
  },
  settingText: { color: "#FFF", fontSize: 16 },
  expandedContent: {
    padding: 16,
    backgroundColor: "#232326",
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3C",
  },
  placeholderText: { color: "#666", fontSize: 14, fontStyle: "italic" },
  deleteButton: {
    backgroundColor: "rgba(255, 69, 58, 0.1)",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  deleteButtonText: { color: "#FF453A", fontSize: 16, fontWeight: "600" },
  footerText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#2C2C2E",
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: "#1A1A1E",
    color: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 24,
    ...(Platform.OS === "web" && { outlineStyle: "none" }),
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalBtnCancel: {
    flex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#1A1A1E",
    marginRight: 8,
  },
  modalBtnCancelText: { color: "#FFF", fontSize: 16 },
  modalBtnSave: {
    flex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },
  modalBtnSaveText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
