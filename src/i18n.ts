import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import vnTranslation from "./locales/vn.json";

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

// Function to get the current language using localStorage
export function getCurrentLang(): string {
  // Retrieve the language preference from localStorage
  const storedLang = localStorage?.getItem("language");

  // If the language preference exists in localStorage, return it
  // Otherwise, return a default language ("en" for English)
  return storedLang || "vn";
}

export function setCurrentLang(language: string): void {
  localStorage?.setItem("language", language);
  i18n.changeLanguage(language);
}

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
