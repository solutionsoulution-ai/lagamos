
export type Language = 'fr' | 'en' | 'pl' | 'pt' | 'de' | 'es' | 'nl' | 'it';

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

export interface LoanCharacteristic {
  label: string;
  value: string;
  icon?: string;
}

export interface LoanDefinition {
  title: string;
  text: string;
  characteristics: LoanCharacteristic[];
}

export interface LoanInfo {
  id: LoanType;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  features: string[];
  maxAmount: number;
  maxDuration: number;
  definition?: LoanDefinition;
  specificFaqs?: FaqItem[];
  specificTestimonials?: Testimonial[];
}

export interface TransferState {
  amount: number;
  beneficiary: string;
  iban: string;
  swift: string;
  startTime: number;
  endTime: number;
  status: 'in_progress' | 'completed' | 'failed';
}

export interface LoanApplicationData {
  _id?: string; // Ajouté pour compatibilité RestDB
  id?: string;
  date: string;
  firstName: string;
  lastName: string;
  amount: number;
  duration: number;
  email: string;
  whatsapp: string;
  address?: string; // Nouveau champ
  idCardNumber?: string; // Nouveau champ
  country: string;
  profession: string;
  income: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  feesAccepted: boolean;
  consent: boolean;
  processingConsent: boolean;
  
  // Champs bancaires
  iban?: string;
  bic?: string;
  balance?: number;
  
  // Sécurité
  password?: string;

  // Configuration Virement (Admin)
  transferDelay?: number; // Valeur
  transferDelayUnit?: 'minutes' | 'hours' | 'days'; // Unité
  isBlocked?: boolean; // Blocage des virements sortants
  blockReason?: string; // Motif du blocage

  // État du virement en cours
  currentTransfer?: TransferState | null;
}

export interface User {
  email: string;
  role: 'admin' | 'client';
  name?: string;
}
