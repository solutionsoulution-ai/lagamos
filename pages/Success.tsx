
import React, { useEffect } from 'react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ArrowRight, ShieldCheck, Clock, Mail, Phone, ChevronRight, LogIn, MessageCircle } from 'lucide-react';

interface SuccessProps {
  language: Language;
  onNavigate: (page: string) => void;
  tempAccount?: { email: string, password: string } | null;
}

const Success: React.FC<SuccessProps> = ({ language, onNavigate, tempAccount }) => {
  const { t } = useTranslation();
  const successT = t('success_page', { returnObjects: true }) as any;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!successT) return null;

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
          
          <div className="bg-emerald-600 p-12 sm:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                <CheckCircle className="w-16 h-16 text-emerald-600" />
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">Demande Reçue !</h1>
              <p className="text-xl sm:text-2xl text-emerald-100 font-medium">Votre dossier a été enregistré avec succès.</p>
            </div>
          </div>

          <div className="p-8 sm:p-16 space-y-12">
            <div className="text-center space-y-4">
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Attention : Pour finaliser l'analyse de votre dossier et obtenir vos fonds, vous devez impérativement réaliser les <strong className="text-emerald-600">2 actions suivantes</strong> immédiatement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              
              {/* ÉTAPE 1 : CONNEXION */}
              <div className="bg-blue-50 rounded-[2.5rem] p-8 border border-blue-100 relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 left-0 bg-blue-600 text-white px-4 py-2 rounded-br-2xl font-black text-sm">ÉTAPE 1</div>
                <div className="mt-8 space-y-6 flex-grow">
                   <div className="flex items-center gap-4">
                      <div className="bg-blue-200 p-3 rounded-xl"><LogIn className="w-8 h-8 text-blue-700" /></div>
                      <h3 className="text-2xl font-black text-blue-900">Activez votre espace</h3>
                   </div>
                   <p className="text-blue-800 font-medium">Un compte a été créé automatiquement pour vous. Un email de confirmation a été envoyé.</p>
                   
                   {tempAccount ? (
                     <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm space-y-2">
                        <p className="text-xs font-black text-blue-400 uppercase tracking-widest">Vos identifiants provisoires</p>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-gray-500">Email : <span className="text-gray-900 select-all">{tempAccount.email}</span></p>
                          <p className="text-sm font-bold text-gray-500">Mot de passe : <span className="text-gray-900 bg-gray-100 px-2 py-0.5 rounded select-all font-mono">{tempAccount.password}</span></p>
                        </div>
                     </div>
                   ) : (
                     <div className="bg-white p-4 rounded-xl border border-blue-100">
                        <p className="text-sm text-blue-700 italic">Veuillez consulter vos emails pour récupérer votre mot de passe.</p>
                     </div>
                   )}
                </div>
                <button 
                  onClick={() => onNavigate('login')}
                  className="mt-8 w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  Se connecter maintenant <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* ÉTAPE 2 : WHATSAPP */}
              <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 left-0 bg-emerald-600 text-white px-4 py-2 rounded-br-2xl font-black text-sm">ÉTAPE 2</div>
                <div className="mt-8 space-y-6 flex-grow">
                   <div className="flex items-center gap-4">
                      <div className="bg-emerald-200 p-3 rounded-xl"><MessageCircle className="w-8 h-8 text-emerald-700" /></div>
                      <h3 className="text-2xl font-black text-emerald-900">Envoyez vos pièces</h3>
                   </div>
                   <p className="text-emerald-800 font-medium">Pour l'analyse complète de votre dossier, l'envoi de votre <strong className="underline">pièce d'identité</strong> est indispensable.</p>
                   
                   <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4">
                      <div className="bg-green-100 p-2 rounded-full"><Phone className="w-6 h-6 text-green-600" /></div>
                      <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Numéro WhatsApp</p>
                        <p className="text-xl font-black text-gray-900 select-all">+33 7 54 09 50 27</p>
                      </div>
                   </div>
                </div>
                <a 
                  href="https://wa.me/33754095027" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-8 w-full bg-green-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                >
                  Envoyer ma pièce d'identité <MessageCircle className="w-5 h-5" />
                </a>
              </div>

            </div>

            <div className="text-center pt-8 border-t border-gray-100">
               <button onClick={() => onNavigate('home')} className="text-gray-400 font-bold hover:text-gray-600 transition-colors">
                  Retour à l'accueil
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
