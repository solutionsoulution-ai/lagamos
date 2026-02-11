
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Facebook, Twitter, Instagram, Linkedin, HelpCircle, ChevronRight, Loader2, ChevronLeft } from 'lucide-react';
import { restdbService } from '../services/restdb';

interface ContactProps {
  language: Language;
  onNavigate: (page: string) => void;
}

const Contact: React.FC<ContactProps> = ({ language, onNavigate }) => {
  const { t } = useTranslation();
  const contactT = t('contact_page', { returnObjects: true }) as any;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await restdbService.submitContact(formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      alert("Erreur lors de l'envoi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logique de retour intelligente
  const handleBack = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user.role === 'admin') onNavigate('admin-dashboard');
        else onNavigate('client-dashboard');
      } catch (e) {
        onNavigate('home');
      }
    } else {
      onNavigate('home');
    }
  };

  if (!contactT) return null;

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bouton Retour Ajouté */}
        <button 
          onClick={handleBack} 
          className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold mb-8 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour
        </button>

        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100 mb-4">
            <Mail className="w-4 h-4" /> Support
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tight leading-tight">{contactT.title}</h1>
          <p className="text-xl text-gray-600 font-medium">{contactT.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-2xl space-y-12 relative overflow-hidden">
              <h2 className="text-3xl font-black text-gray-900 relative z-10">{contactT.info?.title}</h2>
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-6 group">
                  <div className="bg-emerald-50 p-4 rounded-2xl group-hover:bg-emerald-600 transition-colors duration-300 shadow-sm"><MapPin className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" /></div>
                  <div><p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Siège</p><p className="text-lg font-bold text-gray-900">{contactT.info?.address}</p></div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="bg-emerald-50 p-4 rounded-2xl group-hover:bg-emerald-600 transition-colors duration-300 shadow-sm"><Phone className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" /></div>
                  <div><p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Tel</p><p className="text-lg font-bold text-gray-900">{contactT.info?.phone}</p></div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="bg-emerald-50 p-4 rounded-2xl group-hover:bg-emerald-600 transition-colors duration-300 shadow-sm"><Mail className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" /></div>
                  <div><p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Email</p><p className="text-lg font-bold text-gray-900">{contactT.info?.email}</p></div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-600 to-teal-400"></div>
              {isSubmitted && (
                <div className="absolute inset-0 z-20 bg-white/98 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12">
                   <div className="bg-emerald-100 p-8 rounded-full mb-8 shadow-inner"><CheckCircle className="w-20 h-20 text-emerald-600" /></div>
                   <h3 className="text-4xl font-black text-gray-900 mb-4">{contactT.fields?.success}</h3>
                   <button onClick={() => setIsSubmitted(false)} className="text-emerald-600 font-black hover:text-emerald-800 transition-colors flex items-center gap-2">Nouveau message <Send className="w-4 h-4" /></button>
                </div>
              )}
              <div className="mb-12 space-y-2">
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{contactT.form_title}</h2>
                <p className="text-gray-500 font-medium text-lg">{contactT.form_desc}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3"><label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">{contactT.fields?.name}</label><input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border-2 border-transparent px-6 py-5 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-0 transition-all text-gray-900 font-bold" /></div>
                  <div className="space-y-3"><label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">{contactT.fields?.email}</label><input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border-2 border-transparent px-6 py-5 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-0 transition-all text-gray-900 font-bold" /></div>
                </div>
                <div className="space-y-3"><label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">{contactT.fields?.subject}</label><input required name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-gray-50 border-2 border-transparent px-6 py-5 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-0 transition-all text-gray-900 font-bold" /></div>
                <div className="space-y-3"><label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">{contactT.fields?.message}</label><textarea required name="message" value={formData.message} onChange={handleChange} rows={6} className="w-full bg-gray-50 border-2 border-transparent px-6 py-5 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-0 transition-all text-gray-900 font-bold resize-none"></textarea></div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 text-white py-6 rounded-2xl font-black text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-4 disabled:opacity-70">{isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}{contactT.fields?.submit}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
