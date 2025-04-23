import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./en/translation.json"
import bg from './bg/translation.json';
import * as Localization from 'expo-localization';

const deviceLanguage = Localization.getLocales()[0].languageCode;

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            bg: { translation: bg },
        },
        lng: deviceLanguage === 'bg' ? 'bg' : 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;