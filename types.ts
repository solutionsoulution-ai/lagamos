
export type Language = 'fr' | 'pt';

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
  loanType?: string;
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
  iban?: string;
  bic?: string;
  balance?: number;
  password?: string;
  transferDelay?: number;
  transferDelayUnit?: 'minutes' | 'hours' | 'days';
  isBlocked?: boolean;
  blockReason?: string;
  currentTransfer?: TransferState | null;
  transferHistory?: Transaction[];
}

export interface User {
  id?: string; // ID unique du document en base
  email: string;
  role: 'admin' | 'client';
  name?: string;
}
