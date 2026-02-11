
/**
 * RESTDB SERVICE - Europfy
 */

const API_KEY = "697ccf3853d66e4a701956f1"; 
const BASE_URL = `https://lomo0-3d70.restdb.io/rest`;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-apikey": API_KEY,
  "Cache-Control": "no-cache"
});

export const restdbService = {
  // --- GESTION DES PRÊTS ---
  async submitApplication(data: any) {
    try {
      const response = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        headers: getHeaders(),
        mode: 'cors',
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        if (response.status === 404) throw new Error("COLLECTION_NOT_FOUND");
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `Erreur: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error("CORS_ERROR");
      }
      throw error;
    }
  },

  async getAllApplications() {
    try {
      const response = await fetch(`${BASE_URL}/applications`, {
        method: "GET",
        headers: getHeaders(),
        mode: 'cors'
      });
      if (!response.ok) {
        if (response.status === 404) throw new Error("COLLECTION_NOT_FOUND");
        throw new Error(`Erreur: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error("CORS_ERROR");
      }
      throw error;
    }
  },

  // Ancienne méthode conservée pour compatibilité, redirige vers updateApplication
  async updateApplicationStatus(id: string, status: string) {
    return this.updateApplication(id, { status });
  },

  // Nouvelle méthode générique pour mettre à jour n'importe quel champ (solde, statut, etc.)
  async updateApplication(id: string, data: any) {
    try {
      const response = await fetch(`${BASE_URL}/applications/${id}`, {
        method: "PATCH",
        headers: getHeaders(),
        mode: 'cors',
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // --- GESTION DES CONTACTS ---
  async submitContact(data: any) {
    try {
      const response = await fetch(`${BASE_URL}/contacts`, {
        method: "POST",
        headers: getHeaders(),
        mode: 'cors',
        body: JSON.stringify({
          ...data,
          date: new Date().toISOString(),
          status: 'unread'
        })
      });
      if (!response.ok) {
        if (response.status === 404) throw new Error("COLLECTION_NOT_FOUND");
        throw new Error(`Erreur: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async getAllContacts() {
    try {
      const response = await fetch(`${BASE_URL}/contacts`, {
        method: "GET",
        headers: getHeaders(),
        mode: 'cors'
      });
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      return [];
    }
  },

  async markContactAsRead(id: string) {
    try {
      await fetch(`${BASE_URL}/contacts/${id}`, {
        method: "PATCH",
        headers: getHeaders(),
        mode: 'cors',
        body: JSON.stringify({ status: 'read' })
      });
    } catch (error) {}
  }
};
