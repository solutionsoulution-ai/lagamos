
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
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-600 to-transparent opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <aside className="hidden lg:block w-72 shrink-0 space-y-8 sticky top-32 h-fit">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold mb-8 transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              {translations[language].nav.home}
            </button>
            
            <nav className="space-y-2">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Documents Légaux</p>
              {['terms', 'privacy', 'cookies'].map((linkType) => (
                <button
                  key={linkType}
                  className={`w-full text-left px-5 py-3 rounded-xl font-bold transition-all ${type === linkType ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-gray-500 hover:bg-white hover:text-emerald-600'}`}
                  disabled={type === linkType}
                  onClick={() => {}}
                >
                  {translations[language].legal[linkType].title.split(' & ')[0]}
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex-grow space-y-12">
            <div className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl">
              <div className="bg-emerald-600 p-12 sm:p-20 relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="bg-white/20 p-6 rounded-[2rem] backdrop-blur-md">{getHeaderIcon()}</div>
                  <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">{t.title}</h1>
                </div>
              </div>
              <div className="p-8 sm:p-16 space-y-16">
                <div className="space-y-16">
                  {t.sections.map((section: any, i: number) => {
                    const SectionIcon = ICON_MAP[section.icon] || Info;
                    return (
                      <div key={i} className="group flex items-start gap-6">
                        <div className="bg-emerald-50 p-4 rounded-2xl group-hover:bg-emerald-600 transition-colors">
                          <SectionIcon className="w-8 h-8 text-emerald-600 group-hover:text-white" />
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-2xl font-black text-gray-900 leading-tight">{section.h3}</h3>
                          <p className="text-lg text-gray-600 leading-relaxed font-medium">{section.p}</p>
                        </div>
                      </div>
                    );
                  })}
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
