/**
 * SERVICE EMAIL - EUROPCAPITAL (Version SMTP Hostinger + Relais Preview)
 */

const BRIDGE_URL = "/api/mail.php";
const PREVIEW_RELAY = "https://httpbin.org/post";

const isPreview = !window.location.hostname.includes('europcapital.com');

export const emailService = {
  async sendEmail(to: string, subject: string, htmlContent: string) {
    const log: string[] = [];
    log.push(`[${new Date().toLocaleTimeString()}] Initialisation de la requête...`);

    const finalHtml = `
      <div style="font-family: 'Inter', sans-serif; color: #1f2937; max-width: 600px; margin: auto; border: 1px solid #f3f4f6; border-radius: 24px; background: #fff;">
        <div style="background: #059669; padding: 40px; text-align: center; border-radius: 24px 24px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">EUROPCAPITAL</h1>
        </div>
        <div style="padding: 40px;">${htmlContent}</div>
      </div>
    `;

    const payload = {
      to: [{ email: to }],
      subject: subject,
      html: finalHtml,
      timestamp: Date.now()
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      // On tente d'abord le bridge réel
      log.push(`[Network] Tentative de connexion à ${BRIDGE_URL}...`);
      
      let response;
      try {
        response = await fetch(BRIDGE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify(payload)
        });
      } catch (e) {
        if (isPreview) {
          log.push(`[Warning] Bridge local absent (Normal en preview). Basculement sur le relais de test...`);
          response = await fetch(PREVIEW_RELAY, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
        } else {
          throw e;
        }
      }

      clearTimeout(timeoutId);

      if (!response.ok) {
        log.push(`[Error] Le serveur a répondu avec un code ${response.status}`);
        return { success: false, error: `Erreur HTTP ${response.status}`, logs: log };
      }

      const data = await response.json();
      log.push(`[Success] Réponse reçue de ${response.url}`);
      
      return { 
        success: true, 
        message: isPreview ? "Transaction réseau réussie (Mode Relais)" : "Email envoyé avec succès",
        previewHtml: finalHtml,
        logs: log,
        rawResponse: data
      };

    } catch (error: any) {
      clearTimeout(timeoutId);
      const errorMsg = error.name === 'AbortError' ? "Délai dépassé (10s)" : "Erreur de connexion réseau";
      log.push(`[Fatal] ${errorMsg}`);
      return { success: false, error: errorMsg, logs: log };
    }
  },

  async sendWelcomeEmail(to: string, name: string, pass: string) {
    const html = `<p>Bonjour ${name}, vos accès sont: <b>${pass}</b></p>`;
    return this.sendEmail(to, "Bienvenue", html);
  }
};