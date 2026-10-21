import React, { useState } from "react";
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

const COLORS = {
  bg: "#1C1C1E",
  card: "#2C2C2E",
  textMain: "#FFFFFF",
  textSub: "#8E8E93",
  border: "#3A3A3C",
  purple: "#A78BFA",
  indigo: "#4F46E5",
};

export default function NotificationsScreen() {
  const router = useRouter();
  const [requestAction, setRequestAction] = useState("none");
  const [showMenu, setShowMenu] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/workshop");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {/* Меню настроек */}
      {showMenu && (
        <>
          <TouchableOpacity
            style={styles.menuBackdrop}
            onPress={() => setShowMenu(false)}
          />
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setShowMenu(false)}
            >
              <Text style={styles.menuItemText}>Отметить все прочитанными</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setShowMenu(false)}
            >
              <Text style={[styles.menuItemText, { color: "#FF453A" }]}>
                Очистить уведомления
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M15 18l-6-6 6-6"
              stroke={COLORS.textSub}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={styles.backText}>Назад</Text>
        </TouchableOpacity>
        <View style={styles.orbitIndicator}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke={COLORS.purple}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={styles.orbitText}>ORBIT</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Уведомления</Text>
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Circle cx={12} cy={12} r={1} fill={COLORS.textSub} />
              <Circle cx={19} cy={12} r={1} fill={COLORS.textSub} />
              <Circle cx={5} cy={12} r={1} fill={COLORS.textSub} />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Запрос дружбы */}
        {requestAction === "none" && (
          <View style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <View style={styles.requestUser}>
                <View style={styles.avatar}>
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Circle
                      cx={12}
                      cy={12}
                      r={10}
                      stroke={COLORS.purple}
                      strokeWidth={2}
                    />
                    <Path
                      d="M8 12h8"
                      stroke={COLORS.purple}
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                    <Path
                      d="M12 8v8"
                      stroke={COLORS.purple}
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </Svg>
                </View>
                <View>
                  <Text style={styles.requestName}>LL★REZ★</Text>
                  <Text style={styles.requestSub}>
                    Отправляет вам запрос дружбы
                  </Text>
                </View>
              </View>
              <View style={styles.requestTime}>
                <Text style={styles.timeText}>6 мес.</Text>
                <View
                  style={[styles.dot, { backgroundColor: COLORS.indigo }]}
                />
              </View>
            </View>
            <View style={styles.requestButtons}>
              <TouchableOpacity
                style={[styles.btnAccept, { backgroundColor: COLORS.indigo }]}
                onPress={() => setRequestAction("accepted")}
              >
                <Text style={styles.btnAcceptText}>Принять</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnIgnore}
                onPress={() => setRequestAction("ignored")}
              >
                <Text style={styles.btnIgnoreText}>Игнорировать</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {requestAction !== "none" && (
          <View style={styles.requestResult}>
            <Text style={styles.requestResultText}>
              Запрос{" "}
              {requestAction === "accepted" ? "принят" : "проигнорирован"}
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Недавняя активность</Text>

        {/* Активность 1 */}
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                stroke={COLORS.purple}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
          <View style={styles.activityContent}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityText}>
                У вас есть новые сообщения в:{" "}
                <Text style={styles.activityBold}>Neverу.</Text>
              </Text>
              <Text style={styles.timeText}>14 ч.</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Активность 2 */}
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Circle
                cx={12}
                cy={12}
                r={10}
                stroke={COLORS.purple}
                strokeWidth={2}
              />
              <Path
                d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"
                stroke={COLORS.purple}
                strokeWidth={2}
                strokeLinecap="round"
              />
            </Svg>
          </View>
          <View style={styles.activityContent}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityText}>
                ! Inception упоминает вас в Neverу —{" "}
                <Text style={styles.activityBold}>Трибунка</Text>
              </Text>
              <Text style={styles.timeText}>11 ч.</Text>
            </View>
            <View style={styles.quoteBlock}>
              <Text style={styles.mentionText}>@everyone</Text>
              <Text style={styles.quoteText}>
                ТРИБУНА БЫСТРЫЕ СВИДАНИЯ НАЧАЛИСЬ
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Активность 3 */}
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path
                d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                stroke={COLORS.purple}
                strokeWidth={2}
                strokeLinecap="round"
              />
              <Circle
                cx={9}
                cy={7}
                r={4}
                stroke={COLORS.purple}
                strokeWidth={2}
              />
              <Path
                d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                stroke={COLORS.purple}
                strokeWidth={2}
                strokeLinecap="round"
              />
            </Svg>
          </View>
          <View style={styles.activityContent}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityText}>
                qwaraHStillalive? упоминает вас в Neverу —{" "}
                <Text style={styles.activityBold}>новости</Text>
              </Text>
              <Text style={styles.timeText}>12 ч.</Text>
            </View>
            <View style={styles.quoteBlock}>
              <Text style={styles.mentionText}>@everyone</Text>
              <Text style={styles.quoteText}>
                Дорогие участники сервера! Сегодня в 21:00 по МСК — «Трибуна:
                Быстрые свидания». Разыграем Orbit Premium на 1 месяц!
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Активность 4 */}
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path
                d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"
                stroke={COLORS.purple}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
          <View style={styles.activityContent}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityText}>
                ! Inception упоминает вас в Neverу —{" "}
                <Text style={styles.activityBold}>розыгрыш</Text>
              </Text>
              <Text style={styles.timeText}>13 ч.</Text>
            </View>
            <View style={styles.quoteBlock}>
              <Text style={styles.mentionText}>@everyone</Text>
              <Text style={styles.quoteText}>
                Orbit Premium на 1 месяц. Условия: посидеть в войсе 40 минут.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: { flexDirection: "row", alignItems: "center" },
  backText: {
    color: COLORS.textSub,
    fontSize: 14,
    marginLeft: 4,
    fontWeight: "500",
  },
  orbitIndicator: { flexDirection: "row", alignItems: "center", gap: 4 },
  orbitText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  scrollContainer: { paddingHorizontal: 16, paddingBottom: 40 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  pageTitle: { color: "#FFF", fontSize: 30, fontWeight: "bold" },

  requestCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  requestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  requestUser: { flexDirection: "row", gap: 12, flex: 1 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3A3A3C",
    justifyContent: "center",
    alignItems: "center",
  },
  requestName: { color: "#FFF", fontSize: 14, fontWeight: "bold" },
  requestSub: { color: COLORS.textSub, fontSize: 12, marginTop: 2 },
  requestTime: { alignItems: "flex-end", gap: 4 },
  timeText: { color: COLORS.textSub, fontSize: 10 },
  dot: { width: 8, height: 8, borderRadius: 4 },

  requestButtons: { flexDirection: "row", gap: 8 },
  btnAccept: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  btnAcceptText: { color: "#FFF", fontSize: 14, fontWeight: "500" },
  btnIgnore: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  btnIgnoreText: { color: "#FFF", fontSize: 14, fontWeight: "500" },

  requestResult: {
    backgroundColor: "rgba(44,44,46,0.5)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  requestResultText: { color: COLORS.textSub, fontSize: 14 },

  sectionTitle: {
    color: COLORS.textSub,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 16,
  },
  activityItem: { flexDirection: "row", gap: 12 },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
  },
  activityContent: { flex: 1 },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  activityText: { color: "#D1D1D6", fontSize: 14, flex: 1, lineHeight: 20 },
  activityBold: { color: "#FFF", fontWeight: "bold" },
  quoteBlock: {
    borderLeftWidth: 2,
    borderLeftColor: COLORS.border,
    paddingLeft: 12,
    marginTop: 8,
  },
  mentionText: {
    fontSize: 12,
    color: COLORS.purple,
    fontWeight: "500",
    marginBottom: 4,
  },
  quoteText: { color: COLORS.textSub, fontSize: 12, lineHeight: 18 },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 52,
    marginVertical: 16,
  },

  menuBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 40,
  },
  menu: {
    position: "absolute",
    top: 60,
    right: 16,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 8,
    width: 200,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: 50,
  },
  menuItem: { paddingVertical: 12, paddingHorizontal: 16 },
  menuItemText: { color: "#FFF", fontSize: 14 },
});
