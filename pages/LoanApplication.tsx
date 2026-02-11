
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ShieldCheck, Send, FileCheck, Loader2, AlertCircle } from 'lucide-react';
import { restdbService } from '../services/restdb';

interface LoanApplicationProps {
  language: Language;
  onBack: () => void;
  onSuccess: (creds?: {email: string, password: string}) => void;
  onNavigate: (page: string) => void;
}

const LoanApplication: React.FC<LoanApplicationProps> = ({ language, onBack, onSuccess }) => {
  const { t } = useTranslation();
  const formT = t('form', { returnObjects: true }) as any;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', amount: '', duration: '', email: '', whatsapp: '',
    country: '', profession: '', income: '', reason: '', consent: false, processingConsent: false
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
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
    const isAnyFieldEmpty = requiredFields.some(field => {
        const val = formData[field as keyof typeof formData];
        return !val || (typeof val === 'string' && val.trim() === '');
    });

    if (isAnyFieldEmpty) {
        setErrorMessage("Veuillez remplir tous les champs obligatoires.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    if (!formData.processingConsent) {
        setErrorMessage("Vous devez accepter les frais de gestion.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    if (!formData.consent) {
        setErrorMessage("Veuillez accepter la politique RGPD.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    setIsSubmitting(true);
    try {
      const generatedPassword = generatePassword();
      const generatedIban = generateIBAN();
      
      await restdbService.submitApplication({ 
        ...formData, 
        amount: Number(formData.amount), 
        duration: Number(formData.duration), 
        income: Number(formData.income), 
        status: 'pending', 
        feesAccepted: formData.processingConsent, 
        date: new Date().toISOString(),
        iban: generatedIban,
        bic: 'ERPYFRPP',
        balance: 0,
        password: generatedPassword
      });

      onSuccess({ email: formData.email, password: generatedPassword });
      
    } catch (error: any) {
      setErrorMessage("Erreur serveur : " + error.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formT) return null;

  return (
    <div className="pt-24 sm:pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold mb-6 sm:mb-12 transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t('nav.home')}
        </button>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 border border-gray-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-600 to-teal-400"></div>
              
              <div className="mb-6 sm:mb-10 space-y-2 sm:space-y-4">
                <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">{formT.title}</h1>
                <p className="text-base sm:text-xl text-gray-500 font-medium">
                    <span className="hidden sm:inline">Une procédure </span>
                    Rapide, simple et 100% sécurisée.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-3 animate-in shake-in shadow-sm text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="font-bold">{errorMessage}</p>
                </div>
              )}

              {/* Bloc Frais de dossier optimisé pour mobile */}
              <div className="mb-8 sm:mb-10 bg-emerald-50 border border-emerald-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-2 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                   <div className="bg-emerald-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl"><FileCheck className="w-4 h-4 sm:w-6 sm:h-6 text-white" /></div>
                   <h3 className="text-lg sm:text-xl font-black text-teal-900">{formT.processing_fees?.title}</h3>
                </div>
                <p className="text-sm sm:text-lg text-gray-700 leading-relaxed font-medium">
                    Frais d'analyse technique <span className="hidden sm:inline">s'appliquent pour le traitement de votre dossier.</span>
                    <span className="sm:hidden text-xs block text-teal-600 font-bold mt-1">Applicables après étude de votre dossier.</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">{formT.fields?.firstName} <span className="text-red-500">*</span></label>
                    <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">{formT.fields?.lastName} <span className="text-red-500">*</span></label>
                    <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base" />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">{formT.fields?.amount} <span className="text-red-500">*</span></label>
                    <input required type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">{formT.fields?.duration} <span className="text-red-500">*</span></label>
                    <input required type="number" name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">{formT.fields?.email} <span className="text-red-500">*</span></label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">WhatsApp</label>
                  <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+33 6..." className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">{formT.fields?.country} <span className="text-red-500">*</span></label>
                  <select required name="country" value={formData.country} onChange={handleChange} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base">
                    <option value="">{formT.fields?.select_country}</option>
                    {Object.entries(formT.countries || {}).map(([code, name]) => (
                      <option key={code} value={code}>{name as string}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">{formT.fields?.profession} <span className="text-red-500">*</span></label>
                    <input required name="profession" value={formData.profession} onChange={handleChange} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">{formT.fields?.income} <span className="text-red-500">*</span></label>
                    <input required type="number" name="income" value={formData.income} onChange={handleChange} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">{formT.fields?.reason} <span className="text-red-500">*</span></label>
                  <textarea required name="reason" value={formData.reason} onChange={handleChange} rows={4} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium resize-none text-sm sm:text-base"></textarea>
                </div>

                <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 border-t border-gray-50">
                  <div className={`flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border transition-colors items-start ${!formData.processingConsent ? 'bg-emerald-50/50 border-emerald-100' : 'bg-emerald-100 border-emerald-200'}`}>
                    <div className="pt-1">
                        <input type="checkbox" required name="processingConsent" checked={formData.processingConsent} onChange={handleChange} className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 rounded-lg focus:ring-emerald-500 border-emerald-200 cursor-pointer" />
                    </div>
                    <label className="text-[11px] sm:text-sm text-emerald-900 font-bold leading-relaxed cursor-pointer">
                        {formT.fields?.processing_consent} <span className="text-red-600">*</span>
                    </label>
                  </div>
                  
                  <div className="flex gap-3 sm:gap-4 items-start px-1">
                    <div className="pt-1">
                        <input type="checkbox" required name="consent" checked={formData.consent} onChange={handleChange} className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 rounded-lg focus:ring-emerald-500 cursor-pointer" />
                    </div>
                    <label className="text-[11px] sm:text-sm text-gray-500 leading-relaxed font-medium cursor-pointer">
                        {formT.fields?.consent1} <span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 text-white py-4 sm:py-6 rounded-2xl font-black text-base sm:text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 sm:gap-4 disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" /> : <Send className="w-5 h-5 sm:w-6 sm:h-6" />}
                  {isSubmitting ? 'Traitement...' : formT.fields?.submit}
                </button>
              </form>
            </div>
          </div>
          
          <div className="space-y-6 sm:space-y-8 sticky top-32">
             <div className="bg-gray-900 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 text-white space-y-6 sm:space-y-8 relative overflow-hidden shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-black relative z-10">{formT.trust_title}</h3>
                <p className="text-sm sm:text-base text-gray-400 font-medium relative z-10 leading-relaxed">{formT.trust_text}</p>
                <div className="space-y-4 relative z-10 pt-2 sm:pt-4">
                   <div className="flex items-center gap-3 sm:gap-4"><div className="bg-emerald-600/30 p-2 sm:p-2.5 rounded-lg sm:rounded-xl"><ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /></div><span className="text-xs sm:text-sm font-bold">SSL 256 bits Secured</span></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
