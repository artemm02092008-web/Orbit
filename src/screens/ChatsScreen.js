import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle } from "react-native-svg";
import { useRouter } from "expo-router";
import { useApp } from "../context/AppContext";

const COLORS = {
  bg: "#1C1C1E",
  card: "#2C2C2E",
  textMain: "#FFFFFF",
  textSub: "#8E8E93",
  border: "#3A3A3C",
  purple: "#8A56FF",
};

const FRIENDS = [
  { id: "1", name: "Александр", avatar: "А", isOnline: true },
  { id: "2", name: "Мария", avatar: "М", isOnline: true },
  { id: "3", name: "Иван", avatar: "И", isOnline: false },
  { id: "4", name: "Елена", avatar: "Е", isOnline: true },
];

const CHATS = [
  {
    id: "1",
    name: "КОНКУРС НА 5.000 РУБЛЕЙ",
    lastMessage: "КОНКУРС НА 5.000 РУБЛЕЙ: УЖЕ С...",
    time: "3 д.",
    unread: 0,
    isPinned: true,
    icon: "ticket",
  },
  {
    id: "2",
    name: "Support",
    lastMessage: "",
    time: "2 мес.",
    unread: 0,
    icon: "support",
  },
  {
    id: "3",
    name: "Eminence @Atomic",
    lastMessage: "Вы: Qq",
    time: "2 мес.",
    unread: 0,
    isOnline: true,
    avatar: "E",
  },
  {
    id: "4",
    name: "Письмо",
    lastMessage: "Письмо: ОГО, на FLYER трибуна ГОЛ...",
    time: "3 мес.",
    unread: 0,
    icon: "envelope",
  },
  {
    id: "5",
    name: "Moderation",
    lastMessage: "",
    time: "3 мес.",
    unread: 0,
    isOnline: true,
    icon: "moderation",
  },
  {
    id: "6",
    name: "ForvoXX",
    lastMessage: "Вы: 1 видео 🎥",
    time: "5 мес.",
    unread: 0,
    avatar: "F",
  },
  {
    id: "7",
    name: "keka 💗 Devil",
    lastMessage: "Вы: Наверно",
    time: "5 мес.",
    unread: 0,
    avatar: "K",
  },
  {
    id: "8",
    name: "Shorito 💔 VEX",
    lastMessage: "Вы: https://discord.gg/yushiko?event=...",
    time: "5 мес.",
    unread: 0,
    avatar: "S",
  },
  {
    id: "9",
    name: "JuniperBot",
    lastMessage: "JuniperBot: @Blake Привет! Рады вид...",
    time: "5 мес.",
    unread: 0,
    icon: "bot",
  },
];

export const ChatsScreen = () => {
  const router = useRouter();
  const { themeColors } = useApp() || {};
  const primary = themeColors?.primary || COLORS.purple;

  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Сообщения</Text>
      </View>

      {/* Поиск и Добавить */}
      <View style={styles.topRow}>
        <View style={styles.searchContainer}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Circle cx={11} cy={11} r={8} stroke={COLORS.textSub} strokeWidth={2} />
            <Path d="M21 21l-4.35-4.35" stroke={COLORS.textSub} strokeWidth={2} strokeLinecap="round" />
          </Svg>
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск"
            placeholderTextColor={COLORS.textSub}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.addFriendButton}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#FFF" strokeWidth={2} strokeLinecap="round" />
            <Circle cx={8.5} cy={7} r={4} stroke="#FFF" strokeWidth={2} />
            <Path d="M20 8v6M23 11h-6" stroke="#FFF" strokeWidth={2} strokeLinecap="round" />
          </Svg>
          <Text style={styles.addFriendText}>Добавить друзей</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.plusButton, { backgroundColor: primary }]}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path d="M12 5v14M5 12h14" stroke="#FFF" strokeWidth={2.5} strokeLinecap="round" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Горизонтальный список друзей */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.friendsList}>
        {FRIENDS.map((friend) => (
          <TouchableOpacity key={friend.id} style={styles.friendAvatarContainer}>
            <View style={styles.friendAvatar}>
              <Text style={styles.friendAvatarText}>{friend.avatar}</Text>
              {friend.isOnline && <View style={styles.onlineDot} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Список чатов */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.chatsList}>
        {CHATS.map((chat) => (
          <TouchableOpacity key={chat.id} style={[styles.chatItem, chat.isPinned && styles.chatItemPinned]}>
            <View style={styles.chatAvatar}>
              {chat.avatar ? (
                <View style={styles.chatAvatarCircle}>
                  <Text style={styles.chatAvatarText}>{chat.avatar}</Text>
                </View>
              ) : (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={COLORS.textSub} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              )}
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.chatNameRow}>
                <Text style={styles.chatName} numberOfLines={1}>{chat.name}</Text>
                <Text style={styles.chatTime}>{chat.time}</Text>
              </View>
              {chat.lastMessage ? (
                <Text style={styles.chatLastMessage} numberOfLines={1}>{chat.lastMessage}</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  header: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 16 },
  headerTitle: { color: "#FFF", fontSize: 26, fontWeight: "bold" },
  topRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, marginBottom: 16, gap: 8 },
  searchContainer: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: COLORS.card, borderRadius: 12, paddingHorizontal: 12, height: 44 },
  searchInput: { flex: 1, color: "#FFF", fontSize: 14, marginLeft: 8 },
  addFriendButton: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.card, paddingHorizontal: 12, height: 44, borderRadius: 12, gap: 6 },
  addFriendText: { color: "#FFF", fontSize: 13, fontWeight: "500" },
  plusButton: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  friendsList: { paddingHorizontal: 16, gap: 12, marginBottom: 16 },
  friendAvatarContainer: {},
  friendAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.card, justifyContent: "center", alignItems: "center", position: "relative" },
  friendAvatarText: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
  onlineDot: { position: "absolute", bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: "#4ADE80", borderWidth: 2, borderColor: COLORS.bg },
  chatsList: { paddingHorizontal: 16 },
  chatItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  chatItemPinned: { backgroundColor: COLORS.card, borderRadius: 12, paddingHorizontal: 8, marginBottom: 8 },
  chatAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.card, justifyContent: "center", alignItems: "center", marginRight: 12 },
  chatAvatarCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#3A3A3C", justifyContent: "center", alignItems: "center" },
  chatAvatarText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  chatInfo: { flex: 1 },
  chatNameRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 2 },
  chatName: { color: "#FFF", fontSize: 15, fontWeight: "600", flex: 1 },
  chatTime: { color: COLORS.textSub, fontSize: 11, marginLeft: 8 },
  chatLastMessage: { color: COLORS.textSub, fontSize: 13 },
});
