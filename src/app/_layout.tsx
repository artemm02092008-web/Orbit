import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { AppProvider } from "../context/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
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
        <Stack.Screen name="chats" />
          </Stack>
        </View>
      </View>
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
