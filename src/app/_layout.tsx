import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, useWindowDimensions, Platform, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { AppProvider } from "../context/AppContext";
import { LanguageProvider } from "../context/LanguageContext";
import { AuthProvider, useAuth } from "../context/AuthContext"; // <-- ОСТАВИЛИ ТОЛЬКО ОДИН ИМПОРТ

// ИМПОРТ И ВЫЗОВ ДЛЯ LIVEKIT
 import { registerGlobals } from '@livekit/react-native';
 registerGlobals();

// --- КОМПОНЕНТ ДЛЯ ПРОВЕРКИ АВТОРИЗАЦИИ ---
function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const currentRoute = segments[0];
    const inAuthGroup = currentRoute === "login" || currentRoute === "register";

    if (!user && !inAuthGroup) {
      // Если не вошел — на страницу логина
      router.replace("/login");
    } else if (user && inAuthGroup) {
      // Если уже вошел — на главную
      router.replace("/workshop");
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1C1C1E" }}>
        <ActivityIndicator size="large" color="#8A56FF" />
      </View>
    );
  }

  return (
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

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="members" />
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="call" />
    </Stack>
  );
}
// --------------------------------------------------------

export default function RootLayout() {
  const { width } = useWindowDimensions();
  
  const isWeb = Platform.OS === "web";
  const isLargeScreen = isWeb && width > 768;

  return (
    <AppProvider>
      <LanguageProvider>
        <AuthProvider>
          <View style={styles.mainWrapper}>
            <StatusBar style="light" />
            <View
              style={[
                styles.phoneFrame,
                isLargeScreen
                  ? { width: 430, height: "100%", maxHeight: 932, borderRadius: 40, borderWidth: 8, borderColor: "#000" }
                  : { flex: 1, width: "100%" },
              ]}
            >
              <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
                <RootLayoutNav /> 
              </SafeAreaView>
            </View>
          </View>
        </AuthProvider>
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
    backgroundColor: "#1C1C1E",
    overflow: "hidden",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
});