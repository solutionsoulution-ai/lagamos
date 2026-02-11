
import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ShieldCheck, Send, FileCheck, Loader2, AlertCircle, Euro, Calendar, Zap, Info, TrendingUp, Calculator } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', amount: '15000', duration: '48', email: '', whatsapp: '',
    country: '', profession: '', income: '', reason: '', consent: false, processingConsent: false
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
    
    // Validation
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
    console.log("🚀 Début de la soumission...");

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

      // 1. Sauvegarde dans la base de données (Etape critique)
      console.log("📡 Envoi vers RestDB...");
      await restdbService.submitApplication(payload);
      console.log("✅ Enregistrement DB réussi.");

      // 2. Envoi de l'email (Etape non-critique : on ne bloque pas si ça échoue)
      try {
        console.log("📧 Tentative d'envoi d'email...");
        // On ne met pas "await" ou on capture l'erreur pour ne pas bloquer l'utilisateur
        emailService.sendWelcomeEmail(formData.email, `${formData.firstName} ${formData.lastName}`, generatedPassword)
          .then(res => console.log(res ? "✅ Email envoyé" : "⚠️ Email non envoyé (vérifiez le bridge PHP)"))
          .catch(err => console.error("❌ Erreur email (non-bloquante):", err));
      } catch (mailErr) {
        console.error("Erreur lors de l'appel au service mail:", mailErr);
      }

      // 3. Redirection vers le succès
      onSuccess({ email: formData.email, password: generatedPassword });
      
    } catch (error: any) {
      console.error("❌ Erreur critique lors de la soumission:", error);
      if (error.message === "CORS_ERROR") {
        setErrorMessage("Problème de connexion sécurisée (CORS). Veuillez réessayer plus tard.");
      } else {
        setErrorMessage("Une erreur est survenue lors de l'enregistrement de votre dossier.");
      }
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
                    {loanType ? <span className="text-emerald-600 font-black uppercase mr-2">{loanType}</span> : null}
                    Formulaire de demande sécurisé.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-3 animate-in shake-in shadow-sm text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="font-bold">{errorMessage}</p>
                </div>
              )}

              <div className="mb-8 sm:mb-10 bg-emerald-50 border border-emerald-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-2 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                   <div className="bg-emerald-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl"><FileCheck className="w-4 h-4 sm:w-6 sm:h-6 text-white" /></div>
                   <h3 className="text-lg sm:text-xl font-black text-teal-900">Frais de dossier</h3>
                </div>
                <p className="text-sm sm:text-lg text-gray-700 leading-relaxed font-medium">
                    Des frais d'analyse technique s'appliquent. Ils sont dus uniquement après étude de votre éligibilité.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">Prénom <span className="text-red-500">*</span></label>
                    <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">Nom <span className="text-red-500">*</span></label>
                    <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base" />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 bg-emerald-50/30 p-4 sm:p-6 rounded-3xl border border-emerald-100">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-emerald-900 ml-1 flex items-center gap-2">
                        <Euro className="w-4 h-4" /> Montant souhaité <span className="text-red-500">*</span>
                    </label>
                    <input required type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full bg-white border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-black text-emerald-600 text-lg sm:text-xl shadow-sm" />
                    <div className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                       Mensualité estimée : <span className="text-emerald-600">{calculation.monthly.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} €</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-emerald-900 ml-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Durée (mois) <span className="text-red-500">*</span>
                    </label>
                    <input required type="number" name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-white border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-black text-emerald-600 text-lg sm:text-xl shadow-sm" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">Adresse Email <span className="text-red-500">*</span></label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">WhatsApp</label>
                  <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+33 6..." className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">Pays de résidence <span className="text-red-500">*</span></label>
                  <select required name="country" value={formData.country} onChange={handleChange} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base">
                    <option value="">Sélectionnez votre pays...</option>
                    <option value="FR">France</option>
                    <option value="BE">Belgique</option>
                    <option value="CH">Suisse</option>
                    <option value="LU">Luxembourg</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">Profession <span className="text-red-500">*</span></label>
                    <input required name="profession" value={formData.profession} onChange={handleChange} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">Revenu mensuel (€) <span className="text-red-500">*</span></label>
                    <input required type="number" name="income" value={formData.income} onChange={handleChange} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm sm:text-base" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-gray-700 ml-1">Motif du prêt <span className="text-red-500">*</span></label>
                  <textarea required name="reason" value={formData.reason} onChange={handleChange} rows={4} className="w-full bg-gray-50 border-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium resize-none text-sm sm:text-base"></textarea>
                </div>

                <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 border-t border-gray-50">
                  <div className={`flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border transition-colors items-start ${!formData.processingConsent ? 'bg-emerald-50/50 border-emerald-100' : 'bg-emerald-100 border-emerald-200'}`}>
                    <div className="pt-1">
                        <input type="checkbox" required name="processingConsent" checked={formData.processingConsent} onChange={handleChange} className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 rounded-lg focus:ring-emerald-500 border-emerald-200 cursor-pointer" />
                    </div>
                    <label className="text-[11px] sm:text-sm text-emerald-900 font-bold leading-relaxed cursor-pointer">
                        J'accepte les frais de gestion liés au dossier. <span className="text-red-600">*</span>
                    </label>
                  </div>
                  
                  <div className="flex gap-3 sm:gap-4 items-start px-1">
                    <div className="pt-1">
                        <input type="checkbox" required name="consent" checked={formData.consent} onChange={handleChange} className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 rounded-lg focus:ring-emerald-500 cursor-pointer" />
                    </div>
                    <label className="text-[11px] sm:text-sm text-gray-500 leading-relaxed font-medium cursor-pointer">
                        Je certifie sur l'honneur l'exactitude des informations fournies et j'accepte le traitement de mes données conformément au RGPD. <span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 text-white py-4 sm:py-6 rounded-2xl font-black text-base sm:text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 sm:gap-4 disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" /> : <Send className="w-5 h-5 sm:w-6 sm:h-6" />}
                  {isSubmitting ? 'Traitement...' : 'Soumettre mon dossier'}
                </button>
              </form>
            </div>
          </div>
          
          <div className="space-y-6 sm:space-y-8 sticky top-32">
             <div className="bg-emerald-600 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 text-white space-y-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500"><TrendingUp className="w-24 h-24 rotate-12" /></div>
                <div className="relative z-10">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200 mb-4 flex items-center gap-2">
                      <Zap className="w-3 h-3 fill-emerald-200" /> Récapitulatif
                   </p>
                   <div className="space-y-6">
                      <div className="border-b border-white/10 pb-4">
                         <p className="text-xs font-bold text-emerald-100 opacity-80 mb-1">Mensualité estimée</p>
                         <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-black">{calculation.monthly.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}</span>
                            <span className="text-lg font-bold opacity-60">€/mois</span>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <p className="text-[10px] font-bold text-emerald-100 opacity-60 uppercase mb-1">Taux Fixe</p>
                            <p className="text-xl font-black">2.00 %</p>
                         </div>
                         <div>
                            <p className="text-[10px] font-bold text-emerald-100 opacity-60 uppercase mb-1">Montant dû</p>
                            <p className="text-xl font-black">{calculation.total.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
