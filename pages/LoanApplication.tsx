
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { ChevronLeft, ShieldCheck, Lock, Send, Info, Landmark, HelpCircle } from 'lucide-react';

interface LoanApplicationProps {
  language: Language;
  onBack: () => void;
  onSuccess: () => void;
}

const LoanApplication: React.FC<LoanApplicationProps> = ({ language, onBack, onSuccess }) => {
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
    consent: false
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
    // Logic for sending data would go here.
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
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-2xl">
              <div className="mb-10 space-y-4">
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                  {t.title}
                </h1>
                <p className="text-xl text-gray-500 font-medium">
                  {t.subtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.firstName}</label>
                    <input 
                      required name="firstName" value={formData.firstName} onChange={handleChange}
                      placeholder="Jean"
                      className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.lastName}</label>
                    <input 
                      required name="lastName" value={formData.lastName} onChange={handleChange}
                      placeholder="Dupont"
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
                      placeholder="vous@exemple.com"
                      className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.whatsapp}</label>
                    <input 
                      required name="whatsapp" value={formData.whatsapp} onChange={handleChange}
                      placeholder="+33 6 12 34 56 78"
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
                    <option value="FR">France</option>
                    <option value="BE">Belgique</option>
                    <option value="CH">Suisse</option>
                    <option value="PL">Pologne</option>
                    <option value="DE">Allemagne</option>
                    <option value="IT">Italie</option>
                    <option value="ES">Espagne</option>
                    <option value="PT">Portugal</option>
                    <option value="NL">Pays-Bas</option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.profession}</label>
                    <input 
                      required name="profession" value={formData.profession} onChange={handleChange}
                      placeholder="Développeur"
                      className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.income}</label>
                    <input 
                      required type="number" name="income" value={formData.income} onChange={handleChange}
                      placeholder="3000"
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

                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <div className="flex gap-4">
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
                  <p className="text-xs text-gray-400 italic">
                    {t.fields.consent2}
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-xl flex gap-3 items-center">
                  <Info className="w-5 h-5 text-orange-600 shrink-0" />
                  <p className="text-xs font-bold text-orange-800 leading-tight">
                    {t.fields.warning}
                  </p>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                >
                  <Send className="w-6 h-6" />
                  {t.fields.submit}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-8 sticky top-32">
             <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Lock className="w-32 h-32" />
                </div>
                <h3 className="text-2xl font-black relative z-10">{t.trust_title}</h3>
                <p className="text-gray-400 font-medium relative z-10 leading-relaxed">
                  {t.trust_text}
                </p>
                <div className="space-y-4 relative z-10">
                   <div className="flex items-center gap-3">
                      <div className="bg-blue-600/20 p-2 rounded-lg"><ShieldCheck className="w-5 h-5 text-blue-500" /></div>
                      <span className="text-sm font-bold">Sécurisation SSL 256 bits</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="bg-blue-600/20 p-2 rounded-lg"><Landmark className="w-5 h-5 text-blue-500" /></div>
                      <span className="text-sm font-bold">Conformité ACPR & ORIAS</span>
                   </div>
                </div>
             </div>

             <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white text-center space-y-4">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                   <HelpCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-black">Besoin d'aide ?</h4>
                <p className="text-blue-100 text-sm font-medium">Nos experts sont là pour vous accompagner dans votre démarche.</p>
                <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-black shadow-sm">Parler à un conseiller</button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
