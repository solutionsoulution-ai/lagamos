
import React, { useState, useEffect } from 'react';
import { Language, LoanApplicationData } from '../types';
import { translations } from '../translations';
import { ChevronLeft, ShieldCheck, Lock, Send, Info, Landmark, HelpCircle, FileCheck } from 'lucide-react';

interface LoanApplicationProps {
  language: Language;
  onBack: () => void;
  onSuccess: () => void;
  onNavigate: (page: string) => void;
}

const LoanApplication: React.FC<LoanApplicationProps> = ({ language, onBack, onSuccess, onNavigate }) => {
  const t = translations[language].form;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    amount: '',
    duration: '',
    email: '',
    whatsapp: '',
    country: '',
    profession: '',
    income: '',
    reason: '',
    consent: false,
    processingConsent: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.processingConsent) {
        const errorMsg = {
          fr: "Veuillez accepter les frais de dossier pour continuer.",
          pl: "Proszę zaakceptować koszty operacyjne, aby kontynuować.",
          de: "Bitte akzeptieren Sie die Bearbeitungsgebühren, um fortzufahren.",
          nl: "Accepteer de behandelingskosten om door te gaan.",
          it: "Si prega di accettare le spese di istruttoria per continuare.",
          pt: "Por favor, aceite os custos de processo para continuar.",
          es: "Por favor, acepte los gastos de gestión para continuar."
        };
        alert(errorMsg[language] || errorMsg.fr);
        return;
    }

    const application: LoanApplicationData = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      amount: Number(formData.amount),
      duration: Number(formData.duration),
      email: formData.email,
      whatsapp: formData.whatsapp,
      country: formData.country,
      profession: formData.profession,
      income: Number(formData.income),
      reason: formData.reason,
      status: 'pending',
      feesAccepted: formData.processingConsent
    };

    const existingRaw = localStorage.getItem('loan_applications');
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    localStorage.setItem('loan_applications', JSON.stringify([application, ...existing]));

    onSuccess();
  };

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold mb-12 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {translations[language].nav.home}
        </button>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>
              
              <div className="mb-10 space-y-4">
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                  {t.title}
                </h1>
                <p className="text-xl text-gray-500 font-medium">
                  {t.subtitle}
                </p>
              </div>

              {/* Bloc Frais de Dossier */}
              <div className="mb-10 bg-blue-50 border border-blue-100 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                   <div className="bg-blue-600 p-2 rounded-xl">
                      <FileCheck className="w-6 h-6 text-white" />
                   </div>
                   <h3 className="text-xl font-black text-blue-900">{t.processing_fees.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">
                    {t.processing_fees.text}
                </p>
                <div className="pt-2 border-t border-blue-200">
                    <p className="text-sm font-black text-blue-600 italic">
                        {t.processing_fees.detail}
                    </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.firstName}</label>
                    <input 
                      required name="firstName" value={formData.firstName} onChange={handleChange}
                      placeholder="..."
                      className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.lastName}</label>
                    <input 
                      required name="lastName" value={formData.lastName} onChange={handleChange}
                      placeholder="..."
                      className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium" 
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.amount}</label>
                    <input 
                      required type="number" name="amount" value={formData.amount} onChange={handleChange}
                      placeholder="50000"
                      className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.duration}</label>
                    <input 
                      required type="number" name="duration" value={formData.duration} onChange={handleChange}
                      placeholder="120"
                      className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium" 
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.email}</label>
                    <input 
                      required type="email" name="email" value={formData.email} onChange={handleChange}
                      placeholder="email@..."
                      className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.whatsapp}</label>
                    <input 
                      required name="whatsapp" value={formData.whatsapp} onChange={handleChange}
                      placeholder="+..."
                      className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.country}</label>
                  <select 
                    required name="country" value={formData.country} onChange={handleChange}
                    className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium"
                  >
                    <option value="">{t.fields.select_country}</option>
                    {Object.entries(t.countries || {}).map(([code, name]) => (
                      <option key={code} value={code}>{name as string}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.profession}</label>
                    <input 
                      required name="profession" value={formData.profession} onChange={handleChange}
                      placeholder="..."
                      className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.income}</label>
                    <input 
                      required type="number" name="income" value={formData.income} onChange={handleChange}
                      placeholder="..."
                      className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.reason}</label>
                  <textarea 
                    required name="reason" value={formData.reason} onChange={handleChange}
                    placeholder={t.fields.reason_placeholder}
                    rows={4}
                    className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium resize-none"
                  ></textarea>
                </div>

                <div className="space-y-6 pt-6 border-t border-gray-50">
                  {/* Frais de dossier Checkbox */}
                  <div className="flex gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100 items-start">
                    <div className="pt-1">
                      <input 
                        type="checkbox" required name="processingConsent" checked={formData.processingConsent} onChange={handleChange}
                        className="w-6 h-6 text-blue-600 rounded-lg focus:ring-blue-500 border-blue-200 cursor-pointer" 
                      />
                    </div>
                    <label className="text-sm text-blue-900 font-bold leading-relaxed cursor-pointer">
                      {t.fields.processing_consent}
                    </label>
                  </div>

                  <div className="flex gap-4 items-start px-1">
                    <div className="pt-1">
                      <input 
                        type="checkbox" required name="consent" checked={formData.consent} onChange={handleChange}
                        className="w-5 h-5 text-blue-600 rounded-lg focus:ring-blue-500" 
                      />
                    </div>
                    <label className="text-sm text-gray-500 leading-relaxed font-medium">
                      {t.fields.consent1}
                    </label>
                  </div>
                  <p className="text-[10px] text-gray-400 italic px-1">
                    {t.fields.consent2}
                  </p>
                </div>

                <div className="bg-orange-50 p-5 rounded-2xl flex gap-4 items-center border border-orange-100">
                  <Info className="w-6 h-6 text-orange-600 shrink-0" />
                  <p className="text-xs font-bold text-orange-800 leading-tight">
                    {t.fields.warning}
                  </p>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-4 hover:scale-[1.01]"
                >
                  <Send className="w-6 h-6" />
                  {t.fields.submit}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 sticky top-32">
             <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white space-y-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                   <Lock className="w-32 h-32" />
                </div>
                <h3 className="text-2xl font-black relative z-10">{t.trust_title}</h3>
                <p className="text-gray-400 font-medium relative z-10 leading-relaxed">
                  {t.trust_text}
                </p>
                <div className="space-y-4 relative z-10 pt-4">
                   <div className="flex items-center gap-4">
                      <div className="bg-blue-600/30 p-2.5 rounded-xl"><ShieldCheck className="w-5 h-5 text-blue-400" /></div>
                      <span className="text-sm font-bold">SSL 256 bits Secured</span>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="bg-blue-600/30 p-2.5 rounded-xl"><Landmark className="w-5 h-5 text-blue-400" /></div>
                      <span className="text-sm font-bold">ACPR & ORIAS Registry</span>
                   </div>
                </div>
             </div>

             <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2.5rem] p-8 text-white text-center space-y-6 shadow-xl">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto backdrop-blur-md">
                   <HelpCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-black">{t.help_sidebar.title}</h4>
                <p className="text-blue-100 text-sm font-medium leading-relaxed">
                  {t.help_sidebar.desc}
                </p>
                <button 
                    onClick={() => onNavigate('contact')}
                    className="w-full bg-white text-blue-600 py-4 rounded-2xl font-black shadow-lg hover:bg-blue-50 transition-all active:scale-95"
                >
                    {t.help_sidebar.cta}
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
