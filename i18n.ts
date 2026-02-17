
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

i18n
  .use(initReactI18next)
  .init({
    debug: false,
    lng: 'pt', // Langue par défaut : Portugais
    fallbackLng: 'fr', // Repli sur le Français si une clé manque
    interpolation: {
      escapeValue: false,
    },
    resources: {
      fr: {
        translation: translations.fr
      }
      // Le pack 'pt' sera injecté dynamiquement depuis Redis dans App.tsx
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n;
