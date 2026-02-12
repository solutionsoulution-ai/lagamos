import React, { useEffect } from 'react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ArrowRight, LogIn, MessageCircle, MailCheck, ShieldCheck, Sparkles, Send } from 'lucide-react';

interface SuccessProps {
  language: Language;
  onNavigate: (page: string) => void;
  tempAccount?: { email: string, password: string } | null;
}

const Success: React.FC<SuccessProps> = ({ language, onNavigate, tempAccount }) => {
  const { t } = useTranslation();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-20 sm:pt-32 pb-12 sm:pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Header Impactant */}
          <div className="bg-emerald-600 p-12 sm:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="bg-white w-24 h-24 sm:w-32 sm:h-32 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl animate-float">
                <CheckCircle className="w-14 h-14 sm:w-20 sm:h-20 text-emerald-600" />
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-7xl font-black text-white leading-tight uppercase tracking-tighter italic">Félicitations !</h1>
                <p className="text-xl sm:text-3xl text-emerald-50 font-black opacity-90">Votre demande a été enregistrée avec succès.</p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-20 space-y-12">
            
            {/* Notification Email (ÉTAPE CRUCIALE) */}
            <div className="bg-emerald-50 border-2 border-emerald-100 rounded-[2.5rem] p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><Send className="w-32 h-32" /></div>
                <div className="bg-white p-6 rounded-3xl shadow-lg flex-shrink-0 animate-bounce">
                    <MailCheck className="w-12 h-12 text-emerald-600" />
                </div>
                <div className="text-center md:text-left space-y-3 relative z-10">
                    <h3 className="text-2xl font-black text-emerald-900">Vérifiez vos emails</h3>
                    <p className="text-emerald-700 text-lg font-bold leading-relaxed">
                        Un mail contenant vos <strong>identifiants de connexion</strong> et vos informations confidentielles vient de vous être envoyé à <span className="underline decoration-emerald-400 underline-offset-4">{tempAccount?.email || "votre adresse"}</span>.
                    </p>
                    <p className="text-emerald-600/60 text-sm font-black uppercase tracking-widest">(Vérifiez également vos courriers indésirables / Spams)</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
              
              {/* BOUTON DE CONNEXION */}
              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl flex flex-col h-full relative group hover:border-emerald-500 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute -top-4 left-10 bg-emerald-600 text-white text-[10px] font-black px-6 py-2 rounded-full shadow-lg z-10 uppercase tracking-widest">Action Immédiate 01</div>
                <div className="space-y-6 flex-grow">
                   <div className="flex items-center gap-5">
                      <div className="bg-emerald-50 p-4 rounded-2xl group-hover:bg-emerald-600 transition-colors duration-500">
                        <LogIn className="w-10 h-10 text-emerald-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 leading-tight">Espace Client</h3>
                   </div>
                   <p className="text-gray-500 font-bold text-base leading-relaxed">
                     Connectez-vous dès maintenant à votre portail sécurisé pour suivre l'évolution de votre dossier.
                   </p>
                   
                   {tempAccount && (
                     <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-3">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rappel de vos accès</p>
                        <div className="space-y-2">
                          <p className="text-sm font-bold text-gray-700">Email: <span className="text-emerald-700 font-black">{tempAccount.email}</span></p>
                          <p className="text-sm font-bold text-gray-700">Pass: <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg font-mono font-black">{tempAccount.password}</span></p>
                        </div>
                     </div>
                   )}
                </div>
                <button 
                  onClick={() => onNavigate('login')}
                  className="mt-10 w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-4 active:scale-95 group"
                >
                  SE CONNECTER <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>

              {/* WHATSAPP */}
              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl flex flex-col h-full relative group hover:border-green-500 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute -top-4 left-10 bg-green-600 text-white text-[10px] font-black px-6 py-2 rounded-full shadow-lg z-10 uppercase tracking-widest">Action Immédiate 02</div>
                <div className="space-y-6 flex-grow">
                   <div className="flex items-center gap-5">
                      <div className="bg-green-50 p-4 rounded-2xl group-hover:bg-green-600 transition-colors duration-500">
                        <MessageCircle className="w-10 h-10 text-green-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 leading-tight">Identité WhatsApp</h3>
                   </div>
                   <p className="text-gray-500 font-bold text-base leading-relaxed">
                     Pour l'activation de votre ligne de crédit, transmettez votre <strong>Pièce d'Identité</strong> via notre canal WhatsApp sécurisé.
                   </p>
                   
                   <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-center gap-5">
                      <div className="bg-white p-3 rounded-full shadow-sm"><ShieldCheck className="w-6 h-6 text-green-600" /></div>
                      <div>
                        <p className="text-[10px] font-black text-green-700 uppercase tracking-widest">Numéro Officiel</p>
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
                  ENVOYER MAINTENANT <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </a>
              </div>

            </div>

            <div className="text-center pt-10 border-t border-gray-100">
               <button onClick={() => onNavigate('home')} className="text-xs text-gray-400 font-black hover:text-emerald-600 transition-colors uppercase tracking-[0.4em] flex items-center justify-center gap-3 mx-auto">
                  <Sparkles className="w-4 h-4" /> Retourner sur Europcapital.com
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;