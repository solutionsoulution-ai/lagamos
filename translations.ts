import { Language } from './types';

const getLegalTranslations = (lang: string) => {
  const content: Record<string, any> = {
    fr: {
      terms: {
        title: "Mentions Légales - Europfy",
        sections: [
          { 
            icon: "Info", 
            h3: "1. Identification de l'Éditeur et Informations Institutionnelles", 
            p: "Le présent site internet, accessible à l’adresse www.europfy.com, est la propriété exclusive de la société Capfinfy SAS, opérant sous le nom commercial Europfy. Europfy est une institution spécialisée dans l'intermédiation financière à l'échelle européenne. Dénomination sociale : Capfinfy SAS. Siège social : 1 Place de la Bourse, 69002 Lyon, France. Capital social : 50 000 euros. Immatriculation : Inscrite au Registre du Commerce et des Sociétés (RCS) de Lyon sous le numéro 891 733 009. Identifiant SIRET : 891 785 359 01527. Régulation et Agrément : Capfinfy SAS est enregistrée auprès de l'ORIAS sous le numéro 21950679 en qualité d'Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP). Cette immatriculation garantit que l'entreprise répond aux exigences de compétence, de capacité professionnelle et de responsabilité civile imposées par les autorités financières européennes. Autorité de Tutelle : Nos activités sont placées sous le contrôle de l'Authority de Contrôle Prudentiel et de Résolution (ACPR), située au 4 Place de Budapest, CS 92459, 75436 Paris Cedex 09. Contact : Pour toute demande d'ordre juridique ou administratif, vous pouvez nous contacter via l'adresse e-mail dédiée : contact@europfy.com. En vigueur au 29 janvier 2026." 
          },
          { 
            icon: "UserCheck", 
            h3: "2. Directeur de la Publication et Responsabilité éditoriale", 
            p: "Le Directeur de la Publication est le Représentant Légal de Capfinfy SAS. Il est responsable de la stratégie de communication et de la vérification de la véracité des offres financières présentées sur le site, notamment le maintien de l'offre commerciale unique à taux fixe de 2%." 
          },
          { 
            icon: "Gavel", 
            h3: "3. Propriété Intellectuelle et Droits d'Auteur", 
            p: "L’ensemble de la structure du site Europfy, incluant de manière non exhaustive les codes sources, l'architecture graphique, les bases de données, les algorithmes de simulation, les logotypes, les textes, les icônes et les éléments multimédias, est protégé par les lois internationales sur la propriété intellectuelle et le droit d'auteur. Toute extraction, reproduction, représentation, adaptation ou modification, qu'elle soit totale ou partielle, par quelque procédé que ce soit, est strictement interdite sans l'accord préalable, écrit et exprès de Capfinfy SAS. Le non-respect de cette clause constitue une contrefaçon pouvant engager la responsabilité civile et pénale de l'auteur de l'infraction, conformément aux articles L.335-2 et suivants du Code de la propriété intellectuelle." 
          },
          { 
            icon: "FileText", 
            h3: "4. Conditions d'Utilisation et Nature de l'Offre", 
            p: "Le site Europfy propose des outils de simulation de prêt au taux fixe de 2%. Les informations obtenues via ces simulateurs ne constituent pas une offre contractuelle mais une indication pré-contractuelle. Europfy se réserve le droit de modifier les caractéristiques de ses offres à tout moment, sous réserve du respect des contrats déjà signés. L'acceptation de tout dossier de financement est soumise à l'analyse de la solvabilité de l'emprunteur et au paiement des frais de dossier prévus par la société après validation définitive." 
          }
        ]
      },
      privacy: {
        title: "Politique de Confidentialité - Protection des Données (RGPD)",
        sections: [
          { 
            icon: "Database", 
            h3: "1. Collecte Exhaustive des Données", 
            p: "Pour traiter votre demande de financement (Prêt Immobilier, Personnel, Automobile, Entreprise ou Rachat de Crédit), nous collectons les catégories de données suivantes : Identité (Nom, prénoms, justificatif d'identité, situation familiale, justificatif de domicile), Finances et Revenus (Bulletins de salaire, avis d'imposition, relevés bancaires, liste des crédits en cours), Vie Professionnelle (Contrat de travail, ancienneté, SIRET pour les professionnels), et Données de Navigation (Adresse IP, horodatage des demandes, type de terminal utilisé)." 
          },
          { 
            icon: "Target", 
            h3: "2. Finalités et Bases Légales du Traitement", 
            p: "Le traitement de vos données repose sur les bases juridiques suivantes : L'exécution du contrat (Analyse de votre solvabilité pour l'octroi d'un prêt au taux de 2%), les obligations légales (Lutte contre le blanchiment de capitaux et le financement du terrorisme LCB-FT), le consentement (Envoi d'offres promotionnelles si vous l'avez explicitement accepté) et l'intérêt légitime (Amélioration de la sécurité de nos formulaires et prévention de la fraude documentaire)." 
          },
          { 
            icon: "Users", 
            h3: "3. Partage et Destinataires des Données", 
            p: "Dans le cadre de l'instruction de votre dossier, vos données peuvent être transmises à : Nos partenaires bancaires co-prêteurs ou assureurs, les autorités administratives (ACPR, Banque de France) en cas de réquisition légale, et nos prestataires technologiques de confiance pour la signature électronique des contrats. Aucune donnée n'est vendue à des tiers à des fins publicitaires sans votre accord explicite." 
          },
          { 
            icon: "Shield", 
            h3: "4. Vos Droits et Contact DPO", 
            p: "Conformément à la législation européenne, vous disposez d'un droit d'accès, de rectification, d'effacement ('droit à l'oubli'), d'opposition et de portabilité de vos données. Vous pouvez également définir des directives relatives au sort de vos données après votre décès. Pour exercer ces droits, vous pouvez contacter notre Délégué à la Protection des Données (DPO) à : dpo@europfy.com." 
          }
        ]
      },
      cookies: {
        title: "Politique de Gestion des Cookies",
        sections: [
          { 
            icon: "Cookie", 
            h3: "1. Usage des Cookies sur Europfy", 
            p: "Afin d'optimiser votre navigation et de sécuriser vos simulations de prêt à 2%, le site Europfy utilise des traceurs appelés 'cookies'. Ces fichiers nous permettent de vous reconnaître lors de vos visites et de mémoriser les informations saisies dans nos formulaires." 
          },
          { 
            icon: "Settings", 
            h3: "2. Typologie des Cookies Déployés", 
            p: "Cookies de Fonctionnement (Obligatoires) : Ils garantissent la sécurité de la session et la persistance de vos données lors du remplissage des formulaires de prêt. Sans eux, le site ne peut fonctionner correctement. Cookies Analytiques : Nous utilisons des outils de mesure d'audience pour comprendre quelles pages sont les plus consultées et ainsi améliorer nos parcours clients. Cookies de Sécurité : Ils aident à prévenir les attaques automatisées (bots) sur nos serveurs et protègent vos informations personnelles contre les tentatives d'intrusion." 
          },
          { 
            icon: "Lock", 
            h3: "3. Contrôle et Consentement de l'Utilisateur", 
            p: "Lors de votre première connexion, un bandeau de gestion des cookies vous permet d'accepter ou de refuser les traceurs non essentiels. Vous pouvez révoquer votre consentement à tout moment via l'onglet 'Gestion des Cookies' en pied de page. Nous vous informons que le blocage des cookies de fonctionnement peut rendre impossible la soumission d'une demande de prêt en ligne." 
          }
        ]
      }
    }
  };
  return content[lang] || content['fr'];
};

const getFormTranslations = (lang: string) => {
  const packs: Record<string, any> = {
    fr: {
      title: 'Demande de Prêt',
      subtitle: 'Rapide et 100% sécurisé.',
      trust_title: 'Sécurité des données',
      trust_text: 'Vos informations sont traitées conformément au RGPD.',
      processing_fees: {
        title: 'Frais de dossier',
        text: 'Les frais couvrent l\'analyse technique et juridique de votre solvabilité.',
        detail: 'Frais dus uniquement après accord de principe.'
      },
      help_sidebar: {
        title: 'Besoin d\'aide ?',
        desc: 'Nos conseillers vous accompagnent dans votre démarche.',
        cta: 'Parler à un conseiller'
      },
      fields: {
        firstName: 'Prénom',
        lastName: 'Nom',
        amount: 'Montant (€)',
        duration: 'Durée (mois)',
        email: 'Email',
        whatsapp: 'WhatsApp',
        country: 'Pays',
        profession: 'Profession',
        income: 'Revenu (€)',
        reason: 'Motif du prêt',
        reason_placeholder: 'Décrivez votre projet...',
        consent1: 'Je certifie l\'exactitude des informations fournies.',
        consent2: 'Données traitées selon les normes RGPD en vigueur.',
        processing_consent: 'J\'accepte les frais de dossier après accord de principe.',
        warning: 'Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement.',
        submit: 'Envoyer ma demande',
        select_country: 'Choisir un pays',
        success: 'Demande envoyée !'
      },
      countries: { FR: 'France', BE: 'Belgique', CH: 'Suisse', PL: 'Pologne', DE: 'Allemagne', IT: 'Italie', ES: 'Espagne', PT: 'Portugal', NL: 'Pays-Bas' }
    }
  };
  return packs[lang] || packs['fr'];
};

const generateFaq = (lang: string) => {
  const packs: Record<string, any> = {
    fr: {
      h2: "Foire Aux Questions",
      p: "Tout ce que vous devez savoir sur nos solutions de financement.",
      categories: {
        general: "Questions Générales",
        immobilier: "Prêt Immobilier",
        automobile: "Prêt Automobile",
        entreprise: "Prêt Entreprise",
        personnel: "Prêt Personnel",
        rachat: "Rachat de Crédit"
      },
      q1: "Quels sont les critères d'éligibilité ?",
      a1: "Vous devez résider dans l'Union Européenne, être majeur et justifier de revenus réguliers.",
      q2: "Quels documents sont nécessaires ?",
      a2: "Une pièce d'identité, un justificatif de domicile et vos trois derniers bulletins de salaire ou avis d'imposition.",
      q3: "Quel est le délai de réponse ?",
      a3: "Nous fournissons une réponse de principe en moins de 24 heures ouvrées après réception du dossier complet.",
      q4: "Le taux de 2% est-il vraiment fixe ?",
      a4: "Absolument. Contrairement aux taux variables, notre taux de 2% est contractuellement bloqué pour toute la durée du prêt."
    }
  };
  return packs[lang] || packs['fr'];
};

const getSpecificFaqs = (lang: string) => {
  const packs: Record<string, any> = {
    fr: {
      immobilier: [
        { q: "Quel est le taux pour un achat immobilier ?", a: "Chez Europfy, nous appliquons un taux fixe unique de 2% sur toute la durée de votre crédit." },
        { q: "Les frais de notaire sont-ils inclus dans le prêt ?", a: "Non, Europfy ne finance pas les frais de notaire. Ceux-ci doivent être réglés par l'emprunteur." },
        { q: "Quand dois-je payer les frais de dossier ?", a: "Les frais de dossier sont dûs uniquement si votre demande de prêt est acceptée et validée par nos services." },
        { q: "Le taux de 2% est-il garanti ?", a: "Oui, c'est un taux fixe contractuel qui ne varie pas, peu importe l'évolution des taux du marché." },
        { q: "Quelle est la durée maximale pour ce taux de 2% ?", a: "Vous pouvez emprunter jusqu'à 25 ans tout en bénéficiant de notre taux préférentiel." },
        { q: "Puis-je moduler mes mensualités ?", a: "Oui, nos contrats à 2% permettent une flexibilité pour augmenter ou réduire vos paiements." },
        { q: "Quels justificatifs sont nécessaires ?", a: "Votre dossier doit inclure vos justificatifs de revenus, d'identité et le compromis de vente (hors frais de notaire)." }
      ],
      automobile: [
        { q: "Quel taux s'applique pour un véhicule neuf ou d'occasion ?", a: "Le taux est identique pour tous : 2% fixe." },
        { q: "Financez-vous la totalité du prix du véhicule ?", a: "Oui, nous finançons 100% de la valeur du véhicule, mais les frais de dossier restent à votre charge après acceptation." },
        { q: "Quand intervient le paiement des frais de dossier ?", a: "Ils sont facturés une fois que votre prêt auto est officiellement accordé." },
        { q: "Puis-je acheter un véhicule à un particulier à 2% ?", a: "Oui, le taux de 2% s'applique que le vendeur soit un professionnel ou un particulier." },
        { q: "Le taux de 2% change-t-il selon la durée ?", a: "Non, que vous remboursiez sur 12 ou 84 mois, le taux reste bloqué à 2%." },
        { q: "Peut-on inclure l'immatriculation dans le prêt ?", a: "Non, le prêt couvre le véhicule. Les frais annexes (carte grise, dossier) sont à régler séparément." },
        { q: "Quel est le délai de déblocage des fonds ?", a: "Une fois le dossier accepté et les frais de dossier réglés, les fonds sont versés sous 7 à 14 jours." }
      ],
      entreprise: [
        { q: "Le taux de 2% est-il le même pour toutes les entreprises ?", a: "Oui, de la start-up à la PME, Europfy propose un taux unique de 2% pour tous les pros." },
        { q: "Les frais de dossier sont-ils fixes ?", a: "Ils sont calculés selon l'ampleur du projet et payables dès l'acceptation finale du financement." },
        { q: "Puis-je financer des locaux professionnels sans les frais de notaire ?", a: "Exactement. Nous finançons les murs à 2%, mais les frais de notaire sont à votre charge." },
        { q: "Peut-on financer du matériel d'occasion à 2% ?", a: "Oui, notre taux unique de 2% s'applique à tout type d'investissement professionnel." },
        { q: "Faut-il un apport personnel ?", a: "L'apport n'est pas obligatoire, mais vous devez être en mesure de couvrir les frais annexes et de dossier." },
        { q: "Quel est l'avantage du taux Europfy pour un pro ?", a: "Un coût du crédit extrêmement bas (2%) qui préserve votre capacité d'autofinancement." },
        { q: "Le taux de 2% s'applique-t-il au besoin de trésorerie ?", a: "Oui, toutes nos solutions de financement professionnel sont au taux fixe de 2%." }
      ],
      personnel: [
        { q: "Pourquoi choisir le prêt personnel Europfy ?", a: "Pour sa simplicité : un taux unique de 2% et une utilisation libre des fonds." },
        { q: "À quel moment dois-je régler les frais de dossier ?", a: "Uniquement après l'étude et l'acceptation définitive de votre dossier par nos analystes." },
        { q: "Le taux de 2% est-il accessible sans justificatif de projet ?", a: "Oui, c'est un prêt non affecté. Vous utilisez la somme à 2% comme vous le souhaitez." },
        { q: "Y a-t-il des frais cachés ?", a: "Non. Le taux est de 2% et les frais de dossier sont annoncés clairement lors de l'acceptation." },
        { q: "Puis-je emprunter une petite somme à 2% ?", a: "Oui, notre taux de 2% s'applique dès les premiers paliers d'emprunt." },
        { q: "Le taux est-il plus élevé pour les durées longues ?", a: "Non, la durée n'impacte pas le taux : il reste à 2% chez Europfy." },
        { q: "Puis-je rembourser par anticipation ?", a: "Oui, conformément à la loi, avec l'avantage d'avoir eu un coût initial très bas à 2%." }
      ],
      rachat: [
        { q: "Quel est l'intérêt de racheter ses crédits chez Europfy ?", a: "Vous regroupez vos dettes actuelles sous un seul contrat au taux unique de 2%." },
        { q: "Puis-je inclure un prêt immobilier dans le rachat ?", a: "Oui, mais attention : le rachat ne couvrira pas les nouveaux frais de notaire éventuels." },
        { q: "Comment sont gérés les frais de dossier pour un rachat ?", a: "Comme pour nos autres prêts, ils sont dûs après acceptation de l'opération de regroupement." },
        { q: "Le taux de 2% s'applique-t-il à la trésorerie supplémentaire ?", a: "Oui, si vous demandez une somme en plus lors du rachat, elle est aussi à 2%." },
        { q: "Réduit-on réellement les mensualités à 2% ?", a: "Oui, le taux de 2% est souvent bien inférieur aux taux des crédits renouvelables ou anciens prêts." },
        { q: "Le rachat à 2% concerne-t-il aussi les dettes fiscales ?", a: "Oui, nous intégrons diverses dettes dans le regroupement au taux de 2%." },
        { q: "Quelles sont les étapes ?", a: "Simulation, analyse, acceptation, paiement des frais de dossier, puis remboursement de vos anciens créanciers." }
      ]
    }
  };
  return packs[lang] || packs['fr'];
};

// Fonction helper pour traduire les données de FAQ par pays (Version ultra-précise demandée)
const getTranslationsForFAQAndContact = (lang: string) => {
  const translationsMap: Record<string, any> = {
    fr: {
      contact_page: {
        title: "Contactez-nous",
        subtitle: "Une équipe à votre écoute pour tous vos projets.",
        form_title: "Envoyez un message",
        form_desc: "Réponse garantie sous 24 heures ouvrées.",
        fields: { name: "Nom complet", email: "Email", subject: "Sujet", message: "Message", submit: "Envoyer le message", success: "Message transmis avec succès !" },
        info: { title: "Nos coordonnées", address: "1 Place de la Bourse, 69002 Lyon, France", phone: "+33 4 72 40 58 58", email: "contact@europfy.com", hours: "9h00 - 18h00" },
        help: { title: "Besoin d'aide immédiate ?", desc: "Consultez notre Foire Aux Questions pour trouver des réponses rapides à vos interrogations les plus fréquentes.", cta: "Consulter la FAQ" }
      },
      faq_page: {
        title: "Centre d'Aide & FAQ",
        subtitle: "Toutes les réponses à vos questions sur Europfy et nos solutions à 2%.",
        back: "Retour à l'accueil"
      }
    },
    pl: {
      contact_page: {
        title: "Skontaktuj się z nami",
        subtitle: "Zespół do Twojej dyspozycji dla wszystkich projektów.",
        form_title: "Wyślij wiadomość",
        form_desc: "Gwarantowana odpowiedź w ciągu 24 godzin roboczych.",
        fields: { name: "Imię i nazwisko", email: "Email", subject: "Temat", message: "Wiadomość", submit: "Wyślij wiadomość", success: "Wiadomość została wysłana!" },
        info: { title: "Nasze dane", address: "1 Place de la Bourse, 69002 Lyon, Francja", phone: "+33 4 72 40 58 58", email: "contact@europfy.com", hours: "9:00 - 18:00" },
        help: { title: "Potrzebujesz natychmiastowej pomocy?", desc: "Zapoznaj się z naszymi Najczęściej Zadawanymi Pytaniami, aby znaleźć szybkie odpowiedzi na najczęstsze pytania.", cta: "Zobacz FAQ" }
      },
      faq_page: { title: "Centrum pomocy i FAQ", subtitle: "Wszystkie odpowiedzi na pytania dotyczące Europfy i naszych rozwiązań 2%.", back: "Powrót do strony głównej" }
    },
    de: {
      contact_page: {
        title: "Kontaktieren Sie uns",
        subtitle: "Ein Team, das Ihnen bei all Ihren Projekten zuhört.",
        form_title: "Nachricht senden",
        form_desc: "Garantierte Antwort innerhalb von 24 Arbeitsstunden.",
        fields: { name: "Vollständiger Name", email: "E-Mail", subject: "Betreff", message: "Nachricht", submit: "Nachricht senden", success: "Nachricht erfolgreich übermittelt!" },
        info: { title: "Unsere Kontaktdaten", address: "1 Place de la Bourse, 69002 Lyon, Frankreich", phone: "+33 4 72 40 58 58", email: "contact@europfy.com", hours: "9:00 - 18:00" },
        help: { title: "Benötigen Sie sofortige Hilfe?", desc: "Konsultieren Sie unsere häufig gestellten Fragen, um schnelle Antworten auf Ihre brennendsten Fragen zu finden.", cta: "FAQ ansehen" }
      },
      faq_page: { title: "Hilfecenter & FAQ", subtitle: "Alle Antworten auf Ihre Fragen zu Europfy und unseren 2%-Lösungen.", back: "Zurück zur Startseite" }
    },
    it: {
      contact_page: {
        title: "Contattaci",
        subtitle: "Un team al tuo ascolto per tutti i tuoi progetti.",
        form_title: "Invia un messaggio",
        form_desc: "Risposta garantita entro 24 ore lavorative.",
        fields: { name: "Nome completo", email: "Email", subject: "Oggetto", message: "Messaggio", submit: "Invia il messaggio", success: "Messaggio inviato con successo!" },
        info: { title: "I nostri recapiti", address: "1 Place de la Bourse, 69002 Lione, Francia", phone: "+33 4 72 40 58 58", email: "contact@europfy.com", hours: "9:00 - 18:00" },
        help: { title: "Hai bisogno di aiuto immediato?", desc: "Consulta le nostre Domande Frequenti per trovare risposte rapide alle tue domande più comuni.", cta: "Consulta le FAQ" }
      },
      faq_page: { title: "Centro assistenza e FAQ", subtitle: "Tutte le risposte alle tue domande su Europfy e le nostre soluzioni al 2%.", back: "Torna alla home" }
    },
    es: {
      contact_page: {
        title: "Contáctenos",
        subtitle: "Un equipo a su escucha para todos sus proyectos.",
        form_title: "Enviar un mensaje",
        form_desc: "Respuesta garantizada en 24 horas hábiles.",
        fields: { name: "Nombre completo", email: "Email", subject: "Asunto", message: "Mensaje", submit: "Enviar mensaje", success: "¡Mensaje transmitido con éxito!" },
        info: { title: "Nuestros datos", address: "1 Place de la Bourse, 69002 Lyon, Francia", phone: "+33 4 72 40 58 58", email: "contact@europfy.com", hours: "9:00 - 18:00" },
        help: { title: "¿Necesita ayuda inmediata?", desc: "Consulte nuestras Preguntas Frecuentes para encontrar respuestas rápidas a sus dudas más frecuentes.", cta: "Consultar la FAQ" }
      },
      faq_page: { title: "Centro de Ayuda y FAQ", subtitle: "Todas las respuestas a sus preguntas sobre Europfy y nuestras soluciones al 2%.", back: "Volver al inicio" }
    },
    pt: {
      contact_page: {
        title: "Contacte-nos",
        subtitle: "Uma equipa à sua escuta para todos os seus projetos.",
        form_title: "Envie uma mensagem",
        form_desc: "Resposta garantida em 24 horas úteis.",
        fields: { name: "Nome completo", email: "Email", subject: "Assunto", message: "Mensagem", submit: "Enviar mensagem", success: "Mensagem transmitida com sucesso!" },
        info: { title: "Nossos dados", address: "1 Place de la Bourse, 69002 Lyon, França", phone: "+33 4 72 40 58 58", email: "contact@europfy.com", hours: "9:00 - 18:00" },
        help: { title: "Precisa de ajuda imediata?", desc: "Consulte as nossas Perguntas Frequentes para encontrar respostas rápidas às suas dúvidas mais frequentes.", cta: "Consultar a FAQ" }
      },
      faq_page: { title: "Centro de Ajuda e FAQ", subtitle: "Todas as respostas às suas perguntas sobre a Europfy e as nossas soluções a 2%.", back: "Voltar ao início" }
    },
    nl: {
      contact_page: {
        title: "Neem contact op",
        subtitle: "Een team dat naar u luistert voor al uw projecten.",
        form_title: "Stuur een bericht",
        form_desc: "Gegarandeerd antwoord binnen 24 werkuren.",
        fields: { name: "Volledige naam", email: "E-mail", subject: "Onderwerp", message: "Bericht", submit: "Bericht verzenden", success: "Bericht succesvol verzonden!" },
        info: { title: "Onze gegevens", address: "1 Place de la Bourse, 69002 Lyon, Frankrijk", phone: "+33 4 72 40 58 58", email: "contact@europfy.com", hours: "9:00 - 18:00" },
        help: { title: "Direct hulp nodig?", desc: "Raadpleeg onze Veelgestelde Vragen om snel antwoorden op uw meest gestelde vragen te vinden.", cta: "Bekijk de FAQ" }
      },
      faq_page: { title: "Helpcentrum & FAQ", subtitle: "Alle antwoorden op uw vragen over Europfy en onze 2% oplossingen.", back: "Terug naar home" }
    }
  };
  return translationsMap[lang] || translationsMap.fr;
};

const getSpecificTestimonials = (lang: string) => {
  const rawReviews: Record<string, any[]> = {
    immobilier: [
      { id: 101, name: "Lars Svensson (Suède)", content: "J'ai apprécié la clarté des conditions. Le processus d'acquisition de mon appartement a été très fluide." },
      { id: 102, name: "Giulia Rossi (Italie)", content: "Simulation simple et rapide. On sait d'emblée qu'on paie les frais de dossier seulement si le prêt est validé." },
      { id: 103, name: "Mateo Fernández (Espagne)", content: "Service professionnel et réactif. Le financement a été mis en place sans accroc majeur." },
      { id: 104, name: "Katarzyna Nowak (Pologne)", content: "Dossier validé rapidement. Le fait de payer les frais de dossier uniquement à l'acceptation est rassurant." },
      { id: 105, name: "Hans Müller (Allemagne)", content: "Un partenaire financier fiable. Tout était conforme à ce qui m'avait été annoncé." }
    ],
    automobile: [
      { id: 201, name: "Jürgen Schmidt (Allemagne)", content: "Financement de ma voiture en un temps record. Les démarches sont simples et efficaces." },
      { id: 202, name: "Sofia Conti (Italie)", content: "Frais de dossier réglés après l'accord, fonds reçus en quelques jours. Rien à redire." },
      { id: 203, name: "Lukas Weber (Autriche)", content: "Le processus est très fluide, même pour un véhicule d'occasion. Je recommande." },
      { id: 204, name: "Marta Silva (Portugal)", content: "J'ai financé 100% de ma voiture. J'ai juste réglé les frais de dossier une fois le contrat signé." },
      { id: 205, name: "Erik Nilsson (Danemark)", content: "Achat d'un nouveau véhicule sans stress. La simplicité est le maître mot chez Europfy." }
    ],
    entreprise: [
      { id: 301, name: "Alessandro Bianchi (Italie)", content: "Le financement de mon restaurant a été rapide. Europfy comprend les enjeux des entrepreneurs." },
      { id: 302, name: "Emma Nielsen (Danemark)", content: "Rachat de parts sociales facilité. On paie les frais de dossier uniquement si le projet est financé, c'est rassurant." },
      { id: 303, name: "Jan de Vries (Pays-Bas)", content: "Achat de bureaux sans difficulté. Les conditions sont claires et le suivi impeccable." }
    ],
    personnel: [
      { id: 401, name: "Müller Gabor (Hongrie)", content: "J'ai apprécié la liberté d'utilisation des fonds. Processus simple et efficace." },
      { id: 402, name: "Thomas O'Connor (Irlande)", content: "Besoin d'argent pour des travaux, tout s'est fait rapidement. Service transparent." }
    ],
    rachat: [
      { id: 501, name: "Luigi Moretti (Italie)", content: "Le rachat a grandement amélioré ma situation financière. Processus efficace et transparent." },
      { id: 502, name: "Andrzej Duda (Pologne)", content: "Tous mes crédits regroupés facilement. Frais de dossier payés après acceptation, un gage de sérieux." }
    ]
  };

  const translate = (cat: string, lang: string) => {
    return (rawReviews[cat] || []).map(rev => {
      return { 
        ...rev, 
        role: lang === 'fr' ? 'Client Vérifié' : lang === 'pl' ? 'Zweryfikowany klient' : lang === 'de' ? 'Verifizierter Kunde' : lang === 'it' ? 'Cliente verificato' : lang === 'es' ? 'Cliente verificado' : lang === 'pt' ? 'Cliente verificado' : 'Geverifieerde klant',
        rating: 5,
        avatar: `https://i.pravatar.cc/150?u=${rev.id}`
      };
    });
  };

  return {
    immobilier: translate('immobilier', lang),
    automobile: translate('automobile', lang),
    entreprise: translate('entreprise', lang),
    personnel: translate('personnel', lang),
    rachat: translate('rachat', lang)
  };
};

const getCommonTranslations = (lang: string) => {
  const packs: any = {
    fr: {
      nav: { home: 'Accueil', loans: 'Prêts', simulator: 'Simulateur', about: 'À propos', contact: 'Contact', cta: 'Demande en ligne', login: 'Connexion', my_space: 'Mon Espace' },
      hero: { badge: 'Taux Fixe 2%', h1: 'Le crédit qui vous respecte.', h1_variants: ['Financer à 2% fixe.', 'Réponse en 24h.', 'Partenaire de confiance.'], p: 'Financez vos projets avec un taux transparent. Accompagnement sur mesure sans frais cachés.', cta1: 'Ma simulation', cta2: 'En savoir plus' },
      who_we_are: { title: 'Qui sommes-nous ?', subtitle: 'Une vision humaine du crédit.', p1: 'Europfy est une équipe d\'experts engagés pour une finance éthique.', p2: 'Nous utilisons la technologie pour réduire les coûts et vous proposer le meilleur taux.', btn: 'Notre histoire' },
      calculator: { title: 'Simulateur Express', subtitle: 'Calculez votre budget instantanément.', amount: 'Montant souhaité', duration: 'Durée du prêt', months: 'mois', monthly: 'Mensualité', total: 'Coût total', cta: 'Lancer ma demande' },
      stats: { badge: 'Preuve de fiabilité', title: 'Une confiance bâtie sur des résultats concrets.', p: 'Rejoignez des milliers d\'Européens qui ont déjà optimisé leur avenir financier avec Europfy. Notre solidité financière et notre transparence sont vos meilleures garanties.', clients: 'Clients satisfaits', exp: 'Années d\'expertise', rating: 'Note globale', safety: 'Sécurité' },
      process: { h2: 'Votre prêt en 3 étapes', p: 'Un processus simplifié pour vous.', s1t: 'Simulation', s1d: 'Calculez vos mensualités.', s2t: 'Dossier', s2d: 'Soumission sécurisée.', s3t: 'Fonds', s3d: 'Réception sous 48h.' },
      cta_footer: { h2: 'Prêt à réaliser vos projets ?', p: 'Simulation gratuite en 2 minutes.', btn1: 'Démarrer maintenant', btn2: 'Contacter un expert' },
      footer: { desc: 'Votre partenaire pour un crédit éthique à taux fixe de 2%.', titles: { loans: 'Nos Prêts', company: 'Société', contact: 'Contact' }, links: { about: 'À propos', blog: 'Blog', faq: 'FAQ', legal: 'Mentions Légales', privacy: 'Confidentialité', cookies: 'Cookies' }, rights: '© 2026 Europfy. Tous droits réservés.' },
      loans_section: { h2: 'Nos Solutions', p: 'Des offres adaptées à taux fixe de 2%.', more: 'Détails' },
      comparison: { h3: 'Comparez et économisez', p: 'Pourquoi payer plus cher ailleurs ? Nous maintenons un taux unique de 2%.', market: 'Moyenne Marché', ours: 'Offre Europfy', saving: 'Économie réelle' },
      security: { rgpd: 'CONFORME RGPD', h24: 'SUPPORT 24/7', orias: 'AGRÉÉ ORIAS' },
      partners: { h2: 'Nos Partenaires', p: 'Des institutions financières solides.' },
      testimonials: { h2: 'Avis Clients', p: 'Votre satisfaction est notre réussite.' },
      loan_detail: { 
        back: 'Retour aux offres', advantages: 'Vos avantages', eligibility: 'Conditions d\'éligibilité', conditions: ['Résider en Europe', 'Être majeur (18+)', 'Revenu stable'], labels: { maxAmount: 'Montant Max', maxDuration: 'Durée Max' }, sim_title: 'Simulation Rapide', sim_desc: 'Calculez votre prêt.', advisor_title: 'Expert Dédié', advisor_desc: 'À vos côtés.', protection: "Protection garante", best_offer: "Meilleure offre", why_title: "Pourquoi souscrire ce prêt ?", why_subtitle: "Le financement pensé pour votre succès.", why_p: "Bénéficiez d'une transparence totale et d'un taux de 2% bloqué.", journey_title: "Votre parcours avec Europfy", journey_subtitle: "Un accompagnement humain de A à Z.", steps: [
          { t: "Demande Simplifiée", d: "Remplissez votre dossier en ligne en 5 minutes." }, { t: "Analyse en 24h", d: "Réponse immédiate de nos experts." }, { t: "Signature Digitale", d: "Signez vos contrats de manière sécurisée." }, { t: "Déblocage des Fonds", d: "Fonds sur votre compte sous 48-72h." }, { t: "Gestion Flexible", d: "Modifiez vos mensualités sans frais." }
        ]
      }
    }
  };
  return packs[lang] || packs['fr'];
};

const frPack = {
  ...getCommonTranslations('fr'),
  ...getTranslationsForFAQAndContact('fr'),
  login: { title: 'Espace Membre', subtitle: 'Accédez à votre compte Europfy', email: 'Adresse Email', password: 'Mot de passe', submit: 'Se connecter', error: 'Identifiants invalides', forgot: 'Mot de passe oublié ?', noAccount: 'Pas encore de compte ? Faites une demande.' },
  support: { title: 'Besoin d\'aide ?', subtitle: 'Contactez notre support.', form_title: 'Formulaire d\'assistance', fields: { name: 'Nom complet', email: 'Email', subject: 'Sujet', message: 'Message', submit: 'Envoyer', success: 'Envoyé !' }, subjects: { password: 'Mot de passe', account: 'Compte', other: 'Autre' } },
  admin: { title: 'Tableau de Bord', subtitle: 'Gestion des demandes', stats: { total: 'Total', pending: 'En attente', approved: 'Approuvées', totalVolume: 'Volume' }, table: { client: 'Client', amount: 'Montant', income: 'Revenu', country: 'Pays', status: 'Statut', date: 'Date', fees: 'Frais', actions: 'Actions' }, status: { pending: 'En attente', approved: 'Approuvé', rejected: 'Refusé' } },
  client_dashboard: { title: 'Espace Client', welcome: 'Bienvenue', status_card: 'Statut de la demande', details: 'Détails du prêt', next_steps: 'Étapes suivantes', no_loan: 'Aucun prêt trouvé.', cta_new: 'Nouveau prêt', steps: ['Analyse', 'Documents', 'Signature', 'Fonds'] },
  form: getFormTranslations('fr'),
  success_page: { title: 'Félicitations !', subtitle: 'Demande enregistrée.', message: 'Un expert analyse votre dossier.', steps_title: 'Prochaines étapes', steps: ['Analyse de solvabilité', 'Contact téléphonique', 'Signature', 'Fonds'], trust_labels: { secured: 'Sécurisé', email: 'Email reçu', advisor: 'Conseiller' }, cta_home: 'Retour Accueil', cta_blog: 'Voir nos conseils' },
  about_page: { title: 'Qui sommes-nous ?', subtitle: 'Redéfinir le crédit.', mission_title: 'Notre Mission', mission_text: 'Démocratiser l\'accès au crédit éthique.', vision_title: 'Vision Européenne', vision_text: 'Présent dans 27 pays.', values_title: 'Nos Valeurs', values: [{ title: 'Intégrité', desc: 'Clarté contractuelle.' }, { title: 'Innovation', desc: 'Plateforme agile.' }, { title: 'Proximité', desc: 'Experts dédiés.' }], stats: { years: 'Années d\'expertise', countries: 'Pays couverts', loans: 'Prêts accordés' } },
  blog: { title: 'Blog Finance', subtitle: 'Conseils d\'experts.', readMore: 'Lire la suite', back: 'Retour', posts: [] },
  faq: generateFaq('fr'),
  legal: getLegalTranslations('fr'),
  loan_specifics: {
    personnel: { faqs: getSpecificFaqs('fr').personnel, testimonials: getSpecificTestimonials('fr').personnel },
    immobilier: { faqs: getSpecificFaqs('fr').immobilier, testimonials: getSpecificTestimonials('fr').immobilier },
    automobile: { faqs: getSpecificFaqs('fr').automobile, testimonials: getSpecificTestimonials('fr').automobile },
    entreprise: { faqs: getSpecificFaqs('fr').entreprise, testimonials: getSpecificTestimonials('fr').entreprise },
    rachat: { faqs: getSpecificFaqs('fr').rachat, testimonials: getSpecificTestimonials('fr').rachat }
  }
};

const createLanguagePack = (lang: Language, base: any) => {
  const common = getCommonTranslations(lang);
  const extra = getTranslationsForFAQAndContact(lang);
  const pack = { ...JSON.parse(JSON.stringify(base)), ...common, ...extra };
  const specifics = getSpecificFaqs(lang);
  const reviews = getSpecificTestimonials(lang);
  const legal = getLegalTranslations(lang);
  
  pack.faq = generateFaq(lang);
  pack.form = getFormTranslations(lang);
  pack.legal = legal;
  pack.loan_specifics = {
    personnel: { faqs: specifics.personnel, testimonials: reviews.personnel },
    immobilier: { faqs: specifics.immobilier, testimonials: reviews.immobilier },
    automobile: { faqs: specifics.automobile, testimonials: reviews.automobile },
    entreprise: { faqs: specifics.entreprise, testimonials: reviews.entreprise },
    rachat: { faqs: specifics.rachat, testimonials: reviews.rachat }
  };

  return pack;
};

export const translations: Record<Language, any> = {
  fr: frPack,
  pl: createLanguagePack('pl', frPack),
  de: createLanguagePack('de', frPack),
  nl: createLanguagePack('nl', frPack),
  it: createLanguagePack('it', frPack),
  pt: createLanguagePack('pt', frPack),
  es: createLanguagePack('es', frPack)
};