import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  setDoc,
  arrayUnion, // <-- ДОБАВЛЕНО
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import { db, auth } from "../firebase/config";
import i18n from "../i18n";

const AppContext = createContext();

export const THEMES = {
  purple: { primary: "#8A56FF", secondary: "#7C6AFA" },
  blue: { primary: "#4F5DED", secondary: "#3B4BD8" },
  green: { primary: "#00C853", secondary: "#00A344" },
};

export const AppProvider = ({ children }) => {
  const [servers, setServers] = useState([]);
  const [activeServerId, setActiveServerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("ru");
  const [isPremium, setIsPremium] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTheme, setActiveTheme] = useState("purple");

  // Загрузка сохраненного языка И ТЕМЫ
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedLang = await AsyncStorage.getItem("appLanguage");
        const savedTheme = await AsyncStorage.getItem("appTheme");

        if (savedLang) {
          setLanguage(savedLang);
          i18n.locale = savedLang;
        }
        if (savedTheme && THEMES[savedTheme]) {
          setActiveTheme(savedTheme);
        }
      } catch (error) {
        console.log("Ошибка загрузки настроек:", error);
      }
    };
    loadSavedData();
  }, []);

  // Загрузка данных пользователя
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setUserData(null);
        setIsPremium(false);
        return;
      }

      const unsubDoc = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setIsPremium(data.isPremium || false);
        } else {
          setDoc(
            doc(db, "users", user.uid),
            {
              displayName: user.displayName || "",
              photoURL: user.photoURL || null,
              isPremium: false,
              frame: "default",
            },
            { merge: true }
          );
        }
      });

      return () => unsubDoc();
    });

    return unsubscribe;
  }, []);

  // Загрузка серверов
  useEffect(() => {
    const loadServers = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, "servers"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const loadedServers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServers(loadedServers);
        if (loadedServers.length > 0) setActiveServerId(loadedServers[0].id);
      } catch (error) {
        console.log("Ошибка загрузки:", error);
      } finally {
        setLoading(false);
      }
    };
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) loadServers();
      else {
        setServers([]);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  // Смена языка
  const changeLanguage = async (lang) => {
    try {
      await AsyncStorage.setItem("appLanguage", lang);
      i18n.locale = lang;
      setLanguage(lang);
      await Updates.reloadAsync();
    } catch (error) {
      console.log("Ошибка смены языка:", error);
    }
  };

  // СМЕНА ТЕМЫ С ПОЛНОЙ ПЕРЕЗАГРУЗКОЙ
  const changeTheme = async (themeId) => {
    if (!THEMES[themeId]) return;
    try {
      await AsyncStorage.setItem("appTheme", themeId);
      setActiveTheme(themeId);

      if (typeof window !== "undefined") {
        window.location.reload();
      } else {
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log("Ошибка смены темы:", error);
    }
  };

  const themeColors = THEMES[activeTheme] || THEMES.purple;

  // Обновление профиля
  const updateUserProfile = async (name, photoUri) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await updateProfile(user, { displayName: name, photoURL: photoUri });
      await updateDoc(doc(db, "users", user.uid), {
        displayName: name,
        photoURL: photoUri,
      });
    } catch (error) {
      console.log("Ошибка обновления профиля:", error);
      alert("Не удалось обновить профиль");
    }
  };

  // Выбор рамки
  const setUserFrame = async (frameId) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), { frame: frameId });
    } catch (error) {
      console.log("Ошибка смены рамки:", error);
    }
  };

  // Активация Premium
  const activatePremium = async (plan) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          isPremium: true,
          premiumPlan: plan,
          premiumSince: new Date(),
        },
        { merge: true }
      );
      setIsPremium(true);
    } catch (error) {
      console.log("Ошибка активации Premium:", error);
      alert(
        "Не удалось активировать Premium. Проверьте права доступа в Firestore."
      );
    }
  };

  // Создание сервера
  const addServer = async (serverData) => {
    const user = auth.currentUser;
    if (!user) return null;
    try {
      const docRef = await addDoc(collection(db, "servers"), {
        name: serverData.name,
        type: serverData.type,
        icon: serverData.icon || null,
        userId: user.uid,
        createdAt: new Date(),
      });
      const newServer = {
        id: docRef.id,
        ...serverData,
        icon: serverData.icon || null,
        channels: [],
      };
      setServers((prev) => [...prev, newServer]);
      setActiveServerId(newServer.id);
      return newServer;
    } catch (error) {
      console.log("Ошибка создания:", error);
    }
  };

  // Удаление сервера
  const deleteServer = async (serverId) => {
    try {
      await deleteDoc(doc(db, "servers", serverId));
      setServers((prev) => prev.filter((s) => s.id !== serverId));
      if (activeServerId === serverId) {
        const remaining = servers.filter((s) => s.id !== serverId);
        setActiveServerId(remaining.length > 0 ? remaining[0].id : null);
      }
    } catch (error) {
      console.log("Ошибка удаления:", error);
    }
  };

  // Переименование сервера
  const renameServer = async (serverId, newName) => {
    try {
      const serverRef = doc(db, "servers", serverId);
      await updateDoc(serverRef, { name: newName });
      setServers((prev) =>
        prev.map((s) => (s.id === serverId ? { ...s, name: newName } : s))
      );
    } catch (error) {
      console.log("Ошибка переименования:", error);
    }
  };

  // СОЗДАНИЕ КАНАЛА
  const createChannel = async (serverId, channelData) => {
    if (!serverId) return null;
    try {
      const serverRef = doc(db, "servers", serverId);
      const newChannel = {
        id: Date.now().toString(),
        name: channelData.name,
        type: channelData.type,
      };

      await updateDoc(serverRef, {
        channels: arrayUnion(newChannel),
      });

      setServers((prev) =>
        prev.map((s) =>
          s.id === serverId
            ? { ...s, channels: [...(s.channels || []), newChannel] }
            : s
        )
      );
      return newChannel;
    } catch (error) {
      console.log("Ошибка создания канала:", error);
      alert("Не удалось создать канал");
      return null;
    }
  };

  const activeServer =
    servers.find((s) => s.id === activeServerId) || servers[0] || null;

  const contextValue = useMemo(
    () => ({
      servers,
      activeServerId,
      activeServer,
      addServer,
      deleteServer,
      renameServer,
      createChannel, // <-- ДОБАВЛЕНО
      setActiveServerId,
      loading,
      language,
      changeLanguage,
      isPremium,
      userData,
      activatePremium,
      updateUserProfile,
      setUserFrame,
      activeTheme,
      changeTheme,
      themeColors,
    }),
    [
      servers,
      activeServerId,
      loading,
      language,
      isPremium,
      userData,
      activeTheme,
    ]
  );

  return (
    <AppContext.Provider
      value={contextValue}
      key={`${language}-${activeTheme}`}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
