import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle } from "react-native-svg";
import { useRouter } from "expo-router";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { AnimatedLogo } from "../components/AnimatedLogo";
import i18n from "../i18n"; // <-- ИМПОРТ ПЕРЕВОДОВ

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
  
  const [showMenu, setShowMenu] = useState(false);
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. ЗАГРУЗКА ЗАПРОСОВ В ДРУЗЬЯ
  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "friend_requests"),
      where("to", "==", auth.currentUser.uid),
      where("status", "==", "pending")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reqs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(reqs);
    });
    return () => unsubscribe();
  }, []);

  // 2. ЗАГРУЗКА РЕАЛЬНЫХ УВЕДОМЛЕНИЙ
  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", auth.currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(notifs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 3. ОБРАБОТКА ЗАПРОСА В ДРУЗЬЯ
  const handleRequest = async (requestId, action) => {
    try {
      await updateDoc(doc(db, "friend_requests", requestId), {
        status: action === "accepted" ? "accepted" : "declined",
      });
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch (error) {
      console.log(error);
      Alert.alert(
        i18n.t("error"),
        i18n.t("error_process_request") || "Не удалось обработать запрос"
      );
    }
  };

  // 4. ПРИНЯТЬ ПРИГЛАШЕНИЕ НА СЕРВЕР
  const handleAcceptInvite = async (notification) => {
    try {
      const userId = auth.currentUser.uid;
      
      const serverRef = doc(db, "servers", notification.serverId);
      const serverSnap = await getDoc(serverRef);

      if (!serverSnap.exists()) {
        Alert.alert(i18n.t("error"), i18n.t("server_not_found") || "Сервер не найден");
        return;
      }

      const serverData = serverSnap.data();

      await updateDoc(serverRef, {
        members: arrayUnion(userId),
      });

      await addDoc(collection(db, "servers"), {
        ...serverData,
        userId: userId,
        originalServerId: notification.serverId,
        joinedAt: new Date(),
      });

      await deleteDoc(doc(db, "notifications", notification.id));

      Alert.alert(
        i18n.t("success") || "Успех", 
        i18n.t("joined_server") 
          ? `${i18n.t("joined_server")} "${notification.serverName}"`
          : `Вы присоединились к серверу "${notification.serverName}"`
      );
      router.push("/workshop");
    } catch (error) {
      console.log(error);
      Alert.alert(
        i18n.t("error"), 
        i18n.t("error_accept_invite") || "Не удалось принять приглашение"
      );
    }
  };

  // 5. УДАЛЕНИЕ УВЕДОМЛЕНИЯ
  const deleteNotification = async (id) => {
    try {
      await deleteDoc(doc(db, "notifications", id));
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

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
              <Text style={styles.menuItemText}>{i18n.t("mark_all_read")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setShowMenu(false)}
            >
              <Text style={[styles.menuItemText, { color: "#FF453A" }]}>
                {i18n.t("clear_notifications")}
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
          <Text style={styles.backText}>{i18n.t("back")}</Text>
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <AnimatedLogo size={28} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>{i18n.t("notifications")}</Text>
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Circle cx={12} cy={12} r={1} fill={COLORS.textSub} />
              <Circle cx={19} cy={12} r={1} fill={COLORS.textSub} />
              <Circle cx={5} cy={12} r={1} fill={COLORS.textSub} />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* БЛОК РЕАЛЬНЫХ ЗАПРОСОВ ДРУЖБЫ */}
        {requests.map((req) => (
          <View key={req.id} style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <View style={styles.requestUser}>
                <View style={styles.avatar}>
                  <Text style={{ color: COLORS.purple, fontSize: 16, fontWeight: "bold" }}>
                    {(req.fromName || "U").charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.requestName}>
                    {req.fromName || i18n.t("user")}
                  </Text>
                  <Text style={styles.requestSub}>
                    {i18n.t("friend_request")}
                  </Text>
                </View>
              </View>
              <View style={styles.requestTime}>
                <View style={[styles.dot, { backgroundColor: COLORS.indigo }]} />
              </View>
            </View>
            <View style={styles.requestButtons}>
              <TouchableOpacity
                style={[styles.btnAccept, { backgroundColor: COLORS.indigo }]}
                onPress={() => handleRequest(req.id, "accepted")}
              >
                <Text style={styles.btnAcceptText}>{i18n.t("accept")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnIgnore}
                onPress={() => handleRequest(req.id, "declined")}
              >
                <Text style={styles.btnIgnoreText}>{i18n.t("ignore")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>{i18n.t("recent_activity")}</Text>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.purple} style={{ marginTop: 20 }} />
        ) : notifications.length === 0 ? (
          <Text style={{ color: COLORS.textSub, textAlign: "center", marginTop: 20 }}>
            {i18n.t("no_notifications") || "У вас пока нет уведомлений"}
          </Text>
        ) : (
          notifications.map((notif) => (
            <View key={notif.id} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke={COLORS.purple}
                    strokeWidth={2}
                  />
                  <Path
                    d="M12 16v-4M12 8h.01"
                    stroke={COLORS.purple}
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
              <View style={styles.activityContent}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityText}>
                    {notif.title || i18n.t("new_notification") || "Новое уведомление"}
                  </Text>
                </View>
                <View style={styles.quoteBlock}>
                  <Text style={styles.quoteText}>{notif.message}</Text>
                </View>

                {/* КНОПКИ ДЛЯ ПРИГЛАШЕНИЯ НА СЕРВЕР */}
                {notif.type === "server_invite" && (
                  <View style={styles.inviteButtonsRow}>
                    <TouchableOpacity
                      style={styles.acceptBtn}
                      onPress={() => handleAcceptInvite(notif)}
                    >
                      <Text style={styles.acceptBtnText}>{i18n.t("accept")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.declineBtn}
                      onPress={() => deleteNotification(notif.id)}
                    >
                      <Text style={styles.declineBtnText}>{i18n.t("decline") || "Отклонить"}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))
        )}
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
  backText: { color: COLORS.textSub, fontSize: 14, marginLeft: 4, fontWeight: "500" },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: { paddingHorizontal: 16, paddingBottom: 40 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  pageTitle: { color: "#FFF", fontSize: 30, fontWeight: "bold" },
  requestCard: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, marginBottom: 24 },
  requestHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  requestUser: { flexDirection: "row", gap: 12, flex: 1 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#3A3A3C", justifyContent: "center", alignItems: "center" },
  requestName: { color: "#FFF", fontSize: 14, fontWeight: "bold" },
  requestSub: { color: COLORS.textSub, fontSize: 12, marginTop: 2 },
  requestTime: { alignItems: "flex-end", gap: 4 },
  timeText: { color: COLORS.textSub, fontSize: 10 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  requestButtons: { flexDirection: "row", gap: 8 },
  btnAccept: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  btnAcceptText: { color: "#FFF", fontSize: 14, fontWeight: "500" },
  btnIgnore: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  btnIgnoreText: { color: "#FFF", fontSize: 14, fontWeight: "500" },
  sectionTitle: { color: COLORS.textSub, fontSize: 14, fontWeight: "500", marginBottom: 16 },
  activityItem: { flexDirection: "row", gap: 12, marginBottom: 16 },
  activityIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.card, justifyContent: "center", alignItems: "center" },
  activityContent: { flex: 1 },
  activityHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 8 },
  activityText: { color: "#D1D1D6", fontSize: 14, flex: 1, lineHeight: 20 },
  quoteBlock: { borderLeftWidth: 2, borderLeftColor: COLORS.border, paddingLeft: 12, marginTop: 8 },
  quoteText: { color: COLORS.textSub, fontSize: 12, lineHeight: 18 },
  menuBackdrop: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 40 },
  menu: { position: "absolute", top: 60, right: 16, backgroundColor: COLORS.card, borderRadius: 12, padding: 8, width: 200, borderWidth: 1, borderColor: COLORS.border, zIndex: 50 },
  menuItem: { paddingVertical: 12, paddingHorizontal: 16 },
  menuItemText: { color: "#FFF", fontSize: 14 },
  inviteButtonsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: COLORS.indigo,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  acceptBtnText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 13,
  },
  declineBtn: {
    flex: 1,
    backgroundColor: "#3A3A3C",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  declineBtnText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 13,
  },
});