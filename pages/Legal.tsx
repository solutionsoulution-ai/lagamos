
import React, { useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { 
  ChevronLeft, 
  ShieldCheck, 
  FileText, 
  Info, 
  Cookie, 
  Shield, 
  Zap, 
  UserCheck, 
  Scale, 
  Gavel, 
  Database, 
  Target, 
  Lock, 
  Users, 
  Clock, 
  Settings, 
  BarChart, 
  MousePointerClick, 
  EyeOff
} from 'lucide-react';

interface LegalProps {
  type: 'terms' | 'privacy' | 'cookies';
  language: Language;
  onBack: () => void;
}

const ICON_MAP: Record<string, any> = {
  Info, Shield, FileText, Zap, UserCheck, Scale, Gavel, 
  Database, Target, Lock, Users, Clock, Cookie, Settings, 
  BarChart, MousePointerClick, EyeOff
};

const Legal: React.FC<LegalProps> = ({ type, language, onBack }) => {
  const t = translations[language].legal[type];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const getHeaderIcon = () => {
    switch(type) {
      case 'privacy': return <ShieldCheck className="w-16 h-16 text-white" />;
      case 'cookies': return <Cookie className="w-16 h-16 text-white" />;
      default: return <FileText className="w-16 h-16 text-white" />;
    }
  };

  return (
    <div className="pt-24 pb-24 bg-gray-50 min-h-screen">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-600 to-transparent opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Navigation (Desktop Only) */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-8 sticky top-32 h-fit">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold mb-8 transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              {translations[language].nav.home}
            </button>
            
            <nav className="space-y-2">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Documents Légaux</p>
              {['terms', 'privacy', 'cookies'].map((linkType) => (
                <button
                  key={linkType}
                  className={`w-full text-left px-5 py-3 rounded-xl font-bold transition-all ${type === linkType ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-white hover:text-blue-600'}`}
                  disabled={type === linkType}
                  onClick={() => {/* Integration logic for switching tabs would go here if needed */}}
                >
                  {translations[language].legal[linkType].title.split(' & ')[0]}
                </button>
              ))}
            </nav>

            <div className="p-6 bg-blue-50 rounded-2xl space-y-4">
              <p className="text-sm font-bold text-blue-900">Besoin d'aide ?</p>
              <p className="text-xs text-blue-700 leading-relaxed font-medium">Nos conseillers sont disponibles pour répondre à vos questions juridiques.</p>
              <button className="w-full bg-white text-blue-600 py-2 rounded-xl text-xs font-black shadow-sm">Nous contacter</button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-grow space-y-12">
            {/* Page Header Card */}
            <div className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl">
              <div className="bg-blue-600 p-12 sm:p-20 relative overflow-hidden">
                {/* SVG Illustration Pattern */}
                <svg className="absolute right-0 top-0 h-full w-auto opacity-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="1" />
                  <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="1" />
                  <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="1" />
                  <line x1="10" y1="50" x2="90" y2="50" stroke="white" strokeWidth="1" />
                  <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="1" />
                </svg>

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="bg-white/20 p-6 rounded-[2rem] backdrop-blur-md">
                    {getHeaderIcon()}
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
                    {t.title}
                  </h1>
                  <p className="text-xl text-blue-50 font-medium max-w-2xl leading-relaxed">
                    {t.intro}
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-16 space-y-16">
                {/* Mobile Navigation Buttons */}
                <div className="lg:hidden flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                  <button onClick={onBack} className="bg-gray-100 p-3 rounded-full"><ChevronLeft className="w-5 h-5 text-gray-500" /></button>
                  {['terms', 'privacy', 'cookies'].map((linkType) => (
                    <button key={linkType} className={`shrink-0 px-6 py-3 rounded-full text-sm font-bold ${type === linkType ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{translations[language].legal[linkType].title.split(' ')[0]}</button>
                  ))}
                </div>

                {/* Content Sections */}
                <div className="space-y-16">
                  {t.sections.map((section: any, i: number) => {
                    const SectionIcon = ICON_MAP[section.icon] || Info;
                    return (
                      <div key={i} className="group">
                        <div className="flex items-start gap-6">
                          <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors duration-500">
                            <SectionIcon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-500" />
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-2xl font-black text-gray-900 leading-tight">
                              {section.h3}
                            </h3>
                            <div className="h-1 w-12 bg-blue-600 rounded-full group-hover:w-24 transition-all duration-500"></div>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                              {section.p}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer of the Document */}
                <div className="pt-16 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-widest bg-gray-50 px-6 py-3 rounded-full">
                    <Clock className="w-4 h-4 text-blue-500" />
                    Mise à jour : 25 Mars 2024
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Trust Section */}
            <div className="bg-gradient-to-br from-blue-900 to-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
               <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
               <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
                  <div className="space-y-2 text-center lg:text-left">
                    <p className="text-blue-400 font-black uppercase tracking-widest text-xs">Engagement FinancePlus</p>
                    <h4 className="text-3xl font-black">Sécurité 100% Garantie</h4>
                    <p className="text-gray-400 font-medium">Votre confiance est notre plus grand atout.</p>
                  </div>
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-14 h-14 rounded-full border-4 border-gray-900 bg-gray-800 flex items-center justify-center">
                         <Shield className="w-6 h-6 text-blue-500" />
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Legal;
