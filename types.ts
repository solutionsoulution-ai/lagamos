
export type Language = 'fr' | 'pl' | 'de' | 'nl' | 'it' | 'pt' | 'es';

export type LoanType = 'personnel' | 'immobilier' | 'automobile' | 'entreprise' | 'rachat';

export interface LoanInfo {
  id: LoanType;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  features: string[];
  maxAmount: number;
  maxDuration: number; // in months
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface BlogPost {
  id: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}
