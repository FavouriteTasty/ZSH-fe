import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEn from "./en/translation.json";
import translationZh from "./zh/translation.json";

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: "en",
        resources: {
            en: {
                translation: translationEn,
            },
            zh: {
                translation: translationZh,
            },
        },
    });
