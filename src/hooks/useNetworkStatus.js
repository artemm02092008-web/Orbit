import { useState, useEffect } from "react";
import * as Network from "expo-network";

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем статус при запуске
    const checkInitialStatus = async () => {
      try {
        const state = await Network.getNetworkStateAsync();
        // isInternetReachable может быть null, пока система не проверит сеть
        // Поэтому проверяем именно isConnected
        setIsConnected(state.isConnected ?? false);
      } catch (error) {
        console.log("Ошибка проверки сети:", error);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkInitialStatus();

    // Подписываемся на изменения (например, когда выключили Wi-Fi)
    const subscription = Network.addNetworkStateListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => subscription.remove();
  }, []);

  return { isConnected, isLoading };
};