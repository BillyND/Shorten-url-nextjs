"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import vnTranslation from "./locales/vn.json";
import { getCurrentLang } from "./components/SwitchLanguage";

// Define the type for translation resources
interface Resources {
  translation: {
    [key: string]: string;
  };
}

// Define the resources object
const resources: Record<string, Resources> = {
  en: { translation: enTranslation },
  vn: { translation: vnTranslation },
};

// Initialize i18next
i18n.use(initReactI18next).init({
  fallbackLng: "vn",
  lng: getCurrentLang(),
  interpolation: {
    escapeValue: false,
  },
  resources: resources as any, // Casting resources to any to resolve the error
});

export default i18n;
