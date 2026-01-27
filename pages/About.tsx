
import React, { useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { ShieldCheck, Target, Zap, Users, Globe, Award, ChevronRight, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  language: Language;
  onNavigate: (page: string) => void;
}

const About: React.FC<AboutProps> = ({ language, onNavigate }) => {
  const t = translations[language].about_page;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-100">
               <Landmark className="w-4 h-4" />
               {t.title}
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-gray-900 leading-tight">
              {t.subtitle}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              {t.mission_text}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => onNavigate('loan-application')}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-3"
              >
                Commencer
                <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-gray-100 text-gray-900 px-8 py-4 rounded-2xl font-black text-lg hover:bg-gray-200 transition-all"
              >
                Contact
              </button>
            </div>
          </div>
          <div className="relative">
             <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
             <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Notre équipe" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
           {[
             { label: t.stats.years, value: '15+', icon: Award },
             { label: t.stats.countries, value: '27', icon: Globe },
             { label: t.stats.loans, value: '50k+', icon: Zap }
           ].map((stat, i) => (
             <div key={i} className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 text-center space-y-4 hover:bg-white hover:shadow-xl transition-all group">
                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-blue-600 transition-colors">
                   <stat.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <p className="text-4xl font-black text-gray-900">{stat.value}</p>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
             </div>
           ))}
        </div>

        {/* Vision & Values Section */}
        <div className="space-y-24">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1 relative rounded-[3rem] overflow-hidden h-[600px] shadow-2xl">
                 <img 
                   src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200" 
                   alt="Vision FinancePlus" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-[2px]"></div>
              </div>
              <div className="order-1 lg:order-2 space-y-12">
                 <div className="space-y-6">
                    <h2 className="text-4xl font-black text-gray-900">{t.vision_title}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                       {t.vision_text}
                    </p>
                 </div>
                 
                 <div className="space-y-8">
                    <h3 className="text-2xl font-black text-gray-900">{t.values_title}</h3>
                    <div className="grid gap-6">
                       {t.values.map((val: any, i: number) => (
                         <div key={i} className="flex gap-6 items-start group">
                            <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                               <CheckCircle2 className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                               <h4 className="text-xl font-bold text-gray-900 mb-1">{val.title}</h4>
                               <p className="text-gray-500 font-medium leading-relaxed">{val.desc}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Impact / Sustainability Banner */}
        <div className="mt-32 bg-gray-900 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 100 Q 50 0 100 100" stroke="white" fill="transparent" strokeWidth="0.5" />
              </svg>
           </div>
           <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                 <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-white">Engagés pour une finance éthique.</h2>
              <p className="text-gray-400 text-lg font-medium leading-relaxed">
                 Chaque prêt accordé chez FinancePlus respecte des critères de durabilité et d'éthique sociale stricts. Nous ne finançons pas seulement des projets, nous construisons une économie plus humaine.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

// Internal icon for breadcrumb
const Landmark = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export default About;
