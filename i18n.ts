
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

i18n
  .use(initReactI18next)
  .init({
    debug: false,
    lng: 'fr',
    fallbackLng: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      fr: {
        translation: translations.fr
      }
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n;
