/**
 * EMAIL SERVICE - Europcapital (MailerSend Bridge)
 * 
 * IMPORTANT : L'erreur "Failed to fetch" est due au fait que MailerSend (comme toutes les APIs d'email)
 * bloque les appels directs depuis un navigateur pour des raisons de sécurité (CORS).
 * 
 * SOLUTION : Vous devez créer un fichier 'mail.php' sur votre serveur Hostinger (dans un dossier /api/)
 * qui recevra la demande du site et l'enverra à MailerSend.
 * 
 * --- CODE À METTRE DANS /api/mail.php SUR VOTRE SERVEUR ---
 * <?php
 * header("Access-Control-Allow-Origin: *");
 * header("Access-Control-Allow-Methods: POST, OPTIONS");
 * header("Access-Control-Allow-Headers: Content-Type, Authorization");
 * if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }
 * 
 * $data = json_decode(file_get_contents("php://input"), true);
 * $apiKey = "mlsn.bd44cdc60b1c8392fb229c5073916fb6e48337887520cac242eb7a4bdcae3535";
 * 
 * $ch = curl_init("https://api.mailersend.com/v1/email");
 * curl_setopt($ch, CURLOPT_POST, 1);
 * curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
 * curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 * curl_setopt($ch, CURLOPT_HTTPHEADER, [
 *     "Content-Type: application/json",
 *     "Authorization: Bearer " . $apiKey
 * ]);
 * 
 * $response = curl_exec($ch);
 * $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
 * curl_close($ch);
 * 
 * http_response_code($httpCode);
 * echo $response;
 * ?>
 */

// Utilisation d'un chemin relatif pour le bridge PHP sur votre domaine
const BRIDGE_URL = "/api/mail.php";

export const emailService = {
  async sendEmail(to: string, subject: string, htmlContent: string) {
    try {
      const response = await fetch(BRIDGE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: {
            email: "contact@europcapital.com",
            name: "EUROPCAPITAL"
          },
          to: [{ email: to }],
          subject: subject,
          html: `
            <div style="font-family: 'Inter', Arial, sans-serif; color: #1f2937; max-width: 600px; margin: auto; border: 1px solid #f3f4f6; border-radius: 24px; overflow: hidden;">
              <div style="background-color: #059669; padding: 40px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 800;">EUROPCAPITAL</h1>
              </div>
              <div style="padding: 40px; background-color: white;">
                ${htmlContent}
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #f3f4f6; text-align: center;">
                  <p style="font-size: 11px; color: #9ca3af;">
                    <strong>Europcapital SAS</strong><br>
                    1 Place de la Bourse, 69002 Lyon, France<br>
                    Intermédiaire en Opérations de Banque - ORIAS n° 21950679
                  </p>
                </div>
              </div>
            </div>
          `
        })
      });

      if (!response.ok) {
        console.error("Le bridge mail a retourné une erreur:", response.status);
        return false;
      }

      console.log("✅ Email envoyé avec succès via le bridge MailerSend");
      return true;
    } catch (error) {
      console.error("Erreur réseau (vérifiez que /api/mail.php existe sur votre serveur):", error);
      return false;
    }
  },

  async sendWelcomeEmail(to: string, name: string, pass: string) {
    const html = `
      <h2 style="color: #059669; font-size: 24px; font-weight: 800;">Bienvenue ${name} !</h2>
      <p style="font-size: 16px; color: #4b5563;">Votre demande de prêt a été enregistrée. Voici vos accès sécurisés :</p>
      <div style="background-color: #f9fafb; padding: 24px; border-radius: 16px; margin: 24px 0; border: 1px solid #e5e7eb;">
        <p>Identifiant : <strong style="color: #059669;">${to}</strong></p>
        <p>Mot de passe : <strong style="color: #059669;">${pass}</strong></p>
      </div>
      <p style="color: #065f46; font-weight: 600;">⚠️ Envoyez votre pièce d'identité par WhatsApp au +33 7 54 09 50 27 pour valider votre dossier.</p>
    `;
    return this.sendEmail(to, "Bienvenue chez Europcapital - Vos accès", html);
  },

  async sendBalanceUpdate(to: string, name: string, amount: number, type: 'credit' | 'debit', newBalance: number) {
    const color = type === 'credit' ? '#059669' : '#dc2626';
    const html = `
      <h2 style="color: #111827;">Avis d'opération bancaire</h2>
      <div style="padding: 24px; border-radius: 16px; background-color: #f9fafb; border-left: 6px solid ${color};">
        <p style="font-size: 24px; font-weight: 800; color: ${color};">
          ${type === 'credit' ? '+' : '-'}${amount.toLocaleString()} €
        </p>
        <p>Nouveau solde : <strong>${newBalance.toLocaleString()} €</strong></p>
      </div>
    `;
    return this.sendEmail(to, `Alerte Compte : ${type === 'credit' ? 'Crédit' : 'Débit'} de ${amount}€`, html);
  }
};