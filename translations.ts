
import { Language } from './types';
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
    p: 'Financez vos projets avec un taux transparent. Accompagnement sur mesure sans frais cachés.', 
    cta1: 'Ma simulation', 
    cta2: 'En savoir plus' 
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
    p: 'Découvrez nos offres adaptées avec un taux fixe unique de 2%.' 
  },
  testimonials: { 
    h2: 'Avis de nos Clients', 
    p: 'La satisfaction de nos emprunteurs est notre priorité numéro un.' 
  },
  loan_detail: { 
    back: 'Retour', 
    advantages: 'Avantages du prêt', 
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
      phone: "+33 4 72 40 58 58", 
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
    trust_title: 'Confidentialité', 
    trust_text: 'Vos données personnelles sont protégées par un cryptage de niveau bancaire (AES-256).',
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
      consent1: 'Je certifie sur l\'honneur l\'exactitude des informations fournies.', 
      consent2: 'Vos données sont traitées conformément au RGPD.', 
      processing_consent: 'J\'accepte les frais de gestion liés au dossier.', 
      warning: 'Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.', 
      submit: 'Soumettre mon dossier', 
      select_country: 'Sélectionnez votre pays...', 
      success: 'Félicitations' 
    },
    countries: { 
      FR: 'France', 
      BE: 'Belgique', 
      LU: 'Luxembourg', 
      CH: 'Suisse', 
      MC: 'Monaco' 
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
    steps: ['Analyse', 'Vérification', 'Signature', 'Fonds']
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
        excerpt: "Dans un marché volatil, Europfy maintient un cap éthique.",
        content: "Le taux de 2% n'est pas qu'un chiffre, c'est un engagement social pour permettre à chacun d'accéder à la propriété et à l'entrepreneuriat."
      },
      {
        id: 'real-estate-2024',
        title: "Investir dans l'immobilier en 2024",
        excerpt: "Les opportunités à ne pas manquer cette année.",
        content: "Malgré la hausse des taux directeurs, certains secteurs restent porteurs pour les investisseurs avisés."
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
