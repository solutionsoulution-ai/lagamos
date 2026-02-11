
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Send, CheckCircle, Mail, User, HelpCircle, MessageSquare, AlertCircle } from 'lucide-react';

interface HelpProps {
  language: Language;
  onBack: () => void;
}

const Help: React.FC<HelpProps> = ({ language, onBack }) => {
  const { t } = useTranslation();
  const supportT = t('support', { returnObjects: true }) as any;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'password', message: '' });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => { setIsSubmitted(true); }, 500);
  };

  if (!supportT) return null;

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold mb-12 transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t('nav.login')}
        </button>
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-600"></div>
          <div className="p-8 sm:p-12">
            <div className="text-center mb-10 space-y-4">
              <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"><HelpCircle className="w-8 h-8 text-emerald-600" /></div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{supportT.title}</h1>
              <p className="text-gray-500 font-medium max-w-md mx-auto">{supportT.subtitle}</p>
            </div>
            {isSubmitted ? (
              <div className="py-12 text-center space-y-8 animate-in zoom-in duration-500">
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-lg shadow-green-100"><CheckCircle className="w-12 h-12" /></div>
                <div className="space-y-2"><h2 className="text-2xl font-black text-gray-900">{supportT.fields?.success}</h2><p className="text-gray-500 font-medium">Un conseiller reviendra vers vous par email sous 24h.</p></div>
                <button onClick={onBack} className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all">Retour à la connexion</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2"><User className="w-4 h-4 text-emerald-600" />{supportT.fields?.name}</label><input required name="name" value={formData.name} onChange={handleChange} placeholder="Jean Dupont" className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium" /></div>
                  <div className="space-y-2"><label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-600" />{supportT.fields?.email}</label><input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="vous@exemple.com" className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium" /></div>
                </div>
                <div className="space-y-2"><label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-emerald-600" />{supportT.fields?.subject}</label><select required name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium appearance-none"><option value="password">{supportT.subjects?.password}</option><option value="account">{supportT.subjects?.account}</option><option value="other">{supportT.subjects?.other}</option></select></div>
                <div className="space-y-2"><label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-emerald-600" />{supportT.fields?.message}</label><textarea required name="message" value={formData.message} onChange={handleChange} placeholder="Précisez votre problème..." rows={5} className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium resize-none"></textarea></div>
                <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3"><Send className="w-6 h-6" />{supportT.fields?.submit}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
