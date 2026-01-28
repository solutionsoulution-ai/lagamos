
import React, { useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { ShieldCheck, Target, Zap, Award, ChevronRight, CheckCircle2, TrendingUp, HeartHandshake, Shield } from 'lucide-react';
import Logo from '../components/Logo';

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
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32 relative">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100 rounded-full blur-[120px] opacity-40 -z-10"></div>
          
          <div className="space-y-8 relative">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-100">
               <Logo className="w-5 h-5" />
               {t.title}
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-gray-900 leading-tight">
              {t.subtitle}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              {t.mission_text}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('loan-application')}
                className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3"
              >
                Commencer
                <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-gray-100 text-gray-900 px-8 py-4 rounded-2xl font-black text-lg hover:bg-gray-200 transition-all text-center"
              >
                Contact
              </button>
            </div>
          </div>

          <div className="relative">
             <div className="absolute -top-10 -right-10 w-full h-full border-2 border-dashed border-emerald-200 rounded-[4rem] -z-10 animate-pulse"></div>
             <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[500px] group">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Notre équipe" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent"></div>
                <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
                   <TrendingUp className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="absolute bottom-10 left-10 bg-emerald-600/90 backdrop-blur-md p-4 rounded-2xl shadow-xl">
                   <ShieldCheck className="w-8 h-8 text-white" />
                </div>
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-32">
           {[
             { title: "Transparence", icon: EyeIcon, color: "bg-emerald-50 text-emerald-600", desc: "Des conditions claires dès le premier jour." },
             { title: "Sécurité", icon: Shield, color: "bg-teal-50 text-teal-600", desc: "Une protection bancaire de haut niveau." },
             { title: "Accompagnement", icon: HeartHandshake, color: "bg-emerald-50 text-emerald-600", desc: "Des experts à votre écoute 24/7." }
           ].map((val, i) => (
             <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center space-y-4">
                <div className={`${val.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                   <val.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">{val.title}</h3>
                <p className="text-gray-500 font-medium">{val.desc}</p>
             </div>
           ))}
        </div>

        <div className="space-y-24">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1 relative rounded-[3rem] overflow-hidden h-[600px] shadow-2xl group">
                 <img 
                   src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200" 
                   alt="Vision Europfy" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                 />
                 <div className="absolute inset-0 bg-emerald-600/20 backdrop-blur-[2px]"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 p-8 rounded-[3rem] shadow-2xl text-center space-y-4 max-w-xs">
                    <Target className="w-12 h-12 text-emerald-600 mx-auto" />
                    <p className="text-xl font-black text-gray-900">Vision 2030</p>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">Devenir le premier réseau de crédit éthique en Europe.</p>
                 </div>
              </div>
              <div className="order-1 lg:order-2 space-y-12">
                 <div className="space-y-6">
                    <h2 className="text-4xl font-black text-gray-900 leading-tight">{t.vision_title}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                       {t.vision_text}
                    </p>
                 </div>
                 
                 <div className="space-y-8">
                    <h3 className="text-2xl font-black text-gray-900">{t.values_title}</h3>
                    <div className="grid gap-6">
                       {t.values.map((val: any, i: number) => (
                         <div key={i} className="flex gap-6 items-start group">
                            <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-colors shadow-sm">
                               <CheckCircle2 className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                               <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">{val.title}</h4>
                               <p className="text-gray-500 font-medium leading-relaxed">{val.desc}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-32 bg-teal-950 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-emerald-900/20">
           <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 100 Q 50 0 100 100" stroke="white" fill="transparent" strokeWidth="0.5" />
                 <circle cx="20" cy="20" r="10" stroke="white" strokeWidth="0.5" fill="none" />
                 <circle cx="80" cy="80" r="15" stroke="white" strokeWidth="0.5" fill="none" />
              </svg>
           </div>
           <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                 <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight">Engagés pour une finance éthique.</h2>
              <p className="text-gray-400 text-lg font-medium leading-relaxed">
                 Chaque prêt accordé chez Europfy respecte des critères de durabilité et d'éthique sociale stricts. Nous ne finançons pas seulement des projets, nous construisons une économie plus humaine.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export default About;
