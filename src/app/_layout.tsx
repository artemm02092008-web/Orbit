import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { AppProvider } from "../context/AppContext";
import { LanguageProvider } from "../context/LanguageContext"; // <-- ДОБАВИЛИ ИМПОРТ

export default function RootLayout() {
  return (
    <AppProvider>
      <LanguageProvider> {/* <-- ОБЕРНУЛИ В ПРОВАЙДЕР ЯЗЫКА */}
        <View style={styles.mainWrapper}>
          <StatusBar style="light" />
          <View style={styles.phoneFrame}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="register" />
              <Stack.Screen name="workshop" />
              <Stack.Screen name="create-server" />
              <Stack.Screen name="server-settings" />
              <Stack.Screen name="profile" />
              <Stack.Screen name="settings" />
              <Stack.Screen name="language" />
              <Stack.Screen name="premium" />
              <Stack.Screen name="payment" />
              <Stack.Screen name="success" />
              <Stack.Screen name="appearance" />
              <Stack.Screen name="frames" />
              <Stack.Screen name="notifications" />
              <Stack.Screen name="invite" />

              {/* Группа вкладок (нижняя панель) */}
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

              {/* Экраны для участников и чатов */}
              <Stack.Screen name="members" />
              <Stack.Screen name="chat/[id]" />
            </Stack>
          </View>
        </View>
      </LanguageProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneFrame: {
    width: "100%",
    maxWidth: 430,
    height: "100%",
    maxHeight: 932,
    backgroundColor: "#1C1C1E",
    overflow: "hidden",
  },
});