
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Facebook, Twitter, Instagram, Linkedin, HelpCircle } from 'lucide-react';

interface ContactProps {
  language: Language;
}

const Contact: React.FC<ContactProps> = ({ language }) => {
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
    // In a real app, send data to an API
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h1 className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tight">{t.title}</h1>
          <p className="text-xl text-gray-600 font-medium">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-2xl space-y-12">
              <h2 className="text-3xl font-black text-gray-900">{t.info.title}</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Siège Social</p>
                    <p className="text-lg font-bold text-gray-900">{t.info.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Téléphone</p>
                    <p className="text-lg font-bold text-gray-900">{t.info.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-lg font-bold text-gray-900">{t.info.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors duration-300">
                    <Clock className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Horaires</p>
                    <p className="text-lg font-bold text-gray-900">{t.info.hours}</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50">
                <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 text-center">Suivez-nous</p>
                <div className="flex justify-center gap-4">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="bg-gray-50 p-4 rounded-2xl text-gray-400 hover:bg-blue-600 hover:text-white hover:scale-110 transition-all duration-300 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <HelpCircle className="w-32 h-32" />
               </div>
               <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-black">Besoin d'aide immédiate ?</h3>
                  <p className="text-blue-100 font-medium leading-relaxed">
                    Consultez notre Foire Aux Questions pour trouver des réponses rapides à vos interrogations les plus fréquentes.
                  </p>
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-black shadow-lg hover:bg-blue-50 transition-colors">
                    Consulter la FAQ
                  </button>
               </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-2xl relative">
              {isSubmitted && (
                <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12 animate-in fade-in zoom-in duration-500">
                   <div className="bg-green-100 p-6 rounded-full mb-8">
                     <CheckCircle className="w-16 h-16 text-green-600" />
                   </div>
                   <h3 className="text-4xl font-black text-gray-900 mb-4">{t.fields.success}</h3>
                   <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-600 font-bold hover:underline"
                   >
                     Envoyer un autre message
                   </button>
                </div>
              )}

              <div className="mb-10 space-y-2">
                <h2 className="text-3xl font-black text-gray-900">{t.form_title}</h2>
                <p className="text-gray-500 font-medium">{t.form_desc}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.name}</label>
                    <input 
                      required name="name" value={formData.name} onChange={handleChange}
                      placeholder="Jean Dupont"
                      className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.email}</label>
                    <input 
                      required type="email" name="email" value={formData.email} onChange={handleChange}
                      placeholder="jean.dupont@exemple.com"
                      className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.subject}</label>
                  <input 
                    required name="subject" value={formData.subject} onChange={handleChange}
                    placeholder="Etude de dossier"
                    className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">{t.fields.message}</label>
                  <textarea 
                    required name="message" value={formData.message} onChange={handleChange}
                    placeholder="Dites-nous en plus sur votre projet..."
                    rows={6}
                    className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 font-medium resize-none"
                  ></textarea>
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

        </div>
      </div>
    </div>
  );
};

export default Contact;
