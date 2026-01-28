
import { Language } from './types';

const generateFaq = (lang: string) => {
  const faqs: Record<string, any> = {
    fr: {
      h2: 'Foire Aux Questions',
      p: 'Toutes les réponses à vos questions les plus fréquentes sur nos services.',
      q1: 'Comment faire une demande de prêt chez Europfy ?',
      a1: 'C\'est très simple : utilisez notre simulateur en ligne pour définir votre besoin, puis remplissez le formulaire de demande. Vous recevrez une réponse de principe immédiate.',
      q2: 'Quel est le délai pour recevoir les fonds sur mon compte ?',
      a2: 'Après la signature électronique de votre contrat de prêt et la fin du délai légal de rétractation, les fonds sont virés sous 48 heures ouvrées.',
      q3: 'Le taux de 2% est-il vraiment fixe pendant toute la durée ?',
      a3: 'Oui, absolument. Le taux d\'intérêt nominal de 2% est garanti contractuellement pour toute la durée de votre prêt, sans aucune variation possible.',
      q4: 'Quels sont les documents justificatifs nécessaires ?',
      a4: 'Pour étudier votre dossier, nous aurons généralement besoin d\'une pièce d\'identité en cours de validité, d\'un justificatif de domicile et de vos derniers justificatifs de revenus.'
    },
    pl: {
      h2: 'Często Zadawane Pytania',
      p: 'Wszystkie odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług.',
      q1: 'Jak złożyć wniosek o pożyczkę w Europfy?',
      a1: 'To bardzo proste: skorzystaj z naszego symulatora online, aby określić swoje potrzeby, a następnie wypełnij formularz wniosku. Otrzymasz natychmiastową wstępną odpowiedź.',
      q2: 'Jaki jest czas oczekiwania na środki na koncie?',
      a2: 'Po elektronicznym podpisaniu umowy pożyczki i zakończeniu ustawowego okresu odstąpienia od umowy, środki są przelewane w ciągu 48 godzin roboczych.',
      q3: 'Czy oprocentowanie 2% jest naprawdę stałe?',
      a3: 'Tak, absolutnie. Nominalna stopa procentowa 2% jest gwarantowana umownie przez cały okres trwania pożyczki, bez możliwości jakichkolwiek zmian.',
      q4: 'Jakie dokumenty są wymagane?',
      a4: 'Zazwyczaj potrzebujemy ważnego dokumentu tożsamości, potwierdzenia adresu zamieszkania oraz ostatnich zaświadczeń o dochodach.'
    },
    de: {
      h2: 'Häufig gestellte Fragen',
      p: 'Alle Antworten auf Ihre häufigsten Fragen zu unseren Finanzdienstleistungen.',
      q1: 'Wie beantrage ich einen Kredit bei Europfy?',
      a1: 'Es ist ganz einfach: Nutzen Sie unseren Online-Simulator, um Ihren Bedarf zu ermitteln, und füllen Sie dann das Antragsformular aus. Sie erhalten sofort eine vorläufige Antwort.',
      q2: 'Wie lange dauert es, bis das Geld auf meinem Konto ist?',
      a2: 'Nach der elektronischen Unterzeichnung Ihres Kreditvertrags und dem Ablauf der gesetzlichen Widerrufsfrist wird das Geld innerhalb von 48 Werktagen überwiesen.',
      q3: 'Ist der Zinssatz von 2% wirklich über die gesamte Laufzeit fest?',
      a3: 'Ja, absolut. Der nominale Zinssatz von 2% ist vertraglich für die gesamte Laufzeit Ihres Kredits garantiert, ohne jegliche Variationsmöglichkeit.',
      q4: 'Welche Nachweise sind erforderlich?',
      a4: 'Um Ihre Unterlagen zu prüfen, benötigen wir in der Regel einen gültigen Identitätsnachweis, einen Wohnsitznachweis und Ihre letzten Einkommensnachweise.'
    },
    nl: {
      h2: 'Veelgestelde Vragen',
      p: 'Alle antwoorden op uw meest gestelde vragen over onze diensten.',
      q1: 'Hoe vraag ik een lening aan bij Europfy?',
      a1: 'Het is heel eenvoudig: gebruik onze online simulator om uw behoefte te bepalen en vul vervolgens het aanvraagformulier in. U ontvangt direct een voorlopig antwoord.',
      q2: 'Hoe lang duurt het voordat ik het geld op mijn rekening heb?',
      a2: 'Na de elektronische ondertekening van uw leningovereenkomst en het einde van de wettelijke herroepingstermijn, wordt het geld binnen 48 werkuren overgemaakt.',
      q3: 'Is de rente van 2% echt vast gedurende de gehele looptijd?',
      a3: 'Ja, absoluut. De nominale rente van 2% is contractueel gegarandeerd voor de gehele looptijd van uw lening, zonder enige mogelijke variatie.',
      q4: 'Welke bewijsstukken zijn nodig?',
      a4: 'Om uw dossier te bestuderen, hebben we doorgaans een geldig identiteitsbewijs, een bewijs van adres en uw meest recente inkomensbewijzen nodig.'
    },
    it: {
      h2: 'Domande Frequenti',
      p: 'Tutte le risposte alle tue domande più frequenti sui nostri servizi.',
      q1: 'Come posso richiedere un prestito con Europfy?',
      a1: 'È semplicissimo: usa il nostro simulatore online per definire la tua esigenza, quindi compila il modulo di richiesta. Riceverai una risposta di principio immediata.',
      q2: 'Quali sono i tempi per ricevere i fondi sul mio conto?',
      a2: 'Dopo la firma elettronica del contratto di prestito e la fine del periodo legale di recesso, i fondi vengono accreditati entro 48 ore lavorative.',
      q3: 'Il tasso del 2% è davvero fisso per tutta la durata?',
      a3: 'Sì, assolutamente. Il tasso di interesse nominale del 2% è garantito da contratto per tutta la durata del prestito, senza alcuna variazione possibile.',
      q4: 'Quali documenti giustificativi sono necessari?',
      a4: 'Per studiare la tua pratica, avremo generalmente bisogno di un documento d\'identità in corso di validità, un certificato di residenza e i tuoi ultimi giustificativi di reddito.'
    },
    pt: {
      h2: 'Perguntas Frequentes',
      p: 'Todas as respostas às suas perguntas mais frequentes sobre os nossos serviços.',
      q1: 'Como fazer um pedido de empréstimo na Europfy?',
      a1: 'É muito simples: utilize o nosso simulador online para definir a sua necessidade e, em seguida, preencha o formulário de pedido. Receberá uma resposta de princípio immediata.',
      q2: 'Qual é o prazo para receber os fundos na minha conta?',
      a2: 'Após a assinatura eletrónica do seu contrato de empréstimo e o fim do prazo legal de reflexão, os fundos são transferidos em 48 horas úteis.',
      q3: 'A taxa de 2% é realmente fixa durante todo o período?',
      a3: 'Sim, absolutamente. A taxa de juro nominal de 2% é garantida contratualmente para toda a duração do seu empréstimo, sem qualquer variação possível.',
      q4: 'Quais são os documentos comprovativos necessários?',
      a4: 'Para analisar o seu processo, precisaremos geralmente de um documento de identidade válido, um comprovativo de morada e os seus últimos comprovativos de rendimentos.'
    },
    es: {
      h2: 'Preguntas Frecuentes',
      p: 'Todas las respuestas a sus preguntas más frecuentes sobre nuestros servicios.',
      q1: '¿Cómo solicitar un préstamo en Europfy?',
      a1: 'Es muy sencillo: utilice nuestro simulador online para definir su necesidad y luego complete el formulario de solicitud. Recibirá una respuesta de principio inmediata.',
      q2: '¿Cuál es el plazo para recibir los fondos en mi cuenta?',
      a2: 'Tras la firma electrónica de su contrato de préstamo y el fin del plazo legal de desistimiento, los fondos se transfieren en 48 horas hábiles.',
      q3: '¿La tasa del 2% es realmente fija durante todo el plazo?',
      a3: 'Sí, absolutamente. La tasa de interés nominal del 2% está garantizada por contrato durante toda la duración de su préstamo, sin ninguna variación posible.',
      q4: '¿Qué documentos justificativos son necesarios?',
      a4: 'Para estudiar su expediente, normalmente necesitaremos un documento de identidad válido, un comprobante de domicilio y sus últimos justificantes de ingresos.'
    }
  };
  return faqs[lang] || faqs['fr'];
};

const frPack = {
  nav: { home: 'Accueil', loans: 'Prêts', simulator: 'Simulateur', about: 'À propos', contact: 'Contact', cta: 'Demande en ligne', login: 'Connexion', logout: 'Déconnexion', my_space: 'Mon Espace' },
  login: { title: 'Espace Membre', subtitle: 'Accédez à votre compte Europfy', email: 'Adresse Email', password: 'Mot de passe', submit: 'Se connecter', error: 'Identifiants invalides', forgot: 'Mot de passe oublié ?', noAccount: 'Pas encore de compte ? Faites une demande.' },
  support: { title: 'Besoin d\'aide ?', subtitle: 'Contactez notre support pour vos problèmes de connexion.', form_title: 'Formulaire d\'assistance', fields: { name: 'Nom complet', email: 'Email', subject: 'Sujet', message: 'Message', submit: 'Envoyer', success: 'Envoyé !' }, subjects: { password: 'Mot de passe', account: 'Compte', other: 'Autre' } },
  admin: { title: 'Tableau de Bord', subtitle: 'Gestion des demandes', stats: { total: 'Total', pending: 'En attente', approved: 'Approuvées', totalVolume: 'Volume' }, table: { client: 'Client', amount: 'Montant', income: 'Revenu', country: 'Pays', status: 'Statut', date: 'Date', fees: 'Frais', actions: 'Actions' }, status: { pending: 'En attente', approved: 'Approuvé', rejected: 'Refusé' } },
  client_dashboard: { title: 'Espace Client', welcome: 'Bienvenue', status_card: 'Statut de la demande', details: 'Détails du prêt', next_steps: 'Étapes suivantes', no_loan: 'Aucun prêt trouvé.', cta_new: 'Nouveau prêt', steps: ['Analyse', 'Documents', 'Signature', 'Fonds'] },
  hero: { badge: 'Taux Fixe 2%', h1: 'Le crédit qui vous respecte vraiment.', h1_variants: ['Le crédit qui vous respecte.', 'Financez à 2% fixe.', 'Réponse en 24h.', 'Partenaire de confiance.'], p: 'Financez vos projets avec un taux transparent. Accompagnement sur mesure sans frais cachés.', cta1: 'Ma simulation', cta2: 'En savoir plus', reviews: '+10,000 clients satisfaits' },
  who_we_are: { title: 'Qui sommes-nous ?', subtitle: 'Une vision humaine du crédit.', p1: 'Europfy est une équipe d\'experts engagés pour une finance éthique et accessible.', p2: 'Nous utilisons la technologie pour réduire les coûts opérationnels et vous proposer le meilleur taux du marché.', btn: 'Découvrir notre histoire' },
  why_choose_us: { title: 'Pourquoi Europfy ?', subtitle: 'Une expertise reconnue et des conditions transparentes.', items: [{ title: 'Taux 2% fixe', desc: 'Garanti par contrat pour toute la durée.' }, { title: 'Réponse rapide', desc: 'Une réponse de principe en moins de 24h.' }, { title: 'Sécurité totale', desc: 'Vos données sont protégées par cryptage bancaire.' }] },
  stats: { clients: 'Clients satisfaits', exp: 'Années d\'expertise', rating: 'Note globale', safety: 'Sécurité garantie' },
  comparison: { h3: 'Comparez et économisez', p: 'Pourquoi payer plus cher ailleurs ? Nous maintenons un taux unique de 2%.', market: 'Moyenne Marché', ours: 'Offre Europfy', saving: 'Économie réelle' },
  process: { h2: 'Votre prêt en 3 étapes', p: 'Un processus simplifié pour vous faire gagner du temps.', s1t: 'Simulation', s1d: 'Calculez vos mensualités en 30 secondes.', s2t: 'Dossier', s2d: 'Soumission sécurisée de vos documents.', s3t: 'Fonds', s3d: 'Réception des fonds sous 48h ouvrées.' },
  security: { rgpd: 'CONFORME RGPD', h24: 'SUPPORT 24/7', orias: 'AGRÉÉ ORIAS' },
  calculator: { title: 'Simulateur Express', subtitle: 'Calculez votre budget instantanément.', amount: 'Montant souhaité', duration: 'Durée du prêt', months: 'mois', monthly: 'Mensualité estimée', total: 'Coût total du crédit', cta: 'Lancer ma demande' },
  cta_footer: { h2: 'Prêt à réaliser vos projets ?', p: 'Simulation gratuite et sans engagement en moins de 2 minutes.', btn1: 'Démarrer maintenant', btn2: 'Contacter un expert', warning: 'Un crédit vous engage et doit être remboursé.' },
  loans_section: { h2: 'Nos Solutions de Financement', p: 'Des offres adaptées à tous vos besoins avec un taux fixe de 2%.', more: 'Voir les détails', advice_title: "Besoin d'un conseil ?", advice_p: "Nos experts sont disponibles pour une étude gratuite.", advice_btn: "Contactez-nous" },
  footer: { desc: 'Votre partenaire de confiance pour un crédit éthique et transparent à taux fixe de 2% partout en Europe.', titles: { loans: 'Nos Prêts', company: 'Société', contact: 'Contact' }, links: { about: 'À propos', blog: 'Blog', legal: 'Mentions Légales', privacy: 'Confidentialité', cookies: 'Cookies' }, rights: '© 2024 Europfy. Tous droits réservés.' },
  form: { 
    title: 'Demande de Prêt', 
    subtitle: 'Rapide et 100% sécurisé.', 
    trust_title: 'Sécurité des données', 
    trust_text: 'Vos informations sont traitées conformément au RGPD et protégées par cryptage.', 
    processing_fees: { title: 'Frais de dossier', text: 'Les frais couvrent l\'analyse technique et juridique de votre dossier.', detail: 'Frais dus uniquement après accord de principe.' }, 
    help_sidebar: { title: 'Besoin d\'aide ?', desc: 'Nos conseillers vous accompagnent.', cta: 'Parler à un conseiller' }, 
    fields: { firstName: 'Prénom', lastName: 'Nom', amount: 'Montant (€)', duration: 'Durée (mois)', email: 'Email', whatsapp: 'WhatsApp', country: 'Pays', profession: 'Profession', income: 'Revenu (€)', reason: 'Motif du prêt', reason_placeholder: 'Décrivez votre projet...', consent1: 'Je certifie l\'exactitude des informations.', consent2: 'Les données sont traitées pour l\'étude du dossier.', processing_consent: 'J\'accepte les frais de dossier après accord.', warning: 'Un crédit vous engage.', submit: 'Envoyer ma demande', select_country: 'Choisir un pays', success: 'Demande envoyée !' }, 
    countries: { FR: 'France', BE: 'Belgique', CH: 'Suisse', PL: 'Pologne', DE: 'Allemagne', IT: 'Italie', ES: 'Espagne', PT: 'Portugal', NL: 'Pays-Bas' } 
  },
  loan_detail: { back: 'Retour aux offres', advantages: 'Vos avantages', eligibility: 'Conditions d\'éligibilité', conditions: ['Résider en Europe', 'Être majeur (18+)', 'Revenu stable'], labels: { maxAmount: 'Montant Max', maxDuration: 'Durée Max' }, sim_title: 'Simulation Rapide', sim_desc: 'Calculez votre prêt.', advisor_title: 'Expert Dédié', advisor_desc: 'À vos côtés.', protection: "Protection garantie", best_offer: "Meilleure offre" },
  success_page: { title: 'Félicitations !', subtitle: 'Demande enregistrée avec succès.', message: 'Un expert analyse votre dossier actuellement.', steps_title: 'Prochaines étapes', steps: ['Analyse de solvabilité', 'Contact téléphonique', 'Signature du contrat', 'Déblocage des fonds'], trust_labels: { secured: 'Sécurisé', email: 'Email reçu', advisor: 'Conseiller' }, cta_home: 'Retour Accueil', cta_blog: 'Voir nos conseils' },
  contact_page: { title: 'Contactez-nous', subtitle: 'Une équipe à votre écoute.', form_title: 'Envoyez un message', form_desc: 'Réponse sous 24h.', fields: { name: 'Nom complet', email: 'Adresse Email', subject: 'Sujet', message: 'Votre message', submit: 'Envoyer', success: 'Message transmis !' }, info: { title: 'Nos coordonnées', address: '1 Place de la Bourse, Lyon, France', phone: '+33 4 72 40 58 58', email: 'contact@europfy.com', hours: '9h - 18h' } },
  about_page: { title: 'Qui sommes-nous ?', subtitle: 'Redéfinir le crédit pour un avenir plus juste.', mission_title: 'Notre Mission', mission_text: 'Démocratiser l\'accès au crédit éthique pour tous les européens.', vision_title: 'Vision Européenne', vision_text: 'Présent dans 27 pays pour vous accompagner.', values_title: 'Nos Valeurs', values: [{ title: 'Intégrité', desc: 'Clarté contractuelle sans frais cachés.' }, { title: 'Innovation', desc: 'Une plateforme agile et performante.' }, { title: 'Proximité', desc: 'Des experts dédiés à votre écoute.' }], stats: { years: 'Années d\'expertise', countries: 'Pays couverts', loans: 'Prêts accordés' } },
  blog: { title: 'Blog Finance', subtitle: 'Nos conseils d\'experts pour votre budget.', readMore: 'Lire la suite', back: 'Retour', posts: [] },
  legal: { terms: { title: 'Mentions Légales', intro: 'Informations juridiques obligatoires.', sections: [] }, privacy: { title: 'Confidentialité', intro: 'Protection de vos données personnelles.', sections: [] }, cookies: { title: 'Cookies', intro: 'Gestion des traceurs et cookies.', sections: [] } },
  faq: generateFaq('fr'),
  partners: { h2: 'Nos Partenaires', p: 'Des institutions financières solides qui nous font confiance.' },
  testimonials: { h2: 'Avis Clients', p: 'Votre satisfaction est notre plus grande réussite.' },
  loan_specifics: { personnel: { faqs: [], testimonials: [] }, immobilier: { faqs: [], testimonials: [] }, automobile: { faqs: [], testimonials: [] }, entreprise: { faqs: [], testimonials: [] }, rachat: { faqs: [], testimonials: [] } }
};

const createLanguagePack = (lang: Language, base: any) => {
  const pack = JSON.parse(JSON.stringify(base));
  pack.faq = generateFaq(lang);
  
  if (lang === 'pl') {
    pack.form = {
      title: 'Wniosek o Pożyczkę',
      subtitle: 'Szybko i w 100% bezpiecznie.',
      trust_title: 'Bezpieczeństwo danych',
      trust_text: 'Twoje informacje są przetwarzane zgodnie z RODO i chronione przez szyfrowanie.',
      processing_fees: { title: 'Koszty operacyjne', text: 'Koszty te pokrywają analizę techniczną i prawną Twojej dokumentacji.', detail: 'Opłata wymagana wyłącznie po wstępnej akceptacji.' },
      help_sidebar: { title: 'Potrzebujesz pomocy?', desc: 'Nasi doradcy służą pomocą.', cta: 'Porozmawiaj z doradcą' },
      fields: { firstName: 'Imię', lastName: 'Nazwisko', amount: 'Kwota (€)', duration: 'Okres (miesiące)', email: 'Email', whatsapp: 'WhatsApp', country: 'Kraj', profession: 'Zawód', income: 'Dochód (€)', reason: 'Cel pożyczki', reason_placeholder: 'Opisz swój projekt...', consent1: 'Oświadczam, że podane informacje są prawdziwe.', consent2: 'Dane są przetwarzane w celu analizy wniosku.', processing_consent: 'Akceptuję koszty operacyjne po wstępnej zgodzie.', warning: 'Kredyt to zobowiązanie.', submit: 'Wyślij wniosek', select_country: 'Wybierz kraj', success: 'Wniosek wysłany!' },
      countries: { FR: 'Francja', BE: 'Belgia', CH: 'Szwajcaria', PL: 'Polska', DE: 'Niemcy', IT: 'Włochy', ES: 'Hiszpania', PT: 'Portugalia', NL: 'Holandia' }
    };
  } else if (lang === 'de') {
    pack.form = {
      title: 'Kreditantrag',
      subtitle: 'Schnell und 100% sicher.',
      trust_title: 'Datensicherheit',
      trust_text: 'Ihre Informationen werden gemäß DSGVO verarbeitet und durch Verschlüsselung geschützt.',
      processing_fees: { title: 'Bearbeitungsgebühren', text: 'Diese Gebühren decken die technische und rechtliche Analyse Ihres Dossiers ab.', detail: 'Gebühr erst nach vorläufiger Zusage fällig.' },
      help_sidebar: { title: 'Brauchen Sie Hilfe?', desc: 'Unsere Berater begleiten Sie.', cta: 'Mit einem Berater sprechen' },
      fields: { firstName: 'Vorname', lastName: 'Nachname', amount: 'Betrag (€)', duration: 'Laufzeit (Monate)', email: 'E-Mail', whatsapp: 'WhatsApp', country: 'Land', profession: 'Beruf', income: 'Einkommen (€)', reason: 'Grund des Kredits', reason_placeholder: 'Beschreiben Sie Ihr Projekt...', consent1: 'Ich bestätige die Richtigkeit der Angaben.', consent2: 'Die Daten werden zur Prüfung des Antrags verarbeitet.', processing_consent: 'Ich akzeptiere die Bearbeitungsgebühren nach der Zusage.', warning: 'Ein Kredit verpflichtet Sie.', submit: 'Antrag senden', select_country: 'Land auswählen', success: 'Antrag gesendet!' },
      countries: { FR: 'Frankreich', BE: 'Belgien', CH: 'Schweiz', PL: 'Polen', DE: 'Deutschland', IT: 'Italien', ES: 'Spanien', PT: 'Portugal', NL: 'Niederlande' }
    };
  } else if (lang === 'nl') {
    pack.form = {
      title: 'Lening Aanvraag',
      subtitle: 'Snel en 100% veilig.',
      trust_title: 'Gegevensbeveiliging',
      trust_text: 'Uw informatie wordt verwerkt in overeenstemming met de AVG en beschermd door versleuteling.',
      processing_fees: { title: 'Behandelingskosten', text: 'Deze kosten dekken de technische en juridische analyse van uw dossier.', detail: 'Kosten pas verschuldigd na voorlopig akkoord.' },
      help_sidebar: { title: 'Hulp nodig?', desc: 'Onze adviseurs begeleiden u.', cta: 'Spreek met een adviseur' },
      fields: { firstName: 'Voornaam', lastName: 'Achternaam', amount: 'Bedrag (€)', duration: 'Looptijd (maanden)', email: 'E-mail', whatsapp: 'WhatsApp', country: 'Land', profession: 'Beroep', income: 'Inkomen (€)', reason: 'Reden voor lening', reason_placeholder: 'Beschrijf uw project...', consent1: 'Ik bevestig de juistheid van de informatie.', consent2: 'De gegevens worden verwerkt voor de bestudering van het dossier.', processing_consent: 'Ik accepteer de behandelingskosten na akkoord.', warning: 'Een lening kost geld.', submit: 'Verstuur aanvraag', select_country: 'Kies een land', success: 'Aanvraag verzonden!' },
      countries: { FR: 'Frankrijk', BE: 'België', CH: 'Zwitserland', PL: 'Polen', DE: 'Duitsland', IT: 'Italië', ES: 'Spanje', PT: 'Portugal', NL: 'Nederland' }
    };
  } else if (lang === 'it') {
    pack.form = {
      title: 'Richiesta di Prestito',
      subtitle: 'Rapida e sicura al 100%.',
      trust_title: 'Sicurezza dei dati',
      trust_text: 'Le tue informazioni sono trattate in conformità con il GDPR e protette da crittografia.',
      processing_fees: { title: 'Spese di istruttoria', text: 'Le spese coprono l\'analisi tecnica e legale della tua pratica.', detail: 'Spese dovute solo dopo l\'accordo di massima.' },
      help_sidebar: { title: 'Serve aiuto?', desc: 'I nostri consulenti ti accompagnano.', cta: 'Parla con un consulente' },
      fields: { firstName: 'Nome', lastName: 'Cognome', amount: 'Importo (€)', duration: 'Durata (mesi)', email: 'Email', whatsapp: 'WhatsApp', country: 'Paese', profession: 'Professione', income: 'Reddito (€)', reason: 'Motivo del prestito', reason_placeholder: 'Descrivi il tuo progetto...', consent1: 'Certifico la correttezza delle informazioni.', consent2: 'I dati sono trattati per lo studio della pratica.', processing_consent: 'Accetto le spese di istruttoria dopo l\'accordo.', warning: 'Un prestito ti impegna.', submit: 'Invia richiesta', select_country: 'Scegli un paese', success: 'Richiesta inviata!' },
      countries: { FR: 'Francia', BE: 'Belgio', CH: 'Svizzera', PL: 'Polonia', DE: 'Germania', IT: 'Italia', ES: 'Spagna', PT: 'Portogallo', NL: 'Paesi Bassi' }
    };
  } else if (lang === 'pt') {
    pack.form = {
      title: 'Pedido de Empréstimo',
      subtitle: 'Rápido e 100% seguro.',
      trust_title: 'Segurança de dados',
      trust_text: 'As suas informações são tratadas de acordo com o RGPD e protegidas por encriptação.',
      processing_fees: { title: 'Custos de processo', text: 'Os custos cobrem a análise técnica e jurídica do seu processo.', detail: 'Custos devidos apenas após acordo de princípio.' },
      help_sidebar: { title: 'Precisa de ajuda?', desc: 'Os nossos consultores acompanham-no.', cta: 'Falar com um consultor' },
      fields: { firstName: 'Nome', lastName: 'Apelido', amount: 'Montante (€)', duration: 'Duração (meses)', email: 'E-mail', whatsapp: 'WhatsApp', country: 'País', profession: 'Profissão', income: 'Rendimento (€)', reason: 'Motivo do empréstimo', reason_placeholder: 'Descreva o seu projeto...', consent1: 'Certifico a exatidão das informações.', consent2: 'Os dados são tratados para o estudo do processo.', processing_consent: 'Aceito os custos de processo após o acordo.', warning: 'Um crédito compromete-o.', submit: 'Enviar pedido', select_country: 'Escolha um país', success: 'Pedido enviado!' },
      countries: { FR: 'França', BE: 'Bélgica', CH: 'Suíça', PL: 'Polónia', DE: 'Alemanha', IT: 'Itália', ES: 'Espanha', PT: 'Portugal', NL: 'Países Baixos' }
    };
  } else if (lang === 'es') {
    pack.form = {
      title: 'Solicitud de Préstamo',
      subtitle: 'Rápida y 100% segura.',
      trust_title: 'Seguridad de datos',
      trust_text: 'Su información se trata conforme al RGPD y se protege mediante cifrado.',
      processing_fees: { title: 'Gastos de gestión', text: 'Los gastos cubren el análisis técnico y jurídico de su expediente.', detail: 'Gastos debidos solo tras acuerdo de principio.' },
      help_sidebar: { title: '¿Necesita ayuda?', desc: 'Nuestros asesores le acompañan.', cta: 'Hablar con un asesor' },
      fields: { firstName: 'Nombre', lastName: 'Apellido', amount: 'Monto (€)', duration: 'Plazo (meses)', email: 'Email', whatsapp: 'WhatsApp', country: 'País', profession: 'Profesión', income: 'Ingresos (€)', reason: 'Motivo del préstamo', reason_placeholder: 'Describa su proyecto...', consent1: 'Certifico la exactitud de la información.', consent2: 'Los datos se tratan para el estudio del expediente.', processing_consent: 'Acepto los gastos de gestión tras el acuerdo.', warning: 'Un crédito le compromete.', submit: 'Enviar solicitud', select_country: 'Elegir un país', success: '¡Solicitud enviada!' },
      countries: { FR: 'Francia', BE: 'Bélgica', CH: 'Suiza', PL: 'Polonia', DE: 'Alemania', IT: 'Italia', ES: 'España', PT: 'Portugal', NL: 'Países Bajos' }
    };
  }
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
