import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

export const CustomButton = ({
  title,
  onPress,
  variant = "primary",
  showArrow = false,
}) => {
  const isPrimary = variant === "primary";
  return (
    <TouchableOpacity
      style={[styles.button, isPrimary ? styles.primaryBg : styles.secondaryBg]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
      {showArrow && (
        <View style={styles.iconContainer}>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
    width: "100%",
  },
  primaryBg: { backgroundColor: COLORS.primary },
  secondaryBg: { backgroundColor: COLORS.surface },
  text: { color: COLORS.textPrimary, fontSize: 16, fontWeight: "600" },
  iconContainer: { position: "absolute", right: 20 },
});
