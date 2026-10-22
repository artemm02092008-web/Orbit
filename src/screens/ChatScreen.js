import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { db } from "../firebase/config";

const COLORS = {
  bg: "#0F0E13",
  card: "#16151B",
  textMain: "#FFFFFF",
  textSub: "#656469",
  accent: "#8A56FF",
  inputBg: "#1A1920",
};

export default function ChatScreen({
  visible,
  chatId,
  recipient,
  currentUserId,
  onClose,
}) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef(null);

  // Загрузка сообщений из базы
  useEffect(() => {
    if (!chatId) return;

    const q = query(collection(db, "messages"), where("chatId", "==", chatId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      msgs.sort(
        (a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0)
      );
      setMessages(msgs);
      setTimeout(
        () => scrollViewRef.current?.scrollToEnd({ animated: true }),
        100
      );
    });

    return () => unsubscribe();
  }, [chatId]);

  if (!visible || !recipient) return null;

  const sendMessage = async () => {
    if (text.trim() === "") return;

    const newMessage = {
      chatId: chatId,
      senderId: currentUserId,
      text: text.trim(),
      createdAt: serverTimestamp(),
    };

    setText("");

    try {
      await addDoc(collection(db, "messages"), newMessage);
    } catch (error) {
      console.log("Ошибка отправки:", error);
      alert("Не удалось отправить сообщение");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path
                d="M15 19l-7-7 7-7"
                stroke="#A3A2A8"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.backText}>Назад</Text>
          </TouchableOpacity>
          <View style={styles.recipientInfo}>
            <Text style={styles.recipientName}>{recipient.name}</Text>
            <Text style={styles.recipientStatus}>@{recipient.username}</Text>
          </View>
          <View style={styles.headerSpacing} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardView}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={
              messages.length === 0
                ? styles.emptyMessagesList
                : styles.messagesList
            }
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: false })
            }
          >
            {messages.length === 0 ? (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateTitle}>
                  Это начало вашей переписки
                </Text>
                <Text style={styles.emptyStateSubtitle}>
                  Напишите первое сообщение.
                </Text>
              </View>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === currentUserId;
                const time = msg.createdAt
                  ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )
                  : "...";

                return (
                  <View
                    key={msg.id}
                    style={
                      isMe
                        ? [styles.messageRow, styles.myRow]
                        : [styles.messageRow, styles.theirRow]
                    }
                  >
                    <View
                      style={
                        isMe
                          ? [styles.bubble, styles.myBubble]
                          : [styles.bubble, styles.theirBubble]
                      }
                    >
                      <Text style={styles.messageText}>{msg.text}</Text>
                      <View style={styles.timeAndStatusRow}>
                        <Text style={styles.timestampText}>{time}</Text>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`Написать в ${recipient.name}`}
              placeholderTextColor="#4E4D53"
              value={text}
              onChangeText={setText}
              multiline
            />
            <TouchableOpacity
              style={
                text.trim().length > 0
                  ? [styles.sendButton, styles.sendButtonActive]
                  : styles.sendButton
              }
              onPress={sendMessage}
            >
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                  stroke="#FFF"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1920",
  },
  backButton: { flexDirection: "row", alignItems: "center", width: 80 },
  backText: { color: "#A3A2A8", fontSize: 16, marginLeft: 4 },
  recipientInfo: { alignItems: "center" },
  recipientName: { color: COLORS.textMain, fontWeight: "bold", fontSize: 16 },
  recipientStatus: { color: COLORS.accent, fontSize: 12, marginTop: 2 },
  headerSpacing: { width: 80 },
  keyboardView: { flex: 1 },
  messagesList: { padding: 16, paddingBottom: 24 },
  emptyMessagesList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  emptyStateTitle: {
    color: COLORS.textMain,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    color: COLORS.textSub,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  messageRow: { flexDirection: "row", marginBottom: 14, width: "100%" },
  myRow: { justifyContent: "flex-end" },
  theirRow: { justifyContent: "flex-start" },
  bubble: {
    maxWidth: "75%",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    position: "relative",
  },
  myBubble: { backgroundColor: COLORS.accent, borderBottomRightRadius: 2 },
  theirBubble: { backgroundColor: COLORS.card, borderBottomLeftRadius: 2 },
  messageText: { color: COLORS.textMain, fontSize: 15, lineHeight: 20 },
  timeAndStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  timestampText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 10,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#121118",
    borderTopWidth: 1,
    borderTopColor: "#1A1920",
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.inputBg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: COLORS.textMain,
    fontSize: 15,
    maxHeight: 100,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#232229",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  sendButtonActive: { backgroundColor: COLORS.accent },
});
