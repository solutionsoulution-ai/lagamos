
/**
 * RESTDB SERVICE - Europfy
 * Configuration pour la base de données cloud personnalisée.
 */

const API_KEY = "4713135320f0275000b8f4879b1ecaab5bef9"; 
const BASE_URL = `https://lomo0-3d70.restdb.io/rest`;

const headers = {
  "content-type": "application/json",
  "x-apikey": API_KEY,
  "cache-control": "no-cache"
};

export const restdbService = {
  /**
   * Envoyer une nouvelle demande de prêt vers la collection 'applications'
   */
  async submitApplication(data: any) {
    try {
      const response = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Erreur de transmission");
      }
      return await response.json();
    } catch (error) {
      console.error("RestDB Submit Error:", error);
      throw error;
    }
  },

  /**
   * Récupérer toutes les demandes (pour l'administration)
   */
  async getAllApplications() {
    try {
      const response = await fetch(`${BASE_URL}/applications`, {
        method: "GET",
        headers: headers
      });
      if (!response.ok) throw new Error("Erreur de récupération");
      return await response.json();
    } catch (error) {
      console.error("RestDB Fetch Error:", error);
      return [];
    }
  },

  /**
   * Mettre à jour le statut d'un dossier (Admin)
   */
  async updateApplicationStatus(id: string, status: 'approved' | 'rejected' | 'pending') {
    try {
      const response = await fetch(`${BASE_URL}/applications/${id}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error("Erreur de mise à jour");
      return await response.json();
    } catch (error) {
      console.error("RestDB Update Error:", error);
      throw error;
    }
  }
};
