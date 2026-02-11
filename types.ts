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

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  label: string;
  date: string;
  status: 'completed' | 'failed' | 'pending';
  // Détails additionnels pour les virements
  beneficiary?: string;
  iban?: string;
  swift?: string;
}

export interface LoanApplicationData {
  _id?: string;
  id?: string;
  date: string;
  firstName: string;
  lastName: string;
  loanType?: string; // Type de prêt (ex: personnel, immobilier)
  amount: number;
  duration: number;
  email: string;
  whatsapp: string;
  address?: string;
  idCardNumber?: string;
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
  transferDelay?: number;
  transferDelayUnit?: 'minutes' | 'hours' | 'days';
  isBlocked?: boolean;
  blockReason?: string;

  // État du virement en cours et historique
  currentTransfer?: TransferState | null;
  transferHistory?: Transaction[];
}

export interface User {
  email: string;
  role: 'admin' | 'client';
  name?: string;
}