
/**
 * REDIS SERVICE - Upstash
 * Utilisé uniquement pour le stockage et la récupération des traductions JSON.
 */

const UPSTASH_REDIS_REST_URL = "https://current-dassie-43977.upstash.io";
const UPSTASH_REDIS_REST_TOKEN = "AavJAAIncDJlMjlhODRmOGVjNzk0NTg2YjQxNjg4ZGM0ZWEzYWE2MHAyNDM5Nzc";

export const redisService = {
  /**
   * Récupère le pack de langue depuis Redis.
   * La clé dans Redis doit correspondre au code langue (ex: 'es', 'en', 'it').
   */
  async getTranslation(lang: string) {
    try {
      const response = await fetch(`${UPSTASH_REDIS_REST_URL}/get/${lang}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error(`Redis error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Upstash retourne { result: "valeur" } ou { result: null }
      if (!data.result) return null;

      // Si la donnée est stockée sous forme de chaîne JSON, on la parse
      try {
        return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      } catch (e) {
        console.error("Erreur parsing JSON Redis:", e);
        return data.result;
      }
    } catch (error) {
      console.error("Erreur chargement traduction depuis Redis:", error);
      return null;
    }
  }
};
