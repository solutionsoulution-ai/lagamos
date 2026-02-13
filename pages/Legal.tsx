import React, { useEffect } from 'react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { 
  ChevronLeft, ShieldCheck, FileText, Info, Cookie, Shield, Zap, UserCheck, Scale, Gavel, 
  Database, Target, Lock, Users, Clock, Settings, BarChart, MousePointerClick, EyeOff, Building
} from 'lucide-react';

interface LegalProps {
  type: 'terms' | 'privacy' | 'cookies';
  language: Language;
  onBack: () => void;
}

const ICON_MAP: Record<string, any> = {
  Info, Shield, FileText, Zap, UserCheck, Scale, Gavel, 
  Database, Target, Lock, Users, Clock, Cookie, Settings, 
  BarChart, MousePointerClick, EyeOff, Building, ShieldCheck
};

const Legal: React.FC<LegalProps> = ({ type, language, onBack }) => {
  const { t } = useTranslation();
  const legalT = t('legal', { returnObjects: true }) as any;
  const pageContent = legalT ? legalT[type] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  if (!pageContent) return null;

  const getHeaderInfo = () => {
    switch(type) {
      case 'privacy': return { icon: <ShieldCheck className="w-16 h-16 text-white" />, gradient: "from-blue-600 to-indigo-800" };
      case 'cookies': return { icon: <Cookie className="w-16 h-16 text-white" />, gradient: "from-orange-500 to-amber-700" };
      default: return { icon: <FileText className="w-16 h-16 text-white" />, gradient: "from-emerald-600 to-teal-800" };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="pt-24 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <aside className="hidden lg:block w-72 shrink-0 space-y-8 sticky top-32 h-fit">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold mb-8 transition-colors group">
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              {t('nav.home')}
            </button>
            
            <nav className="space-y-3">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Documents Légaux</p>
              {['terms', 'privacy', 'cookies'].map((linkType) => (
                <button
                  key={linkType}
                  className={`w-full text-left px-5 py-4 rounded-xl font-bold transition-all border ${type === linkType ? 'bg-white border-emerald-500 text-emerald-600 shadow-md translate-x-2' : 'bg-transparent border-transparent text-gray-500 hover:bg-white hover:shadow-sm'}`}
                  disabled={type === linkType}
                >
                  {legalT[linkType]?.title?.split(' - ')[0] || legalT[linkType]?.title}
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex-grow">
            <button onClick={onBack} className="lg:hidden flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold mb-8 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              {t('nav.home')}
            </button>

            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl">
              
              <div className={`bg-gradient-to-br ${headerInfo.gradient} p-12 sm:p-20 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="bg-white/20 p-6 rounded-[2rem] backdrop-blur-md border border-white/20 shadow-xl">
                    {headerInfo.icon}
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                      {pageContent.title}
                    </h1>
                    {pageContent.subtitle && (
                      <p className="text-white/80 font-medium text-lg">{pageContent.subtitle}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-16 space-y-12">
                {pageContent.sections?.map((section: any, i: number) => {
                  const SectionIcon = ICON_MAP[section.icon] || Info;
                  return (
                    <div key={i} className="group relative pl-0 sm:pl-8 border-l-4 border-gray-100 hover:border-emerald-500 transition-colors duration-500">
                      <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <div className="hidden sm:flex bg-gray-50 p-3 rounded-xl shrink-0 group-hover:bg-emerald-50 transition-colors">
                          <SectionIcon className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                        </div>
                        <div className="space-y-4 w-full">
                          <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight flex items-center gap-3">
                            <span className="sm:hidden"><SectionIcon className="w-5 h-5 text-emerald-600" /></span>
                            {section.h3}
                          </h3>
                          <div className="text-gray-600 leading-relaxed font-medium whitespace-pre-line text-base sm:text-lg">
                            {section.p}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gray-50 p-8 text-center border-t border-gray-100">
                <p className="text-sm text-gray-400 font-medium">{t('legal.document_footer')}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Legal;