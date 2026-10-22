import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

export const AnimatedLogo = ({ size = 50 }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Запускаем бесконечную анимацию вращения
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000, // 4 секунды на полный оборот
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  // Превращаем значение от 0 до 1 в градусы (от 0 до 360)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.Image
      source={require("../../assets/logo.png")}
      style={[
        styles.logo,
        {
          width: size,
          height: size,
          transform: [{ rotate: spin }],
        },
      ]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    // Здесь можно добавить тень или свечение, если нужно
  },
});
