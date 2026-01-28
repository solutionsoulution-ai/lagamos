
import React, { useEffect } from 'react';
import { LoanInfo, Language } from '../types';
import { ICON_MAP, FIXED_RATE } from '../constants';
import { ChevronLeft, CheckCircle2, ShieldCheck, UserCheck, TrendingUp, PieChart, Euro, ArrowDown, Zap, HeartHandshake, Shield } from 'lucide-react';
import LoanCalculator from '../components/LoanCalculator';
import FaqSection from '../components/FaqSection';
import ReviewsSection from '../components/ReviewsSection';
import { translations } from '../translations';

interface LoanDetailProps {
  loan: LoanInfo;
  onBack: () => void;
  language: Language;
  onApply: () => void;
}

const LoanDetail: React.FC<LoanDetailProps> = ({ loan, onBack, language, onApply }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loan.id]);

  const IconComponent = ICON_MAP[loan.icon];
  const t = translations[language].loan_detail;

  return (
    <div className="pb-20 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Hero Header */}
      <div className="relative h-[40vh] sm:h-[70vh] w-full overflow-hidden">
        <img 
          src={loan.image} 
          alt={loan.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end pb-8 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm sm:text-lg font-bold transition-all group mb-6 sm:mb-12"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
              {t.back}
            </button>
            
            <div className="space-y-4 sm:space-y-8">
              <div className="bg-emerald-500 p-3 sm:p-6 rounded-2xl sm:rounded-[2.5rem] shadow-2xl inline-block text-white">
                <IconComponent className="w-8 h-8 sm:w-16 sm:h-16" />
              </div>
              <h1 className="text-4xl sm:text-8xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
                {loan.title}
              </h1>
              <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 text-white font-black text-lg sm:text-2xl">
                {FIXED_RATE}% <span className="text-xs sm:text-sm uppercase tracking-widest opacity-80 font-bold">Fixe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-24 relative z-10 space-y-24 sm:space-y-32">
        
        {/* Main Stats & Summary */}
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-16 items-start">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-[3rem] sm:rounded-[4rem] p-8 sm:p-20 shadow-2xl border border-gray-100 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-5xl font-black text-gray-900">{t.advantages}</h2>
                <p className="text-lg sm:text-2xl text-gray-500 leading-relaxed font-medium">
                  {loan.description} {t.why_p}
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-10">
                <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100 group hover:scale-[1.02] transition-transform shadow-sm">
                  <div className="flex justify-between items-start mb-8">
                    <p className="text-[10px] sm:text-xs font-black text-emerald-600 uppercase tracking-widest">{t.labels.maxAmount}</p>
                    <Euro className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-4xl sm:text-6xl font-black text-teal-950">{loan.maxAmount.toLocaleString()} €</p>
                </div>
                <div className="bg-teal-50 p-10 rounded-[3rem] border border-teal-100 group hover:scale-[1.02] transition-transform shadow-sm">
                  <div className="flex justify-between items-start mb-8">
                    <p className="text-[10px] sm:text-xs font-black text-teal-600 uppercase tracking-widest">{t.labels.maxDuration}</p>
                    <PieChart className="w-8 h-8 text-teal-600" />
                  </div>
                  <p className="text-4xl sm:text-6xl font-black text-teal-950">{loan.maxDuration} {translations[language].calculator.months}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky top-32">
            <LoanCalculator language={language} onApply={onApply} />
          </div>
        </div>

        {/* 1. SECTION POURQUOI SOUSCRIRE ? (IMAGE / TEXTE) */}
        <section className="bg-white rounded-[3rem] sm:rounded-[5rem] p-8 sm:p-24 shadow-2xl border border-gray-50 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 sm:gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-full h-full border-2 border-emerald-100 border-dashed rounded-[4rem] -z-10 animate-pulse hidden sm:block"></div>
              <div className="relative rounded-[3rem] sm:rounded-[4rem] overflow-hidden shadow-2xl h-[400px] sm:h-[600px] group">
                <img 
                  src="https://images.unsplash.com/photo-1573163281538-559e1c48073b?auto=format&fit=crop&q=80&w=1200" 
                  alt="Financial Freedom" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-emerald-900/10 backdrop-blur-[2px]"></div>
                <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-md p-6 rounded-[2.5rem] shadow-2xl flex items-center gap-4">
                  <div className="bg-emerald-600 p-3 rounded-2xl text-white"><Zap className="w-6 h-6" /></div>
                  <p className="text-sm sm:text-lg font-black text-gray-900 leading-tight">Accompagnement garanti 24/7</p>
                </div>
              </div>
            </div>

            <div className="space-y-10 sm:space-y-16">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                  <HeartHandshake className="w-4 h-4" />
                  {t.best_offer}
                </div>
                <h2 className="text-4xl sm:text-7xl font-black text-gray-900 leading-[1.1]">{t.why_title}</h2>
                <p className="text-lg sm:text-2xl text-gray-500 font-medium leading-relaxed">{t.why_subtitle}</p>
              </div>

              <div className="grid gap-8">
                {[
                  { icon: ShieldCheck, title: "Sérénité Contractuelle", desc: "Taux fixe de 2% bloqué quoi qu'il arrive sur les marchés financiers." },
                  { icon: UserCheck, title: "Analyse Humaine", desc: "Pas de robot. Chaque dossier est étudié par un conseiller expert dédié." },
                  { icon: TrendingUp, title: "Liberté de Remboursement", desc: "Modifiez vos mensualités ou remboursez par anticipation sans frais." }
                ].map((val, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="bg-emerald-50 w-14 h-14 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-all duration-300">
                      <val.icon className="w-6 h-6 sm:w-10 sm:h-10 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">{val.title}</h4>
                      <p className="text-sm sm:text-lg text-gray-500 font-medium">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. SECTION PARCOURS D'ACCOMPAGNEMENT - VERTICAL DESIGN */}
        <section className="space-y-16 sm:space-y-24">
          <div className="text-left sm:text-center max-w-4xl sm:mx-auto space-y-4 px-4">
            <h2 className="text-4xl sm:text-7xl font-black text-gray-900 leading-tight">{t.journey_title}</h2>
            <p className="text-lg sm:text-2xl text-gray-500 font-medium">{t.journey_subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {t.steps.map((step: any, i: number) => (
              <React.Fragment key={i}>
                {/* Rectangular Step Element */}
                <div className="w-full bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xl flex flex-col sm:flex-row items-center gap-6 sm:gap-10 hover:shadow-2xl transition-all group">
                  <div className="bg-emerald-600 w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[2rem] flex items-center justify-center text-white font-black text-2xl sm:text-4xl shadow-lg shadow-emerald-100 shrink-0 group-hover:rotate-6 transition-transform">
                    {i + 1}
                  </div>
                  <div className="text-center sm:text-left space-y-2 flex-grow">
                    <h4 className="text-xl sm:text-3xl font-black text-gray-900">{step.t}</h4>
                    <p className="text-sm sm:text-xl text-gray-500 font-medium leading-relaxed">{step.d}</p>
                  </div>
                </div>

                {/* Vertical Arrow between steps */}
                {i < t.steps.length - 1 && (
                  <div className="py-6 sm:py-8 flex justify-center">
                    <div className="bg-emerald-50 p-3 sm:p-4 rounded-full border border-emerald-100 animate-bounce duration-[2000ms]">
                      <ArrowDown className="w-6 h-6 sm:w-10 sm:h-10 text-emerald-600" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* 3. AVIS & FAQ */}
        <div className="space-y-32">
          {loan.specificTestimonials && loan.specificTestimonials.length > 0 && (
            <ReviewsSection language={language} customReviews={loan.specificTestimonials} />
          )}
          
          <div className="bg-white rounded-[4rem] sm:rounded-[6rem] p-8 sm:p-24 border border-gray-100 shadow-2xl">
             <FaqSection language={language} customFaqs={loan.specificFaqs} />
          </div>
        </div>

        {/* CTA FINAL */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-900 rounded-[3rem] sm:rounded-[5rem] p-10 sm:p-24 text-center text-white space-y-8 relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <circle cx="20" cy="20" r="10" fill="white" />
                 <circle cx="80" cy="80" r="20" fill="white" />
              </svg>
           </div>
           <div className="relative z-10 space-y-6 sm:space-y-10 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-6xl font-black leading-tight">Votre projet mérite le meilleur taux.</h2>
              <p className="text-lg sm:text-2xl text-emerald-100 font-medium">Simulation gratuite en 2 minutes. Réponse de principe immédiate.</p>
              <button 
                onClick={onApply}
                className="bg-white text-teal-950 px-10 py-5 rounded-[2rem] font-black text-xl sm:text-2xl shadow-2xl hover:scale-105 transition-transform"
              >
                Lancer ma demande maintenant
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default LoanDetail;
