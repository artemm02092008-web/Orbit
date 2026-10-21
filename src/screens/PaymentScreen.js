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
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLORS } from "../theme/colors";
import { CustomButton } from "../components/CustomButton";
import i18n from "../i18n";
import { useApp } from "../context/AppContext";

export const PaymentScreen = () => {
  const router = useRouter();
  const { plan } = useLocalSearchParams();
  const { activatePremium, language } = useApp(); // <-- Берем функцию активации

  const isPro = plan === "pro";
  const price = isPro ? "899₽" : "199₽";
  const planName = isPro ? "Orbit Pro" : "Orbit Basic";

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/premium");
  };

  // Маска номера карты
  const handleCardNumberChange = (text) => {
    let cleaned = text.replace(/\D/g, "");
    let formatted = "";
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += " ";
      formatted += cleaned[i];
    }
    setCardNumber(formatted.slice(0, 19));
  };

  // Маска срока действия
  const handleExpiryChange = (text) => {
    let cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    setExpiry(cleaned.slice(0, 5));
  };

  const handlePay = async () => {
    // Валидация
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      Alert.alert(i18n.t("error"), "Введите 16 цифр номера карты");
      return;
    }
    if (expiry.length !== 5) {
      Alert.alert(i18n.t("error"), "Введите срок действия в формате ММ/ГГ");
      return;
    }
    if (cvv.length !== 3) {
      Alert.alert(i18n.t("error"), "Введите 3 цифры CVV");
      return;
    }

    // Активируем Premium в Firebase
    await activatePremium(plan === "pro" ? "pro" : "basic");

    // Переход на экран успеха
    router.replace({ pathname: "/success", params: { plan: planName, price } });
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
        <Text style={styles.title}>{i18n.t("payment_title") || "Оплата"}</Text>
        <Text style={styles.subtitle}>
          {i18n.t("payment_subtitle") || "Введите данные вашей карты"}
        </Text>

        {/* Выбранный тариф */}
        <View
          style={[
            styles.planCard,
            isPro ? styles.planCardPro : styles.planCardBasic,
          ]}
        >
          <View style={styles.planHeader}>
            <Ionicons name={isPro ? "star" : "flash"} size={20} color="#FFF" />
            <Text style={styles.planName}>{planName}</Text>
          </View>
          <Text style={styles.planPrice}>
            {price} <Text style={styles.planPriceSub}>/ {i18n.t("month")}</Text>
          </Text>
        </View>

        {/* Форма */}
        <Text style={styles.label}>
          {i18n.t("card_number") || "Номер карты"}
        </Text>
        <View style={styles.inputContainer}>
          <Feather
            name="credit-card"
            size={20}
            color="#666"
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={styles.input}
            placeholder="0000 0000 0000 0000"
            placeholderTextColor="#666"
            keyboardType="number-pad"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
          />
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={styles.label}>
              {i18n.t("expiry") || "Срок действия"}
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor="#666"
                keyboardType="number-pad"
                value={expiry}
                onChangeText={handleExpiryChange}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>{i18n.t("cvv") || "CVV"}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="•••"
                placeholderTextColor="#666"
                keyboardType="number-pad"
                maxLength={3}
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
          </View>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{i18n.t("total") || "Итого:"}</Text>
          <Text style={styles.totalPrice}>{price}</Text>
        </View>

        <CustomButton
          title={i18n.t("pay_button") || `Оплатить ${price}`}
          variant="primary"
          onPress={handlePay}
        />

        <Text style={styles.footerText}>
          {i18n.t("payment_footer") ||
            "Нажимая «Оплатить», вы соглашаетесь с условиями подписки."}
        </Text>
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
  title: { fontSize: 28, fontWeight: "400", color: "#FFF", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#8E8E93", marginBottom: 24 },

  planCard: { borderRadius: 16, padding: 20, marginBottom: 24 },
  planCardBasic: { backgroundColor: "#2D5A9E" },
  planCardPro: { backgroundColor: "#6B3FA0" },
  planHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  planName: { color: "#FFF", fontSize: 18, fontWeight: "600", marginLeft: 8 },
  planPrice: { color: "#FFF", fontSize: 32, fontWeight: "600" },
  planPriceSub: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255,255,255,0.7)",
  },

  label: { fontSize: 12, color: "#8E8E93", marginBottom: 8 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
    ...(Platform.OS === "web" && { outlineStyle: "none" }),
  },
  row: { flexDirection: "row", marginBottom: 16 },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  totalLabel: { color: "#8E8E93", fontSize: 16 },
  totalPrice: { color: "#FFF", fontSize: 24, fontWeight: "600" },

  footerText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 18,
  },
});
