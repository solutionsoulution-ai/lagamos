
import { FaqItem, Testimonial, LoanType } from './types';

export interface LoanCategoryData {
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  faqs: FaqItem[];
  testimonials: Testimonial[];
  maxAmount: number;
  maxDuration: number;
}

const generateFaqs = (type: LoanType): FaqItem[] => {
  const packs: any = {
    immobilier: [
      { q: "Quel est le taux pour un achat immobilier ?", a: "Chez Europfy, nous appliquons un taux fixe unique de 2% sur toute la durée de votre crédit." },
      { q: "Puis-je financer des travaux ?", a: "Oui, le prêt immobilier inclut le financement de l'achat et/ou des travaux de rénovation." },
      { q: "Y a-t-il des frais de remboursement anticipé ?", a: "Non, chez Europfy, vous pouvez rembourser votre prêt par anticipation sans aucune pénalité." }
    ],
    automobile: [
      { q: "Puis-je acheter un véhicule d'occasion ?", a: "Oui, le prêt automobile Europfy couvre les véhicules neufs ainsi que les véhicules d'occasion de moins de 10 ans." }
    ],
    personnel: [
      { q: "Dois-je justifier mes dépenses ?", a: "Pour le prêt personnel, aucun justificatif d'utilisation des fonds n'est requis." }
    ]
  };
  return packs[type] || [];
};

const generateTestimonials = (): Testimonial[] => {
  return [
    { id: 101, name: "Marc Lefebvre", role: "Propriétaire, Lyon", content: "Grâce au taux de 2% d'Europfy, j'ai pu acquérir ma résidence principale avec des mensualités très confortables.", rating: 5, avatar: "https://i.pravatar.cc/150?u=101" }
  ];
};

const createLoanPack = (): Record<LoanType, LoanCategoryData> => {
  return {
    immobilier: { 
      title: "Prêt Immobilier", 
      description: "Le taux fixe de 2% pour votre futur chez-vous.", 
      longDescription: "Financez l'acquisition de votre résidence principale, secondaire ou votre investissement locatif avec sérénité.", 
      features: ["2% Fixe", "Assurance flexible", "Réponse sous 24h"], 
      maxAmount: 1500000, 
      maxDuration: 300, 
      faqs: generateFaqs('immobilier'), 
      testimonials: generateTestimonials() 
    },
    automobile: { 
      title: "Prêt Automobile", 
      description: "Financez votre mobilité au meilleur prix.", 
      longDescription: "Que ce soit pour une voiture neuve, d'occasion ou électrique, profitez d'un financement avantageux.", 
      features: ["2% Fixe", "Sans apport obligatoire", "Tous types de véhicules"], 
      maxAmount: 80000, 
      maxDuration: 84, 
      faqs: generateFaqs('automobile'), 
      testimonials: generateTestimonials() 
    },
    entreprise: { 
      title: "Prêt Entreprise", 
      description: "Soutenez la croissance de votre activité.", 
      longDescription: "Besoins de trésorerie, investissement matériel ou développement commercial, nous finançons vos ambitions.", 
      features: ["2% Fixe", "Analyse humaine expert", "Différé de remboursement"], 
      maxAmount: 5000000, 
      maxDuration: 120, 
      faqs: generateFaqs('immobilier'), 
      testimonials: generateTestimonials() 
    },
    personnel: { 
      title: "Prêt Personnel", 
      description: "Concrétisez vos projets de vie librement.", 
      longDescription: "Mariage, voyage, études ou imprévus, disposez des fonds dont vous avez besoin rapidement.", 
      features: ["2% Fixe", "Sans justificatifs", "Virement express"], 
      maxAmount: 75000, 
      maxDuration: 84, 
      faqs: generateFaqs('personnel'), 
      testimonials: generateTestimonials() 
    },
    rachat: { 
      title: "Rachat de Crédit", 
      description: "Simplifiez vos finances et réduisez vos mensualités.", 
      longDescription: "Regroupez tous vos crédits en un seul pour ne payer qu'une seule mensualité à un taux réduit de 2%.", 
      features: ["2% Fixe", "Une seule mensualité", "Gestion simplifiée"], 
      maxAmount: 250000, 
      maxDuration: 180, 
      faqs: generateFaqs('immobilier'), 
      testimonials: generateTestimonials() 
    }
  };
};

export const LOAN_DATABASE: Record<string, Record<LoanType, LoanCategoryData>> = {
  fr: createLoanPack(),
};
