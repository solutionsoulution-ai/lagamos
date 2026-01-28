
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
      a2: 'Após a assinatura eletrónica do seu contrato de empréstimo e o fim do prazo legal de reflexão, os fundos sont transferidos em 48 horas úteis.',
      q3: 'A taxa de 2% é realmente fixa durante todo o período?',
      a3: 'Sim, absolutamente. A taxa de juro nominal de 2% é garantida contratualmente para toda a duração do seu empréstimo, sem qualquer variação possível.',
      q4: 'Quais são os documents comprovativos necessários?',
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
  login: { title: 'Espace Member', subtitle: 'Accédez à votre compte Europfy', email: 'Adresse Email', password: 'Mot de passe', submit: 'Se connecter', error: 'Identifiants invalides', forgot: 'Mot de passe oublié ?', noAccount: 'Pas encore de compte ? Faites une demande.' },
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
  loan_detail: { 
    back: 'Retour aux offres', 
    advantages: 'Vos avantages', 
    eligibility: 'Conditions d\'éligibilité', 
    conditions: ['Résider en Europe', 'Être majeur (18+)', 'Revenu stable'], 
    labels: { maxAmount: 'Montant Max', maxDuration: 'Durée Max' }, 
    sim_title: 'Simulation Rapide', 
    sim_desc: 'Calculez votre prêt.', 
    advisor_title: 'Expert Dédié', 
    advisor_desc: 'À vos côtés.', 
    protection: "Protection garantie", 
    best_offer: "Meilleure offre",
    why_title: "Pourquoi souscre ce prêt ?",
    why_subtitle: "Le financement pensé pour votre succès.",
    why_p: "Bénéficiez d'une transparence totale et d'un taux de 2% bloqué pendant toute la durée de votre contrat. Pas de mauvaises surprises, juste vos projets qui avancent.",
    journey_title: "Votre parcours avec Europfy",
    journey_subtitle: "Un accompagnement humain de A à Z.",
    steps: [
      { t: "Demande Simplifiée", d: "Remplissez votre dossier en ligne en 5 minutes avec notre interface sécurisée." },
      { t: "Analyse en 24h", d: "Nos experts analysent votre solvabilité pour vous donner une réponse immédiate." },
      { t: "Signature Digitale", d: "Signez vos contrats de manière sécurisée sans vous déplacer." },
      { t: "Déblocage des Fonds", d: "Les fonds sont versés sur votre compte en moins de 48 heures." },
      { t: "Gestion Flexible", d: "Modifiez vos mensualités ou effectuez des remboursements anticipés sans frais." }
    ]
  },
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
    pack.loan_detail.why_title = "Dlaczego warto wziąć tę pożyczkę?";
    pack.loan_detail.why_subtitle = "Finansowanie zaprojektowane z myślą o Twoim sukcesie.";
    pack.loan_detail.journey_title = "Twoja ścieżka z Europfy";
    pack.loan_detail.steps = [
      { t: "Uproszczony wniosek", d: "Wypełnij wniosek online w 5 minut." },
      { t: "Analiza w 24h", d: "Nasi eksperci natychmiast analizują Twój wniosek." },
      { t: "Podpis cyfrowy", d: "Podpisuj umowy bezpiecznie online." },
      { t: "Wypłata środków", d: "Środki na Twoim koncie w mniej niż 48h." },
      { t: "Elastyczne zarządzanie", d: "Zmieniaj raty bez dodatkowych kosztów." }
    ];
  } else if (lang === 'de') {
    pack.loan_detail.why_title = "Warum diesen Kredit wählen?";
    pack.loan_detail.why_subtitle = "Finanzierung für Ihren Erfolg konzipiert.";
    pack.loan_detail.journey_title = "Ihre Reise mit Europfy";
    pack.loan_detail.steps = [
      { t: "Vereinfachter Antrag", d: "Online-Antrag in nur 5 Minuten." },
      { t: "Analyse in 24h", d: "Schnelle Prüfung durch unsere Experten." },
      { t: "Digitale Signatur", d: "Verträge sicher von überall unterschreiben." },
      { t: "Auszahlung", d: "Geld in weniger als 48 Stunden auf Ihrem Konto." },
      { t: "Flexible Verwaltung", d: "Raten ohne Gebühren anpassen." }
    ];
  } else if (lang === 'nl') {
    pack.loan_detail.why_title = "Waarom deze lening kiezen?";
    pack.loan_detail.why_subtitle = "Financiering ontworpen voor uw succes.";
    pack.loan_detail.journey_title = "Uw traject met Europfy";
    pack.loan_detail.steps = [
      { t: "Eenvoudige aanvraag", d: "Vul uw online dossier in 5 minuten in." },
      { t: "Analyse in 24u", d: "Directe beoordeling door onze experts." },
      { t: "Digitale handtekening", d: "Veilig contracten tekenen vanuit huis." },
      { t: "Uitbetaling", d: "Geld binnen 48 uur op uw rekening." },
      { t: "Flexibel beheer", d: "Pas uw maandlasten kosteloos aan." }
    ];
  } else if (lang === 'it') {
    pack.loan_detail.why_title = "Perché sottoscrivere questo prestito?";
    pack.loan_detail.why_subtitle = "Il finanziamento pensato per il tuo successo.";
    pack.loan_detail.journey_title = "Il tuo percorso con Europfy";
    pack.loan_detail.steps = [
      { t: "Richiesta Semplificata", d: "Completa la pratica online in 5 minuti." },
      { t: "Analisi in 24 ore", d: "Risposta rapida dai nostri esperti." },
      { t: "Firma Digitale", d: "Firma i contratti in totale sicurezza." },
      { t: "Erogazione Fondi", d: "Fondi sul conto in meno di 48 ore." },
      { t: "Gestione Flessibile", d: "Modifica le rate senza penali." }
    ];
  } else if (lang === 'pt') {
    pack.loan_detail.why_title = "Porquê subscrever este empréstimo?";
    pack.loan_detail.why_subtitle = "O financiamento pensado para o seu sucesso.";
    pack.loan_detail.journey_title = "O seu percurso com a Europfy";
    pack.loan_detail.steps = [
      { t: "Pedido Simplificado", d: "Preencha o seu dossier online em 5 minutos." },
      { t: "Análise em 24h", d: "Resposta imediata dos nossos especialistas." },
      { t: "Assinatura Digital", d: "Assine contratos de forma segura." },
      { t: "Desbloqueio de Fundos", d: "Fundos na conta em menos de 48 horas." },
      { t: "Gestão Flexível", d: "Altere as suas mensalidades sem custos." }
    ];
  } else if (lang === 'es') {
    pack.loan_detail.why_title = "¿Por qué contratar este préstamo?";
    pack.loan_detail.why_subtitle = "La financiación pensada para su éxito.";
    pack.loan_detail.journey_title = "Su recorrido con Europfy";
    pack.loan_detail.steps = [
      { t: "Solicitud Simplificada", d: "Complete su expediente online en 5 minutos." },
      { t: "Análisis en 24h", d: "Respuesta inmediata de nuestros expertos." },
      { t: "Firma Digital", d: "Firme sus contratos de forma segura." },
      { t: "Entrega de Fondos", d: "Fondos en su cuenta en menos de 48 horas." },
      { t: "Gestión Flexible", d: "Cambie sus mensualidades sin comisiones." }
    ];
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
