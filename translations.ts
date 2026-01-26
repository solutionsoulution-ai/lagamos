
import { Language } from './types';

const businessInfo = "FinancePlus - Siège social : 1 Place de la Bourse, 69002 Lyon, France. RCS Lyon 891 785 359 | N° SIRET : 991 785 059 00027 | N° ORIAS : 21029679.";

export const translations: Record<Language, any> = {
  fr: {
    nav: { home: 'Accueil', loans: 'Prêts', simulator: 'Simulateur', about: 'À propos', contact: 'Contact', cta: 'Demande en ligne' },
    hero: { badge: 'Taux Exceptionnel de 2% Fixe', h1: 'Le crédit qui vous respecte vraiment.', p: 'Financez vos rêves avec un taux unique, sans frais cachés et une réponse en moins de 24 heures.', cta1: 'Démarrer ma simulation', cta2: 'Voir comment ça marche', reviews: '+10,000 avis positifs' },
    contact_page: {
      title: 'Contactez-nous',
      subtitle: 'Une question ? Notre équipe d\'experts est à votre disposition pour vous accompagner dans vos projets.',
      form_title: 'Envoyez-nous un message',
      form_desc: 'Réponse garantie sous 24 heures ouvrées.',
      fields: {
        name: 'Nom complet',
        email: 'Adresse Email',
        subject: 'Sujet',
        message: 'Votre message',
        submit: 'Envoyer le message',
        success: 'Merci ! Votre message a été envoyé avec succès.'
      },
      info: {
        title: 'Nos coordonnées',
        address: '1 Place de la Bourse, 69002 Lyon, France',
        phone: '+33 4 72 40 58 58',
        email: 'contact@financeplus.com',
        hours: 'Lun - Ven : 09:00 - 18:00'
      }
    },
    form: {
      title: 'Demande de Financement',
      subtitle: "Remplissez le formulaire pour soumettre votre demande. C'est simple et sécurisé.",
      trust_title: 'Transparence et Sécurité',
      trust_text: "Les informations que vous nous confiez sont précieuses. Elles sont utilisées exclusivement pour l'étude de votre dossier de financement. Toutes vos données sont transmises de manière sécurisée et stockées sur des serveurs en Europe, conformément au RGPD.",
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
        reason_placeholder: "Décrivez brièvement votre projet (ex: Achat d'un véhicule, rénovation, etc.)",
        consent1: "Je reconnais avoir lu et j'accepte la politique de confidentialité.",
        consent2: "En soumettant ce formulaire, je consens à ce que FinancePlus collecte et traite mes données personnelles pour l'étude de ma demande de financement, conformément à la Politique de Confidentialité.",
        warning: "Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.",
        submit: 'Envoyer ma demande',
        select_country: 'Sélectionnez un pays',
        success: 'Demande envoyée avec succès ! Nos conseillers vous recontacteront sous 24h.'
      }
    },
    stats: { clients: 'Clients satisfaits', exp: 'Années d\'expérience', rating: 'Note moyenne', safety: 'Sécurité garantie' },
    comparison: { h3: 'Comparez et économisez', p: 'Pourquoi payer plus ailleurs ? Notre taux unique de 2% est conçu pour maximiser votre pouvoir d\'achat.', market: 'Taux Moyen Marché', ours: 'Taux FinancePlus', saving: 'D\'économie moyenne constatée' },
    process: { h2: 'Votre prêt en quelques clics', p: 'Un processus simplifié pour vous faire gagner du temps.', s1t: 'Simulation', s1d: 'Choisissez votre montant et votre durée en 30 secondes.', s2t: 'Dossier', s2d: 'Déposez vos justificatifs de manière 100% sécurisée.', s3t: 'Fonds', s3d: 'Réception des fonds sur votre compte après validation.' },
    security: { rgpd: 'PROTECTION RGPD', h24: 'RÉPONSE EN 24H', orias: 'AGRÉÉ ORIAS' },
    calculator: { title: 'Simulateur Express', subtitle: 'Calculez votre mensualité instantanément.', amount: 'Montant du prêt', duration: 'Durée du remboursement', months: 'mois', monthly: 'Mensualité', total: 'Coût total crédit', cta: 'Demander ce prêt maintenant' },
    cta_footer: { h2: 'Prêt à transformer vos projets ?', p: 'Simulez votre prêt en 2 minutes et recevez une réponse immédiate.', btn1: 'Simulation gratuite', btn2: 'Parler à un conseiller', warning: 'Un crédit vous engage et doit être remboursé.' },
    loans_section: { h2: 'Nos Solutions', p: 'Le prêt qui vous correspond au taux fixe de 2%.', more: 'En savoir plus' },
    loan_detail: { 
      back: 'Retour aux offres', 
      advantages: 'Vos avantages exclusifs', 
      eligibility: 'Conditions d\'éligibilité', 
      conditions: ['Résider en Europe', 'Avoir plus de 18 ans', 'Revenu stable'], 
      labels: { maxAmount: 'Montant Max', maxDuration: 'Durée Max' },
      sim_title: 'Simulation Gratuite',
      sim_desc: 'Aucun engagement de votre part',
      advisor_title: 'Conseiller dédié',
      advisor_desc: 'Accompagnement personnalisé'
    },
    blog: {
      title: 'Le Mag Finance',
      subtitle: 'Conseils et analyses pour optimiser votre patrimoine.',
      readMore: 'Lire l\'article',
      back: 'Retour au blog',
      posts: [
        { id: 'rate-2-percent', title: 'Pourquoi 2% est le taux idéal pour vos projets', excerpt: 'Découvrez comment notre taux fixe transforme la gestion de votre budget.', content: 'Obtenir un crédit à 2% fixe est une opportunité rare dans le contexte économique actuel. Cela permet non seulement de réduire le coût total du crédit, mais aussi de planifier vos dépenses sur le long terme avec une visibilité totale. Chez FinancePlus, nous avons choisi de simplifier les structures de coûts pour offrir ce taux unique à tous nos clients éligibles.' },
        { id: 'real-estate-2024', title: 'Marché Immobilier 2024 : Le guide complet', excerpt: 'Les tendances, les prix et les meilleures stratégies pour acheter cette année.', content: 'L\'immobilier reste une valeur refuge. En 2024, les prix se stabilisent et de nouvelles opportunités apparaissent pour les primo-accédants. Avec un prêt immobilier FinancePlus à 2%, vous maximisez votre capacité d\'emprunt et sécurisez votre investissement face à l\'inflation.' },
        { id: 'debt-consolidation', title: 'Le rachat de crédit : Reprenez le contrôle', excerpt: 'Comment regrouper vos dettes peut vous faire économiser des milliers d\'euros.', content: 'Le rachat de crédit n\'est pas seulement une solution de secours, c\'est une stratégie financière intelligente. En regroupant plusieurs crédits à taux variables en un seul prêt unique à 2% chez FinancePlus, vous réduisez souvent votre mensualité globale et simplifiez la gestion de votre compte bancaire.' },
        { id: 'entrepreneurship-financing', title: 'Financer sa croissance en tant qu\'indépendant', excerpt: 'Les clés pour obtenir un financement rapide et efficace pour votre entreprise.', content: 'Les entrepreneurs ont besoin de réactivité. Notre offre de prêt entreprise à 2% est conçue pour accompagner votre croissance, qu\'il s\'agisse d\'investir dans du matériel, de recruter ou de financer votre besoin en fonds de roulement.' }
      ]
    },
    legal: {
      terms: {
        title: "Mentions Légales & Conditions Générales",
        intro: "Bienvenue sur FinancePlus. En utilisant nos services, vous acceptez sans réserve les présentes conditions générales d'utilisation. Ces conditions visent à définir les modalités de mise à disposition des services du site et les conditions d'utilisation par l'utilisateur.",
        sections: [
          { icon: 'Info', h3: "1. Identification de l'Éditeur", p: `Le site FinancePlus est édité par la société FinancePlus SAS. ${businessInfo} L'éditeur s'engage à respecter l'ensemble des lois concernant la mise en place et l'activité d'un site Internet.` },
          { icon: 'Shield', h3: "2. Agrément et Régulation", p: "FinancePlus est un intermédiaire en opérations de banque et en services de paiement (IOBSP), dûment enregistré auprès de l'ORIAS sous le numéro 21029679. Notre activité est placée sous la supervision de l'Autorité de Contrôle Prudentiel et de Résolution (ACPR), sise au 4 Place de Budapest, 75436 Paris." },
          { icon: 'FileText', h3: "3. Objet et Services", p: "FinancePlus propose des services de simulation de crédit, de mise en relation avec des organismes prêteurs et d'accompagnement dans la constitution de dossiers de financement. Nos offres à taux fixe de 2% (TAEG) sont soumises à conditions d'éligibilité et à l'acceptation finale du dossier par nos partenaires bancaires." },
          { icon: 'Zap', h3: "4. Avertissement Légal", p: "Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager. Toute demande de crédit ne constitue pas une obligation de prêt immédiate." },
          { icon: 'UserCheck', h3: "5. Responsabilités de l'Utilisateur", p: "L'utilisateur s'engage à fournir des informations exactes, sincères et à jour lors de l'utilisation du simulateur et du dépôt de son dossier. Toute fausse déclaration pourra entraîner l'annulation immédiate de la demande et des poursuites pénales le cas échéant." },
          { icon: 'Scale', h3: "6. Propriété Intellectuelle", p: "L'ensemble de ce site relève de la législation internationale sur le droit d'auteur, le droit des marques et, de façon générale, sur la propriété intellectuelle. Tous les droits de reproduction sont réservés." },
          { icon: 'Gavel', h3: "7. Loi Applicable", p: "Les présentes conditions générales sont soumises au droit français. En cas de litige, les tribunaux de Lyon (France) seront seuls compétents, après épuisement des voies de recours amiables." }
        ]
      },
      privacy: {
        title: "Politique de Confidentialité & RGPD",
        intro: "La protection de votre vie privée est une priorité absolue pour FinancePlus. Nous nous engageons à collecter et traiter vos données personnelles de manière transparente et sécurisée, conformément au Règlement Général sur la Protection des Données (RGPD).",
        sections: [
          { icon: 'Database', h3: "1. Données Collectées", p: "Dans le cadre de l'étude de votre solvabilité, nous collectons : votre identité (nom, prénom), vos coordonnées (email, téléphone, adresse), votre situation professionnelle, vos revenus et vos charges financières." },
          { icon: 'Target', h3: "2. Finalités du Traitement", p: "Vos données sont traitées pour : réaliser des simulations de prêt, évaluer votre risque de crédit, vous proposer des offres adaptées, et assurer la gestion administrative de votre dossier." },
          { icon: 'Lock', h3: "3. Sécurité des Données", p: "FinancePlus met en œuvre des mesures techniques et organisationnelles de pointe (chiffrement SSL/TLS, serveurs sécurisés en Europe) pour protéger vos données contre tout accès non autorisé, perte ou altération." },
          { icon: 'Users', h3: "4. Destinataires des Données", p: "Vos données ne sont transmises qu'à nos partenaires bancaires habilités et à nos conseillers internes. Nous ne vendons jamais vos données personnelles à des tiers à des fins marketing." },
          { icon: 'Clock', h3: "5. Durée de Conservation", p: "Les données des prospects sont conservées 3 ans après le dernier contact. Pour les clients, elles sont conservées pendant toute la durée du prêt, augmentée des délais de prescription légale (5 à 10 ans selon la nature du contrat)." },
          { icon: 'UserCheck', h3: "6. Vos Droits", p: "Vous disposez d'un droit d'accès, de rectification, de suppression, de portabilité et d'opposition au traitement de vos données. Pour exercer ces droits, contactez notre délégué à la protection des données (DPO) à l'adresse : dpo@financeplus.com." }
        ]
      },
      cookies: {
        title: "Politique d'Utilisation des Cookies",
        intro: "Pour vous offrir une expérience fluide et personnalisée, FinancePlus utilise des cookies. Cette politique vous explique ce que sont les cookies, comment nous les utilisons et comment vous pouvez les gérer.",
        sections: [
          { icon: 'Cookie', h3: "1. Qu'est-ce qu'un cookie ?", p: "Un cookie est un petit fichier texte déposé sur votre ordinateur ou mobile lors de la consultation d'un site web. Il permet au site de mémoriser vos actions et préférences sur une période donnée." },
          { icon: 'Settings', h3: "2. Cookies strictement nécessaires", p: "Ces cookies sont indispensables pour vous permettre de naviguer sur notre site et d'utiliser ses fonctionnalités, comme le simulateur de prêt ou l'accès sécurisé à votre espace." },
          { icon: 'BarChart', h3: "3. Cookies de Performance & Analytiques", p: "Nous utilisons des outils comme Google Analytics pour recueillir des informations anonymes sur la façon dont les visiteurs utilisent notre site. Cela nous aide à améliorer la navigation et la pertinence de nos contenus." },
          { icon: 'MousePointerClick', h3: "4. Cookies de Fonctionnalité", p: "Ils permettent au site de se souvenir de vos choix (comme votre langue préférée) pour vous offrir une expérience plus personnalisée." },
          { icon: 'EyeOff', h3: "5. Comment gérer vos cookies ?", p: "Vous pouvez configurer votre navigateur pour qu'il rejette tous les cookies ou qu'il vous avertisse lorsqu'un cookie est envoyé. Cependant, si vous désactivez les cookies, certaines parties de notre site pourraient ne pas fonctionner correctement." }
        ]
      }
    },
    faq: {
      h2: 'Questions Fréquentes',
      p: 'Tout ce que vous devez savoir sur nos services de financement.',
      q1: 'Comment obtenir un prêt ?',
      a1: 'Il vous suffit de remplir notre formulaire de simulation en ligne. Si le résultat vous convient, vous pourrez déposer votre dossier directement sur notre plateforme sécurisée.',
      q2: 'Quel est le délai de réponse ?',
      a2: 'Nous nous engageons à vous fournir une réponse de principe immédiate et une validation définitive sous 24 heures ouvrées après réception de votre dossier complet.',
      q3: 'Le taux de 2% est-il vraiment fixe ?',
      a3: 'Oui, absolument. Contrairement à d\'autres organismes, nous proposons un taux unique et fixe de 2% pour tous nos types de prêts, sans aucune mauvaise surprise.',
      q4: 'Quels documents sont requis ?',
      a4: 'Généralement, une pièce d\'identité, un justificatif de domicile et vos derniers justificatifs de revenus sont suffisants pour l\'étude de votre dossier.'
    },
    partners: {
      h2: 'Nos Partenaires',
      p: 'Nous collaborons avec les plus grandes institutions financières pour sécuriser vos projets.'
    },
    testimonials: {
      h2: 'Ils nous font confiance',
      p: 'Découvrez les expériences de nos clients satisfaits à travers l\'Europe.'
    },
    footer: {
      desc: 'Votre partenaire de confiance pour tous vos besoins de financement. Simple, rapide et transparent avec un taux unique de 2%.',
      titles: { loans: 'Nos Prêts', company: 'Entreprise', contact: 'Contact' },
      links: { about: 'À propos', blog: 'Blog', careers: 'Carrières', press: 'Presse', help: 'Aide', legal: 'Mentions Légales', privacy: 'Confidentialité', cookies: 'Cookies' },
      rights: '© 2024 FinancePlus. Tous droits réservés.'
    }
  },
  pl: {
    nav: { home: 'Strona główna', loans: 'Pożyczki', simulator: 'Symulator', about: 'O nas', contact: 'Kontakt', cta: 'Wniosek online' },
    hero: { badge: 'Wyjątkowe stałe oprocentowanie 2%', h1: 'Kredyt, który naprawdę Cię szanuje.', p: 'Sfinansuj swoje marzenia z unikalną stawką, bez ukrytych opłat i odpowiedzią w mniej niż 24 godziny.', cta1: 'Uruchom symulację', cta2: 'Zobacz jak to działa', reviews: '+10 000 pozytywnych opinii' },
    contact_page: {
      title: 'Skontaktuj się z nami',
      subtitle: 'Masz pytanie? Nasz zespół ekspertów jest do Twojej dyspozycji, aby pomóc Ci w realizacji Twoich projektów.',
      form_title: 'Wyślij nam wiadomość',
      form_desc: 'Gwarantowana odpowiedź w ciągu 24 godzin roboczych.',
      fields: {
        name: 'Pełne imię i nazwisko',
        email: 'Adres e-mail',
        subject: 'Temat',
        message: 'Twoja wiadomość',
        submit: 'Wyślij wiadomość',
        success: 'Dziękujemy! Twoja wiadomość została wysłana pomyślnie.'
      },
      info: {
        title: 'Nasze dane kontaktowe',
        address: '1 Place de la Bourse, 69002 Lyon, Francja',
        phone: '+33 4 72 40 58 58',
        email: 'contact@financeplus.com',
        hours: 'Pon - Pt: 09:00 - 18:00'
      }
    },
    form: {
      title: 'Wniosek o finansowanie',
      subtitle: 'Wypełnij formularz, aby złożyć wniosek. To proste i bezpieczne.',
      trust_title: 'Przejrzystość i Bezpieczeństwo',
      trust_text: 'Twoje informacje są dla nas cenne. Wykorzystujemy je wyłącznie do analizy wniosku. Wszystkie dane są przechowywane na serwerach w Europie zgodnie z RODO.',
      fields: {
        firstName: 'Imię',
        lastName: 'Nazwisko',
        amount: 'Kwota pożyczki (€)',
        duration: 'Okres (miesiące)',
        email: 'Adres e-mail',
        whatsapp: 'Numer Whatsapp',
        country: 'Kraj zamieszkania',
        profession: 'Zawód',
        income: 'Miesięczny dochód netto (€)',
        reason: 'Powód wniosku',
        reason_placeholder: 'Opisz krótko swój projekt...',
        consent1: 'Zapoznałem się i akceptuję politykę prywatności.',
        consent2: 'Przesyłając ten formularz, wyrażam zgodę na przetwarzanie danych przez FinancePlus.',
        warning: 'Kredyt wiąże się ze zobowiązaniem i musi zostać spłacony.',
        submit: 'Wyślij wniosek',
        select_country: 'Wybierz kraj',
        success: 'Wniosek wysłany! Skontaktujemy się w ciągu 24h.'
      }
    },
    legal: {
      terms: { title: "Nota Prawna", intro: "Witamy w FinancePlus.", sections: [{ icon: 'Info', h3: "1. Identyfikacja", p: businessInfo }] },
      privacy: { title: "Prywatność", intro: "Ochrona danych.", sections: [{ icon: 'Lock', h3: "1. RODO", p: "Zgodność z RODO." }] },
      cookies: { title: "Ciasteczka", intro: "Lepsze wrażenia.", sections: [{ icon: 'Cookie', h3: "1. Cel", p: "Personalizacja." }] }
    },
    stats: { clients: 'Zadowoleni klienci', exp: 'Lata doświadczenia', rating: 'Średnia ocena', safety: 'Gwarancja bezpieczeństwa' },
    comparison: { h3: 'Porównaj i oszczędzaj', p: 'Po co płacić więcej gdzie indziej?', market: 'Średnia rynkowa', ours: 'Stawka FinancePlus', saving: 'Oszczędność' },
    process: { h2: 'Twoja pożyczka', p: 'Prosty proces.', s1t: 'Symulacja', s1d: '30 sekund.', s2t: 'Dossier', s2d: 'Bezpiecznie.', s3t: 'Fundusze', s3d: 'Szybko.' },
    security: { rgpd: 'OCHRONA RODO', h24: 'ODPOWIEDŹ 24H', orias: 'ORIAS' },
    calculator: { title: 'Symulator', subtitle: 'Oblicz ratę.', amount: 'Kwota', duration: 'Czas', months: 'miesięcy', monthly: 'Rata', total: 'Suma', cta: 'Złóż wniosek' },
    cta_footer: { h2: 'Gotowy?', p: '2 minuty.', btn1: 'Symulacja', btn2: 'Doradca', warning: 'Kredyt to odpowiedzialność.' },
    loans_section: { h2: 'Nasze rozwiązania', p: '2% stałe.', more: 'Więcej' },
    loan_detail: { back: 'Powrót', advantages: 'Zalety', eligibility: 'Warunki', conditions: ['W Europie', '18+', 'Dochód'], labels: { maxAmount: 'Kwota maks.', maxDuration: 'Czas maks.' }, sim_title: 'Darmowa symulacja', sim_desc: 'Bez zobowiązań', advisor_title: 'Doradca', advisor_desc: 'Wsparcie' },
    faq: { h2: 'FAQ', p: 'Pytania.', q1: 'Jak?', a1: 'Online.', q2: 'Kiedy?', a2: '24h.', q3: 'Stałe?', a3: 'Tak.', q4: 'Dokumenty?', a4: 'ID i dochód.' },
    partners: { h2: 'Partnerzy', p: 'Najlepsi.' },
    testimonials: { h2: 'Opinie', p: 'Zadowoleni klienci.' },
    footer: { desc: 'Twój partner. 2%.', titles: { loans: 'Pożyczki', company: 'Firma', contact: 'Kontakt' }, links: { about: 'O nas', blog: 'Blog', careers: 'Kariera', press: 'Prasa', help: 'Pomoc', legal: 'Nota prawna', privacy: 'Prywatność', cookies: 'Ciasteczka' }, rights: '© 2024 FinancePlus.' }
  },
  de: {
    nav: { home: 'Startseite', loans: 'Kredite', simulator: 'Simulator', about: 'Über uns', contact: 'Kontakt', cta: 'Online-Anfrage' },
    hero: { badge: 'Festzins 2%', h1: 'Kredit mit Respekt.', p: '2% Festzins.', cta1: 'Starten', cta2: 'Mehr Infos', reviews: '10k+ Bewertungen' },
    contact_page: {
      title: 'Kontaktieren Sie uns',
      subtitle: 'Haben Sie eine Frage? Unser Expertenteam steht Ihnen zur Verfügung, um Sie bei Ihren Projekten zu unterstützen.',
      form_title: 'Schreiben Sie uns eine Nachricht',
      form_desc: 'Garantierte Antwort innerhalb von 24 Arbeitsstunden.',
      fields: {
        name: 'Vollständiger Name',
        email: 'E-Mail-Adresse',
        subject: 'Betreff',
        message: 'Ihre Nachricht',
        submit: 'Nachricht senden',
        success: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.'
      },
      info: {
        title: 'Unsere Kontaktdaten',
        address: '1 Place de la Bourse, 69002 Lyon, Frankreich',
        phone: '+33 4 72 40 58 58',
        email: 'contact@financeplus.com',
        hours: 'Mo - Fr: 09:00 - 18:00'
      }
    },
    form: {
      title: 'Finanzierungsantrag',
      subtitle: 'Füllen Sie das Formular aus, um Ihren Antrag einzureichen.',
      trust_title: 'Transparenz und Sicherheit',
      trust_text: 'Ihre Informationen sind wertvoll. Wir verwenden sie ausschließlich zur Prüfung Ihres Antrags. Alle Daten werden gemäß DSGVO in Europa gespeichert.',
      fields: {
        firstName: 'Vorname',
        lastName: 'Nachname',
        amount: 'Kreditbetrag (€)',
        duration: 'Laufzeit (Monate)',
        email: 'E-Mail-Adresse',
        whatsapp: 'Whatsapp-Nummer',
        country: 'Wohnsitzland',
        profession: 'Beruf',
        income: 'Netto-Monatseinkommen (€)',
        reason: 'Grund des Antrags',
        reason_placeholder: 'Beschreiben Sie kurz Ihr Projekt...',
        consent1: 'Ich habe die Datenschutzrichtlinie gelesen und akzeptiere sie.',
        consent2: 'Mit dem Absenden erkläre ich mich mit der Verarbeitung durch FinancePlus einverstanden.',
        warning: 'Ein Kredit verpflichtet Sie und muss zurückgezahlt werden.',
        submit: 'Antrag senden',
        select_country: 'Land auswählen',
        success: 'Antrag gesendet! Unsere Berater melden sich innerhalb von 24h.'
      }
    },
    legal: {
      terms: { title: "Impressum", intro: "Willkommen.", sections: [{ icon: 'Info', h3: "1. Identifikation", p: businessInfo }] },
      privacy: { title: "Datenschutz", intro: "Sicherheit.", sections: [{ icon: 'Lock', h3: "1. DSGVO", p: "DSGVO-konform." }] },
      cookies: { title: "Cookies", intro: "Erfahrung.", sections: [{ icon: 'Cookie', h3: "1. Warum?", p: "Analyse." }] }
    },
    stats: { clients: 'Kunden', exp: 'Jahre', rating: 'Note', safety: 'Sicherheit' },
    comparison: { h3: 'Vergleichen', p: 'Sparen.', market: 'Markt', ours: 'Unser', saving: 'Ersparnis' },
    process: { h2: 'Klick', p: 'Schnell.', s1t: 'Simulation', s1d: '30s.', s2t: 'Unterlagen', s2d: 'Sicher.', s3t: 'Geld', s3d: 'Sofort.' },
    security: { rgpd: 'DSGVO', h24: '24H', orias: 'ORIAS' },
    calculator: { title: 'Simulator', subtitle: 'Rate.', amount: 'Betrag', duration: 'Zeit', months: 'Monate', monthly: 'Rate', total: 'Gesamt', cta: 'Anfragen' },
    cta_footer: { h2: 'Bereit?', p: '2 Min.', btn1: 'Simulation', btn2: 'Berater', warning: 'Kredite müssen zurückgezahlt werden.' },
    loans_section: { h2: 'Lösungen', p: '2%.', more: 'Infos' },
    loan_detail: { back: 'Zurück', advantages: 'Vorteile', eligibility: 'Voraussetzungen', conditions: ['Europa', '18+', 'Einkommen'], labels: { maxAmount: 'Max. Betrag', maxDuration: 'Max. Zeit' }, sim_title: 'Simulation', sim_desc: 'Frei', advisor_title: 'Berater', advisor_desc: 'Support' },
    faq: { h2: 'FAQ', p: 'Infos.', q1: 'Wie?', a1: 'Online.', q2: 'Dauer?', a2: '24h.', q3: 'Fest?', a3: 'Ja.', q4: 'Dokumente?', a4: 'ID.' },
    partners: { h2: 'Partner', p: 'Sicher.' },
    testimonials: { h2: 'Bewertungen', p: 'Kunden.' },
    footer: { desc: 'Partner. 2%.', titles: { loans: 'Kredite', company: 'Firma', contact: 'Kontakt' }, links: { about: 'Über uns', blog: 'Blog', careers: 'Karriere', press: 'Presse', help: 'Hilfe', legal: 'Impressum', privacy: 'Datenschutz', cookies: 'Cookies' }, rights: '© 2024 FinancePlus.' }
  },
  nl: {
    nav: { home: 'Home', loans: 'Leningen', simulator: 'Simulator', about: 'Over ons', contact: 'Contact', cta: 'Aanvraag' },
    hero: { badge: '2% Vaste rente', h1: 'Krediet met respect.', p: '2% Tarief.', cta1: 'Start', cta2: 'Info', reviews: '10k+ reviews' },
    contact_page: {
      title: 'Contacteer ons',
      subtitle: 'Heeft u een vraag? Ons team van experts staat tot uw beschikking om u te begeleiden bij uw projecten.',
      form_title: 'Stuur ons een bericht',
      form_desc: 'Gegarandeerd antwoord binnen 24 werkuren.',
      fields: {
        name: 'Volledige naam',
        email: 'E-mailadres',
        subject: 'Onderwerp',
        message: 'Uw bericht',
        submit: 'Bericht versturen',
        success: 'Bedankt! Uw bericht is succesvol verzonden.'
      },
      info: {
        title: 'Onze contactgegevens',
        address: '1 Place de la Bourse, 69002 Lyon, Frankrijk',
        phone: '+33 4 72 40 58 58',
        email: 'contact@financeplus.com',
        hours: 'Ma - Vr: 09:00 - 18:00'
      }
    },
    form: {
      title: 'Financieringsaanvraag',
      subtitle: 'Vul het formulier in om uw aanvraag in te dienen.',
      trust_title: 'Transparantie en Veiligheid',
      trust_text: 'Uw informatie is waardevol. We gebruiken deze uitsluitend voor uw aanvraag. Alle data wordt in Europa opgeslagen volgens AVG.',
      fields: {
        firstName: 'Voornaam',
        lastName: 'Achternaam',
        amount: 'Leenbedrag (€)',
        duration: 'Looptijd (maanden)',
        email: 'E-mailadres',
        whatsapp: 'Whatsapp-nummer',
        country: 'Land van verblijf',
        profession: 'Beroep',
        income: 'Netto maandinkomen (€)',
        reason: 'Reden van aanvraag',
        reason_placeholder: 'Beschrijf kort uw project...',
        consent1: 'Ik heb het privacybeleid gelezen en ga akkoord.',
        consent2: 'Door dit te verzenden, stem ik in met verwerking door FinancePlus.',
        warning: 'Geld lenen kost geld.',
        submit: 'Aanvraag verzenden',
        select_country: 'Selecteer land',
        success: 'Aanvraag verzonden! We nemen binnen 24u contact op.'
      }
    },
    legal: {
      terms: { title: "Juridisch", intro: "Welkom.", sections: [{ icon: 'Info', h3: "1. Identificatie", p: businessInfo }] },
      privacy: { title: "Privacy", intro: "Beveiliging.", sections: [{ icon: 'Lock', h3: "1. AVG", p: "AVG-conform." }] },
      cookies: { title: "Cookies", intro: "Ervaring.", sections: [{ icon: 'Cookie', h3: "1. Gebruik", p: "Analyse." }] }
    },
    stats: { clients: 'Klanten', exp: 'Jaren', rating: 'Score', safety: 'Veiligheid' },
    comparison: { h3: 'Vergelijk', p: 'Bespaar.', market: 'Markt', ours: 'Onze', saving: 'Besparing' },
    process: { h2: 'Klik', p: 'Snel.', s1t: 'Simulatie', s1d: '30s.', s2t: 'Dossier', s2d: 'Veilig.', s3t: 'Geld', s3d: 'Snel.' },
    security: { rgpd: 'AVG', h24: '24U', orias: 'ORIAS' },
    calculator: { title: 'Simulator', subtitle: 'Maandbedrag.', amount: 'Bedrag', duration: 'Tijd', months: 'maanden', monthly: 'Maandbedrag', total: 'Totaal', cta: 'Aanvragen' },
    cta_footer: { h2: 'Klaar?', p: '2 Min.', btn1: 'Simulatie', btn2: 'Adviseur', warning: 'Geld lenen kost geld.' },
    loans_section: { h2: 'Oplossingen', p: '2%.', more: 'Info' },
    loan_detail: { back: 'Terug', advantages: 'Voordelen', eligibility: 'Voorwaarden', conditions: ['Europa', '18+', 'Inkomsten'], labels: { maxAmount: 'Max bedrag', maxDuration: 'Max tijd' }, sim_title: 'Simulatie', sim_desc: 'Gratis', advisor_title: 'Adviseur', advisor_desc: 'Support' },
    faq: { h2: 'FAQ', p: 'Vragen.', q1: 'Hoe?', a1: 'Online.', q2: 'Tijd?', a2: '24u.', q3: 'Vast?', a3: 'Ja.', q4: 'Documenten?', a4: 'ID.' },
    partners: { h2: 'Partners', p: 'Veilig.' },
    testimonials: { h2: 'Reviews', p: 'Klanten.' },
    footer: { desc: 'Partner. 2%.', titles: { loans: 'Leningen', company: 'Bedrijf', contact: 'Contact' }, links: { about: 'Over ons', blog: 'Blog', careers: 'Jobs', press: 'Pers', help: 'Help', legal: 'Juridisch', privacy: 'Privacy', cookies: 'Cookies' }, rights: '© 2024 FinancePlus.' }
  },
  it: {
    nav: { home: 'Home', loans: 'Prestiti', simulator: 'Simulatore', about: 'Chi siamo', contact: 'Contatti', cta: 'Richiesta' },
    hero: { badge: 'Tasso 2%', h1: 'Credito con rispetto.', p: '2% Fisso.', cta1: 'Inizia', cta2: 'Info', reviews: '10k+ recensioni' },
    contact_page: {
      title: 'Contattaci',
      subtitle: 'Hai una domanda? Il nostro team di esperti è a tua disposizione per accompagnarti nei tuoi progetti.',
      form_title: 'Inviaci un messaggio',
      form_desc: 'Risposta garantita entro 24 ore lavorative.',
      fields: {
        name: 'Nome completo',
        email: 'Indirizzo Email',
        subject: 'Oggetto',
        message: 'Il tuo messaggio',
        submit: 'Invia il messaggio',
        success: 'Grazie! Il tuo messaggio è stato inviato con successo.'
      },
      info: {
        title: 'I nostri contatti',
        address: '1 Place de la Bourse, 69002 Lione, Francia',
        phone: '+33 4 72 40 58 58',
        email: 'contact@financeplus.com',
        hours: 'Lun - Ven: 09:00 - 18:00'
      }
    },
    form: {
      title: 'Richiesta di Finanziamento',
      subtitle: 'Compila il modulo per inviare la tua richiesta.',
      trust_title: 'Trasparenza e Sicurezza',
      trust_text: 'Le tue informazioni sono preziose. Le usiamo esclusivamente per la tua pratica. Tutti i dati sono protetti secondo il GDPR in Europa.',
      fields: {
        firstName: 'Nome',
        lastName: 'Cognome',
        amount: 'Importo del Prestito (€)',
        duration: 'Durata (mesi)',
        email: 'Indirizzo Email',
        whatsapp: 'Numero Whatsapp',
        country: 'Paese di residenza',
        profession: 'Professione',
        income: 'Reddito mensile netto (€)',
        reason: 'Motivo della richiesta',
        reason_placeholder: 'Descrivi brevemente il tuo progetto...',
        consent1: 'Dichiaro di aver letto e accetto l\'informativa sulla privacy.',
        consent2: 'Inviando questo modulo, acconsento al trattamento da parte di FinancePlus.',
        warning: 'Il credito comporta un obbligo di rimborso.',
        submit: 'Invia la richiesta',
        select_country: 'Seleziona un paese',
        success: 'Richiesta inviata! Ti contatteremo entro 24 ore.'
      }
    },
    legal: {
      terms: { title: "Legale", intro: "Benvenuti.", sections: [{ icon: 'Info', h3: "1. Identificazione", p: businessInfo }] },
      privacy: { title: "Privacy", intro: "Sicurezza.", sections: [{ icon: 'Lock', h3: "1. GDPR", p: "Protezione GDPR." }] },
      cookies: { title: "Cookie", intro: "Esperienza.", sections: [{ icon: 'Cookie', h3: "1. Uso", p: "Analisi." }] }
    },
    stats: { clients: 'Clienti', exp: 'Anni', rating: 'Voto', safety: 'Sicurezza' },
    comparison: { h3: 'Confronta', p: 'Risparmia.', market: 'Mercato', ours: 'Nostro', saving: 'Risparmio' },
    process: { h2: 'Click', p: 'Veloce.', s1t: 'Simulazione', s1d: '30s.', s2t: 'Dossier', s2d: 'Sicuro.', s3t: 'Fondi', s3d: 'Veloce.' },
    security: { rgpd: 'GDPR', h24: '24H', orias: 'ORIAS' },
    calculator: { title: 'Simulatore', subtitle: 'Rata.', amount: 'Importo', duration: 'Tempo', months: 'mesi', monthly: 'Rata', total: 'Totale', cta: 'Richiedi' },
    cta_footer: { h2: 'Pronto?', p: '2 Min.', btn1: 'Simulazione', btn2: 'Consulente', warning: 'Il credito va rimborsato.' },
    loans_section: { h2: 'Soluzioni', p: '2%.', more: 'Info' },
    loan_detail: { back: 'Indietro', advantages: 'Vantaggi', eligibility: 'Requisiti', conditions: ['Europa', '18+', 'Reddito'], labels: { maxAmount: 'Max importo', maxDuration: 'Max tempo' }, sim_title: 'Simulazione', sim_desc: 'Gratis', advisor_title: 'Consulente', advisor_desc: 'Supporto' },
    faq: { h2: 'FAQ', p: 'Domande.', q1: 'Come?', a1: 'Online.', q2: 'Tempo?', a2: '24h.', q3: 'Fisso?', a3: 'Sì.', q4: 'Documentos?', a4: 'ID.' },
    partners: { h2: 'Partner', p: 'Sicuro.' },
    testimonials: { h2: 'Recensioni', p: 'Clienti.' },
    footer: { desc: 'Partner. 2%.', titles: { loans: 'Prestiti', company: 'Azienda', contact: 'Contatti' }, links: { about: 'Chi siamo', blog: 'Blog', careers: 'Lavoro', press: 'Stampa', help: 'Aiuto', legal: 'Note legali', privacy: 'Privacy', cookies: 'Cookie' }, rights: '© 2024 FinancePlus.' }
  },
  pt: {
    nav: { home: 'Início', loans: 'Empréstimos', simulator: 'Simulador', about: 'Sobre', contact: 'Contacto', cta: 'Pedido' },
    hero: { badge: 'Taxa 2%', h1: 'Crédito com respeito.', p: '2% Fixo.', cta1: 'Começar', cta2: 'Info', reviews: '10k+ avaliações' },
    contact_page: {
      title: 'Contacte-nos',
      subtitle: 'Tem uma pergunta? A nossa equipa de especialistas está à sua disposição para o acompanhar nos seus projetos.',
      form_title: 'Envie-nos uma mensagem',
      form_desc: 'Resposta garantida em 24 horas úteis.',
      fields: {
        name: 'Nome completo',
        email: 'Endereço Email',
        subject: 'Assunto',
        message: 'Sua mensagem',
        submit: 'Enviar mensagem',
        success: 'Obrigado! Sua mensagem foi enviada com sucesso.'
      },
      info: {
        title: 'Nossos contactos',
        address: '1 Place de la Bourse, 69002 Lyon, França',
        phone: '+33 4 72 40 58 58',
        email: 'contact@financeplus.com',
        hours: 'Seg - Sex: 09:00 - 18:00'
      }
    },
    form: {
      title: 'Pedido de Financiamento',
      subtitle: 'Preencha o formulário para submeter o seu pedido.',
      trust_title: 'Transparência e Segurança',
      trust_text: 'As suas informações sont preciosas. Utilizamos exclusivamente para o seu processo. Todos os dados são protegidos pelo RGPD na Europa.',
      fields: {
        firstName: 'Nome',
        lastName: 'Apelido',
        amount: 'Valor do Empréstimo (€)',
        duration: 'Duração (meses)',
        email: 'Endereço Email',
        whatsapp: 'Número Whatsapp',
        country: 'País de residência',
        profession: 'Profissão',
        income: 'Rendimento mensal líquido (€)',
        reason: 'Motivo do pedido',
        reason_placeholder: 'Descreva brevemente o seu projeto...',
        consent1: 'Declaro que li e aceito a política de privacidade.',
        consent2: 'Ao submeter, consinto o tratamento pela FinancePlus.',
        warning: 'Um crédito obriga ao reembolso.',
        submit: 'Enviar pedido',
        select_country: 'Selecione um país',
        success: 'Pedido enviado! Contactaremos em 24h.'
      }
    },
    legal: {
      terms: { title: "Jurídico", intro: "Bem-vindo.", sections: [{ icon: 'Info', h3: "1. Identificação", p: businessInfo }] },
      privacy: { title: "Privacidade", intro: "Segurança.", sections: [{ icon: 'Lock', h3: "1. RGPD", p: "Proteção RGPD." }] },
      cookies: { title: "Cookies", intro: "Experiência.", sections: [{ icon: 'Cookie', h3: "1. Uso", p: "Função." }] }
    },
    stats: { clients: 'Clientes', exp: 'Anos', rating: 'Nota', safety: 'Segurança' },
    comparison: { h3: 'Compare', p: 'Poupe.', market: 'Mercado', ours: 'Nossa', saving: 'Poupança' },
    process: { h2: 'Clique', p: 'Rápido.', s1t: 'Simulação', s1d: '30s.', s2t: 'Dossier', s2d: 'Seguro.', s3t: 'Fundo', s3d: 'Rápido.' },
    security: { rgpd: 'RGPD', h24: '24H', orias: 'ORIAS' },
    calculator: { title: 'Simulador', subtitle: 'Mensalidade.', amount: 'Valor', duration: 'Tempo', months: 'meses', monthly: 'Mensualidade', total: 'Total', cta: 'Pedir' },
    cta_footer: { h2: 'Pronto?', p: '2 Min.', btn1: 'Simulação', btn2: 'Consultor', warning: 'O crédito obriga ao reembolso.' },
    loans_section: { h2: 'Soluções', p: '2%.', more: 'Info' },
    loan_detail: { back: 'Voltar', advantages: 'Vantagens', eligibility: 'Requisitos', conditions: ['Europa', '18+', 'Rendimento'], labels: { maxAmount: 'Valor máx.', maxDuration: 'Tempo máx.' }, sim_title: 'Simulação', sim_desc: 'Grátis', advisor_title: 'Consultor', advisor_desc: 'Suporte' },
    faq: { h2: 'FAQ', p: 'Perguntas.', q1: 'Como?', a1: 'Online.', q2: 'Tempo?', a2: '24h.', q3: 'Fixo?', a3: 'Sim.', q4: 'Documentos?', a4: 'ID.' },
    partners: { h2: 'Parceiros', p: 'Seguro.' },
    testimonials: { h2: 'Avaliações', p: 'Clientes.' },
    footer: { desc: 'Parceiro. 2%.', titles: { loans: 'Empréstimos', company: 'Empresa', contact: 'Contacto' }, links: { about: 'Sobre', blog: 'Blog', careers: 'Carreiras', press: 'Imprensa', help: 'Ajuda', legal: 'Jurídico', privacy: 'Privacidade', cookies: 'Cookies' }, rights: '© 2024 FinancePlus.' }
  },
  es: {
    nav: { home: 'Inicio', loans: 'Préstamos', simulator: 'Simulador', about: 'Sobre nosotros', contact: 'Contacto', cta: 'Solicitud' },
    hero: { badge: 'Tasa 2%', h1: 'Crédito con respeto.', p: '2% Fijo.', cta1: 'Empezar', cta2: 'Info', reviews: '10k+ reseñas' },
    contact_page: {
      title: 'Contáctenos',
      subtitle: '¿Tiene alguna pregunta? Nuestro equipo de expertos está a su disposición para acompañarle en sus proyectos.',
      form_title: 'Envíenos un mensaje',
      form_desc: 'Respuesta garantizada en 24 horas laborables.',
      fields: {
        name: 'Nombre completo',
        email: 'Dirección Email',
        subject: 'Asunto',
        message: 'Tu mensaje',
        submit: 'Enviar mensaje',
        success: '¡Gracias! Tu mensaje ha sido enviado con éxito.'
      },
      info: {
        title: 'Nuestros contactos',
        address: '1 Place de la Bourse, 69002 Lyon, Francia',
        phone: '+33 4 72 40 58 58',
        email: 'contact@financeplus.com',
        hours: 'Lun - Vie: 09:00 - 18:00'
      }
    },
    form: {
      title: 'Demanda de Financiación',
      subtitle: 'Complete el formulario para enviar su solicitud.',
      trust_title: 'Transparencia y Seguridad',
      trust_text: 'Su información es valiosa. La usamos exclusivamente para su expediente. Todos los datos están protegidos por el RGPD en Europa.',
      fields: {
        firstName: 'Nombre',
        lastName: 'Apellido',
        amount: 'Importe del Préstamo (€)',
        duration: 'Plazo (meses)',
        email: 'Dirección Email',
        whatsapp: 'Número Whatsapp',
        country: 'País de residencia',
        profession: 'Profesión',
        income: 'Ingresos mensuales netos (€)',
        reason: 'Motivo de la demanda',
        reason_placeholder: 'Describa brevemente su proyecto...',
        consent1: 'Declaro haber leído y acepto la política de privacidad.',
        consent2: 'Al enviar, consiento el tratamiento por parte de FinancePlus.',
        warning: 'Un crédito le compromete y debe ser devuelto.',
        submit: 'Enviar mi solicitud',
        select_country: 'Seleccione un país',
        success: '¡Solicitud enviada! Contactaremos en 24h.'
      }
    },
    legal: {
      terms: { title: "Aviso Legal", intro: "Bienvenido.", sections: [{ icon: 'Info', h3: "1. Identificación", p: businessInfo }] },
      privacy: { title: "Privacidad", intro: "Seguridad.", sections: [{ icon: 'Lock', h3: "1. RGPD", p: "Protección RGPD." }] },
      cookies: { title: "Cookies", intro: "Experiencia.", sections: [{ icon: 'Cookie', h3: "1. Uso", p: "Analítica." }] }
    },
    stats: { clients: 'Clientes', exp: 'Años', rating: 'Nota', safety: 'Seguridad' },
    comparison: { h3: 'Compara', p: 'Ahorra.', market: 'Mercado', ours: 'Nuestra', saving: 'Ahorro' },
    process: { h2: 'Click', p: 'Rápido.', s1t: 'Simulación', s1d: '30s.', s2t: 'Dossier', s2d: 'Seguro.', s3t: 'Fondos', s3d: 'Rápido.' },
    security: { rgpd: 'RGPD', h24: '24H', orias: 'ORIAS' },
    calculator: { title: 'Simulador', subtitle: 'Cuota.', amount: 'Importe', duration: 'Tiempo', months: 'meses', monthly: 'Cuota', total: 'Total', cta: 'Solicitar' },
    cta_footer: { h2: '¿Listo?', p: '2 Min.', btn1: 'Simulación', btn2: 'Asesor', warning: 'Un crédito le compromete.' },
    loans_section: { h2: 'Soluciones', p: '2%.', more: 'Info' },
    loan_detail: { back: 'Volver', advantages: 'Ventajas', eligibility: 'Requisitos', conditions: ['Europa', '18+', 'Ingresos'], labels: { maxAmount: 'Max importe', maxDuration: 'Max tiempo' }, sim_title: 'Simulación', sim_desc: 'Gratis', advisor_title: 'Asesor', advisor_desc: 'Soporte' },
    faq: { h2: 'FAQ', p: 'Preguntas.', q1: '¿Cómo?', a1: 'Online.', q2: 'Tiempo?', a2: '24h.', q3: 'Fijo?', a3: 'Sí.', q4: 'Documentos?', a4: 'ID.' },
    partners: { h2: 'Socios', p: 'Seguro.' },
    testimonials: { h2: 'Reseñas', p: 'Clientes.' },
    footer: { desc: 'Socio. 2%.', titles: { loans: 'Préstamos', company: 'Empresa', contact: 'Contacto' }, links: { about: 'Sobre nosotros', blog: 'Blog', careers: 'Empleo', press: 'Prensa', help: 'Ayuda', legal: 'Aviso legal', privacy: 'Privacidad', cookies: 'Cookies' }, rights: '© 2024 FinancePlus.' }
  }
};
