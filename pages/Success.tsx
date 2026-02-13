import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ArrowRight, MessageCircle, ShieldCheck, Sparkles, Send, Copy, Lock, Mail, AlertTriangle, Check } from 'lucide-react';

interface SuccessProps {
  language: Language;
  onNavigate: (page: string) => void;
  tempAccount?: { email: string, password: string } | null;
}

const Success: React.FC<SuccessProps> = ({ language, onNavigate, tempAccount }) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleCopyAll = () => {
    if (!tempAccount) return;
    const textToCopy = `Identifiants Europcapital :\nEmail : ${tempAccount.email}\nMot de passe : ${tempAccount.password}`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(null), 2000);
  };

  return (
    <div className="pt-20 sm:pt-32 pb-12 sm:pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Header de succès */}
          <div className="bg-emerald-600 p-12 sm:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="bg-white w-24 h-24 sm:w-32 sm:h-32 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl animate-float">
                <CheckCircle className="w-14 h-14 sm:w-20 sm:h-20 text-emerald-600" />
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-7xl font-black text-white leading-tight uppercase tracking-tighter italic">Demande Reçue !</h1>
                <p className="text-xl sm:text-3xl text-emerald-50 font-black opacity-90 tracking-tight">Votre dossier est en cours de sécurisation.</p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-16 space-y-12">
            
            {/* BLOC ACCÈS CONFIDENTIELS (UNIQUE COPIE) */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 text-red-600 mb-2">
                    <AlertTriangle className="w-6 h-6 animate-pulse" />
                    <span className="text-xs sm:text-sm font-black uppercase tracking-widest">Action Cruciale : Sauvegardez vos accès maintenant</span>
                </div>
                
                <div className="bg-gray-900 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Lock className="w-48 h-48" /></div>
                    
                    <div className="relative z-10 space-y-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                          <div className="space-y-2">
                              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3">
                                  <ShieldCheck className="text-emerald-400 w-8 h-8" /> Identifiants de connexion
                              </h2>
                              <p className="text-gray-400 font-medium">Ces codes sont uniques et strictement confidentiels.</p>
                          </div>
                          <button 
                              onClick={handleCopyAll}
                              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl ${isCopied ? 'bg-emerald-500 text-white scale-95' : 'bg-white text-gray-900 hover:bg-emerald-50'}`}
                          >
                              {isCopied ? <><Check className="w-5 h-5" /> Copié !</> : <><Copy className="w-5 h-5" /> Tout Copier</>}
                          </button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {/* EMAIL */}
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Votre Identifiant (Email)</p>
                                <p className="text-lg sm:text-xl font-bold truncate text-white">{tempAccount?.email || "Email non trouvé"}</p>
                            </div>

                            {/* PASSWORD */}
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Votre Mot de Passe</p>
                                <p className="text-xl sm:text-2xl font-mono font-black tracking-widest text-emerald-400">{tempAccount?.password || "********"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONSIGNE DE CONTACT PAR MAIL DIRECT */}
            <div className="bg-blue-50 border-2 border-blue-100 rounded-[2.5rem] p-8 sm:p-12 space-y-6 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 opacity-5"><Mail className="w-64 h-64" /></div>
                <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                    <div className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100">
                        <Mail className="w-12 h-12 text-blue-600" />
                    </div>
                    <div className="text-center md:text-left space-y-3">
                        <h3 className="text-2xl font-black text-blue-950">Activez votre dossier par E-mail</h3>
                        <p className="text-blue-800 text-lg font-bold leading-relaxed">
                            Pour valider votre identité, écrivez-nous maintenant à : <br/>
                            <a href={`mailto:contact@europcapital.com?subject=Validation Dossier - ${tempAccount?.email}`} className="text-blue-600 underline font-black text-xl hover:text-blue-700 transition-colors">contact@europcapital.com</a>
                        </p>
                        <p className="text-blue-700/70 text-sm font-black uppercase tracking-widest italic">
                            * Utilisez obligatoirement l'adresse email <span className="text-blue-900 underline">{tempAccount?.email}</span> pour nous écrire.
                        </p>
                    </div>
                </div>
            </div>

            {/* SECTION WHATSAPP (Centrée et mise en avant) */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl flex flex-col h-full group hover:border-green-500 transition-all duration-500">
                <div className="space-y-6 flex-grow">
                   <div className="flex items-center gap-5">
                      <div className="bg-green-50 p-4 rounded-2xl group-hover:bg-green-600 transition-colors duration-500">
                        <MessageCircle className="w-10 h-10 text-green-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 leading-tight">Envoyer l'Identité par WhatsApp</h3>
                   </div>
                   <p className="text-gray-500 font-bold text-base leading-relaxed">
                     Transmettez une photo de votre <strong>Pièce d'Identité</strong> via notre canal WhatsApp officiel pour finaliser votre dossier.
                   </p>
                   
                   <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-center gap-5">
                      <div className="bg-white p-3 rounded-full shadow-sm"><ShieldCheck className="w-6 h-6 text-green-600" /></div>
                      <div>
                        <p className="text-[10px] font-black text-green-700 uppercase tracking-widest">Support Officiel</p>
                        <p className="text-xl font-black text-gray-900">+33 7 54 09 50 27</p>
                      </div>
                   </div>
                </div>
                <a 
                  href="https://wa.me/33754095027" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-10 w-full bg-green-500 text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-green-200 hover:bg-green-600 transition-all flex items-center justify-center gap-4 active:scale-95 group"
                >
                  OUVRIR WHATSAPP <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </a>
              </div>
            </div>

            <div className="text-center pt-10 border-t border-gray-100">
               <button onClick={() => onNavigate('home')} className="text-xs text-gray-400 font-black hover:text-emerald-600 transition-colors uppercase tracking-[0.4em] flex items-center justify-center gap-3 mx-auto">
                  <Sparkles className="w-4 h-4" /> Retourner à l'accueil
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;