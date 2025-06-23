import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from "./en/translation.json";
import translationZh from "./zh/translation.json";

i18next
    // .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        lng: "en",
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
