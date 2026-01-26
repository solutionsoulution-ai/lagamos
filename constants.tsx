
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
import { LoanInfo, Testimonial, Language } from './types';

export const FIXED_RATE = 2; // 2%

export const getLoansData = (lang: Language): LoanInfo[] => {
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
    es: { p: 'Proyectos de vida em libertad.', i: 'Conviértete en propietario.', a: 'Sal a la carretera.', e: 'Impulsa tu crecimiento.', r: 'Simplifica tus finanzas.' }
  };

  return [
    { id: 'personnel', title: titles[lang].p, description: descriptions[lang].p, longDescription: '', icon: 'User', features: [], maxAmount: 75000, maxDuration: 84 },
    { id: 'immobilier', title: titles[lang].i, description: descriptions[lang].i, longDescription: '', icon: 'HomeIcon', features: [], maxAmount: 1500000, maxDuration: 300 },
    { id: 'automobile', title: titles[lang].a, description: descriptions[lang].a, longDescription: '', icon: 'Car', features: [], maxAmount: 100000, maxDuration: 72 },
    { id: 'entreprise', title: titles[lang].e, description: descriptions[lang].e, longDescription: '', icon: 'Briefcase', features: [], maxAmount: 5000000, maxDuration: 120 },
    { id: 'rachat', title: titles[lang].r, description: descriptions[lang].r, longDescription: '', icon: 'RefreshCcw', features: [], maxAmount: 250000, maxDuration: 180 }
  ];
};

export const TESTIMONIALS: Testimonial[] = [
  { 
    id: 1, 
    name: 'Jean Dupont', 
    role: 'Entrepreneur, France', 
    content: 'Un accompagnement exceptionnel pour mon prêt entreprise. Le taux de 2% est imbattable sur le marché actuel.', 
    rating: 5, 
    avatar: 'https://i.pravatar.cc/150?u=jean' 
  },
  { 
    id: 2, 
    name: 'Marta Kowalska', 
    role: 'Architecte, Pologne', 
    content: 'Szybka odpowiedź i bardzo profesjonalna obsługa. Dzięki FinancePlus kupiłam wymarzony samochód bez zbędnych formalności.', 
    rating: 5, 
    avatar: 'https://i.pravatar.cc/150?u=marta' 
  },
  { 
    id: 3, 
    name: 'Luca Moretti', 
    role: 'Enseignant, Italie', 
    content: 'Ho consolidato i miei debiti in un unico prestito a tasso fisso. La mia rata mensile è diminuita drasticamente.', 
    rating: 5, 
    avatar: 'https://i.pravatar.cc/150?u=luca' 
  },
  { 
    id: 4, 
    name: 'Sophie Müller', 
    role: 'Médecin, Allemagne', 
    content: 'Einfacher Prozess, schnelle Auszahlung. Ich bin sehr zufrieden mit dem Service und der Transparenz.', 
    rating: 5, 
    avatar: 'https://i.pravatar.cc/150?u=sophie' 
  }
];

export const ICON_MAP: Record<string, any> = { User, HomeIcon, Car, Briefcase, RefreshCcw, CheckCircle, Clock, ShieldCheck, TrendingDown };
