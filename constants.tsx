
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
  TrendingDown,
  Info,
  List,
  Target
} from 'lucide-react';
import { LoanInfo, Testimonial, LoanType } from './types';

export const FIXED_RATE = 2; // 2%

export const buildLoansData = (loanSpecifics: any): LoanInfo[] => {
  if (!loanSpecifics) return [];

  const iconMap: Record<LoanType, string> = {
    personnel: 'User',
    immobilier: 'HomeIcon',
    automobile: 'Car',
    entreprise: 'Briefcase',
    rachat: 'RefreshCcw'
  };

  const images: Record<LoanType, string> = {
    personnel: 'https://i.postimg.cc/GhFrb9SK/pexels-mizunokozuki-12912114.jpg',
    immobilier: 'https://i.postimg.cc/wM0BTvww/side-view-man-working-as-real-estate-agent.jpg',
    automobile: 'https://i.postimg.cc/LX4K4Vww/young-family-choosing-car-car-showroom.jpg',
    entreprise: 'https://i.postimg.cc/g0NtsbtD/pexels-vlada-karpovich-7433905.jpg',
    rachat: 'https://i.postimg.cc/fywxrV3X/pexels-rdne-7414047.jpg'
  };

  const loanTypes: LoanType[] = ['personnel', 'immobilier', 'automobile', 'entreprise', 'rachat'];

  return loanTypes.map(id => {
    const data = loanSpecifics[id];
    // Protection contre les données manquantes
    if (!data) return {
       id,
       title: "Chargement...",
       description: "",
       longDescription: "",
       icon: iconMap[id],
       image: images[id],
       features: [],
       maxAmount: 0,
       maxDuration: 0,
       specificFaqs: [],
       specificTestimonials: []
    };

    return {
      id,
      title: data.title,
      description: data.description,
      longDescription: data.longDescription,
      icon: iconMap[id],
      image: images[id],
      features: data.features,
      maxAmount: data.maxAmount,
      maxDuration: data.maxDuration,
      definition: data.definition, // Ajout du champ definition
      specificFaqs: data.faqs,
      specificTestimonials: data.testimonials
    };
  });
};

export const getLoansData = (lang: any): LoanInfo[] => {
  return []; 
};

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Jean-Pierre Martin', role: 'Entrepreneur, Paris', content: 'Un accompagnement exceptionnel pour mon prêt entreprise. Le taux de 2% est imbattable sur le marché actuel.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=jean' },
  { id: 2, name: 'Sophie Bernard', role: 'Infirmière, Lyon', content: 'La demande a été traitée en un temps record. Très satisfaite de mon prêt auto.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=marta' },
  { id: 3, name: 'Lucas Dubois', role: 'Enseignant, Bordeaux', content: 'Enfin une banque qui respecte ses clients avec un taux fixe et clair.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=luca' }
];

export const ICON_MAP: Record<string, any> = { User, HomeIcon, Car, Briefcase, RefreshCcw, CheckCircle, Clock, ShieldCheck, TrendingDown, Info, List, Target };
