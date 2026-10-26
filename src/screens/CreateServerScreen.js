import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useApp } from "../context/AppContext";
import { COLORS } from "../theme/colors";
import { CustomButton } from "../components/CustomButton";
import i18n from "../i18n";

export const CreateServerScreen = () => {
  const router = useRouter();
  const { addServer } = useApp();

  const [serverName, setServerName] = useState(i18n.t("workshop"));
  const [serverType, setServerType] = useState("project");
  const [image, setImage] = useState(null);
  const [isNameEdited, setIsNameEdited] = useState(false); // <-- Добавили флаг

  // <-- ДОБАВИЛИ: Обновление названия при смене языка, если юзер не трогал поле
  useEffect(() => {
    if (!isNameEdited) {
      setServerName(i18n.t("workshop"));
    }
  }, [i18n.locale]);

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/workshop");
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(i18n.t("error"), "Вы отказали в доступе к галерее");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreate = () => {
    if (!serverName.trim()) {
      Alert.alert(i18n.t("error"), i18n.t("fill_fields"));
      return;
    }

    addServer({
      name: serverName,
      type: serverType,
      icon: image,
    });

    router.replace("/workshop");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
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

        {/* Title */}
        <Text style={styles.title}>{i18n.t("create_server")}</Text>
        <Text style={styles.subtitle}>{i18n.t("create_server_subtitle")}</Text>

        {/* Upload Icon */}
        <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
          <View style={styles.uploadIconBox}>
            {image ? (
              <Image source={{ uri: image }} style={styles.uploadedImage} />
            ) : (
              <>
                <Feather name="image" size={24} color={COLORS.primary} />
                <View style={styles.plusIcon}>
                  <Ionicons name="add" size={12} color="#FFF" />
                </View>
              </>
            )}
          </View>
          <View style={styles.uploadTextContainer}>
            <Text style={styles.uploadTitle}>
              {image ? i18n.t("upload_icon_change") : i18n.t("upload_icon")}
            </Text>
            <Text style={styles.uploadSubtitle}>
              {i18n.t("upload_icon_hint")}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Server Name Input */}
        <Text style={styles.label}>{i18n.t("server_name")}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={serverName}
            onChangeText={(text) => {
              setServerName(text);
              setIsNameEdited(true); // <-- Юзер начал вводить текст
            }}
            placeholder={i18n.t("enter_name") || "Введите название"}
            placeholderTextColor="#666"
          />
        </View>
        <Text style={styles.hintText}>{i18n.t("server_name_hint")}</Text>

        {/* Server Type Selection */}
        <Text style={styles.label}>{i18n.t("server_type")}</Text>

        {/* Option 1: Friends */}
        <TouchableOpacity
          style={[
            styles.optionContainer,
            serverType === "friends" && styles.optionActive,
          ]}
          onPress={() => setServerType("friends")}
        >
          <View style={styles.optionIcon}>
            <Ionicons
              name="people-outline"
              size={24}
              color={serverType === "friends" ? "#FFF" : "#8E8E93"}
            />
          </View>
          <View style={styles.optionTextContainer}>
            <Text
              style={[
                styles.optionTitle,
                serverType === "friends" && { color: "#FFF" },
              ]}
            >
              {i18n.t("for_friends")}
            </Text>
            <Text style={styles.optionSubtitle}>
              {i18n.t("for_friends_sub")}
            </Text>
          </View>
          <View
            style={[
              styles.radio,
              serverType === "friends" && styles.radioActive,
            ]}
          >
            {serverType === "friends" && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* Option 2: Project */}
        <TouchableOpacity
          style={[
            styles.optionContainer,
            serverType === "project" && styles.optionActive,
          ]}
          onPress={() => setServerType("project")}
        >
          <View style={styles.optionIcon}>
            <Ionicons
              name="briefcase-outline"
              size={24}
              color={serverType === "project" ? COLORS.primary : "#8E8E93"}
            />
          </View>
          <View style={styles.optionTextContainer}>
            <Text
              style={[
                styles.optionTitle,
                serverType === "project" && { color: "#FFF" },
              ]}
            >
              {i18n.t("for_project")}
            </Text>
            <Text style={styles.optionSubtitle}>
              {i18n.t("for_project_sub")}
            </Text>
          </View>
          <View
            style={[
              styles.radio,
              serverType === "project" && styles.radioActive,
            ]}
          >
            {serverType === "project" && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* Option 3: Community */}
        <TouchableOpacity
          style={[
            styles.optionContainer,
            serverType === "community" && styles.optionActive,
          ]}
          onPress={() => setServerType("community")}
        >
          <View style={styles.optionIcon}>
            <Ionicons
              name="chatbubbles-outline"
              size={24}
              color={serverType === "community" ? "#FFF" : "#8E8E93"}
            />
          </View>
          <View style={styles.optionTextContainer}>
            <Text
              style={[
                styles.optionTitle,
                serverType === "community" && { color: "#FFF" },
              ]}
            >
              {i18n.t("for_community")}
            </Text>
            <Text style={styles.optionSubtitle}>
              {i18n.t("for_community_sub")}
            </Text>
          </View>
          <View
            style={[
              styles.radio,
              serverType === "community" && styles.radioActive,
            ]}
          >
            {serverType === "community" && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* Submit Button */}
        <View style={{ marginTop: 32 }}>
          <CustomButton
            title={i18n.t("create_server")}
            variant="primary"
            onPress={handleCreate}
          />
          <Text style={styles.footerText}>
            {i18n.t("create_server_footer")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#1A1A1E" },
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: { flexDirection: "row", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 16, marginLeft: 4 },
  orbitIndicator: { flexDirection: "row", alignItems: "center", gap: 4 },
  orbitText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
  },
  title: { fontSize: 28, fontWeight: "400", color: "#FFF", marginBottom: 8 },
  subtitle: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 24,
    lineHeight: 20,
  },
  uploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  uploadIconBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3A3A3C",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  uploadedImage: { width: "100%", height: "100%", resizeMode: "cover" },
  plusIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadTextContainer: { flex: 1, marginLeft: 16 },
  uploadTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  uploadSubtitle: { color: "#8E8E93", fontSize: 12, lineHeight: 16 },
  label: { fontSize: 14, color: "#8E8E93", marginBottom: 8 },
  inputContainer: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    justifyContent: "center",
    marginBottom: 8,
  },
  input: {
    color: "#FFF",
    fontSize: 16,
    outlineStyle: Platform.OS === "web" ? "none" : undefined,
  },
  hintText: { color: "#666", fontSize: 12, marginBottom: 24 },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  optionActive: { borderColor: COLORS.primary },
  optionIcon: { width: 40, alignItems: "center" },
  optionTextContainer: { flex: 1 },
  optionTitle: {
    color: "#8E8E93",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  optionSubtitle: { color: "#666", fontSize: 12 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#666",
    justifyContent: "center",
    alignItems: "center",
  },
  radioActive: { borderColor: COLORS.primary },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  footerText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
    marginTop: 16,
  },
});