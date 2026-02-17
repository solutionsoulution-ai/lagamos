
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';
import { ptManual } from './pt';

i18n
  .use(initReactI18next)
  .init({
    debug: false,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      fr: {
        translation: translations.fr
      },
      pt: {
        translation: ptManual.translation
      }
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n;
