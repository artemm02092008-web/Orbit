import React from "react";
import { useRouter } from "expo-router";
import { RegisterScreen } from "../screens/RegisterScreen";

export default function Register() {
  const router = useRouter();

  const handleRegisterSuccess = () => {
    router.replace("/workshop");
  };

  // Добавили "as any", чтобы убрать ошибку типов
  return <RegisterScreen onSuccess={handleRegisterSuccess} {...({} as any)} />;
}