
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
import { LoanInfo, Testimonial } from './types';

export const FIXED_RATE = 2; // 2%

export const LOANS_DATA: LoanInfo[] = [
  {
    id: 'personnel',
    title: 'Prêt Personnel',
    description: 'Réalisez vos projets de vie en toute liberté.',
    longDescription: 'Que ce soit pour un voyage, un mariage, des travaux ou un imprévu, notre prêt personnel vous accompagne avec une flexibilité totale. Aucun justificatif d\'utilisation requis.',
    icon: 'User',
    features: ['Déblocage rapide', 'Sans frais de dossier', 'Pause mensualité possible'],
    maxAmount: 75000,
    maxDuration: 84
  },
  {
    id: 'immobilier',
    title: 'Prêt Immobilier',
    description: 'Devenez propriétaire avec sérénité.',
    longDescription: 'Acquisition d\'une résidence principale, secondaire ou investissement locatif. Profitez de notre taux unique de 2% pour financer votre futur chez-vous.',
    icon: 'HomeIcon',
    features: ['Financement jusqu\'à 110%', 'Modularité des échéances', 'Assurance compétitive'],
    maxAmount: 1500000,
    maxDuration: 300
  },
  {
    id: 'automobile',
    title: 'Prêt Automobile',
    description: 'Prenez la route avec le meilleur financement.',
    longDescription: 'Véhicule neuf ou d\'occasion, hybride ou électrique. Nous finançons l\'intégralité de votre projet automobile sans apport personnel obligatoire.',
    icon: 'Car',
    features: ['Réponse de principe immédiate', 'Report de première mensualité', 'Option LOA disponible'],
    maxAmount: 100000,
    maxDuration: 72
  },
  {
    id: 'entreprise',
    title: 'Prêt Entreprise',
    description: 'Propulsez votre croissance professionnelle.',
    longDescription: 'Financement de trésorerie, achat de matériel ou développement à l\'international. Un accompagnement sur mesure pour les entrepreneurs ambitieux.',
    icon: 'Briefcase',
    features: ['Conseiller dédié', 'Amortissement flexible', 'Garantie d\'état possible'],
    maxAmount: 5000000,
    maxDuration: 120
  },
  {
    id: 'rachat',
    title: 'Rachat de Crédit',
    description: 'Simplifiez vos finances et gagnez du pouvoir d\'achat.',
    longDescription: 'Regroupez tous vos crédits en une seule mensualité réduite. Optimisez votre budget mensuel et profitez de notre taux fixe de 2% sur la totalité du capital.',
    icon: 'RefreshCcw',
    features: ['Une seule mensualité', 'Taux unique réduit', 'Gestion simplifiée'],
    maxAmount: 250000,
    maxDuration: 180
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Jean Dupont',
    role: 'Entrepreneur',
    content: 'Grâce au prêt entreprise de FinancePlus, j\'ai pu ouvrir ma deuxième boulangerie en un temps record. Le taux de 2% est imbattable sur le marché.',
    rating: 5,
    avatar: 'https://picsum.photos/id/64/100/100'
  },
  {
    id: 2,
    name: 'Marie Leroy',
    role: 'Infirmière',
    content: 'Le rachat de crédit a sauvé mon budget. Je paye maintenant 400€ de moins par mois. Un grand merci à l\'équipe pour leur réactivité.',
    rating: 5,
    avatar: 'https://picsum.photos/id/65/100/100'
  },
  {
    id: 3,
    name: 'Thomas Martin',
    role: 'Cadre IT',
    content: 'J\'ai financé ma maison avec eux. Tout s\'est fait en ligne, de manière transparente et rapide. Je recommande vivement.',
    rating: 4,
    avatar: 'https://picsum.photos/id/66/100/100'
  }
];

export const ICON_MAP: Record<string, any> = {
  User,
  HomeIcon,
  Car,
  Briefcase,
  RefreshCcw,
  CheckCircle,
  Clock,
  ShieldCheck,
  TrendingDown
};
