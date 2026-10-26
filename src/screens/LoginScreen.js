import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { AnimatedLogo } from "../components/AnimatedLogo";
import { COLORS } from "../theme/colors";
import i18n from "../i18n";

const THEME_COLORS = {
  background: "#0F0E13",
  card: "#1C1B22",
  inputBg: "#2C2C2E",
  textMain: "#FFFFFF",
  textSub: "#8E8E93",
  primary: "#8A56FF",
};

export const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(i18n.t("error"), i18n.t("fill_fields"));
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/workshop");
    } catch (error) {
      Alert.alert(i18n.t("login_error"), i18n.t("wrong_credentials"));
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color={THEME_COLORS.textMain} />
              <Text style={styles.backText}>{i18n.t("back")}</Text>
            </TouchableOpacity>
            
            <View style={styles.orbitIndicator}>
              <AnimatedLogo size={24} />
              <Text style={styles.orbitText}>ORBIT</Text>
            </View>
          </View>

          {/* Логотип по центру */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <AnimatedLogo size={50} />
            </View>
          </View>

          {/* Заголовки */}
          <Text style={styles.title}>{i18n.t("login_title")}</Text>
          <Text style={styles.subtitle}>{i18n.t("login_subtitle")}</Text>

          <Text style={styles.sectionTitle}>{i18n.t("login_data")}</Text>

          {/* Блок с инпутами */}
          <View style={styles.inputContainer}>
            {/* Email */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>{i18n.t("email")}</Text>
              <TextInput
                style={styles.input}
                placeholder="example@mail.ru"
                placeholderTextColor="#4E4D53"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.divider} />

            {/* Пароль */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>{i18n.t("password")}</Text>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder={i18n.t("password_placeholder")}
                  placeholderTextColor="#4E4D53"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
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

          {/* Забыли пароль */}
          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>{i18n.t("forgot_password")}</Text>
          </TouchableOpacity>

          {/* Кнопка Войти */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.submitText}>
              {loading ? i18n.t("loading") : i18n.t("login_button")}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>

          {/* Нет аккаунта? */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>{i18n.t("no_account")} </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.footerLink}>{i18n.t("register_button")}</Text>
            </TouchableOpacity>
          </View>

          {/* Дисклеймер */}
          <View style={styles.disclaimerContainer}>
            <Ionicons name="lock-closed-outline" size={12} color={THEME_COLORS.textSub} />
            <Text style={styles.disclaimerText}>{i18n.t("disclaimer")}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: THEME_COLORS.background },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: { flexDirection: "row", alignItems: "center" },
  backText: { color: THEME_COLORS.textMain, fontSize: 16, marginLeft: 4 },
  orbitIndicator: { flexDirection: "row", alignItems: "center", gap: 6 },
  orbitText: { color: THEME_COLORS.textMain, fontSize: 14, fontWeight: "600", letterSpacing: 1 },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logoBackground: {
    width: 80,
    height: 80,
    backgroundColor: THEME_COLORS.card,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: THEME_COLORS.textMain,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: THEME_COLORS.textSub,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    color: "#666",
    letterSpacing: 1,
    marginBottom: 12,
    fontWeight: "600",
  },
  inputContainer: {
    backgroundColor: THEME_COLORS.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  inputWrapper: { paddingVertical: 8 },
  inputLabel: { fontSize: 12, color: THEME_COLORS.textSub, marginBottom: 6 },
  input: {
    fontSize: 16,
    color: THEME_COLORS.textMain,
    padding: 0,
    ...(Platform.OS === "web" && {
      outlineStyle: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
    }),
  },
  divider: { height: 1, backgroundColor: "#3A3A3C", marginVertical: 8 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  forgotButton: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotText: {
    color: THEME_COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME_COLORS.primary,
    height: 56,
    borderRadius: 16,
    gap: 8,
    marginBottom: 24,
  },
  submitText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  footerText: {
    color: THEME_COLORS.textSub,
    fontSize: 14,
  },
  footerLink: {
    color: THEME_COLORS.textMain,
    fontSize: 14,
    fontWeight: "600",
  },
  disclaimerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  disclaimerText: {
    color: THEME_COLORS.textSub,
    fontSize: 12,
    marginLeft: 6,
  },
});