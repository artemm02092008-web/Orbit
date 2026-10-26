import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../theme/colors";
import { CustomButton } from "../components/CustomButton";
import { AnimatedLogo } from "../components/AnimatedLogo";
import i18n from "../i18n"; // <-- ДОБАВИЛИ ИМПОРТ ПЕРЕВОДОВ

export const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.desktopWrapper}>
      <View style={styles.mobileContainer}>
        <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.orbitIndicator}>
                <View style={styles.dot} />
                <Text style={styles.orbitText}>orbit</Text>
              </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <View style={styles.logoContainer}>
                <AnimatedLogo size={140} />
              </View>
              <Text style={styles.title}>
                {i18n.t("welcome_title") || "Добро пожаловать\nв Orbit"}
              </Text>
              <Text style={styles.subtitle}>
                {i18n.t("welcome_subtitle") || "Будьте ближе к своим.\nОбщайтесь, делитесь и оставайтесь на связи."}
              </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <CustomButton
                title={i18n.t("login_button")}
                variant="primary"
                showArrow={true}
                onPress={() => router.push("/login")}
              />
              <CustomButton
                title={i18n.t("register_button")}
                variant="secondary"
                onPress={() => router.push("/register")}
              />
              <View style={styles.disclaimerContainer}>
                <Ionicons name="lock-closed-outline" size={12} color={COLORS.textMuted} />
                <Text style={styles.disclaimerText}>{i18n.t("disclaimer")}</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  desktopWrapper: { flex: 1, backgroundColor: "#000000", alignItems: "center" },
  mobileContainer: {
    width: "100%", maxWidth: 430, flex: 1, backgroundColor: COLORS.background,
    shadowColor: "#000", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 20,
  },
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 24 },
  header: { flexDirection: "row", justifyContent: "flex-end", paddingTop: 10, paddingBottom: 10 },
  orbitIndicator: { flexDirection: "row", alignItems: "center", opacity: 0.8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.primary, marginRight: 6 },
  orbitText: { color: COLORS.primary, fontSize: 14, fontWeight: "500" },
  content: { flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 40 },
  logoContainer: { 
    marginBottom: 40, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  title: { fontSize: 32, fontWeight: "400", color: COLORS.textPrimary, textAlign: "center", marginBottom: 16, lineHeight: 40 },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: "center", lineHeight: 20 },
  footer: { paddingBottom: Platform.OS === "ios" ? 10 : 20 },
  disclaimerContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 24, marginBottom: 10 },
  disclaimerText: { color: COLORS.textMuted, fontSize: 12, marginLeft: 4 },
});