import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./languages/en.json";
import pl from "./languages/pl.json";

const resources = {
  en,
  pl,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pl",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
