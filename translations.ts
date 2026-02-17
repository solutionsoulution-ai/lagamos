
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
    p: "Nous avons supprimé les frais de dossier cachés et les conditions complexes. Chez Europcapital, vous bénéficiez d'une visibilité totale sur votre financement dès le premier jour.",
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
    cta: 'Lancer ma demande',
    representative_example_title: 'Exemple représentatif obligatoire',
    representative_example_text: "Pour un financement de {{amount}} € remboursable sur {{duration}} mois au TAEG fixe de 2% (incluant intérêts et frais annuels), la mensualité sera de {{monthly}} €. Le montant total dû par l'emprunteur est de {{total}} €.",
    legal_warning: '"Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager."'
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
    title: "L'Esprit Europcapital",
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
        desc: "Fondé à Lyon en 2018, Europcapital est devenu en quelques années le leader du prêt éthique en ligne.",
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
  about_page: {
    title: "À Propos d'Europcapital",
    subtitle: "Une finance plus humaine et accessible.",
    mission_text: "Notre mission est de briser les barrières bancaires traditionnelles en offrant un financement équitable à 2% pour tous les Européens, sans discrimination.",
    vision_title: "Notre Vision 2030",
    vision_text: "Devenir le leader européen du crédit éthique et transparent, en remplaçant la complexité par la clarté.",
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
    commitment_text: "Chaque prêt accordé chez Europcapital respecte des critères de durabilité et d'éthique sociale stricts. Nous ne finançons pas seulement des projets, nous construisons une économie plus humaine."
  },
  legal: {
    document_footer: "Document officiel Europfy SAS • Tous droits réservés",
    terms: {
      title: "Mentions Légales - Europcapital",
      subtitle: "En vigueur au 29 janvier 2026",
      sections: [
        { 
          icon: "Building", 
          h3: "1. Identification de l'Éditeur", 
          p: "Le présent site internet est édité par Europcapital SAS, immatriculée au RCS de Lyon sous le numéro 891 733 009. Siège social : 1 Place de la Bourse, 69002 Lyon." 
        },
        { 
          icon: "Shield", 
          h3: "2. Activité Réglementée", 
          p: "Europcapital agit en tant qu'intermédiaire en opérations de banque et en services de paiement (IOBSP), dûment enregistré auprès des autorités de contrôle financier européennes." 
        }
      ]
    },
    privacy: { 
      title: "Politique de Confidentialité", 
      subtitle: "Votre vie privée est notre priorité", 
      sections: [
        {
          icon: "Database",
          h3: "1. Données collectées",
          p: "Nous collectons les données nécessaires à l'étude de votre solvabilité : identité, situation professionnelle, revenus et coordonnées de contact (Email, WhatsApp)."
        },
        {
          icon: "Zap",
          h3: "2. Utilisation des données",
          p: "Vos données sont utilisées exclusivement pour le traitement de votre demande de prêt, la gestion de votre compte client et le respect de nos obligations légales de lutte contre le blanchiment."
        },
        {
          icon: "Clock",
          h3: "3. Durée de conservation",
          p: "Les données des dossiers refusés sont supprimées après 6 mois. Les données des dossiers financés sont conservées pendant toute la durée contractuelle majorée de 5 ans."
        },
        {
          icon: "UserCheck",
          h3: "4. Vos droits (RGPD)",
          p: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Contactez-nous à dpo@europcapital.com."
        }
      ] 
    },
    cookies: { 
      title: "Gestion des Cookies", 
      subtitle: "Transparence sur votre navigation", 
      sections: [
        {
          icon: "Cookie",
          h3: "1. Qu'est-ce qu'un cookie ?",
          p: "Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite du site pour faciliter votre navigation et mémoriser vos préférences."
        },
        {
          icon: "ShieldCheck",
          h3: "2. Cookies essentiels",
          p: "Ces cookies sont strictement nécessaires au fonctionnement du simulateur de prêt et de votre espace client sécurisé. Ils ne peuvent pas être désactivés."
        },
        {
          icon: "BarChart",
          h3: "3. Mesure d'audience",
          p: "Nous utilisons des outils d'analyse anonymisés pour comprendre comment nos clients utilisent le site et améliorer nos services de financement."
        }
      ] 
    }
  },
  footer: { 
    desc: 'Votre partenaire crédit à 2%. Un accompagnement transparent pour tous vos projets de vie.', 
    titles: { loans: 'Nos Prêts', company: 'Société', contact: 'Contact' }, 
    links: { about: 'À propos', blog: 'Blog', faq: 'FAQ', legal: 'Mentions Légales', privacy: 'Vie privée', cookies: 'Cookies' }, 
    rights: '© 2026 Europcapital. Tous droits réservés.' 
  },
  loans_section: { h2: 'Nos Solutions de Financement', p: 'Découvrez nos offres adaptées avec un taux fixe unique de 2%.', discover: "Découvrir l'offre", fixed_rate: "2% Fixe" },
  testimonials: { h2: 'Avis de nos Clients', p: 'La satisfaction de nos emprunteurs est notre priorité numéro un.' },
  loan_detail: { 
    back: 'Retour', 
    advantages: 'Avantages du prêt',
    fixed: 'Fixe',
    interested_title: "Intéressé par ce prêt ?",
    interested_subtitle: "Réponse de principe immédiate en ligne.",
    labels: { maxAmount: 'Montant Max', maxDuration: 'Durée Max' }, 
    best_offer: "La meilleure offre", 
    why_title: "Pourquoi choisir Europcapital ?", 
    why_subtitle: "Le financement intelligent pour votre succès.", 
    why_props: [
      { title: "Europcapital Secure", desc: "Taux fixe de 2% garanti par contrat." },
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
    categories: { general: "Général", immobilier: "Immobilier", automobile: "Automobile", entreprise: "Entreprise", personnel: "Personnel", rachat: "Rachat de crédit" },
    q1: "Quelles sont les conditions d'éligibilité ?", a1: "Être majeur, résider en Europe et justifier de revenus stables permettant le remboursement.",
    q2: "Quels documents dois-je fournir ?", a2: "Une pièce d'identité valide, un justificatif de domicile de moins de 3 mois et vos derniers relevés bancaires.",
    q3: "Quel est le délai de réponse définitif ?", a3: "Après réception de votre dossier complet, nous apportons une réponse définitive sous 24h ouvrées.",
    q4: "Le taux de 2% est-il vraiment fixe ?", a4: "Oui, Europcapital s'engage contractuellement sur un taux de 2% fixe qui ne variera jamais pendant toute la durée du prêt."
  },
  faq_page: { title: "Centre d'aide", subtitle: "Nous répondons à toutes vos interrogations.", back: "Retour à l'accueil" },
  contact_page: {
    title: "Contactez-nous", 
    subtitle: "Nos experts répondent à vos questions sous 24 heures.",
    form_title: "Envoyez un message", 
    form_desc: "Utilisez ce formulaire pour toute demande d'information complémentaire.",
    info: { title: "Nos coordonnées", address: "1 Place de la Bourse, 69002 Lyon, France", phone: "+33 7 54 09 50 27", email: "contact@europcapital.com", hours: "Lundi - Vendredi: 09:00 - 18:00" },
    fields: { name: "Nom complet", email: "Email professionnel", subject: "Objet", message: "Message", submit: "Envoyer le message", success: "Message envoyé avec succès !" },
    back_btn: "Retour"
  },
  form: { 
    title: 'Demande de Prêt en Ligne', 
    subtitle: 'Une procédure rapide, simple et 100% sécurisée.', 
    trust_title: 'Transparence et Sécurité', 
    trust_text: 'Les informations que vous nous confiez sont précieuses. Elles sont utilisées exclusivement pour l\'étude de votre dossier de financement. Toutes vos données sont transmises de manière sécurisée et stockées sur des serveurs en Europe, conformément au RGPD.',
    processing_fees: { title: 'Frais de dossier', text: 'Des frais d\'analyse technique s\'appliquent pour le traitement de votre dossier.', detail: 'Ces frais ne sont dus qu\'en cas d\'acceptation de votre demande.' },
    sidebar: {
      summary: "Récapitulatif",
      monthly_label: "Mensualité estimée",
      rate_label: "Taux Fixe",
      total_label: "Montant dû"
    },
    fields: { 
      firstName: 'Prénom', 
      lastName: 'Nom', 
      amount: 'Montant du Prêt (€)', 
      duration: 'Durée (mois)', 
      email: 'Adresse Email', 
      whatsapp: 'Numéro Whatsapp', 
      country: 'Pays de résidence', 
      profession: 'Profession', 
      income: 'Revenu mensuel net (€)', 
      reason: 'Motif de la demande', 
      reason_placeholder: 'Décrivez brièvement votre projet...', 
      consent1: 'Je certifie l\'honneur l\'exactitude des informations fournies.', 
      consent2: 'Vos données sont traitées conformément au RGPD.', 
      processing_consent: 'J\'accepte les frais de gestion liés au dossier.', 
      warning: 'Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.', 
      submit: 'Soumettre mon dossier', 
      select_country: 'Sélectionnez un pays', 
      success: 'Félicitations' 
    },
    countries: {
      AL: 'Albanie', AD: 'Andorre', AT: 'Autriche', BE: 'Belgique', BY: 'Biélorussie',
      BA: 'Bosnie-Herzégovine', BG: 'Bulgarie', HR: 'Croatie', CY: 'Chypre', CZ: 'République Tchèque',
      DK: 'Danemark', EE: 'Estonie', FI: 'Finlande', FR: 'France', DE: 'Allemagne',
      GR: 'Grèce', HU: 'Hongrie', IS: 'Islande', IE: 'Irlande', IT: 'Italie',
      LV: 'Lettonie', LI: 'Liechtenstein', LT: 'Lithuanie', LU: 'Luxembourg', MT: 'Malte',
      MD: 'Moldavie', MC: 'Monaco', ME: 'Monténégro', NL: 'Pays-Bas', NO: 'Norvège',
      PL: 'Pologne', PT: 'Portugal', RO: 'Roumanie', RU: 'Russie', SM: 'Saint-Marin',
      RS: 'Serbie', SK: 'Slovaquie', SI: 'Slovénie', ES: 'Espagne', SE: 'Suède',
      CH: 'Suisse', UA: 'Ukraine', GB: 'Royaume-Uni', VA: 'Vatican'
    }
  },
  login: { 
    title: "Connexion Espace Client", subtitle: "Suivez l'état de votre demande en temps réel", email: "Email", password: "Mot de passe", submit: "Se connecter", error: "Identifiants invalides", forgot: "Mot de passe oublié ?", noAccount: "Pas encore de compte ? Déposez une demande." 
  },
  client_dashboard: {
    portal_title: "Portail Bancaire Europcapital",
    welcome: "Bienvenue",
    title: "Votre espace personnel",
    op_denied: "Opération Refusée",
    available_label: "Disponible",
    external_transfer: "Virement externe",
    rib_details: "Coordonnées RIB",
    iban_label: "IBAN EUROPCAPITAL",
    bic_label: "BIC / SWIFT",
    currency_label: "DEVISE",
    transfer_in_progress: "Virement en cours",
    beneficiary_label: "Bénéficiaire",
    secure_processing: "Traitement sécurisé",
    tx_history: "Historique transactions",
    no_tx: "Aucun mouvement",
    tx_id: "Transaction ID",
    close_btn: "Fermer",
    security_title: "Sécurité & Accès",
    my_password: "Mon mot de passe confidentiel",
    biometric_active: "Protection biométrique active",
    security_info_box: "Il s'agit du code d'accès généré lors de la création de votre dossier. Conservez-le précieusement.",
    transfer_funds_title: "Transférer des fonds",
    transfer_confirm_btn: "Confirmer le virement",
    amount: "Montant",
    duration: "Durée",
    fixed_rate: "Taux Fixe"
  },
  success_page: {
    congrats: "Félicitations !",
    recorded: "Votre demande a été enregistrée avec succès.",
    action_required: "Action Requise : Sauvegardez ces accès maintenant",
    secure_access: "Vos accès sécurisés",
    secure_note: "Notez-les bien, ils ne seront plus affichés pour votre sécurité.",
    copy_btn: "Copier mes accès",
    copied_btn: "Identifiants Copiés !",
    email_title: "Activez votre dossier par E-mail",
    email_text: "Écrivez-nous dès maintenant à l'adresse suivante pour confirmer votre demande :",
    email_warning: "Attention : utilisez obligatoirement l'adresse email {{email}} pour nous écrire.",
    whatsapp_title: "Finalisez sur WhatsApp",
    whatsapp_text: "Envoyez une photo de votre Pièce d'Identité pour accélérer le traitement.",
    whatsapp_btn: "OUVRIR WHATSAPP OFFICIEL",
    back_home: "Retourner à l'accueil"
  },
  cta_footer: { h2: "Prêt à lancer votre projet ?", p: "Obtenez une réponse de principe en moins de 2 minutes.", btn1: "Déposer mon dossier", btn2: "Nous contacter" },
  comparison: { h3: "Économisez sur votre crédit", p: "Europcapital propose l'un des taux les plus bas d'Europe.", market: "Taux moyen bancaire", ours: "Taux Europcapital", saving: "Économie moyenne constatée" },
  partners: { h2: "Partenaires de Confiance", p: "Nous travaillons avec des institutions de renommée mondiale." },
  security: { rgpd: "Conformité RGPD", h24: "Surveillance 24/7", orias: "Régulation Européenne" },
  blog: { 
    title: "Actualités & Conseils", 
    subtitle: "Tout ce qu'il faut savoir sur le crédit éthique.", 
    back: "Retour au blog", 
    readMore: "Lire la suite", 
    posts: [
      {
        id: 'rate-2-percent',
        title: "Pourquoi le taux de 2% est-il le plus avantageux en 2026 ?",
        excerpt: "Dans un marché volatil, la stabilité d'un taux fixe à 2% est un atout majeur pour votre patrimoine.",
        content: "Le marché financier de 2026 connaît des fluctuations sans précédent. Alors que les taux directeurs des banques centrales restent instables, Europcapital a fait le choix de la pérennité. \n\nUn taux fixe de 2% (TAEG) permet aux emprunteurs de planifier leur avenir sans crainte d'une inflation galopante ou d'une hausse des mensualités. Chez nous, la transparence n'est pas un slogan, c'est un contrat. \n\nEn choisissant un prêt à 2%, vous économisez en moyenne 3,45% par rapport aux offres bancaires traditionnelles. Sur un prêt immobilier de 200 000 €, cela représente des dizaines de milliers d'euros d'économies injectées directement dans votre pouvoir d'achat."
      },
      {
        id: 'real-estate-2026',
        title: "Achat immobilier : 5 conseils pour réussir votre projet cette année.",
        excerpt: "Découvrez les clés d'un investissement immobilier serein malgré le contexte économique.",
        content: "Acheter un bien immobilier en 2026 demande de la méthode. \n\n1. Vérifiez votre capacité d'emprunt : Utilisez notre simulateur pour connaître votre budget réel. \n2. Soignez votre dossier : Bien que nous soyons flexibles, un dossier clair accélère le déblocage des fonds. \n3. Ne négligez pas l'emplacement : La valeur d'un bien reste liée à sa proximité avec les services. \n4. Anticipez les frais annexes : Notaire, taxes, travaux. \n5. Optez pour Europcapital : Avec notre taux fixe de 2%, vous maximisez votre rentabilité locative ou minimisez le coût de votre résidence principale."
      },
      {
        id: 'debt-consolidation-2026',
        title: "Le rachat de crédit : une solution pour assainir vos finances.",
        excerpt: "Comment regrouper vos dettes peut vous redonner de l'air financièrement.",
        content: "Le cumul des crédits (auto, consommation, revolving) peut rapidement devenir pesant. Le rachat de crédit chez Europcapital permet de fusionner toutes vos créances en une seule mensualité unique. \n\nLe bénéfice est immédiat : votre reste à vivre augmente et la gestion de vos comptes devient limpide. En appliquant notre taux de 2% sur l'ensemble de votre de toute votre dette, vous réduisez souvent le coût global de vos financements tout en simplifiant votre quotidien."
      },
      {
        id: 'ai-finance-2026',
        title: "Comment l'IA révolutionne le traitement de votre demande de prêt.",
        excerpt: "Découvrez comment nous utilisons la technologie pour vous répondre en moins de 24 heures.",
        content: "La rapidité est au cœur de notre service. Grâce à nos algorithmes d'analyse sécurisés, nous sommes capables d'étudier les dossiers 10 fois plus vite qu'une banque traditionnelle. \n\nL'IA ne remplace pas l'humain chez Europcapital, elle le seconde. Elle permet à nos experts de se concentrer sur l'aspect relationnel et l'accompagnement personnalisé, tandis que le calcul de solvabilité et la vérification des documents sont automatisés pour une sécurité maximale."
      },
      {
        id: 'new-regulations-2026',
        title: "Nouvelles réglementations bancaires : quel impact sur vos crédits ?",
        excerpt: "Comprendre les changements législatifs de 2026 et comment Europcapital vous protège.",
        content: "L'année 2026 marque un tournant dans la protection des emprunteurs européens. De nouvelles directives imposent plus de transparence sur les coûts réels des crédits. \n\nChez Europcapital, nous avions anticipé ces mesures depuis longtemps avec notre taux unique de 2%. Nous accueillons ces changements avec enthousiasme car ils mettent en lumière les pratiques abusives de certains acteurs et valorisent notre modèle éthique. \n\nVotre sécurité financière est garantie par notre conformité stricte aux normes de l'Autorité Bancaire Européenne."
      },
      {
        id: 'investing-low-rate',
        title: "Investir avec un taux à 2% : les meilleures opportunités.",
        excerpt: "Pourquoi emprunter à bas coût est la meilleure stratégie patrimoniale actuelle.",
        content: "Dans un environnement où l'inflation dépasse souvent les 2%, emprunter à ce taux fixe revient à gagner de l'argent. C'est ce qu'on appelle l'effet de levier positif. \n\nQue ce soit pour investir dans l'immobilier locatif, moderniser votre outil de production ou lancer une nouvelle activité, le crédit à 2% d'Europcapital préserve votre cash-flow et accélère votre enrichissement personnel ou professionnel."
      }
    ] 
  }
};

export const translations: any = {
  fr: { ...basePackFR, loan_specifics: LOAN_DATABASE.fr }
};
