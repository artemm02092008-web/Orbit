import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle } from "react-native-svg";
import { useRouter } from "expo-router";
import { useApp } from "../context/AppContext";
import { useTranslation } from "../hooks/useTranslation"; // <-- ХУК ПЕРЕВОДА

const COLORS = {
  bg: "#0F0E13",
  card: "#16151B",
  textMain: "#FFFFFF",
  textSub: "#656469",
  purpleCard: "#1E1830",
};

export const SettingsScreen = () => {
  const router = useRouter();
  const { t } = useTranslation(); // <-- ИНИЦИАЛИЗАЦИЯ
  const { language, themeColors } = useApp() || {};
  const primary = themeColors?.primary || "#8A56FF";

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/workshop");
  };

  const getCurrentLanguageName = () => {
    if (language === "ru") return "Русский";
    if (language === "en") return "English";
    if (language === "es") return "Español";
    if (language === "fr") return "Français";
    if (language === "de") return "Deutsch";
    return "Русский";
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M15 19l-7-7 7-7"
              stroke="#A3A2A8"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={styles.backText}>
            {t({ ru: "Назад", en: "Back", es: "Atrás", fr: "Retour", de: "Zurück" })}
          </Text>
        </TouchableOpacity>
        <View style={styles.orbitIndicator}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Circle cx={12} cy={12} r={9} stroke={primary} strokeWidth={2} />
            <Circle cx={19} cy={5} r={2} fill={primary} />
          </Svg>
          <Text style={styles.orbitText}>ORBIT</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>
          {t({ ru: "Настройки", en: "Settings", es: "Ajustes", fr: "Paramètres", de: "Einstellungen" })}
        </Text>

        {/* Premium Card */}
        <TouchableOpacity
          style={[styles.premiumCard, { borderColor: primary + "40" }]}
          onPress={() => router.push("/premium")}
        >
          <View
            style={[styles.premiumIcon, { backgroundColor: primary + "33" }]}
          >
            <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
              <Circle cx={12} cy={14} r={7} fill={primary} />
              <Path
                d="M12 4C7 4 3 8 3 13"
                stroke="#FFF"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </Svg>
          </View>
          <View style={styles.premiumTextContainer}>
            <Text style={styles.premiumTitle}>
              {t({ ru: "Orbit Premium", en: "Orbit Premium", es: "Orbit Premium", fr: "Orbit Premium", de: "Orbit Premium" })}
            </Text>
            <Text style={styles.premiumSubtitle}>
              {t({
                ru: "Больше пространства для общения",
                en: "More space for communication",
                es: "Más espacio para comunicarse",
                fr: "Plus d'espace pour communiquer",
                de: "Mehr Platz für Kommunikation"
              })}
            </Text>
          </View>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M9 5l7 7-7 7"
              stroke={primary}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* Main Settings List */}
        <View style={styles.sectionCard}>
          <MenuItem
            icon={<AccountIcon />}
            title={t({ ru: "Учётная запись", en: "Account", es: "Cuenta", fr: "Compte", de: "Konto" })}
            onPress={() => router.push("/profile")}
          />
          <MenuItem
            icon={<BellIcon />}
            title={t({ ru: "Уведомления", en: "Notifications", es: "Notificaciones", fr: "Notifications", de: "Benachrichtigungen" })}
            onPress={() => {}}
          />
          <MenuItem
            icon={<PaletteIcon />}
            title={t({ ru: "Внешний вид", en: "Appearance", es: "Apariencia", fr: "Apparence", de: "Erscheinungsbild" })}
            onPress={() => router.push("/appearance")}
          />
          <MenuItem
            icon={<LanguageIcon />}
            title={t({ ru: "Язык", en: "Language", es: "Idioma", fr: "Langue", de: "Sprache" })}
            value={getCurrentLanguageName()}
            onPress={() => router.push("/language")}
            isLast
          />
        </View>

        {/* Support Section */}
        <Text style={styles.sectionLabel}>
          {t({ ru: "Поддержка", en: "Support", es: "Soporte", fr: "Support", de: "Support" })}
        </Text>
        <View style={styles.sectionCard}>
          <MenuItem 
            icon={<HelpIcon />} 
            title={t({ ru: "Поддержка", en: "Support", es: "Soporte", fr: "Support", de: "Support" })} 
            onPress={() => {}} 
          />
          <MenuItem
            icon={<LogIcon />}
            title={t({ ru: "Отправить логи", en: "Send logs", es: "Enviar registros", fr: "Envoyer les logs", de: "Protokolle senden" })}
            onPress={() => {}}
            isLast
          />
        </View>

        {/* Updates Section */}
        <Text style={styles.sectionLabel}>
          {t({ ru: "Что нового", en: "What's new", es: "Novedades", fr: "Nouveautés", de: "Was ist neu" })}
        </Text>
        <View style={styles.sectionCard}>
          <MenuItem
            icon={<SparklesIcon color={primary} />}
            title={t({ ru: "Обновления Orbit", en: "Orbit updates", es: "Actualizaciones de Orbit", fr: "Mises à jour Orbit", de: "Orbit-Updates" })}
            value="2.8"
            onPress={() => {}}
            isLast
          />
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.push("/login")}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
              stroke="#FF453A"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={styles.logoutText}>
            {t({ ru: "Выйти", en: "Log out", es: "Cerrar sesión", fr: "Déconnexion", de: "Abmelden" })}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Orbit · {t({ ru: "версия", en: "version", es: "versión", fr: "version", de: "Version" })} 2.8.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Компонент строки меню ---
const MenuItem = ({ icon, title, value, onPress, isLast }) => (
  <TouchableOpacity
    style={[styles.menuItem, !isLast && styles.menuItemBorder]}
    onPress={onPress}
  >
    <View style={styles.menuIconContainer}>{icon}</View>
    <Text style={styles.menuTitle}>{title}</Text>
    {value && <Text style={styles.menuValue}>{value}</Text>}
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 5l7 7-7 7"
        stroke="#656469"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </TouchableOpacity>
);

// --- ИКОНКИ (полностью прописаны, чтобы не было ошибок) ---
const AccountIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
      stroke="#FFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BellIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
      stroke="#FFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PaletteIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2v-1c0-1.1.9-2 2-2h1c2.76 0 5-2.24 5-5 0-5.52-4.48-10-10-10z"
      stroke="#FFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={7.5} cy={10.5} r={1.5} fill="#FFF" />
    <Circle cx={12} cy={7.5} r={1.5} fill="#FFF" />
    <Circle cx={16.5} cy={10.5} r={1.5} fill="#FFF" />
  </Svg>
);

const LanguageIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"
      stroke="#FFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HelpIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke="#FFF" strokeWidth={2} />
    <Path
      d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"
      stroke="#FFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LogIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
      stroke="#FFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
      stroke="#FFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SparklesIcon = ({ color }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3z"
      stroke={color || "#8A56FF"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 3v4M3 5h4M19 17v4M17 19h4"
      stroke={color || "#8A56FF"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: { flexDirection: "row", alignItems: "center" },
  backText: { color: "#A3A2A8", fontSize: 16, marginLeft: 4 },
  orbitIndicator: { flexDirection: "row", alignItems: "center", gap: 6 },
  orbitText: { color: "#FFF", fontSize: 14, fontWeight: "600", letterSpacing: 1 },
  scrollContainer: { paddingHorizontal: 16, paddingBottom: 40 },
  pageTitle: { fontSize: 32, fontWeight: "400", color: "#FFF", marginBottom: 20 },
  premiumCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.purpleCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#3A2B5C",
  },
  premiumIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(138, 86, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  premiumTextContainer: { flex: 1 },
  premiumTitle: { color: "#FFF", fontSize: 16, fontWeight: "600", marginBottom: 2 },
  premiumSubtitle: { color: "#A09AB5", fontSize: 12 },
  sectionLabel: { fontSize: 14, color: "#656469", marginBottom: 12, marginTop: 8 },
  sectionCard: { backgroundColor: COLORS.card, borderRadius: 16, paddingHorizontal: 16, marginBottom: 24 },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 16 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: "#232229" },
  menuIconContainer: { width: 28, marginRight: 12, alignItems: "center" },
  menuTitle: { flex: 1, color: "#FFF", fontSize: 16 },
  menuValue: { color: "#656469", fontSize: 14, marginRight: 8 },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 69, 58, 0.1)",
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  logoutText: { color: "#FF453A", fontSize: 16, fontWeight: "600", marginLeft: 8 },
  footerText: { color: "#656469", fontSize: 12, textAlign: "center" },
});