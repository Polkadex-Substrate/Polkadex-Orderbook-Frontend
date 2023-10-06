import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { languages } from "@orderbook/core/utils";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: languages.map((l) => l.code),
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    detection: {
      order: ["path", "localStorage", "htmlTag"],
    },
    react: { useSuspense: false },
    backend: {
      loadPath: "../locales/{{lng}}/{{ns}}.json",
      requestOptions: {
        cache: "no-store",
      },
    },
  });
