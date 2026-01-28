
export type Language = 'fr' | 'pl' | 'de' | 'nl' | 'it' | 'pt' | 'es';

export type LoanType = 'personnel' | 'immobilier' | 'automobile' | 'entreprise' | 'rachat';

export interface FaqItem {
  q: string;
  a: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface LoanInfo {
  id: LoanType;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  features: string[];
  maxAmount: number;
  maxDuration: number;
  specificFaqs?: FaqItem[];
  specificTestimonials?: Testimonial[];
}

export interface LoanApplicationData {
  id: string;
  date: string;
  firstName: string;
  lastName: string;
  amount: number;
  duration: number;
  email: string;
  whatsapp: string;
  country: string;
  profession: string;
  income: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  feesAccepted: boolean;
}

export interface User {
  email: string;
  role: 'admin' | 'client';
  name?: string;
}
