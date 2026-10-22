import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { AnimatedLogo } from "../components/AnimatedLogo";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { COLORS } from "../theme/colors";
import { CustomButton } from "../components/CustomButton";

export const RegisterScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Универсальная функция "Назад"
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/"); // Если истории нет, идем на главный
    }
  };

  const handleRegister = async () => {
    if (!name || !username || !email || !password) {
      Alert.alert("Ошибка", "Пожалуйста, заполните все поля");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Ошибка", "Пароль должен быть не менее 6 символов");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      router.replace("/workshop");
    } catch (error) {
      Alert.alert(
        "Ошибка регистрации",
        "Этот email уже используется или введен неверно"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          {/* ИЗМЕНЕНО: используем handleBack */}
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
            <Text style={styles.backText}>Назад</Text>
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

        <View style={styles.logoBackground}>
          <MaterialCommunityIcons
            name="orbit"
            size={32}
            color={COLORS.primary}
          />
          <View style={styles.logoDot} />
        </View>
        <Text style={styles.title}>Создать аккаунт</Text>
        <Text style={styles.subtitle}>
          Будьте ближе к своим. Присоединяйтесь к Orbit.
        </Text>

        <Text style={styles.sectionTitle}>ВАШ ПРОФИЛЬ</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Имя</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите ваше имя"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Имя пользователя</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="@username"
                placeholderTextColor="#666"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
              {username.length > 2 && (
                <Feather name="check-circle" size={20} color={COLORS.primary} />
              )}
            </View>
          </View>
        </View>
        <Text style={styles.hintText}>
          По этому имени вас смогут найти в Orbit.
        </Text>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
          ДАННЫЕ ДЛЯ ВХОДА
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Электронная почта</Text>
            <TextInput
              style={styles.input}
              placeholder="example@mail.ru"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Пароль</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Минимум 6 символов"
                placeholderTextColor="#666"
                secureTextEntry={!showPassword}
                autoComplete="password-new"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.strengthRow}>
          <View style={styles.strengthBarActive} />
          <View style={styles.strengthBarActive} />
          <View style={styles.strengthBarActive} />
          <View style={styles.strengthBarInactive} />
          <Text style={styles.strengthText}>Надёжный пароль</Text>
        </View>

        <View style={styles.checkboxRow}>
          <TouchableOpacity style={styles.checkbox}>
            <Ionicons name="checkmark" size={14} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            Я принимаю{" "}
            <Text style={styles.linkText}>Условия использования</Text>
            {"\n"}и{" "}
            <Text style={styles.linkText}>Политику конфиденциальности</Text>
          </Text>
        </View>

        <CustomButton
          title={loading ? "Создание..." : "Создать аккаунт"}
          variant="primary"
          showArrow={!loading}
          onPress={handleRegister}
        />

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.loginLinkText}>
            Уже есть аккаунт? <Text style={{ color: "#FFF" }}>Войти</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.disclaimerContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={12}
            color={COLORS.textMuted}
          />
          <Text style={styles.disclaimerText}>Ваши данные — только ваши.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 20 },
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
  orbitText: { color: COLORS.primary, fontSize: 14, fontWeight: "500" },
  logoBackground: {
    width: 56,
    height: 56,
    backgroundColor: COLORS.logoBackground,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  logoDot: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: "400",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 32 },
  sectionTitle: {
    fontSize: 12,
    color: "#666",
    letterSpacing: 1,
    marginBottom: 12,
    fontWeight: "600",
  },
  inputContainer: {
    backgroundColor: "#2C2C2E",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputWrapper: { paddingVertical: 8 },
  inputLabel: { fontSize: 12, color: "#8E8E93", marginBottom: 4 },
  input: {
    fontSize: 16,
    color: "#FFF",
    padding: 0,
    ...(Platform.OS === "web" && {
      outlineStyle: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
    }),
  },
  divider: { height: 1, backgroundColor: "#3A3A3C", marginVertical: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hintText: { fontSize: 12, color: "#666", marginTop: 12, marginBottom: 24 },
  strengthRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  strengthBarActive: {
    width: 16,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginRight: 4,
  },
  strengthBarInactive: {
    width: 16,
    height: 3,
    backgroundColor: "#3A3A3C",
    borderRadius: 2,
    marginRight: 8,
  },
  strengthText: { fontSize: 12, color: "#666", marginLeft: 4 },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  checkboxText: { fontSize: 12, color: "#8E8E93", lineHeight: 18 },
  linkText: { color: "#FFF" },
  loginLink: { alignItems: "center", marginTop: 24, marginBottom: 16 },
  loginLinkText: { color: "#8E8E93", fontSize: 14 },
  disclaimerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  disclaimerText: { color: COLORS.textMuted, fontSize: 12, marginLeft: 4 },
});
