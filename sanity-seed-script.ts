
import { translations } from './translations';
import { LOAN_DATABASE } from './database';

/**
 * SCRIPT D'INJECTION AUTOMATIQUE (SEED)
 * @param client Le client Sanity avec Write Token
 * @param onStatus Callback pour logger l'avancement vers l'UI
 */
export const seedSanityData = async (client: any, onStatus: (msg: string) => void) => {
  onStatus("Démarrage de l'injection automatique...");

  // 1. Injecter les Traductions
  for (const [lang, content] of Object.entries(translations)) {
    const doc = {
      _type: 'translation',
      _id: `translation-${lang}`,
      lang: lang,
      content: JSON.stringify(content, null, 2)
    };
    try {
      await client.createOrReplace(doc);
      onStatus(`✅ Traduction [${lang}] injectée.`);
    } catch (e: any) {
      onStatus(`❌ Erreur traduction [${lang}]: ${e.message}`);
    }
  }

  // 2. Injecter les Prêts par défaut
  for (const [lang, loans] of Object.entries(LOAN_DATABASE)) {
    for (const [key, data] of Object.entries(loans)) {
      const doc = {
        _type: 'loan',
        _id: `loan-${lang}-${key}`,
        title: data.title,
        slug: { _type: 'slug', current: key },
        language: lang,
        description: data.description,
        maxAmount: data.maxAmount,
        maxDuration: data.maxDuration,
        iconType: key === 'personnel' ? 'User' : key === 'immobilier' ? 'HomeIcon' : key === 'automobile' ? 'Car' : key === 'entreprise' ? 'Briefcase' : 'RefreshCcw'
      };
      try {
        await client.createOrReplace(doc);
        onStatus(`✅ Prêt [${key}] (${lang}) injecté.`);
      } catch (e: any) {
        onStatus(`❌ Erreur prêt [${key}] (${lang}): ${e.message}`);
      }
    }
  }

  onStatus("🚀 Synchronisation terminée.");
};
