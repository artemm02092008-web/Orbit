import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useApp } from "../context/AppContext";
import { COLORS } from "../theme/colors";
import { CustomButton } from "../components/CustomButton";
import i18n from "../i18n";

export const EditProfileScreen = () => {
  const router = useRouter();
  const { userData, updateUserProfile } = useApp();
  const [name, setName] = useState(userData?.displayName || "");
  const [image, setImage] = useState(userData?.photoURL || null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert(i18n.t("error"), i18n.t("fill_fields")); // <-- ЗАМЕНИЛИ ТЕКСТ
      return;
    }
    await updateUserProfile(name, image);
    router.back();
  };

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
        <Text style={styles.title}>
          {i18n.t("edit_profile") || "Редактировать профиль"}
        </Text>

        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Feather name="camera" size={30} color="#666" />
            </View>
          )}
          <View style={styles.editIcon}>
            <Feather name="edit-2" size={14} color="#FFF" />
          </View>
        </TouchableOpacity>

        <Text style={styles.label}>{i18n.t("name") || "Имя"}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={i18n.t("name")}
            placeholderTextColor="#666"
          />
        </View>

        <CustomButton
          title={i18n.t("save") || "Сохранить"}
          onPress={handleSave}
        />
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
  avatarContainer: {
    alignSelf: "center",
    marginBottom: 32,
    position: "relative",
  },
  avatarImage: { width: 120, height: 120, borderRadius: 60 },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#2C2C2E",
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  label: { fontSize: 12, color: "#8E8E93", marginBottom: 8 },
  inputContainer: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
    ...(Platform.OS === "web" && { outlineStyle: "none" }),
  },
});