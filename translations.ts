
import { LOAN_DATABASE } from './database';

export const basePackFR = {
  nav: { 
    home: 'Accueil', 
    loans: 'Prêts', 
    simulator: 'Simulateur', 
    about: 'À propos', 
    contact: 'Contact', 
    cta: 'Demande en ligne', 
    login: 'Connexion', 
    my_space: 'Mon Espace' 
  },
  hero: { 
    badge: 'Taux Fixe 2%', 
    h1: 'Le crédit qui vous respecte.', 
    h1_variants: ['Financer à 2% fixe.', 'Réponse en 24h.', 'Partenaire de confiance.'], 
    p: 'Prêt à 2% fixe. Simple, rapide et sans frais cachés. Financez vos projets immobiliers, personnels, automobiles ou professionnels en toute sérénité.', 
    cta1: 'Soumettre une demande', 
    cta2: 'En savoir plus' 
  },
  feature_highlight: {
    badge: "Transparence totale",
    title: "La clarté au service de vos ambitions",
    p: "Nous avons supprimé les frais de dossier cachés et les conditions complexes. Chez Europfy, vous bénéficiez d'une visibilité totale sur votre financement dès le premier jour.",
    audit_title: "Audit 2026",
    audit_subtitle: "100% Conforme",
    items: [
      { title: "Zéro surprise", desc: "Le taux de 2% est garanti par contrat pour toute la durée.", icon: "ShieldCheck" },
      { title: "Flexibilité réelle", desc: "Modifiez vos mensualités ou remboursez par anticipation sans frais.", icon: "RefreshCcw" },
      { title: "Analyse experte", desc: "Un conseiller dédié vous accompagne de l'étude à la signature.", icon: "UserCheck" }
    ]
  },
  calculator: { 
    title: 'Simulateur Express', 
    subtitle: 'Calculez votre budget instantanément.', 
    amount: 'Montant souhaité', 
    duration: 'Durée du prêt', 
    months: 'mois', 
    monthly: 'Mensualité', 
    total: 'Coût total', 
    cta: 'Lancer ma demande' 
  },
  stats: { 
    badge: 'Fiabilité', 
    title: 'Confiance et résultats.', 
    p: 'Rejoignez des milliers d\'Européens qui nous font confiance pour leurs projets financiers.', 
    clients: 'Clients', 
    exp: 'Expertise', 
    rating: 'Note', 
    safety: 'Sécurité' 
  },
  about_us_section: {
    badge: "Qui sommes-nous ?",
    title: "L'Esprit Europfy",
    p: "Nous transformons le prêt bancaire en un service simple, humain et accessible à chaque citoyen européen.",
    trust_title: "Confiance Européenne",
    trust_subtitle: "Plus de 50 000 projets financés depuis 2018.",
    items: [
      {
        title: "Notre Mission",
        desc: "Démocratiser l'accès au crédit avec un taux unique de 2% pour stimuler l'économie réelle.",
        icon: "Target"
      },
      {
        title: "Notre Histoire",
        desc: "Fondé à Lyon en 2018, Europfy est devenu en quelques années le leader du prêt éthique en ligne.",
        icon: "History"
      },
      {
        title: "Nos Garanties",
        desc: "Une sécurité de niveau bancaire et une transparence totale sur chaque contrat signé.",
        icon: "ShieldCheck"
      }
    ]
  },
  identity: {
    title: "Notre ADN",
    subtitle: "Plus qu'une banque, un partenaire de vie.",
    p: "Nous ne nous contentons pas de prêter de l'argent. Nous investissons dans vos rêves en simplifiant radicalement l'accès au financement.",
    pillars: [
      {
        title: "Proximité Européenne",
        desc: "Présents dans toute l'Union, nous maîtrisons les spécificités locales pour vous offrir un service sur mesure partout en Europe.",
        icon: "Globe"
      },
      {
        title: "Accompagnement Humain",
        desc: "Chez nous, pas de robots. Chaque dossier est analysé par un expert dédié qui comprend votre situation réelle.",
        icon: "Heart"
      },
      {
        title: "Simplicité Radicale",
        desc: "Nous avons supprimé les petites lignes et les termes complexes. Un taux de 2% fixe, point final.",
        icon: "Shield"
      }
    ]
  },
  who_we_are: {
    title: "Qui sommes-nous ?",
    subtitle: "Une nouvelle vision du crédit.",
    p1: "Europfy est né d'une volonté de rendre le crédit plus accessible et plus juste.",
    p2: "En supprimant les intermédiaires complexes, nous proposons un taux fixe de 2% pour tous.",
    values: [
      { title: "Éthique", desc: "Aucun frais caché, une transparence totale." },
      { title: "Rapidité", desc: "Analyse et réponse en moins de 24 heures." },
      { title: "Accès", desc: "Ouvert à tous les résidents européens." }
    ],
    btn: "Notre histoire"
  },
  about_page: {
    title: "À Propos d'Europfy",
    subtitle: "Une finance plus humaine et accessible.",
    mission_text: "Notre mission est de briser les barrières bancaires traditionnelles en offrant un financement équitable à 2% pour tous les Européens, sans discrimination.",
    vision_title: "Notre Vision 2030",
    vision_text: "Devenir le leader européen du crédit éthique et transparent, en remplaçant la complexité par la clarté.",
    values_title: "Nos Engagements",
    values: [
      { title: "Transparence", desc: "Chaque centime est expliqué, aucun frais n'est caché." },
      { title: "Réactivité", desc: "Votre temps est précieux, nous répondons en 24h." },
      { title: "Sécurité", desc: "Vos données et vos fonds sont protégés par les meilleurs standards." }
    ],
    cta_start: "Commencer",
    cta_contact: "Contact",
    features: [
       { title: "Transparence", desc: "Des conditions claires dès le premier jour.", icon: "Eye" },
       { title: "Sécurité", desc: "Une protection bancaire de haut niveau.", icon: "Shield" },
       { title: "Accompagnement", desc: "Des experts à votre écoute 24/7.", icon: "HeartHandshake" }
    ],
    vision_badge_title: "Vision 2030",
    vision_badge_desc: "Devenir le premier réseau de crédit éthique en Europe.",
    commitment_title: "Engagés pour une finance éthique.",
    commitment_text: "Chaque prêt accordé chez Europfy respecte des critères de durabilité et d'éthique sociale stricts. Nous ne finançons pas seulement des projets, nous construisons une économie plus humaine."
  },
  legal: {
    terms: {
      title: "Mentions Légales - Europfy",
      subtitle: "En vigueur au 29 janvier 2026",
      sections: [
        { 
          icon: "Building", 
          h3: "1. Identification de l'Éditeur et Informations Institutionnelles", 
          p: "Le présent site internet, accessible à l’adresse [URL du site], est la propriété exclusive de la société Europfy SAS, opérant sous le nom commercial Europfy. Europfy est une institution spécialisée dans l'intermédiation financière à l'échelle européenne.\n\nDénomination sociale : Europfy SAS\nSiège social : 1 Place de la Bourse, 69002 Lyon, France\nCapital social : [Montant du capital] euros\nImmatriculation : Inscrite au Registre du Commerce et des Sociétés (RCS) de Lyon sous le numéro 891 733 009.\nIdentifiant SIRET : 891 785 359 01527\n\nRégulation et Agrément : Europfy SAS est enregistrée auprès de l'ORIAS sous le numéro 21950679 en qualité d'Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP). Cette immatriculation garantit que l'entreprise répond aux exigences de compétence, de capacité professionnelle et de responsabilité civile imposées par les autorités financières européennes.\n\nAutorité de Tutelle : Nos activités sont placées sous le contrôle de l'Autorité de Contrôle Prudentiel et de Résolution (ACPR), située au 4 Place de Budapest, CS 92459, 75436 Paris Cedex 09.\n\nContact : Pour toute demande d'ordre juridique ou administratif, vous pouvez nous contacter via l'adresse e-mail dédiée : [email_contact@europfy.com]." 
        },
        { 
          icon: "UserCheck", 
          h3: "2. Directeur de la Publication et Responsabilité éditoriale", 
          p: "Le Directeur de la Publication est [Nom complet], agissant en qualité de Représentant Légal de Europfy SAS. Il est responsable de la stratégie de communication et de la vérification de la véracité des offres financières présentées sur le site, notamment le maintien de l'offre commerciale unique à taux fixe de 2%." 
        },
        { 
          icon: "Lock", 
          h3: "3. Propriété Intellectuelle et Droits d'Auteur", 
          p: "L’ensemble de la structure du site Europfy, incluant de manière non exhaustive les codes sources, l'architecture graphique, les bases de données, les algorithmes de simulation, les logotypes, les textes, les icônes et les éléments multimédias, est protégé par les lois internationales sur la propriété intellectuelle et le droit d'auteur.\n\nToute extraction, reproduction, représentation, adaptation ou modification, qu'elle soit totale ou partielle, par quelque procédé que ce soit, est strictement interdite sans l'accord préalable, écrit et exprès de Europfy SAS. Le non-respect de cette clause constitue une contrefaçon pouvant engager la responsabilité civile et pénale de l'auteur de l'infraction, conformément aux articles L.335-2 et suivants du Code de la propriété intellectuelle." 
        },
        { 
          icon: "FileText", 
          h3: "4. Conditions d'Utilisation et Nature de l'Offre", 
          p: "Le site Europfy propose des outils de simulation de prêt au taux fixe de 2%. Les informations obtenues via ces simulateurs ne constituent pas une offre contractuelle mais une indication pré-contractuelle. Europfy se réserve le droit de modifier les caractéristiques de ses offres à tout moment, sous réserve du respect des contrats déjà signés. L'acceptation de tout dossier de financement est soumise à l'analyse de la solvabilité de l'emprunteur et au paiement des frais de dossier prévus par la société après validation définitive." 
        }
      ]
    },
    privacy: {
      title: "Politique de Confidentialité",
      subtitle: "Protection des Données (RGPD)",
      sections: [
        { 
          icon: "Shield", 
          h3: "Engagement Général", 
          p: "Europfy (Europfy SAS) place la protection de la vie privée au cœur de ses services financiers. En tant qu'opérateur européen, nous appliquons strictement le Règlement Général sur la Protection des Données (RGPD 2016/679)." 
        },
        { 
          icon: "Database", 
          h3: "1. Collecte Exhaustive des Données", 
          p: "Pour traiter votre demande de financement, nous collectons :\n\nIdentité : Nom, prénoms, justificatif d'identité, situation familiale, justificatif de domicile.\nFinances et Revenus : Bulletins de salaire, avis d'imposition, relevés bancaires.\nVie Professionnelle : Contrat de travail, ancienneté, SIRET (pour les pros).\nNavigation : Adresse IP, horodatage, type de terminal." 
        },
        { 
          icon: "Target", 
          h3: "2. Finalités et Bases Légales", 
          p: "Le traitement repose sur :\n\nExécution du contrat : Analyse de solvabilité pour le prêt à 2%.\nObligations légales : Lutte contre le blanchiment (LCB-FT).\nConsentement : Envoi d'offres si accepté.\nIntérêt légitime : Sécurisation des formulaires et prévention de la fraude." 
        },
        { 
          icon: "Users", 
          h3: "3. Partage et Destinataires", 
          p: "Vos données peuvent être transmises aux partenaires bancaires, aux autorités (ACPR, Banque de France) ou aux prestataires de signature électronique. Aucune donnée n'est vendue à des tiers." 
        },
        { 
          icon: "Scale", 
          h3: "4. Vos Droits", 
          p: "Vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition. Contactez notre DPO à : [email_dpo@europfy.com]." 
        }
      ]
    },
    cookies: {
      title: "Politique de Gestion des Cookies",
      subtitle: "Gestion et Transparence",
      sections: [
        { 
          icon: "Cookie", 
          h3: "1. Usage des Cookies sur Europfy", 
          p: "Afin de sécuriser vos simulations à 2%, le site Europfy utilise des cookies pour reconnaître votre navigation et mémoriser vos saisies." 
        },
        { 
          icon: "Settings", 
          h3: "2. Typologie des Cookies", 
          p: "Fonctionnement (Obligatoires) : Sécurité de session.\nAnalytiques : Mesure d'audience.\nSécurité : Protection contre les bots et intrusions." 
        },
        { 
          icon: "EyeOff", 
          h3: "3. Contrôle", 
          p: "Vous pouvez modifier vos préférences via l'onglet \"Gestion des Cookies\" en pied de page." 
        }
      ]
    }
  },
  footer: { 
    desc: 'Votre partenaire crédit à 2%. Un accompagnement transparent pour tous vos projets de vie.', 
    titles: { 
      loans: 'Nos Prêts', 
      company: 'Société', 
      contact: 'Contact' 
    }, 
    links: { 
      about: 'À propos', 
      blog: 'Blog', 
      faq: 'FAQ', 
      legal: 'Mentions Légales', 
      privacy: 'Vie privée', 
      cookies: 'Cookies' 
    }, 
    rights: '© 2026 Europfy. Tous droits réservés.' 
  },
  loans_section: { 
    h2: 'Nos Solutions de Financement', 
    p: 'Découvrez nos offres adaptées avec un taux fixe unique de 2%.',
    discover: "Découvrir l'offre",
    fixed_rate: "2% Fixe"
  },
  testimonials: { 
    h2: 'Avis de nos Clients', 
    p: 'La satisfaction de nos emprunteurs est notre priorité numéro un.' 
  },
  loan_detail: { 
    back: 'Retour', 
    advantages: 'Avantages du prêt',
    fixed: 'Fixe',
    interested_title: "Intéressé par ce prêt ?",
    interested_subtitle: "Réponse de principe immédiate en ligne.",
    labels: { maxAmount: 'Montant Max', maxDuration: 'Durée Max' }, 
    best_offer: "La meilleure offre", 
    why_title: "Pourquoi choisir Europfy ?", 
    why_subtitle: "Le financement intelligent pour votre succès.", 
    why_props: [
      { title: "Europfy Secure", desc: "Taux fixe de 2% garanti par contrat." },
      { title: "Analyse Humaine", desc: "Votre dossier est étudié par un expert." },
      { title: "Zéro Frais Cachés", desc: "Transparence totale sur les conditions." }
    ],
    journey_title: "Votre parcours de prêt", 
    journey_subtitle: "Un accompagnement de A à Z.", 
    steps: [
      { t: "Demande en ligne", d: "Complétez le formulaire en 5 minutes." }, 
      { t: "Étude de dossier", d: "Réponse de principe sous 24 heures." }, 
      { t: "Signature Digitale", d: "Signez votre contrat en toute sécurité." }, 
      { t: "Déblocage", d: "Fonds disponibles sous 48-72 heures." }
    ] 
  },
  faq: {
    h2: "Foire Aux Questions", 
    p: "Toutes les réponses à vos questions sur le crédit.",
    categories: { 
      general: "Général", 
      immobilier: "Immobilier", 
      automobile: "Automobile", 
      entreprise: "Entreprise", 
      personnel: "Personnel", 
      rachat: "Rachat de crédit" 
    },
    q1: "Quelles sont les conditions d'éligibilité ?", a1: "Être majeur, résider en Europe et justifier de revenus stables permettant le remboursement.",
    q2: "Quels documents dois-je fournir ?", a2: "Une pièce d'identité valide, un justificatif de domicile de moins de 3 mois et vos derniers relevés bancaires.",
    q3: "Quel est le délai de réponse définitif ?", a3: "Après réception de votre dossier complet, nous apportons une réponse définitive sous 24h ouvrées.",
    q4: "Le taux de 2% est-il vraiment fixe ?", a4: "Oui, Europfy s'engage contractuellement sur un taux de 2% fixe qui ne variera jamais pendant toute la durée du prêt."
  },
  faq_page: {
    title: "Centre d'aide",
    subtitle: "Nous répondons à toutes vos interrogations.",
    back: "Retour à l'accueil"
  },
  contact_page: {
    title: "Contactez-nous", 
    subtitle: "Nos experts répondent à vos questions sous 24 heures.",
    form_title: "Envoyez un message", 
    form_desc: "Utilisez ce formulaire pour toute demande d'information complémentaire.",
    info: { 
      title: "Nos coordonnées", 
      address: "1 Place de la Bourse, 69002 Lyon, France", 
      phone: "+33 7 54 09 50 27", 
      email: "contact@europfy.com", 
      hours: "Lundi - Vendredi: 09:00 - 18:00" 
    },
    help: { 
      title: "Besoin d'aide immédiate ?", 
      desc: "Consultez notre foire aux questions pour trouver rapidement une réponse.", 
      cta: "Consulter la FAQ" 
    },
    fields: { 
      name: "Nom complet", 
      email: "Email professionnel", 
      subject: "Objet", 
      message: "Message", 
      submit: "Envoyer le message", 
      success: "Message envoyé avec succès !" 
    }
  },
  form: { 
    title: 'Demande de Prêt en Ligne', 
    subtitle: 'Une procédure rapide, simple et 100% sécurisée.', 
    trust_title: 'Transparence et Sécurité', 
    trust_text: 'Les informations que vous nous confiez sont précieuses. Elles sont utilisées exclusivement pour l\'étude de votre dossier de financement. Toutes vos données sont transmises de manière sécurisée et stockées sur des serveurs en Europe, conformément au RGPD.',
    processing_fees: { 
      title: 'Frais de dossier', 
      text: 'Des frais d\'analyse technique s\'appliquent pour le traitement de votre dossier.', 
      detail: 'Ces frais ne sont dus qu\'en cas d\'acceptation de votre demande.' 
    },
    help_sidebar: { 
      title: 'Besoin d\'assistance ?', 
      desc: 'Nos conseillers financiers sont à votre disposition.', 
      cta: 'Parler à un expert' 
    },
    fields: { 
      firstName: 'Prénom', 
      lastName: 'Nom', 
      amount: 'Montant souhaité (€)', 
      duration: 'Durée (en mois)', 
      email: 'Adresse Email', 
      whatsapp: 'Numéro WhatsApp', 
      country: 'Pays de résidence', 
      profession: 'Profession actuelle', 
      income: 'Revenu net mensuel', 
      reason: 'Motif du prêt', 
      reason_placeholder: 'Décrivez brièvement votre projet...', 
      consent1: 'Je certifie l\'honneur l\'exactitude des informations fournies.', 
      consent2: 'Vos données sont traitées conformément au RGPD.', 
      processing_consent: 'J\'accepte les frais de gestion liés au dossier.', 
      warning: 'Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.', 
      submit: 'Soumettre mon dossier', 
      select_country: 'Sélectionnez votre pays...', 
      success: 'Félicitations' 
    },
    countries: { 
      AL: 'Albanie',
      AD: 'Andorre',
      AT: 'Autriche',
      BE: 'Belgique',
      BA: 'Bosnie-Herzégovine',
      BG: 'Bulgarie',
      HR: 'Croatie',
      CY: 'Chypre',
      CZ: 'République Tchèque',
      DK: 'Danemark',
      EE: 'Estonie',
      FI: 'Finlande',
      FR: 'France',
      DE: 'Allemagne',
      GR: 'Grèce',
      HU: 'Hongrie',
      IS: 'Islande',
      IE: 'Irlande',
      IT: 'Italie',
      LV: 'Lettonie',
      LI: 'Liechtenstein',
      LT: 'Lituanie',
      LU: 'Luxembourg',
      MT: 'Malte',
      MD: 'Moldavie',
      MC: 'Monaco',
      ME: 'Monténégro',
      NL: 'Pays-Bas',
      MK: 'Macédoine du Nord',
      NO: 'Norvège',
      PL: 'Pologne',
      PT: 'Portugal',
      RO: 'Roumanie',
      SM: 'Saint-Marin',
      RS: 'Serbie',
      SK: 'Slovaquie',
      SI: 'Slovénie',
      ES: 'Espagne',
      SE: 'Suède',
      CH: 'Suisse',
      UA: 'Ukraine',
      GB: 'Royaume-Uni',
      VA: 'Vatican'
    }
  },
  login: { 
    title: "Connexion Espace Client", 
    subtitle: "Suivez l'état de votre demande en temps réel", 
    email: "Email", 
    password: "Mot de passe", 
    submit: "Se connecter", 
    error: "Identifiants invalides", 
    forgot: "Mot de passe oublié ?", 
    noAccount: "Pas encore de compte ? Déposez une demande." 
  },
  client_dashboard: {
    welcome: "Bienvenue",
    title: "Votre espace personnel",
    cta_new: "Nouvelle demande",
    no_loan: "Aucune demande en cours",
    status_card: "État de votre dossier",
    steps: ['Analyse', 'Vérification', 'Signature', 'Fonds'],
    contact_email: "Email de contact",
    declared_income: "Revenu déclaré",
    need_help: "Besoin d'aide ?",
    contact_advisor: "Contacter un conseiller",
    amount: "Montant",
    duration: "Durée",
    fixed_rate: "Taux Fixe"
  },
  admin: {
    status: {
      pending: "En attente",
      approved: "Approuvé",
      rejected: "Refusé"
    }
  },
  success_page: {
    title: "Demande Envoyée !",
    subtitle: "Votre dossier est désormais entre les mains de nos experts.",
    message: "Nous avons bien reçu votre formulaire. Un conseiller Europfy va analyser vos pièces et vous contactera sous 24h.",
    steps_title: "Prochaines étapes",
    steps: ["Vérification de votre éligibilité", "Appel de confirmation d'un conseiller", "Envoi du contrat numérique"],
    trust_labels: { secured: "Sécurisé", email: "Email de suivi", advisor: "Conseiller dédié" },
    cta_home: "Retour à l'accueil",
    cta_blog: "Lire nos conseils"
  },
  support: {
    title: "Aide & Support",
    subtitle: "Comment pouvons-nous vous aider aujourd'hui ?",
    fields: { name: "Nom", email: "Email", subject: "Sujet", message: "Message", submit: "Envoyer", success: "Reçu !" },
    subjects: { password: "Problème de mot de passe", account: "Gestion du compte", other: "Autre demande" }
  },
  cta_footer: {
    h2: "Prêt à lancer votre projet ?",
    p: "Obtenez une réponse de principe en moins de 2 minutes.",
    btn1: "Déposer mon dossier",
    btn2: "Nous contacter"
  },
  comparison: { 
    h3: "Économisez sur votre crédit", 
    p: "Europfy propose l'un des taux les plus bas d'Europe pour favoriser l'accès au crédit.", 
    market: "Taux moyen bancaire", 
    ours: "Taux Europfy", 
    saving: "Économie moyenne constatée" 
  },
  partners: { 
    h2: "Partenaires de Confiance", 
    p: "Nous travaillons avec des institutions de renommée mondiale pour sécuriser vos fonds." 
  },
  security: { 
    rgpd: "Conformité RGPD", 
    h24: "Surveillance 24/7", 
    orias: "Régulation Européenne" 
  },
  blog: { 
    title: "Actualités & Conseils", 
    subtitle: "Tout ce qu'il faut savoir pour bien gérer vos finances.", 
    back: "Retour au blog", 
    readMore: "Lire la suite", 
    posts: [
      {
        id: 'rate-2-percent',
        title: "Pourquoi le taux à 2% est l'avenir du crédit ?",
        excerpt: "Dans un marché volatil, Europfy maintient un cap éthique. Découvrez pourquoi notre modèle fixe est une révolution.",
        content: "Dans un contexte économique marqué par l'instabilité des taux directeurs, la question du coût du crédit est devenue centrale pour les ménages européens.\n\nLe modèle bancaire traditionnel, souvent indexé sur les fluctuations du marché, expose les emprunteurs à des variations imprévisibles. C'est ici qu'intervient la révolution Europfy : un taux fixe unique de 2%.\n\nUne stabilité garantie\n\nContrairement aux taux variables qui peuvent s'envoler, notre taux de 2% est contractuel. Il ne changera jamais, que vous remboursiez sur 12 mois ou 25 ans. Cette prévisibilité permet aux familles de planifier leur budget sur le long terme sans craindre les lendemains.\n\nL'éthique avant le profit\n\nComment faisons-nous ? En réduisant drastiquement nos coûts de structure (pas d'agences physiques coûteuses, digitalisation des processus) et en acceptant une marge plus faible pour favoriser le volume. Notre mission est sociale : permettre l'accès à la propriété et à l'entrepreneuriat au plus grand nombre.\n\nUn impact réel sur le pouvoir d'achat\n\nSur un prêt immobilier de 200 000 € sur 20 ans, la différence entre un taux de marché à 4.5% et notre taux à 2% représente une économie de plus de 50 000 € sur le coût total du crédit. C'est autant d'argent qui reste dans votre poche pour vos projets de vie."
      },
      {
        id: 'real-estate-2026',
        title: "Investir dans l'immobilier en 2026",
        excerpt: "Les opportunités à ne pas manquer pour cette nouvelle année fiscale. Zoom sur les villes intelligentes et l'éco-rénovation.",
        content: "L'année 2026 marque un tournant pour l'investissement immobilier en Europe. Après une période de correction, le marché offre de nouvelles opportunités pour les investisseurs avisés, notamment grâce à la transition énergétique.\n\nLa prime à l'éco-rénovation\n\nLes passoires thermiques voient leur prix baisser, offrant des opportunités d'achat à bas prix. Avec un financement travaux à 2% chez Europfy, acquérir un bien classé F ou G pour le rénover devient une stratégie très rentable. La valeur verte d'un bien est désormais un critère déterminant pour la revente.\n\nLes villes moyennes en plein essor\n\nOubliez les hyper-centres saturés. En 2026, la rentabilité se trouve dans les villes moyennes connectées (TGV, fibre) qui offrent une qualité de vie supérieure. Des villes comme Angers, Le Mans ou Valence tirent leur épingle du jeu avec des rendements locatifs bruts dépassant souvent les 6%.\n\nLe crowdfunding immobilier\n\nPour ceux qui ne souhaitent pas gérer de bien en direct, l'investissement participatif continue de croître. En combinant un petit prêt personnel à 2% pour constituer votre apport, vous pouvez diversifier vos placements dans plusieurs projets de promotion immobilière."
      },
      {
        id: 'debt-consolidation-2026',
        title: "Rachat de crédit : Divisez vos mensualités par 3",
        excerpt: "Ne laissez pas vos dettes étouffer votre budget. Le regroupement de crédits à 2% est la solution pour respirer.",
        content: "L'accumulation de crédits (auto, conso, travaux, revolving) peut rapidement peser sur le budget mensuel d'un foyer. Lorsque le taux d'endettement dépasse 33%, le risque de surchauffe financière est réel.\n\nLe principe du regroupement\n\nL'opération est simple : Europfy rachète l'ensemble de vos dettes auprès de vos différents créanciers. Nous soldons ces prêts pour vous, et nous mettons en place un nouveau crédit unique qui les remplace tous.\n\nL'effet levier du taux à 2%\n\nLa magie opère grâce à notre taux. Souvent, les crédits à la consommation ou renouvelables ont des taux avoisinant les 5%, 10%, voire 20%. En les remplaçant par un prêt unique à 2%, vous réduisez mécaniquement le coût de votre dette.\n\nAllonger pour mieux respirer\n\nEn plus de baisser le taux, nous pouvons allonger la durée de remboursement. Résultat : votre mensualité peut être divisée par 2 ou par 3. Cela libère un 'reste à vivre' immédiat pour financer les études des enfants, épargner ou simplement faire face à l'inflation."
      },
      {
        id: 'ai-finance-2026',
        title: "L'IA au service de votre dossier",
        excerpt: "Comment Europfy utilise l'intelligence artificielle pour valider votre prêt en 24h chrono, sans déshumaniser la relation.",
        content: "Chez Europfy, nous croyons que la technologie doit servir l'humain, et non le remplacer. Notre promesse de réponse en 24h repose sur une infrastructure technologique de pointe.\n\nAnalyse instantanée\n\nDès que vous téléchargez vos pièces justificatives, nos algorithmes sécurisés vérifient leur authenticité en quelques secondes. Ils analysent votre capacité d'emprunt et votre reste à vivre avec une précision chirurgicale, éliminant les erreurs humaines de calcul.\n\nLe conseiller reste maître\n\nL'IA prépare le terrain, mais la décision finale appartient toujours à un expert humain. Si l'algorithme détecte une anomalie ou un profil atypique (intermittents, entrepreneurs), il alerte un conseiller spécialisé qui prendra le temps d'étudier le dossier manuellement.\n\nSécurité renforcée\n\nL'intelligence artificielle nous permet aussi de lutter efficacement contre la fraude à l'identité, protégeant ainsi l'ensemble de notre communauté d'emprunteurs et garantissant la pérennité de notre modèle à taux bas."
      }
    ] 
  }
};

export const translations: any = {
  fr: { 
    ...basePackFR, 
    loan_specifics: LOAN_DATABASE.fr 
  }
};
