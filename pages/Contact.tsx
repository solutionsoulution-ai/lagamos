import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Facebook, Twitter, Instagram, Linkedin, HelpCircle, ChevronRight } from 'lucide-react';

interface ContactProps {
  language: Language;
  onNavigate: (page: string) => void;
}

const Contact: React.FC<ContactProps> = ({ language, onNavigate }) => {
  const t = translations[language].contact_page;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100 mb-4">
            <Mail className="w-4 h-4" />
            {language === 'fr' ? 'Support Client' : 'Customer Support'}
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 font-medium">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-2xl space-y-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
              
              <h2 className="text-3xl font-black text-gray-900 relative z-10">{t.info.title}</h2>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-6 group">
                  <div className="bg-emerald-50 p-4 rounded-2xl group-hover:bg-emerald-600 transition-colors duration-300 shadow-sm">
                    <MapPin className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Siège Social</p>
                    <p className="text-lg font-bold text-gray-900">{t.info.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-emerald-50 p-4 rounded-2xl group-hover:bg-emerald-600 transition-colors duration-300 shadow-sm">
                    <Phone className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Téléphone</p>
                    <p className="text-lg font-bold text-gray-900">{t.info.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-emerald-50 p-4 rounded-2xl group-hover:bg-emerald-600 transition-colors duration-300 shadow-sm">
                    <Mail className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-lg font-bold text-gray-900">{t.info.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-emerald-50 p-4 rounded-2xl group-hover:bg-emerald-600 transition-colors duration-300 shadow-sm">
                    <Clock className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Horaires</p>
                    <p className="text-lg font-bold text-gray-900">{t.info.hours}</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50 text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Suivez Europfy</p>
                <div className="flex justify-center gap-4">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="bg-gray-50 p-4 rounded-2xl text-gray-400 hover:bg-emerald-600 hover:text-white hover:scale-110 transition-all duration-300 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Section FAQ Redirection */}
            <div className="bg-emerald-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-emerald-200">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <HelpCircle className="w-32 h-32" />
               </div>
               <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-black">{t.help.title}</h3>
                  <p className="text-emerald-100 font-medium leading-relaxed">
                    {t.help.desc}
                  </p>
                  <button 
                    onClick={() => onNavigate('faq')}
                    className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 w-full"
                  >
                    {t.help.cta}
                    <ChevronRight className="w-5 h-5" />
                  </button>
               </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-600 to-teal-400"></div>
              
              {isSubmitted && (
                <div className="absolute inset-0 z-20 bg-white/98 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12 animate-in fade-in zoom-in duration-500">
                   <div className="bg-emerald-100 p-8 rounded-full mb-8 shadow-inner">
                     <CheckCircle className="w-20 h-20 text-emerald-600" />
                   </div>
                   <h3 className="text-4xl font-black text-gray-900 mb-4">{t.fields.success}</h3>
                   <p className="text-gray-500 mb-8 max-w-md">Nous avons bien reçu votre demande. Un expert Europfy vous répondra par email dans les plus brefs délais.</p>
                   <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-emerald-600 font-black hover:text-emerald-800 transition-colors flex items-center gap-2"
                   >
                     Envoyer un autre message <Send className="w-4 h-4" />
                   </button>
                </div>
              )}

              <div className="mb-12 space-y-2">
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{t.form_title}</h2>
                <p className="text-gray-500 font-medium text-lg">{t.form_desc}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">{t.fields.name}</label>
                    <input 
                      required name="name" value={formData.name} onChange={handleChange}
                      placeholder="Jean Dupont"
                      className="w-full bg-gray-50 border-2 border-transparent px-6 py-5 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-0 transition-all text-gray-900 font-bold" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">{t.fields.email}</label>
                    <input 
                      required type="email" name="email" value={formData.email} onChange={handleChange}
                      placeholder="jean.dupont@exemple.com"
                      className="w-full bg-gray-50 border-2 border-transparent px-6 py-5 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-0 transition-all text-gray-900 font-bold" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">{t.fields.subject}</label>
                  <input 
                    required name="subject" value={formData.subject} onChange={handleChange}
                    placeholder="Objet de votre demande"
                    className="w-full bg-gray-50 border-2 border-transparent px-6 py-5 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-0 transition-all text-gray-900 font-bold" 
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">{t.fields.message}</label>
                  <textarea 
                    required name="message" value={formData.message} onChange={handleChange}
                    placeholder="Expliquez-nous votre projet ou votre question..."
                    rows={6}
                    className="w-full bg-gray-50 border-2 border-transparent px-6 py-5 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-0 transition-all text-gray-900 font-bold resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-6 rounded-2xl font-black text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-4"
                >
                  <Send className="w-6 h-6" />
                  {t.fields.submit}
                </button>
                
                <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
                  Conformément au RGPD, vos données sont protégées et ne seront jamais cédées.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;