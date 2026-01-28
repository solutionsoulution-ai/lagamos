
import React from 'react';
import { 
  User, 
  Home as HomeIcon, 
  Car, 
  Briefcase, 
  RefreshCcw,
  CheckCircle,
  Clock,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { LoanInfo, Testimonial, Language, LoanType } from './types';
import { translations } from './translations';

export const FIXED_RATE = 2; // 2%

export const getLoansData = (lang: Language): LoanInfo[] => {
  const t = translations[lang];
  const loanSpecifics = t.loan_specifics;

  const titles: Record<Language, Record<string, string>> = {
    fr: { p: 'Prêt Personnel', i: 'Prêt Immobilier', a: 'Prêt Automobile', e: 'Prêt Entreprise', r: 'Rachat de Crédit' },
    pl: { p: 'Pożyczka osobista', i: 'Kredyt hipoteczny', a: 'Kredyt samochodowy', e: 'Kredyt dla firm', r: 'Konsolidacja kredytów' },
    de: { p: 'Persönliches Darlehen', i: 'Immobilienkredit', a: 'Autokredit', e: 'Geschäftskredit', r: 'Kreditablösung' },
    nl: { p: 'Persoonlijke lening', i: 'Hypotheek', a: 'Autolening', e: 'Zakelijke lening', r: 'Herfinanciering' },
    it: { p: 'Prestito Personale', i: 'Mutuo Immobiliare', a: 'Prestito Auto', e: 'Prestito Aziendale', r: 'Consolidamento Debiti' },
    pt: { p: 'Empréstimo Pessoal', i: 'Crédito Habitação', a: 'Crédito Automóvel', e: 'Empréstimo para Empresas', r: 'Consolidação de Créditos' },
    es: { p: 'Préstamo Personal', i: 'Préstamo Hipotecario', a: 'Préstamo Coche', e: 'Préstamo para Empresas', r: 'Reagrupación de Préstamos' }
  };

  const descriptions: Record<Language, Record<string, string>> = {
    fr: { p: 'Projets de vie en liberté.', i: 'Devenez propriétaire.', a: 'Prenez la route.', e: 'Propulsez votre croissance.', r: 'Simplifiez vos finances.' },
    pl: { p: 'Realizuj swoje życiowe plany.', i: 'Zostań właścicielem domu.', a: 'Ruszaj w drogę.', e: 'Rozwijaj swoją firmę.', r: 'Uprość swoje finanse.' },
    de: { p: 'Lebensprojekte in Freiheit.', i: 'Werden Sie Eigentümer.', a: 'Ab auf die Straße.', e: 'Wachstum vorantreiben.', r: 'Finanzen vereinfachen.' },
    nl: { p: 'Vrijheid voor uw plannen.', i: 'Word eigenaar.', a: 'Ga de weg op.', e: 'Boost uw groei.', r: 'Vereenvoudig uw financiën.' },
    it: { p: 'Progetti di vita in libertà.', i: 'Diventa proprietario.', a: 'Mettiti in viaggio.', e: 'Spingi la tua crescita.', r: 'Semplifica le tue finanze.' },
    pt: { p: 'Projetos de vida em liberdade.', i: 'Torne-se proprietário.', a: 'Faça-se à estrada.', e: 'Impulsione o seu crescimento.', r: 'Simplifique as suas finanças.' },
    es: { p: 'Proyectos de vida en libertad.', i: 'Conviértete en propietario.', a: 'Sal a la carretera.', e: 'Impulsa tu crecimiento.', r: 'Simplifica tus finanzas.' }
  };

  const baseData = [
    { 
      id: 'personnel' as LoanType, 
      icon: 'User', 
      maxAmount: 75000, 
      maxDuration: 84, 
      image: 'https://i.postimg.cc/GhFrb9SK/pexels-mizunokozuki-12912114.jpg' 
    },
    { 
      id: 'immobilier' as LoanType, 
      icon: 'HomeIcon', 
      maxAmount: 1500000, 
      maxDuration: 300, 
      image: 'https://i.postimg.cc/wM0BTvww/side-view-man-working-as-real-estate-agent.jpg' 
    },
    { 
      id: 'automobile' as LoanType, 
      icon: 'Car', 
      maxAmount: 100000, 
      maxDuration: 72, 
      image: 'https://i.postimg.cc/LX4K4Vww/young-family-choosing-car-car-showroom.jpg' 
    },
    { 
      id: 'entreprise' as LoanType, 
      icon: 'Briefcase', 
      maxAmount: 5000000, 
      maxDuration: 120, 
      image: 'https://i.postimg.cc/g0NtsbtD/pexels-vlada-karpovich-7433905.jpg' 
    },
    { 
      id: 'rachat' as LoanType, 
      icon: 'RefreshCcw', 
      maxAmount: 250000, 
      maxDuration: 180, 
      image: 'https://i.postimg.cc/fywxrV3X/pexels-rdne-7414047.jpg' 
    }
  ];

  return baseData.map(base => {
    const key = base.id === 'personnel' ? 'p' : base.id === 'immobilier' ? 'i' : base.id === 'automobile' ? 'a' : base.id === 'entreprise' ? 'e' : 'r';
    return {
      ...base,
      title: titles[lang][key],
      description: descriptions[lang][key],
      longDescription: '',
      features: [],
      specificFaqs: loanSpecifics[base.id]?.faqs || [],
      specificTestimonials: loanSpecifics[base.id]?.testimonials || []
    };
  });
};

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Jean Dupont', role: 'Entrepreneur, France', content: 'Un accompagnement exceptionnel pour mon prêt entreprise. Le taux de 2% est imbattable sur le marché actuel.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=jean' },
  { id: 2, name: 'Marta Kowalska', role: 'Architecte, Polska', content: 'Szybka odpowiedź i bardzo profesjonalna obsługa. Dzięki Europfy kupiłam wymarzony samochód bez zbędnych formalności.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=marta' },
  { id: 3, name: 'Luca Moretti', role: 'Insegnante, Italia', content: 'Ho consolidato i miei debiti in un unico prestito a tasso fisso. La mia rata mensile è diminuita drasticamente.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=luca' },
  { id: 4, name: 'Sophie Müller', role: 'Ärztin, Deutschland', content: 'Einfacher Prozess, schnelle Auszahlung. Ich bin sehr zufrieden mit dem Service und der Transparenz.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=sophie' }
];

export const ICON_MAP: Record<string, any> = { User, HomeIcon, Car, Briefcase, RefreshCcw, CheckCircle, Clock, ShieldCheck, TrendingDown };
