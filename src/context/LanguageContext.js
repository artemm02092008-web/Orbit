import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../i18n";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("ru");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("appLanguage").then((saved) => {
      if (saved && i18n.translations[saved]) {
        setLang(saved);
        i18n.locale = saved;
      }
      setIsReady(true);
    });
  }, []);

  const changeLanguage = async (newLang) => {
    // Приводим UK и US к en
    const finalLang = (newLang === "uk" || newLang === "us") ? "en" : newLang;
    
    // Меняем в i18n и стейте
    i18n.locale = finalLang;
    setLang(finalLang);

    try {
      await AsyncStorage.setItem("appLanguage", finalLang);
    } catch (e) {
      console.log("Ошибка сохранения языка", e);
    }
  };

  if (!isReady) return null;

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage }}>
      {/* key={lang} заставит React перерисовать все экраны при смене языка */}
      <React.Fragment key={lang}>
        {children}
      </React.Fragment>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);