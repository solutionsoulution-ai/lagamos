
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { 
  ChevronLeft, Send, CheckCircle, Mail, User, HelpCircle, 
  MessageSquare, AlertCircle, ShieldCheck, Key, Lock, 
  ArrowRight, Loader2, Sparkles, PhoneCall, Info
} from 'lucide-react';
import { restdbService } from '../services/restdb';

interface HelpProps {
  language: Language;
  onBack: () => void;
}

const Help: React.FC<HelpProps> = ({ language, onBack }) => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: 'Récupération de mot de passe', 
    message: '' 
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Envoi de la demande dans la collection 'contacts' de RestDB
      // Cela apparaîtra dans l'onglet "Messages" du Dashboard Admin
      await restdbService.submitContact({
        name: formData.name,
        email: formData.email,
        subject: `[AIDE] ${formData.subject}`,
        message: `DEMANDE DE RÉCUPÉRATION : ${formData.message}`
      });
      
      setIsSubmitted(true);
    } catch (err) {
      console.error("Erreur récupération:", err);
      setError("Une erreur technique est survenue. Veuillez réessayer ou contacter le support par WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-emerald-600 font-black mb-12 transition-all group uppercase tracking-widest text-xs">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t('nav.login', 'Retour à la connexion')}
        </button>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Section Gauche : Information & Sécurité */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="bg-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-200">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                Centre de <span className="text-emerald-600">Récupération</span>
              </h1>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">
                Votre sécurité est notre priorité absolue. Si vous avez perdu vos accès, suivez la procédure de vérification ci-contre.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-xl"><Key className="w-5 h-5 text-blue-600" /></div>
                <div>
                  <h4 className="font-black text-gray-900 text-sm">Identifiants perdus</h4>
                  <p className="text-xs text-gray-500 font-medium mt-1">Fournissez l'adresse email utilisée lors de votre demande de prêt.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="bg-amber-50 p-3 rounded-xl"><Lock className="w-5 h-5 text-amber-600" /></div>
                <div>
                  <h4 className="font-black text-gray-900 text-sm">Vérification humaine</h4>
                  <p className="text-xs text-gray-500 font-medium mt-1">Un conseiller analysera votre demande pour confirmer votre identité.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="bg-emerald-50 p-3 rounded-xl"><Sparkles className="w-5 h-5 text-emerald-600" /></div>
                <div>
                  <h4 className="font-black text-gray-900 text-sm">Réponse rapide</h4>
                  <p className="text-xs text-gray-500 font-medium mt-1">Vous recevrez vos nouveaux accès par e-mail sous 24h ouvrées.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <div className="flex items-center gap-4 text-emerald-600">
                <PhoneCall className="w-5 h-5" />
                <p className="text-sm font-black uppercase tracking-widest">Assistance : +33 7 54 09 50 27</p>
              </div>
            </div>
          </div>

          {/* Section Droite : Formulaire */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-600 to-teal-400"></div>
              
              <div className="p-8 sm:p-12">
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-8 animate-in zoom-in duration-500">
                    <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-3xl font-black text-gray-900">Demande envoyée !</h2>
                      <p className="text-gray-500 font-medium text-lg px-6">
                        Nous avons bien reçu votre demande de récupération. Un expert reviendra vers vous à l'adresse <strong>{formData.email}</strong> dans les plus brefs délais.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 inline-block">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Suivant</p>
                      <p className="text-sm font-bold text-gray-600 italic">Vérifiez vos spams si vous ne recevez rien d'ici demain.</p>
                    </div>
                    <div className="pt-6">
                      <button 
                        onClick={onBack} 
                        className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 mx-auto"
                      >
                        Retourner à la connexion
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-black text-gray-900">Formulaire de récupération</h2>
                      <p className="text-gray-500 font-medium">Veuillez renseigner les informations exactes de votre compte.</p>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-3 text-sm font-bold animate-pulse">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <User className="w-3.5 h-3.5" /> Prénom & Nom
                          </label>
                          <input 
                            required 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="Ex: Jean Dupont" 
                            className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-0 transition-all font-bold text-gray-900" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5" /> E-mail enregistré
                          </label>
                          <input 
                            required 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="Ex: vous@exemple.com" 
                            className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-0 transition-all font-bold text-gray-900" 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <AlertCircle className="w-3.5 h-3.5" /> Nature du problème
                        </label>
                        <select 
                          required 
                          name="subject" 
                          value={formData.subject} 
                          onChange={handleChange} 
                          className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-0 transition-all font-bold text-gray-900 appearance-none cursor-pointer"
                        >
                          <option value="Récupération de mot de passe">Récupération de mot de passe</option>
                          <option value="Accès au compte bloqué">Accès au compte bloqué</option>
                          <option value="Autre demande technique">Autre demande technique</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5" /> Informations complémentaires
                        </label>
                        <textarea 
                          required 
                          name="message" 
                          value={formData.message} 
                          onChange={handleChange} 
                          placeholder="Ex: J'ai perdu mon code secret reçu lors de la confirmation..." 
                          rows={4} 
                          className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-0 transition-all font-bold text-gray-900 resize-none"
                        ></textarea>
                      </div>

                      <div className="pt-4">
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-emerald-600 text-white py-6 rounded-2xl font-black text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-4 disabled:opacity-70 group"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                          ) : (
                            <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                          )}
                          {isSubmitting ? 'Transmission sécurisée...' : 'Soumettre ma demande'}
                        </button>
                      </div>
                    </form>

                    <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 flex items-start gap-4">
                      <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                      <p className="text-[11px] sm:text-xs text-amber-800 font-bold leading-relaxed italic">
                        "Pour des raisons de sécurité, nous ne réinitialisons jamais un mot de passe sans une vérification manuelle de nos analystes. Cela peut prendre entre 2 et 24 heures."
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
