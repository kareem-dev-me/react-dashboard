import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./languages/en.json";
import ar from "./languages/ar.json";

const STORAGE_KEY = "lang";

function applyDocumentLanguage(lng: string) {
  const language = lng.startsWith("ar") ? "ar" : "en";
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  localStorage.setItem(STORAGE_KEY, language);
}

const savedLanguage = localStorage.getItem(STORAGE_KEY);
const initialLanguage = savedLanguage === "ar" || savedLanguage === "en" ? savedLanguage : "en";

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

applyDocumentLanguage(i18n.language);

i18n.on("languageChanged", applyDocumentLanguage);

export default i18n;
