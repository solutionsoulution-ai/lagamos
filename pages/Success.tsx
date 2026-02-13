import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { CheckCircle, MessageCircle, ShieldCheck, Sparkles, Copy, Lock, Mail, AlertTriangle, Check, ArrowLeft } from 'lucide-react';

interface SuccessProps {
  language: Language;
  onNavigate: (page: string) => void;
  tempAccount?: { email: string, password: string } | null;
}

const Success: React.FC<SuccessProps> = ({ language, onNavigate, tempAccount }) => {
  const { t } = useTranslation();
  const successT = t('success_page', { returnObjects: true }) as any;
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleCopyAll = () => {
    if (!tempAccount) return;
    const textToCopy = `IDENTIFIANTS EUROP CAPITAL\n--------------------------\nEmail : ${tempAccount.email}\nMot de passe : ${tempAccount.password}\n--------------------------\nSite : https://europcapital.com`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="pt-20 sm:pt-32 pb-12 sm:pb-24 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl overflow-hidden border border-gray-100">
          
          <div className="bg-emerald-600 p-10 sm:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 space-y-6">
              <div className="bg-white w-20 h-20 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight uppercase italic tracking-tighter">{successT.congrats}</h1>
                <p className="text-lg sm:text-2xl text-emerald-50 font-bold opacity-90">{successT.recorded}</p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-16 space-y-10">
            
            <div className="space-y-6">
                <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-2xl border border-red-100">
                    <AlertTriangle className="w-6 h-6 shrink-0" />
                    <span className="text-xs sm:text-sm font-black uppercase tracking-widest">{successT.action_required}</span>
                </div>
                
                <div className="bg-gray-900 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Lock className="w-48 h-48" /></div>
                    
                    <div className="relative z-10 space-y-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                          <div className="space-y-2">
                              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3">
                                  <ShieldCheck className="text-emerald-400 w-8 h-8" /> {successT.secure_access}
                              </h2>
                              <p className="text-gray-400 font-medium italic">{successT.secure_note}</p>
                          </div>
                          <button 
                              onClick={handleCopyAll}
                              className={`w-full md:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95 ${isCopied ? 'bg-emerald-500 text-white' : 'bg-white text-gray-900 hover:bg-emerald-50'}`}
                          >
                              {isCopied ? <><Check className="w-5 h-5" /> {successT.copied_btn}</> : <><Copy className="w-5 h-5" /> {successT.copy_btn}</>}
                          </button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2 hover:bg-white/10 transition-colors">
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Identifiant (Email)</p>
                                <p className="text-lg font-bold truncate text-white">{tempAccount?.email || "..."}</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2 hover:bg-white/10 transition-colors">
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Mot de Passe secret</p>
                                <p className="text-xl font-mono font-black tracking-widest text-white">{tempAccount?.password || "********"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-100 rounded-[2.5rem] p-8 sm:p-12 space-y-8 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 opacity-5 text-blue-900"><Mail className="w-64 h-64" /></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                    <div className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100 shrink-0">
                        <Mail className="w-12 h-12 text-blue-600" />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-black text-blue-950">{successT.email_title}</h3>
                        <p className="text-blue-800 text-lg font-bold leading-relaxed">
                            {successT.email_text}
                        </p>
                        <a 
                          href={`mailto:contact@europcapital.com?subject=Validation Dossier - ${tempAccount?.email}`} 
                          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-xl hover:bg-blue-700 transition-colors shadow-lg"
                        >
                          contact@europcapital.com
                        </a>
                        <p className="text-blue-700/70 text-xs font-black uppercase tracking-widest italic pt-2">
                           {t('success_page.email_warning', { email: tempAccount?.email || '...' })}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-green-50 border-2 border-green-100 rounded-[2.5rem] p-8 sm:p-12 space-y-8">
               <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                  <div className="bg-white p-6 rounded-3xl shadow-xl border border-green-100 shrink-0">
                      <MessageCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-green-950">{successT.whatsapp_title}</h3>
                    <p className="text-green-800 text-lg font-bold">
                       {successT.whatsapp_text}
                    </p>
                  </div>
               </div>
               <a 
                  href="https://wa.me/33754095027" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-6 rounded-2xl font-black text-xl shadow-2xl shadow-green-100 hover:bg-green-600 transition-all flex items-center justify-center gap-4 group"
                >
                  {successT.whatsapp_btn} <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </a>
            </div>

            <div className="text-center pt-8">
               <button onClick={() => onNavigate('home')} className="text-gray-400 font-black hover:text-emerald-600 transition-colors uppercase tracking-[0.3em] flex items-center justify-center gap-3 mx-auto text-xs">
                  <ArrowLeft className="w-4 h-4" /> {successT.back_home}
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;