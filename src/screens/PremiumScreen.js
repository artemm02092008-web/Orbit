import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialCommunityIcons,
  Ionicons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { COLORS } from "../theme/colors";
import i18n from "../i18n";
import { useApp } from "../context/AppContext";

export const PremiumScreen = () => {
  const router = useRouter();
  const { language } = useApp();

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/settings");
  };

  // Функция перехода на оплату
  const goToPayment = (plan) => {
    router.push({ pathname: "/payment", params: { plan } });
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
        <Text style={styles.title}>Orbit Premium</Text>
        <Text style={styles.subtitle}>{i18n.t("premium_subtitle")}</Text>

        {/* Basic Card — градиент сверху вниз */}
        <LinearGradient
          colors={["#2D5A9E", "#0F1F38"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.cardBasic}
        >
          <View style={styles.bgOrbitBasic} />
          <View style={styles.cardHeader}>
            <Ionicons name="flash" size={16} color="#FFF" />
            <Text style={styles.cardTitle}>Orbit Basic</Text>
          </View>
          <Text style={styles.price}>
            199₽ <Text style={styles.priceSub}>/{i18n.t("month")}</Text>
          </Text>
          <View style={styles.featuresRow}>
            <View style={styles.featureItem}>
              <Feather name="file" size={14} color="#8E8E93" />
              <Text style={styles.featureText}>{i18n.t("files_50mb")}</Text>
            </View>
            <View style={styles.featureItem}>
              <Feather name="smile" size={14} color="#8E8E93" />
              <Text style={styles.featureText}>{i18n.t("emoji")}</Text>
            </View>
            <View style={styles.featureItem}>
              <Feather name="at-sign" size={14} color="#8E8E93" />
              <Text style={styles.featureText}>{i18n.t("badge")}</Text>
            </View>
          </View>
          {/* ИСПРАВЛЕНО: добавлен onPress */}
          <TouchableOpacity
            style={styles.selectBtn}
            onPress={() => goToPayment("basic")}
          >
            <Text style={styles.selectBtnText}>{i18n.t("select_basic")}</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Pro Card — градиент сверху вниз */}
        <LinearGradient
          colors={["#6B3FA0", "#1E0F32"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.cardPro}
        >
          <View style={styles.bgOrbitPro} />
          <View style={styles.cardHeader}>
            <FontAwesome5 name="star" size={14} color="#FFF" />
            <Text style={styles.cardTitle}>Orbit Pro</Text>
            <View style={styles.maxBadge}>
              <Text style={styles.maxBadgeText}>{i18n.t("max")}</Text>
            </View>
          </View>
          <Text style={styles.price}>
            899₽ <Text style={styles.priceSub}>/{i18n.t("month")}</Text>
          </Text>
          <View style={styles.featuresRow}>
            <View style={styles.featureItem}>
              <Feather name="file" size={14} color="#8E8E93" />
              <Text style={styles.featureText}>{i18n.t("files_500mb")}</Text>
            </View>
            <View style={styles.featureItem}>
              <Feather name="video" size={14} color="#8E8E93" />
              <Text style={styles.featureText}>{i18n.t("hd_stream")}</Text>
            </View>
            <View style={styles.featureItem}>
              <Feather name="user" size={14} color="#8E8E93" />
              <Text style={styles.featureText}>{i18n.t("avatar")}</Text>
            </View>
          </View>
          {/* ИСПРАВЛЕНО: добавлен onPress */}
          <TouchableOpacity
            style={styles.selectBtn}
            onPress={() => goToPayment("pro")}
          >
            <Text style={styles.selectBtnText}>{i18n.t("select_pro")}</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Нижняя надпись */}
        <Text style={styles.footerText}>{i18n.t("autorenewal")}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
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

  scrollContainer: { paddingHorizontal: 24, paddingBottom: 40 },
  title: { fontSize: 32, fontWeight: "400", color: "#FFF", marginBottom: 8 },
  subtitle: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 24,
    lineHeight: 20,
  },

  cardBasic: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    overflow: "hidden",
    position: "relative",
  },
  bgOrbitBasic: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 40,
    borderColor: "rgba(255,255,255,0.05)",
  },

  cardPro: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    overflow: "hidden",
    position: "relative",
  },
  bgOrbitPro: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 40,
    borderColor: "rgba(255,255,255,0.05)",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    zIndex: 1,
  },
  cardTitle: { color: "#FFF", fontSize: 16, fontWeight: "600", marginLeft: 6 },
  maxBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: "auto",
  },
  maxBadgeText: { color: "#FFF", fontSize: 10, fontWeight: "600" },

  price: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 16,
    zIndex: 1,
  },
  priceSub: { fontSize: 14, fontWeight: "400", color: "rgba(255,255,255,0.7)" },

  featuresRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
    zIndex: 1,
  },
  featureItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  featureText: { color: "#FFF", fontSize: 12, opacity: 0.8 },

  selectBtn: {
    backgroundColor: "#FFF",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  selectBtnText: { color: "#000", fontSize: 16, fontWeight: "600" },

  footerText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
});
