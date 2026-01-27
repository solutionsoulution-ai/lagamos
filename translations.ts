
import { Language } from './types';

const businessInfo = "FinancePlus - Siège social : 1 Place de la Bourse, 69002 Lyon, France. RCS Lyon 891 785 359 | N° SIRET : 991 785 059 00027 | N° ORIAS : 21029679.";

export const translations: Record<Language, any> = {
  fr: {
    nav: { home: 'Accueil', loans: 'Prêts', simulator: 'Simulateur', about: 'À propos', contact: 'Contact', cta: 'Demande en ligne' },
    hero: { badge: 'Taux Exceptionnel de 2% Fixe', h1: 'Le crédit qui vous respecte vraiment.', p: 'Financez vos rêves avec un taux unique, sans frais cachés et une réponse en moins de 24 heures.', cta1: 'Démarrer ma simulation', cta2: 'Voir comment ça marche', reviews: '+10,000 avis positifs' },
    who_we_are: {
      title: 'Qui sommes-nous ?',
      subtitle: 'Une vision humaine du crédit.',
      p1: 'FinancePlus n\'est pas seulement un organisme de crédit. Nous sommes une équipe d\'experts passionnés qui croient que le financement est le moteur des projets de vie.',
      p2: 'Depuis notre siège à Lyon, nous avons développé une technologie exclusive permettant d\'offrir un taux fixe de 2% à nos clients européens, tout en garantissant une sécurité bancaire de premier ordre.',
      btn: 'Découvrir notre histoire'
    },
    about_page: {
      title: 'Notre Histoire',
      subtitle: 'Redéfinir le crédit pour un avenir plus juste.',
      mission_title: 'Notre Mission',
      mission_text: 'Chez FinancePlus, nous croyons que l\'accès au financement ne devrait pas être un parcours du combattant. Notre mission est de fournir des solutions de crédit transparentes, rapides et éthiques à un taux fixe unique de 2%.',
      vision_title: 'Une vision européenne',
      vision_text: 'Fondée à Lyon et rayonnant désormais sur toute l\'Europe, FinancePlus s\'impose comme le leader du crédit responsable.',
      values_title: 'Nos Valeurs',
      values: [
        { title: 'Intégrité', desc: 'Une transparence totale sur nos conditions.' },
        { title: 'Innovation', desc: 'Des outils digitaux simplifiés.' },
        { title: 'Proximité', desc: 'Des conseillers dédiés.' }
      ],
      stats: { years: 'Années d\'expertise', countries: 'Pays couverts', loans: 'Prêts accordés' }
    },
    why_choose_us: {
      title: 'Pourquoi nous choisir ?',
      subtitle: 'Une expertise reconnue et des conditions transparentes pour vos projets.',
      items: [
        { title: 'Taux Fixe Garanti', desc: 'Profitez d\'un taux unique de 2% sur toute la durée de votre prêt.' },
        { title: 'Rapidité d\'Exécution', desc: 'Réponse de principe immédiate et déblocage des fonds en un temps record.' },
        { title: 'Sécurité Maximale', desc: 'Vos données sont protégées par les protocoles de sécurité les plus avancés.' }
      ]
    },
    success_page: {
      title: 'Félicitations !',
      subtitle: 'Votre demande a été enregistrée.',
      message: 'Un conseiller analyse votre dossier. Réponse sous 24h.',
      steps_title: 'Prochaines étapes',
      steps: ['Analyse de solvabilité.', 'Prise de contact.', 'Signature électronique.', 'Déblocage des fonds.'],
      trust_labels: { secured: 'Sécurisé', email: 'Confirmation Email', advisor: 'Conseiller dédié' },
      cta_home: 'Retour à l\'accueil',
      cta_blog: 'Lire nos conseils'
    },
    contact_page: {
      title: 'Contactez-nous',
      subtitle: 'Notre équipe est à votre disposition.',
      form_title: 'Envoyez-nous un message',
      form_desc: 'Réponse sous 24 heures.',
      fields: { name: 'Nom complet', email: 'Email', subject: 'Sujet', message: 'Message', submit: 'Envoyer', success: 'Message envoyé !' },
      info: { title: 'Nos coordonnées', address: '1 Place de la Bourse, Lyon', phone: '+33 4 72 40 58 58', email: 'contact@financeplus.com', hours: 'Lun-Ven : 9h-18h' }
    },
    form: {
      title: 'Demande de Financement',
      subtitle: 'Simple et sécurisé.',
      trust_title: 'Transparence et Sécurité',
      trust_text: 'Vos données sont protégées par le RGPD.',
      fields: {
        firstName: 'Prénom', lastName: 'Nom', amount: 'Montant (€)', duration: 'Durée (mois)', email: 'Email', whatsapp: 'Whatsapp', country: 'Pays', profession: 'Profession', income: 'Revenu (€)', reason: 'Motif',
        reason_placeholder: 'Votre projet...', consent1: 'J\'accepte la politique de confidentialité.', consent2: 'Données traitées selon le RGPD.', warning: 'Un crédit vous engage et doit être remboursé.', submit: 'Envoyer ma demande', select_country: 'Sélectionnez un pays', success: 'Demande envoyée !'
      }
    },
    stats: { clients: 'Clients satisfaits', exp: 'Années d\'expertise', rating: 'Note moyenne', safety: 'Sécurité garantie' },
    comparison: { h3: 'Comparez et économisez', p: 'Taux unique de 2%.', market: 'Marché', ours: 'FinancePlus', saving: 'Économie constatée' },
    process: { h2: 'Votre prêt en quelques clics', p: 'Processus simplifié.', s1t: 'Simulation', s1d: '30 secondes.', s2t: 'Dossier', s2d: '100% sécurisé.', s3t: 'Fonds', s3d: 'Sous 48h.' },
    security: { rgpd: 'PROTECTION RGPD', h24: 'RÉPONSE EN 24H', orias: 'AGRÉÉ ORIAS' },
    calculator: { title: 'Simulateur Express', subtitle: 'Calculez votre mensualité.', amount: 'Montant', duration: 'Durée', months: 'mois', monthly: 'Mensualité', total: 'Coût total', cta: 'Demander ce prêt' },
    cta_footer: { h2: 'Prêt à transformer vos projets ?', p: 'Simulation en 2 minutes.', btn1: 'Simulation gratuite', btn2: 'Conseiller', warning: 'Un crédit vous engage.' },
    loans_section: { h2: 'Nos Solutions', p: 'Taux fixe de 2%.', more: 'En savoir plus' },
    loan_detail: { back: 'Retour', advantages: 'Avantages', eligibility: 'Éligibilité', conditions: ['Résider en Europe', '18 ans +', 'Revenu stable'], labels: { maxAmount: 'Montant Max', maxDuration: 'Durée Max' }, sim_title: 'Simulation', sim_desc: 'Sans engagement', advisor_title: 'Conseiller', advisor_desc: 'Accompagnement' },
    blog: {
      title: 'Le Mag Finance',
      subtitle: 'Optimisez votre patrimoine.',
      readMore: 'Lire l\'article',
      back: 'Retour au blog',
      posts: [{ id: 'rate-2-percent', title: 'Pourquoi 2% ?', excerpt: 'Le taux idéal.', content: 'Stabilité et visibilité...' }]
    },
    legal: {
      terms: { title: "Mentions Légales", intro: "Conditions d'utilisation.", sections: [{ icon: 'Info', h3: "Identification", p: businessInfo }] },
      privacy: { title: "Confidentialité", intro: "RGPD.", sections: [{ icon: 'Lock', h3: "Données", p: "Sûreté totale." }] },
      cookies: { title: "Cookies", intro: "Usage.", sections: [{ icon: 'Cookie', h3: "Gestion", p: "Amélioration." }] }
    },
    faq: { h2: 'Questions', p: 'Tout savoir.', q1: 'Comment ?', a1: 'En ligne.', q2: 'Délai ?', a2: '24h.', q3: 'Fixe ?', a3: 'Oui, 2%.', q4: 'Documents ?', a4: 'ID et revenus.' },
    partners: { h2: 'Partenaires', p: 'Confiance.' },
    testimonials: { h2: 'Avis', p: 'Confiance.' },
    footer: { desc: 'Partenaire crédit à 2%.', titles: { loans: 'Prêts', company: 'Entreprise', contact: 'Contact' }, links: { about: 'À propos', blog: 'Blog', careers: 'Jobs', press: 'Presse', help: 'Aide', legal: 'Légal', privacy: 'Privé', cookies: 'Cookies' }, rights: '© 2024 FinancePlus.' }
  },
  pl: {
    nav: { home: 'Strona główna', loans: 'Pożyczki', simulator: 'Symulator', about: 'O nas', contact: 'Kontakt', cta: 'Wniosek online' },
    hero: { badge: 'Stałe 2%', h1: 'Kredyt z szacunkiem.', p: 'Sfinansuj marzenia z 2%.', cta1: 'Symulacja', cta2: 'Jak to działa', reviews: '+10k opinii' },
    who_we_are: {
      title: 'Kim jesteśmy?',
      subtitle: 'Ludzka wizja kredytu.',
      p1: 'FinancePlus to nie tylko instytucja pożyczkowa. Jesteśmy zespołem pasjonatów, którzy wierzą, że finansowanie jest motorem projektów życiowych.',
      p2: 'Z naszej siedziby w Lyonie opracowaliśmy ekskluzywną technologię pozwalającą oferować stałe oprocentowanie 2% naszym europejskim klientom.',
      btn: 'Poznaj naszą historię'
    },
    about_page: {
      title: 'Nasza Historia',
      subtitle: 'Kredyt dla lepszej przyszłości.',
      mission_title: 'Misja',
      mission_text: 'Przejrzyste rozwiązania kredytowe ze stałym 2%.',
      vision_title: 'Wizja',
      vision_text: 'Lider odpowiedzialnego kredytowania w Europie.',
      values_title: 'Wartości',
      values: [{ title: 'Integralność', desc: 'Pełna przejrzystość.' }, { title: 'Innowacja', desc: 'Narzędzia cyfrowe.' }, { title: 'Bliskość', desc: 'Doradcy.' }],
      stats: { years: 'Lat doświadczenia', countries: 'Kraje', loans: 'Pożyczki' }
    },
    why_choose_us: {
      title: 'Dlaczego my?',
      subtitle: 'Uznana wiedza i przejrzyste warunki dla Twoich projektów.',
      items: [
        { title: 'Gwarantowane Stałe Oprocentowanie', desc: 'Ciesz się unikalną stawką 2% przez cały okres pożyczki.' },
        { title: 'Szybkość Działania', desc: 'Natychmiastowa odpowiedź i wypłata środków w rekordowym czasie.' },
        { title: 'Maksymalne Bezpieczeństwo', desc: 'Twoje dane są chronione przez najbardziej zaawansowane protokoły.' }
      ]
    },
    success_page: {
      title: 'Gratulacje !',
      subtitle: 'Twój wniosek został zarejestrowany.',
      message: 'Doradca analizuje Twoje zgłoszenie. Odpowiedź w ciągu 24h.',
      steps_title: 'Następne kroki',
      steps: ['Analiza wypłacalności', 'Kontakt telefoniczny', 'Podpis cyfrowy', 'Wypłata środków'],
      trust_labels: { secured: 'Zabezpieczone', email: 'E-mail z potwierdzeniem', advisor: 'Dedykowany doradca' },
      cta_home: 'Powrót do strony głównej',
      cta_blog: 'Przeczytaj nasz blog'
    },
    contact_page: {
      title: 'Skontaktuj się z nami',
      subtitle: 'Nasz zespół jest do Twojej dyspozycji.',
      form_title: 'Wyślij nam wiadomość',
      form_desc: 'Odpowiedź w ciągu 24 godzin.',
      fields: { name: 'Imię i nazwisko', email: 'Email', subject: 'Temat', message: 'Wiadomość', submit: 'Wyślij', success: 'Wiadomość wysłana!' },
      info: { title: 'Nasze dane kontaktowe', address: '1 Place de la Bourse, Lyon', phone: '+33 4 72 40 58 58', email: 'contact@financeplus.com', hours: 'Pon-Pt : 9h-18h' }
    },
    form: {
      title: 'Wniosek o finansowanie',
      subtitle: 'Proste i bezpieczne.',
      trust_title: 'Przejrzystość i bezpieczeństwo',
      trust_text: 'Twoje dane są chronione przez RODO.',
      fields: {
        firstName: 'Imię', lastName: 'Nazwisko', amount: 'Kwota (€)', duration: 'Okres (miesiące)', email: 'Email', whatsapp: 'Whatsapp', country: 'Kraj', profession: 'Zawód', income: 'Dochód (€)', reason: 'Powód',
        reason_placeholder: 'Twój projekt...', consent1: 'Akceptuję politykę prywatności.', consent2: 'Dane przetwarzane zgodnie z RODO.', warning: 'Kredyt to zobowiązanie i musi zostać spłacony.', submit: 'Wyślij wniosek', select_country: 'Wybierz kraj', success: 'Wniosek wysłany!'
      }
    },
    stats: { clients: 'Zadowoleni klienci', exp: 'Lat doświadczenia', rating: 'Średnia ocena', safety: 'Gwarancja bezpieczeństwa' },
    comparison: { h3: 'Porównaj i oszczędzaj', p: 'Stała stawka 2%.', market: 'Rynek', ours: 'FinancePlus', saving: 'Zauważone oszczędności' },
    process: { h2: 'Twoja pożyczka w kilku kliknięciach', p: 'Uproszczony proces.', s1t: 'Symulacja', s1d: '30 sekund.', s2t: 'Dokumentacja', s2d: '100% bezpieczne.', s3t: 'Fundusze', s3d: 'W ciągu 48h.' },
    security: { rgpd: 'OCHRONA RODO', h24: 'ODPOWIEDŹ W 24H', orias: 'AUTORYZACJA ORIAS' },
    calculator: { title: 'Ekspresowy symulator', subtitle: 'Oblicz swoją ratę.', amount: 'Kwota', duration: 'Okres', months: 'miesiące', monthly: 'Miesięczna rata', total: 'Całkowity koszt', cta: 'Złóż wniosek' },
    cta_footer: { h2: 'Gotowy na realizację swoich projektów?', p: 'Symulacja w 2 minuty.', btn1: 'Bezpłatna symulacja', btn2: 'Doradca', warning: 'Kredyt to zobowiązanie.' },
    loans_section: { h2: 'Nasze rozwiązania', p: 'Stała stawka 2%.', more: 'Dowiedz się więcej' },
    loan_detail: { back: 'Powrót', advantages: 'Zalety', eligibility: 'Kwalifikowalność', conditions: ['Zamieszkanie w Europie', '18 lat +', 'Stabilny dochód'], labels: { maxAmount: 'Maks. kwota', maxDuration: 'Maks. okres' }, sim_title: 'Symulacja', sim_desc: 'Bez zobowiązań', advisor_title: 'Doradca', advisor_desc: 'Wsparcie' },
    blog: {
      title: 'Magazyn Finansowy',
      subtitle: 'Optymalizuj swój majątek.',
      readMore: 'Przeczytaj artykuł',
      back: 'Powrót do bloga',
      posts: [{ id: 'rate-2-percent', title: 'Dlaczego 2%?', excerpt: 'Idealna stawka.', content: 'Stabilność i przejrzystość...' }]
    },
    legal: {
      terms: { title: "Informacje prawne", intro: "Warunki korzystania.", sections: [{ icon: 'Info', h3: "Identyfikacja", p: businessInfo }] },
      privacy: { title: "Prywatność", intro: "RODO.", sections: [{ icon: 'Lock', h3: "Dane", p: "Pełne bezpieczeństwo." }] },
      cookies: { title: "Ciasteczka", intro: "Użytkowanie.", sections: [{ icon: 'Cookie', h3: "Zarządzanie", p: "Ulepszenie serwisu." }] }
    },
    faq: { h2: 'Pytania', p: 'Wszystko co musisz wiedzieć.', q1: 'Jak?', a1: 'Online.', q2: 'Czas?', a2: '24h.', q3: 'Stałe?', a3: 'Tak, 2%.', q4: 'Dokumenty?', a4: 'ID i dochody.' },
    partners: { h2: 'Partnerzy', p: 'Zaufanie.' },
    testimonials: { h2: 'Opinie', p: 'Zaufanie.' },
    footer: { desc: 'Partner kredytowy na 2%.', titles: { loans: 'Pożyczki', company: 'Firma', contact: 'Kontakt' }, links: { about: 'O nas', blog: 'Blog', careers: 'Kariera', press: 'Prasa', help: 'Pomoc', legal: 'Informacje prawne', privacy: 'Prywatność', cookies: 'Ciasteczka' }, rights: '© 2024 FinancePlus.' }
  },
  de: {
    nav: { home: 'Startseite', loans: 'Kredite', simulator: 'Simulator', about: 'Über uns', contact: 'Kontakt', cta: 'Online-Antrag' },
    hero: { badge: 'Exklusiver Festzins von 2%', h1: 'Der Kredit, der Sie wirklich respektiert.', p: 'Finanzieren Sie Ihre Träume mit einem einzigartigen Zinssatz, ohne versteckte Gebühren und einer Antwort in weniger als 24 Stunden.', cta1: 'Simulation starten', cta2: 'Wie es funktioniert', reviews: '+10.000 positive Bewertungen' },
    who_we_are: {
      title: 'Wer wir sind?',
      subtitle: 'Eine menschliche Vision des Kredits.',
      p1: 'FinancePlus ist nicht nur ein Kreditinstitut. Wir sind ein Team von Experten, die glauben, dass Finanzierung der Motor für Lebensprojekte ist.',
      p2: 'Von unserem Hauptsitz in Lyon aus haben wir eine exklusive Technologie entwickelt, die es uns ermöglicht, unseren europäischen Kunden einen Festzins von 2% anzubieten.',
      btn: 'Unsere Geschichte entdecken'
    },
    about_page: {
      title: 'Unsere Geschichte',
      subtitle: 'Kredit für eine fairere Zukunft neu definieren.',
      mission_title: 'Unsere Mission',
      mission_text: 'Bei FinancePlus glauben wir, dass der Zugang zu Finanzierung kein Hindernisrennen sein sollte. Unsere Mission ist es, transparente, schnelle und ethische Kreditlösungen zu einem festen Zinssatz von 2% anzubieten.',
      vision_title: 'Eine europäische Vision',
      vision_text: 'In Lyon gegründet und nun in ganz Europa tätig, etabliert sich FinancePlus als Marktführer für verantwortungsbewusste Kredite.',
      values_title: 'Unsere Werte',
      values: [{ title: 'Integrität', desc: 'Vollständige Transparenz unserer Bedingungen.' }, { title: 'Innovation', desc: 'Vereinfachte digitale Tools.' }, { title: 'Nähe', desc: 'Engagierte Berater.' }],
      stats: { years: 'Jahre Expertise', countries: 'Abgedeckte Länder', loans: 'Gewährte Kredite' }
    },
    why_choose_us: {
      title: 'Warum uns wählen?',
      subtitle: 'Anerkanntes Fachwissen und transparente Bedingungen für Ihre Projekte.',
      items: [
        { title: 'Garantierter Festzins', desc: 'Profitieren Sie von einem einzigartigen Zinssatz von 2% über die gesamte Laufzeit Ihres Kredits.' },
        { title: 'Schnelligkeit', desc: 'Sofortige Grundsatzentscheidung und Auszahlung der Mittel in Rekordzeit.' },
        { title: 'Maximale Sicherheit', desc: 'Ihre Daten werden durch die fortschrittlichsten Sicherheitsprotokolle geschützt.' }
      ]
    },
    success_page: {
      title: 'Herzlichen Glückwunsch!',
      subtitle: 'Ihre Anfrage wurde registriert.',
      message: 'Ein Berater analysiert Ihre Unterlagen. Antwort innerhalb von 24 Stunden.',
      steps_title: 'Nächste Schritte',
      steps: ['Bonitätsanalyse', 'Kontaktaufnahme', 'Elektronische Signatur', 'Auszahlung der Mittel'],
      trust_labels: { secured: 'Gesichert', email: 'E-Mail-Bestätigung', advisor: 'Persönlicher Berater' },
      cta_home: 'Zurück zur Startseite',
      cta_blog: 'Unsere Tipps lesen'
    },
    contact_page: {
      title: 'Kontaktieren Sie uns',
      subtitle: 'Unser Team steht Ihnen zur Verfügung.',
      form_title: 'Senden Sie uns eine Nachricht',
      form_desc: 'Antwort innerhalb von 24 Stunden.',
      fields: { name: 'Vollständiger Name', email: 'E-Mail', subject: 'Betreff', message: 'Nachricht', submit: 'Senden', success: 'Nachricht gesendet!' },
      info: { title: 'Unsere Kontaktdaten', address: '1 Place de la Bourse, Lyon', phone: '+33 4 72 40 58 58', email: 'contact@financeplus.com', hours: 'Mo-Fr: 9:00-18:00' }
    },
    form: {
      title: 'Finanzierungsantrag',
      subtitle: 'Einfach und sicher.',
      trust_title: 'Transparence und Sicherheit',
      trust_text: 'Ihre Daten sind durch die DSGVO geschützt.',
      fields: {
        firstName: 'Vorname', lastName: 'Nachname', amount: 'Betrag (€)', duration: 'Dauer (Monate)', email: 'E-Mail', whatsapp: 'Whatsapp', country: 'Land', profession: 'Beruf', income: 'Einkommen (€)', reason: 'Grund',
        reason_placeholder: 'Ihr Projekt...', consent1: 'Ich akzeptiere die Datenschutzbestimmungen.', consent2: 'Datenverarbeitung gemäß DSGVO.', warning: 'Ein Kredit verpflichtet Sie und muss zurückgezahlt werden.', submit: 'Antrag senden', select_country: 'Land auswählen', success: 'Antrag gesendet!'
      }
    },
    stats: { clients: 'Zufriedene Kunden', exp: 'Jahre Erfahrung', rating: 'Durchschnittsnote', safety: 'Garantierte Sicherheit' },
    comparison: { h3: 'Vergleichen und sparen', p: 'Einzigartiger Zinssatz von 2%.', market: 'Markt', ours: 'FinancePlus', saving: 'Ersparnis festgestellt' },
    process: { h2: 'Ihr Kredit in wenigen Klicks', p: 'Vereinfachter Prozess.', s1t: 'Simulation', s1d: '30 Sekunden.', s2t: 'Unterlagen', s2d: '100% gesichert.', s3t: 'Mittel', s3d: 'Innerhalb von 48h.' },
    security: { rgpd: 'DSGVO-SCHUTZ', h24: 'ANTWORT IN 24H', orias: 'ORIAS-ZUGELASSEN' },
    calculator: { title: 'Express-Simulator', subtitle: 'Berechnen Sie Ihre monatliche Rate.', amount: 'Betrag', duration: 'Dauer', months: 'Monate', monthly: 'Monatsrate', total: 'Gesamtkosten', cta: 'Diesen Kredit anfragen' },
    cta_footer: { h2: 'Bereit, Ihre Projekte umzusetzen?', p: 'Simulation in 2 Minuten.', btn1: 'Kostenlose Simulation', btn2: 'Berater', warning: 'Ein Kredit verpflichtet Sie.' },
    loans_section: { h2: 'Unsere Lösungen', p: 'Festzins von 2%.', more: 'Mehr erfahren' },
    loan_detail: { back: 'Zurück', advantages: 'Vorteile', eligibility: 'Berechtigung', conditions: ['Wohnsitz in Europa', '18 Jahre +', 'Stabiles Einkommen'], labels: { maxAmount: 'Max. Betrag', maxDuration: 'Max. Dauer' }, sim_title: 'Simulation', sim_desc: 'Unverbindlich', advisor_title: 'Berater', advisor_desc: 'Begleitung' },
    blog: {
      title: 'Das Finanzmagazin',
      subtitle: 'Optimieren Sie Ihr Vermögen.',
      readMore: 'Artikel lesen',
      back: 'Zurück zum Blog',
      posts: [{ id: 'rate-2-percent', title: 'Warum 2%?', excerpt: 'Der ideale Zinssatz.', content: 'Stabilität und Vorhersehbarkeit...' }]
    },
    legal: {
      terms: { title: "Impressum", intro: "Nutzungsbedingungen.", sections: [{ icon: 'Info', h3: "Identifikation", p: businessInfo }] },
      privacy: { title: "Datenschutz", intro: "DSGVO.", sections: [{ icon: 'Lock', h3: "Daten", p: "Volle Sicherheit." }] },
      cookies: { title: "Cookies", intro: "Nutzung.", sections: [{ icon: 'Cookie', h3: "Verwaltung", p: "Verbesserung." }] }
    },
    faq: { h2: 'Fragen', p: 'Alles wissen.', q1: 'Wie?', a1: 'Online.', q2: 'Dauer?', a2: '24h.', q3: 'Fest?', a3: 'Ja, 2%.', q4: 'Durchschnittlich?', a4: 'Ausweis und Einkommen.' },
    partners: { h2: 'Partner', p: 'Vertrauen.' },
    testimonials: { h2: 'Bewertungen', p: 'Vertrauen.' },
    footer: { desc: 'Kreditpartner zu 2%.', titles: { loans: 'Kredite', company: 'Unternehmen', contact: 'Kontakt' }, links: { about: 'Über uns', blog: 'Blog', careers: 'Jobs', press: 'Presse', help: 'Hilfe', legal: 'Rechtliches', privacy: 'Privat', cookies: 'Cookies' }, rights: '© 2024 FinancePlus.' }
  },
  nl: {
    nav: { home: 'Home', loans: 'Leningen', simulator: 'Simulator', about: 'Over ons', contact: 'Contact', cta: 'Online aanvraag' },
    hero: { badge: 'Uitzonderlijke Vaste Rente van 2%', h1: 'Het krediet dat u echt respecteert.', p: 'Financier uw dromen met een uniek tarief, zonder verborgen kosten en een antwoord in minder dan 24 uur.', cta1: 'Start mijn simulatie', cta2: 'Zie hoe het werkt', reviews: '+10.000 positieve beoordelingen' },
    who_we_are: {
      title: 'Wie zijn wij?',
      subtitle: 'Een menselijke visie op krediet.',
      p1: 'FinancePlus is niet zomaar een kredietinstelling. Wij zijn een team van experts die geloven dat financiering de motor is van levensprojecten.',
      p2: 'Vanuit ons hoofdkantoor in Lyon hebben we een exclusieve technologie ontwikkeld die ons in staat stelt een vaste rente van 2% aan te bieden.',
      btn: 'Ontdek onze geschiedenis'
    },
    about_page: {
      title: 'Onze Geschiedenis',
      subtitle: 'Krediet herdefiniëren voor een eerlijkere toekomst.',
      mission_title: 'Onze Missie',
      mission_text: 'Bij FinancePlus geloven we dat toegang tot financiering geen hindernisbaan mag zijn. Onze missie is om transparante, snelle en ethische kredietoplossingen te bieden tegen een uniek vast tarief van 2%.',
      vision_title: 'Een Europese visie',
      vision_text: 'Opgericht in Lyon en nu actief in heel Europa, vestigt FinancePlus zich als de leader in verantwoord krediet.',
      values_title: 'Onze Waarden',
      values: [{ title: 'Integriteit', desc: 'Volledige transparantie over onze voorwaarden.' }, { title: 'Innovatie', desc: 'Vereenvoudigde digitale tools.' }, { title: 'Nabijheid', desc: 'Toegewijde adviseurs.' }],
      stats: { years: 'Jaren expertise', countries: 'Landen gedekt', loans: 'Verstrekte leningen' }
    },
    why_choose_us: {
      title: 'Waarom voor ons kiezen?',
      subtitle: 'Erkende expertise en transparante voorwaarden voor uw projecten.',
      items: [
        { title: 'Gegarandeerde Vaste Rente', desc: 'Profiteer van een uniek tarief van 2% gedurende de gehele looptijd van uw lening.' },
        { title: 'Snelheid van Uitvoering', desc: 'Onmiddellijk principeakkoord en uitbetaling van fondsen in recordtijd.' },
        { title: 'Maximale Veiligheid', desc: 'Uw gegevens worden beschermd door de meest geavanceerde veiligheidsprotocollen.' }
      ]
    },
    success_page: {
      title: 'Gefeliciteerd!',
      subtitle: 'Uw aanvraag is geregistreerd.',
      message: 'Een adviseur analyseert uw dossier. Antwoord binnen 24 uur.',
      steps_title: 'Volgende stappen',
      steps: ['Kredietwaardigheidsanalyse', 'Contact opnemen', 'Elektronische handtekening', 'Vrijgave van fondsen'],
      trust_labels: { secured: 'Beveiligd', email: 'E-mailbevestiging', advisor: 'Toegewijde adviseur' },
      cta_home: 'Terug naar home',
      cta_blog: 'Lees onze adviezen'
    },
    contact_page: {
      title: 'Contacteer ons',
      subtitle: 'Ons team staat tot uw beschikking.',
      form_title: 'Stuur ons een bericht',
      form_desc: 'Antwoord binnen 24 uur.',
      fields: { name: 'Volledige naam', email: 'E-mail', subject: 'Onderwerp', message: 'Bericht', submit: 'Verzenden', success: 'Bericht verzonden!' },
      info: { title: 'Onze contactgegevens', address: '1 Place de la Bourse, Lyon', phone: '+33 4 72 40 58 58', email: 'contact@financeplus.com', hours: 'Ma-Vr: 9u-18u' }
    },
    form: {
      title: 'Financieringsaanvraag',
      subtitle: 'Eenvoudig en veilig.',
      trust_title: 'Transparantie en Veiligheid',
      trust_text: 'Uw gegevens worden beschermd door de AVG.',
      fields: {
        firstName: 'Voornaam', lastName: 'Achternaam', amount: 'Bedrag (€)', duration: 'Looptijd (maanden)', email: 'E-mail', whatsapp: 'Whatsapp', country: 'Land', profession: 'Beroep', income: 'Inkomen (€)', reason: 'Reden',
        reason_placeholder: 'Uw project...', consent1: 'Ik accepteer het privacybeleid.', consent2: 'Gegevens verwerkt volgens de AVG.', warning: 'Een krediet verbindt u en moet worden terugbetaald.', submit: 'Mijn aanvraag verzenden', select_country: 'Selecteer een land', success: 'Aanvraag verzonden!'
      }
    },
    stats: { clients: 'Tevreden klanten', exp: 'Jaren ervaring', rating: 'Gemiddelde score', safety: 'Gegarandeerde veiligheid' },
    comparison: { h3: 'Vergelijk en bespaar', p: 'Uniek tarief van 2%.', market: 'Markt', ours: 'FinancePlus', saving: 'Geconstateerde besparing' },
    process: { h2: 'Uw lening in een paar klikken', p: 'Vereenvoudigd proces.', s1t: 'Simulatie', s1d: '30 seconden.', s2t: 'Dossier', s2d: '100% beveiligd.', s3t: 'Fondsen', s3d: 'Binnen 48u.' },
    security: { rgpd: 'AVG BESCHERMING', h24: 'ANTWOORD IN 24U', orias: 'ORIAS GEACCREDITEERD' },
    calculator: { title: 'Express Simulator', subtitle: 'Bereken uw maandbedrag.', amount: 'Bedrag', duration: 'Looptijd', months: 'maanden', monthly: 'Maandbedrag', total: 'Totale kosten', cta: 'Vraag deze lening aan' },
    cta_footer: { h2: 'Klaar om uw projecten te transformeren?', p: 'Simulatie in 2 minuten.', btn1: 'Gratis simulatie', btn2: 'Adviseur', warning: 'Een krediet verbindt u.' },
    loans_section: { h2: 'Onze Oplossingen', p: 'Vast tarief van 2%.', more: 'Meer informatie' },
    loan_detail: { back: 'Terug', advantages: 'Voordelen', eligibility: 'Subsidiabiliteit', conditions: ['In Europa wonen', '18 jaar +', 'Stabiel inkomen'], labels: { maxAmount: 'Max Bedrag', maxDuration: 'Max Looptijd' }, sim_title: 'Simulation', sim_desc: 'Zonder verplichting', advisor_title: 'Adviseur', advisor_desc: 'Begeleiding' },
    blog: {
      title: 'Het Financieel Magazine',
      subtitle: 'Optimaliseer uw vermogen.',
      readMore: 'Lees het artikel',
      back: 'Terug naar blog',
      posts: [{ id: 'rate-2-percent', title: 'Waarom 2%?', excerpt: 'Het ideale tarief.', content: 'Stabiliteit en zichtbaarheid...' }]
    },
    legal: {
      terms: { title: "Juridische Informatie", intro: "Gebruiksvoorwaarden.", sections: [{ icon: 'Info', h3: "Identificatie", p: businessInfo }] },
      privacy: { title: "Privacy", intro: "AVG.", sections: [{ icon: 'Lock', h3: "Gegevens", p: "Totale veiligheid." }] },
      cookies: { title: "Cookies", intro: "Gebruik.", sections: [{ icon: 'Cookie', h3: "Gestheid", p: "Verbetering." }] }
    },
    faq: { h2: 'Pytania', p: 'Alles weten.', q1: 'Hoe?', a1: 'Online.', q2: 'Termijn?', a2: '24u.', q3: 'Vast?', a3: 'Ja, 2%.', q4: 'Documenten?', a4: 'ID en inkomen.' },
    partners: { h2: 'Partners', p: 'Vertrouwen.' },
    testimonials: { h2: 'Beoordelingen', p: 'Vertrouwen.' },
    footer: { desc: 'Kredietpartner op 2%.', titles: { loans: 'Leningen', company: 'Bedrijf', contact: 'Contact' }, links: { about: 'Over ons', blog: 'Blog', careers: 'Jobs', press: 'Pers', help: 'Hulp', legal: 'Juridisch', privacy: 'Privé', cookies: 'Cookies' }, rights: '© 2024 FinancePlus.' }
  },
  it: {
    nav: { home: 'Home', loans: 'Prestiti', simulator: 'Simulatore', about: 'Chi siamo', contact: 'Contatti', cta: 'Richiesta online' },
    hero: { badge: 'Tasso Eccezionale del 2% Fisso', h1: 'Il credito che ti rispetta davvero.', p: 'Finanzia i tuoi sogni con un tasso unico, senza costi nascosti e una risposta in meno di 24 ore.', cta1: 'Inizia la mia simulazione', cta2: 'Vedi come funziona', reviews: '+10.000 recensioni positive' },
    who_we_are: {
      title: 'Chi siamo?',
      subtitle: 'Una visione umana del credito.',
      p1: 'FinancePlus non è solo un istituto di credito. Siamo un team di esperti appassionati che credono che il finanziamento sia il motore dei progetti di vita.',
      p2: 'Dalla nostra sede di Lione, abbiamo sviluppato una tecnologia esclusiva per offrire un tasso fisso del 2% ai nostri clienti europei.',
      btn: 'Scopri la nostra storia'
    },
    about_page: {
      title: 'La nostra Storia',
      subtitle: 'Ridefinire il credito per un futuro più giusto.',
      mission_title: 'La nostra Missione',
      mission_text: 'In FinancePlus, crediamo che l\'accesso al finanziamento non debba essere un percorso a ostacoli. La nostra missione è fornire soluzioni di credito trasparenti, rapide ed etiche a un tasso fisso unico del 2%.',
      vision_title: 'Una visione europea',
      vision_text: 'Fondata a Lione e ora operativa in tutta Europa, FinancePlus si afferma come leader nel credito responsabile.',
      values_title: 'I nostri Valori',
      values: [{ title: 'Integrità', desc: 'Trasparenza totale sulle nostre condizioni.' }, { title: 'Innovazione', desc: 'Strumenti digitali semplificati.' }, { title: 'Vicinanza', desc: 'Consulenti dedicati.' }],
      stats: { years: 'Anni di esperienza', countries: 'Paesi coperti', loans: 'Prestiti concessi' }
    },
    why_choose_us: {
      title: 'Perché sceglierci?',
      subtitle: 'Un\'esperienza riconosciuta e condizioni trasparenti per i tuoi progetti.',
      items: [
        { title: 'Tasso Fisso Garantito', desc: 'Approfitta di un tasso unico del 2% per tutta la durata del tuo prestito.' },
        { title: 'Rapidità di Esecuzione', desc: 'Risposta di principio immediata e sblocco dei fondi in tempo record.' },
        { title: 'Massima Sicurezza', desc: 'I tuoi dati sono protetti dai protocolli di sicurezza più avanzati.' }
      ]
    },
    success_page: {
      title: 'Congratulazioni!',
      subtitle: 'La tua richiesta è stata registrata.',
      message: 'Un consulente sta analizzando la tua pratica. Risposta entro 24 ore.',
      steps_title: 'Prossimi passi',
      steps: ['Analisi di solvibilità', 'Contatto diretto', 'Firma elettronica', 'Sblocco dei fondi'],
      trust_labels: { secured: 'Sicuro', email: 'Conferma via Email', advisor: 'Consulente dedicato' },
      cta_home: 'Torna alla home',
      cta_blog: 'Leggi i nostri consigli'
    },
    contact_page: {
      title: 'Contattaci',
      subtitle: 'Il nostro team è a tua disposizione.',
      form_title: 'Inviaci un messaggio',
      form_desc: 'Risposta entro 24 ore.',
      fields: { name: 'Nome completo', email: 'Email', subject: 'Oggetto', message: 'Messaggio', submit: 'Invia', success: 'Messaggio inviato!' },
      info: { title: 'I nostri recapiti', address: '1 Place de la Bourse, Lyon', phone: '+33 4 72 40 58 58', email: 'contact@financeplus.com', hours: 'Lun-Ven: 9:00-18:00' }
    },
    form: {
      title: 'Richiesta di Finanziamento',
      subtitle: 'Semplice e sicuro.',
      trust_title: 'Trasparenza e Sicurezza',
      trust_text: 'I tuoi dati sono protetti dal GDPR.',
      fields: {
        firstName: 'Nome', lastName: 'Cognome', amount: 'Importo (€)', duration: 'Durata (mesi)', email: 'Email', whatsapp: 'Whatsapp', country: 'Paese', profession: 'Professione', income: 'Reddito (€)', reason: 'Motivo',
        reason_placeholder: 'Il tuo progetto...', consent1: 'Accetto la politica sulla privacy.', consent2: 'Dati trattati secondo il GDPR.', warning: 'Un credito ti impegna e deve essere rimborsato.', submit: 'Invia la mia richiesta', select_country: 'Seleziona un paese', success: 'Richiesta inviata!'
      }
    },
    stats: { clients: 'Clienti soddisfatti', exp: 'Anni di esperienza', rating: 'Voto medio', safety: 'Sicurezza garantita' },
    comparison: { h3: 'Confronta e risparmia', p: 'Tasso unico del 2%.', market: 'Mercato', ours: 'FinancePlus', saving: 'Risparmio constatato' },
    process: { h2: 'Il tuo prestito in pochi clic', p: 'Processo semplificato.', s1t: 'Simulazione', s1d: '30 secondi.', s2t: 'Pratica', s2d: '100% sicuro.', s3t: 'Fondi', s3d: 'Entro 48 ore.' },
    security: { rgpd: 'PROTEZIONE GDPR', h24: 'RISPOSTA IN 24 ORE', orias: 'ACCREDITATO ORIAS' },
    calculator: { title: 'Simulatore Express', subtitle: 'Calcola la tua rata mensile.', amount: 'Importo', duration: 'Durata', months: 'mesi', monthly: 'Rata mensile', total: 'Costo totale', cta: 'Richiedi questo prestito' },
    cta_footer: { h2: 'Pronto a trasformare i tuoi progetti?', p: 'Simulazione in 2 minuti.', btn1: 'Simulazione gratuita', btn2: 'Consulente', warning: 'Un credito ti impegna.' },
    loans_section: { h2: 'Le nostre Soluzioni', p: 'Tasso fisso del 2%.', more: 'Scopri di più' },
    loan_detail: { back: 'Indietro', advantages: 'Vantaggi', eligibility: 'Idoneità', conditions: ['Residenza in Europa', '18 anni +', 'Reddito stabile'], labels: { maxAmount: 'Importo Max', maxDuration: 'Durata Max' }, sim_title: 'Simulazione', sim_desc: 'Senza impegno', advisor_title: 'Consulente', advisor_desc: 'Accompagnamento' },
    blog: {
      title: 'Il Mag Finance',
      subtitle: 'Ottimizza il tuo patrimonio.',
      readMore: 'Leggi l\'articolo',
      back: 'Torna al blog',
      posts: [{ id: 'rate-2-percent', title: 'Perché il 2%?', excerpt: 'Il tasso ideale.', content: 'Stabilità e visibilità...' }]
    },
    legal: {
      terms: { title: "Note Legali", intro: "Condizioni d'uso.", sections: [{ icon: 'Info', h3: "Identificazione", p: businessInfo }] },
      privacy: { title: "Privacy", intro: "GDPR.", sections: [{ icon: 'Lock', h3: "Dati", p: "Sicurezza totale." }] },
      cookies: { title: "Cookie", intro: "Utilizzo.", sections: [{ icon: 'Cookie', h3: "Gestione", p: "Miglioramento." }] }
    },
    faq: { h2: 'Domande', p: 'Tutto quello che c\'è da sapere.', q1: 'Come?', a1: 'Online.', q2: 'Tempi?', a2: '24 ore.', q3: 'Fisso?', a3: 'Sì, 2%.', q4: 'Documenti?', a4: 'ID e reddito.' },
    partners: { h2: 'Partner', p: 'Fiducia.' },
    testimonials: { h2: 'Recensioni', p: 'Fiducia.' },
    footer: { desc: 'Partner credito al 2%.', titles: { loans: 'Prestiti', company: 'Azienda', contact: 'Contatti' }, links: { about: 'Chi siamo', blog: 'Blog', careers: 'Lavoro', press: 'Stampa', help: 'Aiuto', legal: 'Legale', privacy: 'Privacy', cookies: 'Cookie' }, rights: '© 2024 FinancePlus.' }
  },
  pt: {
    nav: { home: 'Início', loans: 'Empréstimos', simulator: 'Simulador', about: 'Sobre nós', contact: 'Contacto', cta: 'Pedido online' },
    hero: { badge: 'Taxa Excecional de 2% Fixa', h1: 'O crédito que realmente o respeita.', p: 'Financie os seus sonhos com uma taxa única, sem taxas ocultas e uma resposta em menos de 24 horas.', cta1: 'Iniciar a minha simulação', cta2: 'Veja como funciona', reviews: '+10.000 avaliações positivas' },
    who_we_are: {
      title: 'Quem somos nós?',
      subtitle: 'Uma visão humana do crédito.',
      p1: 'A FinancePlus não é apenas uma instituição de crédito. Somos uma equipa de especialistas apaixonados que acreditam que o financiamento é o motor de projetos de vida.',
      p2: 'A partir da nossa sede em Lyon, desenvolvemos uma tecnologia exclusiva para oferecer uma taxa fixa de 2% aos nossos clientes europeus.',
      btn: 'Descobrir a nossa história'
    },
    about_page: {
      title: 'Nossa História',
      subtitle: 'Redefinir o crédito para um futuro mais justo.',
      mission_title: 'Nossa Mission',
      mission_text: 'Na FinancePlus, acreditamos que o acesso ao financiamento não deve ser uma corrida de obstáculos. Nossa missão é fornecer soluções de crédito transparentes, rápidas e éticas a uma taxa fixa única de 2%.',
      vision_title: 'Uma visão europeia',
      vision_text: 'Fundada em Lyon e agora presente em toda a Europa, a FinancePlus impõe-se como líder do crédito responsável.',
      values_title: 'Nossos Valores',
      values: [{ title: 'Integridade', desc: 'Transparência total nas nossas condições.' }, { title: 'Inovação', desc: 'Ferramentas digitais simplificadas.' }, { title: 'Proximidade', desc: 'Consultores dedicados.' }],
      stats: { years: 'Anos de experiência', countries: 'Países cobertos', loans: 'Empréstimos concedidos' }
    },
    why_choose_us: {
      title: 'Porquê escolher-nos?',
      subtitle: 'Uma experiência reconhecida e condições transparentes para os seus projetos.',
      items: [
        { title: 'Taxa Fixa Garantida', desc: 'Aproveite uma taxa única de 2% durante toda a duração do seu empréstimo.' },
        { title: 'Rapidez de Execução', desc: 'Resposta de princípio imediata e libertação dos fundos em tempo recorde.' },
        { title: 'Segurança Máxima', desc: 'Seus dados estão protegidos pelos protocolos de segurança mais avançados.' }
      ]
    },
    success_page: {
      title: 'Parabéns!',
      subtitle: 'O seu pedido foi registado.',
      message: 'Um consultor está a analisar o seu processo. Resposta em 24h.',
      steps_title: 'Próximos passos',
      steps: ['Análise de solvabilidade', 'Contacto direto', 'Assinatura eletrónica', 'Libertação dos fundos'],
      trust_labels: { secured: 'Seguro', email: 'Confirmação por Email', advisor: 'Consultor dedicado' },
      cta_home: 'Voltar ao início',
      cta_blog: 'Leia as nossas dicas'
    },
    contact_page: {
      title: 'Contacte-nos',
      subtitle: 'A nossa equipa está à sua disposição.',
      form_title: 'Envie-nos uma mensagem',
      form_desc: 'Resposta em 24 horas.',
      fields: { name: 'Nome completo', email: 'Email', subject: 'Assunto', message: 'Mensagem', submit: 'Enviar', success: 'Mensagem enviada!' },
      info: { title: 'Nossos contactos', address: '1 Place de la Bourse, Lyon', phone: '+33 4 72 40 58 58', email: 'contact@financeplus.com', hours: 'Seg-Sex: 9h-18h' }
    },
    form: {
      title: 'Pedido de Financiamento',
      subtitle: 'Simples e seguro.',
      trust_title: 'Transparência e Segurança',
      trust_text: 'Os seus dados estão protegidos pelo RGPD.',
      fields: {
        firstName: 'Nome', lastName: 'Apelido', amount: 'Montante (€)', duration: 'Duração (meses)', email: 'Email', whatsapp: 'Whatsapp', country: 'País', profession: 'Profissão', income: 'Rendimento (€)', reason: 'Motivo',
        reason_placeholder: 'O seu projeto...', consent1: 'Aceito a política de privacidade.', consent2: 'Dados tratados de acordo com o RGPD.', warning: 'Um crédito compromete-o e deve ser reembolsado.', submit: 'Enviar o meu pedido', select_country: 'Selecione um país', success: 'Pedido enviado!'
      }
    },
    stats: { clients: 'Clientes satisfeitos', exp: 'Anos de experiência', rating: 'Nota média', safety: 'Segurança garantida' },
    comparison: { h3: 'Compare e poupe', p: 'Taxa única de 2%.', market: 'Mercado', ours: 'FinancePlus', saving: 'Poupança constatada' },
    process: { h2: 'O seu empréstimo em poucos cliques', p: 'Processo simplificado.', s1t: 'Simulação', s1d: '30 segundos.', s2t: 'Processo', s2d: '100% seguro.', s3t: 'Fundos', s3d: 'Em 48h.' },
    security: { rgpd: 'PROTEÇÃO RGPD', h24: 'RESPOSTA EM 24H', orias: 'ACREDITADO ORIAS' },
    calculator: { title: 'Simulador Expresso', subtitle: 'Calcule a sua prestação mensal.', amount: 'Montante', duration: 'Duração', months: 'meses', monthly: 'Prestação mensal', total: 'Custo total', cta: 'Pedir este empréstimo' },
    cta_footer: { h2: 'Pronto para transformar os seus projetos?', p: 'Simulação em 2 minutos.', btn1: 'Simulação gratuita', btn2: 'Consultor', warning: 'Um crédito compromete-o.' },
    loans_section: { h2: 'Nossas Soluções', p: 'Taxa fixa de 2%.', more: 'Saber mais' },
    loan_detail: { back: 'Voltar', advantages: 'Vantagens', eligibility: 'Elegibilidade', conditions: ['Residir na Europa', '18 anos +', 'Rendimento estável'], labels: { maxAmount: 'Montante Máx', maxDuration: 'Duração Máx' }, sim_title: 'Simulação', sim_desc: 'Sem compromisso', advisor_title: 'Consultor', advisor_desc: 'Acompanhamento' },
    blog: {
      title: 'O Mag Finance',
      subtitle: 'Otimize o seu património.',
      readMore: 'Ler o artigo',
      back: 'Voltar ao blog',
      posts: [{ id: 'rate-2-percent', title: 'Porquê 2%?', excerpt: 'A taxa ideal.', content: 'Estabilidade e visibilidade...' }]
    },
    legal: {
      terms: { title: "Menções Legais", intro: "Condições de utilização.", sections: [{ icon: 'Info', h3: "Identificação", p: businessInfo }] },
      privacy: { title: "Privacidade", intro: "RGPD.", sections: [{ icon: 'Lock', h3: "Dados", p: "Segurança total." }] },
      cookies: { title: "Cookies", intro: "Utilização.", sections: [{ icon: 'Cookie', h3: "Gestão", p: "Melhoria." }] }
    },
    faq: { h2: 'Questões', p: 'Saiba tudo.', q1: 'Como?', a1: 'Online.', q2: 'Prazo?', a2: '24h.', q3: 'Fixa?', a3: 'Sim, 2%.', q4: 'Documentos?', a4: 'ID e rendimentos.' },
    partners: { h2: 'Parceiros', p: 'Confiança.' },
    testimonials: { h2: 'Avaliações', p: 'Confiança.' },
    footer: { desc: 'Parceiro de crédito a 2%.', titles: { loans: 'Empréstimos', company: 'Empresa', contact: 'Contacto' }, links: { about: 'Sobre nós', blog: 'Blog', careers: 'Jobs', press: 'Imprensa', help: 'Ajuda', legal: 'Legal', privacy: 'Privacidade', cookies: 'Cookies' }, rights: '© 2024 FinancePlus.' }
  },
  es: {
    nav: { home: 'Inicio', loans: 'Préstamos', simulator: 'Simulador', about: 'Sobre nosotros', contact: 'Contacto', cta: 'Solicitud en línea' },
    hero: { badge: 'Tasa Excepcional del 2% Fijo', h1: 'El crédito que realmente te respeta.', p: 'Financia tus sueños con una tasa única, sin gastos ocultos e una respuesta en menos de 24 horas.', cta1: 'Iniciar mi simulación', cta2: 'Ver cómo funciona', reviews: '+10.000 opiniones positivas' },
    who_we_are: {
      title: '¿Quiénes somos?',
      subtitle: 'Una visión humana del crédito.',
      p1: 'FinancePlus no es solo una entidad de crédito. Somos un equipo de expertos apasionados que creen que la financiación es el motor de los proyectos de vida.',
      p2: 'Desde nuestra sede en Lyon, hemos desarrollado una tecnología exclusiva para ofrecer una tasa fija del 2% a nuestros clientes europeos.',
      btn: 'Descubrir nuestra historia'
    },
    about_page: {
      title: 'Nuestra Historia',
      subtitle: 'Redefinir el crédito para un futuro más justo.',
      mission_title: 'Nuestra Misión',
      mission_text: 'En FinancePlus, creemos que el acceso a la financiación no debería ser una carrera de obstáculos. Nuestra misión es proporcionar soluciones de crédito transparentes, rápidas y éticas a una tasa fija única del 2%.',
      vision_title: 'Una visión europea',
      vision_text: 'Fundada en Lyon y ahora presente en toda Europa, FinancePlus se consolida como el líder del crédito responsable.',
      values_title: 'Nuestros Valores',
      values: [{ title: 'Integridad', desc: 'Transparencia total en nuestras condiciones.' }, { title: 'Innovación', desc: 'Herramientas digitales simplificadas.' }, { title: 'Proximidad', desc: 'Asesores dedicados.' }],
      stats: { years: 'Años de experiencia', countries: 'Países cubiertos', loans: 'Préstamos concedidos' }
    },
    why_choose_us: {
      title: '¿Por qué elegirnos?',
      subtitle: 'Una experiencia reconocida y condiciones transparentes para tus proyectos.',
      items: [
        { title: 'Tasa Fija Garantizada', desc: 'Disfruta de una tasa única del 2% durante toda la duración de tu préstamo.' },
        { title: 'Rapidez de Ejecución', desc: 'Respuesta de principio inmediata y liberación de fondos en tiempo récord.' },
        { title: 'Seguridad Máxima', desc: 'Tus datos están protegidos por los protocolos de seguridad más avanzados.' }
      ]
    },
    success_page: {
      title: '¡Felicidades!',
      subtitle: 'Tu solicitud ha sido registrada.',
      message: 'Un asesor está analizando tu expediente. Respuesta en 24h.',
      steps_title: 'Próximos pasos',
      steps: ['Análisis de solvencia', 'Contacto directo', 'Firma electrónica', 'Liberación de fondos'],
      trust_labels: { secured: 'Seguro', email: 'Confirmación por Email', advisor: 'Asesor dedicado' },
      cta_home: 'Volver al inicio',
      cta_blog: 'Lee nuestros consejos'
    },
    contact_page: {
      title: 'Contáctanos',
      subtitle: 'Nuestro equipo está a tu disposición.',
      form_title: 'Envíanos un mensaje',
      form_desc: 'Respuesta en 24 horas.',
      fields: { name: 'Nombre completo', email: 'Email', subject: 'Asunto', message: 'Mensaje', submit: 'Enviar', success: '¡Mensaje enviado!' },
      info: { title: 'Nuestros datos de contacto', address: '1 Place de la Bourse, Lyon', phone: '+33 4 72 40 58 58', email: 'contact@financeplus.com', hours: 'Lun-Vie: 9h-18h' }
    },
    form: {
      title: 'Solicitud de Financiación',
      subtitle: 'Simple y seguro.',
      trust_title: 'Transparencia y Seguridad',
      trust_text: 'Tus datos están protegidos por el RGPD.',
      fields: {
        firstName: 'Nombre', lastName: 'Apellido', amount: 'Monto (€)', duration: 'Duración (meses)', email: 'Email', whatsapp: 'Whatsapp', country: 'País', profession: 'Profesión', income: 'Ingresos (€)', reason: 'Motivo',
        reason_placeholder: 'Tu proyecto...', consent1: 'Acepto la política de privacidad.', consent2: 'Datos tratados según el RGPD.', warning: 'Un crédito te compromete y debe ser reembolsado.', submit: 'Enviar mi solicitud', select_country: 'Selecciona un país', success: '¡Solicitud enviada!'
      }
    },
    stats: { clients: 'Clientes satisfechos', exp: 'Años de experiencia', rating: 'Nota media', safety: 'Seguridad garantizada' },
    comparison: { h3: 'Compara y ahorra', p: 'Tasa única del 2%.', market: 'Mercado', ours: 'FinancePlus', saving: 'Ahorro constatado' },
    process: { h2: 'Tu préstamo en pocos clics', p: 'Proceso simplificado.', s1t: 'Simulación', s1d: '30 segundos.', s2t: 'Expediente', s2d: '100% seguro.', s3t: 'Fondos', s3d: 'En 48h.' },
    security: { rgpd: 'PROTECCIÓN RGPD', h24: 'RESPUESTA EN 24H', orias: 'ACREDITADO ORIAS' },
    calculator: { title: 'Simulador Express', subtitle: 'Calcula tu mensualidad.', amount: 'Monto', duration: 'Duración', months: 'meses', monthly: 'Mensualidad', total: 'Costo total', cta: 'Solicitar este préstamo' },
    cta_footer: { h2: '¿Listo para transformar tus proyectos?', p: 'Simulación en 2 minutos.', btn1: 'Simulación gratuita', btn2: 'Asesor', warning: 'Un crédito te compromete.' },
    loans_section: { h2: 'Nuestras Soluciones', p: 'Tasa fija del 2%.', more: 'Saber más' },
    loan_detail: { back: 'Volver', advantages: 'Ventajas', eligibility: 'Elegibilidad', conditions: ['Residir en Europa', '18 años +', 'Ingresos estables'], labels: { maxAmount: 'Monto Máx', maxDuration: 'Duración Máx' }, sim_title: 'Simulación', sim_desc: 'Sin compromiso', advisor_title: 'Asesor', advisor_desc: 'Acompañamiento' },
    blog: {
      title: 'El Mag Finance',
      subtitle: 'Optimiza tu patrimonio.',
      readMore: 'Leer el artículo',
      back: 'Volver al blog',
      posts: [{ id: 'rate-2-percent', title: '¿Por qué 2%?', excerpt: 'La tasa ideal.', content: 'Estabilidad y visibilidad...' }]
    },
    legal: {
      terms: { title: "Aviso Legal", intro: "Condiciones de uso.", sections: [{ icon: 'Info', h3: "Identificación", p: businessInfo }] },
      privacy: { title: "Privacidad", intro: "RGPD.", sections: [{ icon: 'Lock', h3: "Datos", p: "Seguridad total." }] },
      cookies: { title: "Cookies", intro: "Uso.", sections: [{ icon: 'Cookie', h3: "Gestión", p: "Mejora." }] }
    },
    faq: { h2: 'Preguntas', p: 'Saberlo todo.', q1: '¿Cómo?', a1: 'En línea.', q2: '¿Plazo?', a2: '24h.', q3: '¿Fijo?', a3: 'Sí, 2%.', q4: '¿Documentos?', a4: 'ID e ingresos.' },
    partners: { h2: 'Socios', p: 'Confianza.' },
    testimonials: { h2: 'Opiniones', p: 'Confianza.' },
    footer: { desc: 'Socio de crédito al 2%.', titles: { loans: 'Préstamos', company: 'Empresa', contact: 'Contacto' }, links: { about: 'Sobre nosotros', blog: 'Blog', careers: 'Empleo', press: 'Prensa', help: 'Ayuda', legal: 'Legal', privacy: 'Privacidad', cookies: 'Cookies' }, rights: '© 2024 FinancePlus.' }
  }
};
