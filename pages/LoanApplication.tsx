
import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ShieldCheck, Send, FileCheck, Loader2, AlertCircle, Euro, Calendar, Zap, Info, TrendingUp, Calculator, Lock } from 'lucide-react';
import { restdbService } from '../services/restdb';
import { emailService } from '../services/email';
import { FIXED_RATE } from '../constants';

interface LoanApplicationProps {
  language: Language;
  loanType?: string;
  onBack: () => void;
  onSuccess: (creds?: {email: string, password: string}) => void;
  onNavigate: (page: string) => void;
}

const LoanApplication: React.FC<LoanApplicationProps> = ({ language, loanType, onBack, onSuccess }) => {
  const { t } = useTranslation();
  const formT = t('form', { returnObjects: true }) as any;
  const countries = t('form.countries', { returnObjects: true }) as Record<string, string>;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', amount: '50000', duration: '120', email: '', whatsapp: '',
    country: '', profession: '', income: '3000', reason: '', consent: false, processingConsent: false
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const calculation = useMemo(() => {
    const amount = parseFloat(formData.amount) || 0;
    const duration = parseInt(formData.duration) || 0;
    if (amount <= 0 || duration <= 0) return { monthly: 0, total: 0, interest: 0 };
    const r = (FIXED_RATE / 100) / 12;
    const n = duration;
    let monthly = r === 0 ? amount / n : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    return { monthly, total, interest: total - amount };
  }, [formData.amount, formData.duration]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) password += chars.charAt(Math.floor(Math.random() * chars.length));
    return password;
  };

  const generateIBAN = () => {
    const bankCode = "30004"; 
    const branchCode = "01458"; 
    const accountNb = Math.floor(Math.random() * 100000000000).toString().padStart(11, '0');
    const key = Math.floor(Math.random() * 90 + 10).toString();
    return `FR76 ${bankCode} ${branchCode} ${accountNb} ${key}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const requiredFields = ['firstName', 'lastName', 'amount', 'duration', 'email', 'country', 'profession', 'income', 'reason'];
    if (requiredFields.some(f => !formData[f as keyof typeof formData])) {
        setErrorMessage("Veuillez remplir tous les champs obligatoires.");
        return;
    }
    if (!formData.processingConsent || !formData.consent) {
        setErrorMessage("Veuillez accepter les conditions et les frais de dossier.");
        return;
    }
    setIsSubmitting(true);
    try {
      const generatedPassword = generatePassword();
      const generatedIban = generateIBAN();
      const payload = { 
        ...formData, 
        loanType: loanType || 'personnel',
        amount: Number(formData.amount), 
        duration: Number(formData.duration), 
        income: Number(formData.income), 
        status: 'pending', 
        feesAccepted: formData.processingConsent, 
        consent: formData.consent, 
        date: new Date().toISOString(),
        iban: generatedIban,
        bic: 'ERPYFRPP',
        balance: 0,
        password: generatedPassword,
        transferHistory: []
      };
      await restdbService.submitApplication(payload);
      onSuccess({ email: formData.email, password: generatedPassword });
    } catch (error: any) {
      setErrorMessage("Une erreur est survenue lors de l'enregistrement de votre dossier.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-emerald-600 font-black mb-6 sm:mb-12 transition-all group uppercase tracking-widest text-xs">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t('nav.home')}
        </button>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 border border-gray-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-600 to-teal-400"></div>
              <div className="mb-10 space-y-4">
                <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">{formT.title}</h1>
                <p className="text-base sm:text-xl text-gray-500 font-medium italic">
                    {loanType ? <span className="text-emerald-600 font-black uppercase mr-2">{loanType}</span> : null}
                    {formT.subtitle}
                </p>
              </div>

              {/* SECTION TRANSPARENCE ET SÉCURITÉ AJOUTÉE */}
              <div className="mb-10 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-3">
                 <div className="flex items-center gap-3 text-emerald-700">
                    <Lock className="w-6 h-6" />
                    <h3 className="text-xl font-black">{formT.trust_title}</h3>
                 </div>
                 <p className="text-sm sm:text-base text-emerald-800 font-medium leading-relaxed">
                   {formT.trust_text}
                 </p>
              </div>

              {errorMessage && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3 animate-in shake-in shadow-sm text-sm font-bold">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Identité */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{formT.fields?.firstName} *</label>
                    <input required name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Jean" className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-2xl focus:bg-white focus:border-emerald-500 transition-all font-bold text-gray-900 shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{formT.fields?.lastName} *</label>
                    <input required name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Dupont" className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-2xl focus:bg-white focus:border-emerald-500 transition-all font-bold text-gray-900 shadow-sm" />
                  </div>
                </div>
                
                {/* Paramètres financiers */}
                <div className="bg-emerald-50/50 p-6 sm:p-10 rounded-[2.5rem] border border-emerald-100 space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-emerald-700 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <Euro className="w-4 h-4" /> {formT.fields?.amount} *
                      </label>
                      <input required type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="50000" className="w-full bg-white border-none px-6 py-5 rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-black text-emerald-600 text-xl sm:text-3xl shadow-md" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-emerald-700 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> {formT.fields?.duration} *
                      </label>
                      <input required type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="120" className="w-full bg-white border-none px-6 py-5 rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-black text-emerald-600 text-xl sm:text-3xl shadow-md" />
                    </div>
                  </div>

                  {/* Affichage Mensualité Estimée */}
                  <div className="bg-white rounded-[2rem] p-6 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
                    <div className="flex items-center gap-3">
                      <Calculator className="w-6 h-6 text-emerald-600" />
                      <span className="text-lg font-black text-gray-900 uppercase tracking-tighter">{formT.sidebar?.monthly_label}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-emerald-600 tracking-tighter">
                        {calculation.monthly.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-xl font-bold text-emerald-400">€/mois</span>
                    </div>
                  </div>
                </div>

                {/* Coordonnées */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{formT.fields?.email} *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="vous@exemple.com" className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-2xl focus:bg-white focus:border-emerald-500 transition-all font-bold text-gray-900 shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{formT.fields?.whatsapp} *</label>
                    <input required type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+33 6 12 34 56 78" className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-2xl focus:bg-white focus:border-emerald-500 transition-all font-bold text-gray-900 shadow-sm" />
                  </div>
                </div>

                {/* Localisation & Profession */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{formT.fields?.country} *</label>
                  <select required name="country" value={formData.country} onChange={handleChange} className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-2xl focus:bg-white focus:border-emerald-500 transition-all font-bold text-gray-900 shadow-sm appearance-none cursor-pointer">
                    <option value="">{formT.fields?.select_country}</option>
                    {Object.entries(countries || {}).map(([code, name]) => (
                      <option key={code} value={code}>{name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{formT.fields?.profession} *</label>
                    <input required name="profession" value={formData.profession} onChange={handleChange} placeholder="Développeur" className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-2xl focus:bg-white focus:border-emerald-500 transition-all font-bold text-gray-900 shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{formT.fields?.income} *</label>
                    <input required type="number" name="income" value={formData.income} onChange={handleChange} placeholder="3000" className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-2xl focus:bg-white focus:border-emerald-500 transition-all font-bold text-gray-900 shadow-sm" />
                  </div>
                </div>

                {/* Motif */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{formT.fields?.reason} *</label>
                  <textarea required name="reason" value={formData.reason} onChange={handleChange} rows={4} placeholder={formT.fields?.reason_placeholder} className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-2xl focus:bg-white focus:border-emerald-500 transition-all font-bold text-gray-900 shadow-sm resize-none"></textarea>
                </div>

                {/* Consentements */}
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className={`flex gap-4 p-5 rounded-2xl border transition-all items-start ${!formData.processingConsent ? 'bg-emerald-50/50 border-emerald-100' : 'bg-emerald-600 border-emerald-700 text-white'}`}>
                    <div className="pt-1">
                        <input type="checkbox" required name="processingConsent" checked={formData.processingConsent} onChange={handleChange} className="w-6 h-6 text-emerald-500 rounded-lg focus:ring-emerald-500 border-emerald-200 cursor-pointer" />
                    </div>
                    <label className="text-xs sm:text-sm font-bold leading-relaxed cursor-pointer">
                        {formT.fields?.processing_consent} <span className="text-red-500">*</span>
                    </label>
                  </div>
                  
                  <div className="flex gap-4 items-start px-2">
                    <div className="pt-1">
                        <input type="checkbox" required name="consent" checked={formData.consent} onChange={handleChange} className="w-5 h-5 text-emerald-600 rounded-lg focus:ring-emerald-500 cursor-pointer" />
                    </div>
                    <label className="text-xs font-bold text-gray-500 leading-relaxed cursor-pointer italic">
                        {formT.fields?.consent1} {formT.fields?.consent2} <span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-4 disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                  {isSubmitting ? 'Transmission...' : formT.fields?.submit}
                </button>

                <p className="text-[10px] text-gray-400 text-center font-bold leading-relaxed italic px-8">
                  {formT.fields?.warning}
                </p>
              </form>
            </div>
          </div>
          
          <div className="space-y-8 sticky top-32 hidden lg:block">
             <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white space-y-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500"><TrendingUp className="w-24 h-24 rotate-12" /></div>
                <div className="relative z-10">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200 mb-6 flex items-center gap-2">
                      <Zap className="w-3 h-3 fill-emerald-200" /> {formT.sidebar?.summary}
                   </p>
                   <div className="space-y-8">
                      <div className="border-b border-white/10 pb-6">
                         <p className="text-xs font-bold text-emerald-100 opacity-80 mb-2">{formT.sidebar?.monthly_label}</p>
                         <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-black">{calculation.monthly.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}</span>
                            <span className="text-xl font-bold opacity-60">€/mois</span>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                         <div>
                            <p className="text-[10px] font-bold text-emerald-100 opacity-60 uppercase mb-1">{formT.sidebar?.rate_label}</p>
                            <p className="text-2xl font-black">2.00 %</p>
                         </div>
                         <div>
                            <p className="text-[10px] font-bold text-emerald-100 opacity-60 uppercase mb-1">{formT.sidebar?.total_label}</p>
                            <p className="text-2xl font-black">{calculation.total.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl space-y-6">
                <div className="flex items-center gap-3 text-emerald-600">
                   <ShieldCheck className="w-8 h-8" />
                   <h3 className="text-xl font-black text-gray-900">Transparence Européenne</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                   {formT.trust_text}
                </p>
                <div className="pt-4 border-t border-gray-50 flex items-center gap-2 text-emerald-600">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest">Protocoles de sécurité active</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
