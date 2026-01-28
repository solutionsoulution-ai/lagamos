
import React, { useEffect } from 'react';
import { LoanInfo, Language } from '../types';
import { ICON_MAP, FIXED_RATE } from '../constants';
import { ChevronLeft, CheckCircle2, ShieldCheck, Calculator, UserCheck, TrendingUp, Sparkles, PieChart, Euro } from 'lucide-react';
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
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Hero Header with Immersive Layout */}
      <div className="relative h-[280px] sm:h-[600px] w-full overflow-hidden">
        <img 
          src={loan.image} 
          alt={loan.title} 
          className="w-full h-full object-cover"
        />
        {/* Stronger top gradient to ensure navbar readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent"></div>
        {/* Bottom content gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end pb-8 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-3 sm:space-y-8">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-white/80 hover:text-white text-xs sm:text-base font-bold transition-colors group mb-4"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              {t.back}
            </button>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-8">
              <div className="space-y-3 sm:space-y-6">
                <div className="bg-emerald-500 p-2 sm:p-5 rounded-xl sm:rounded-[2rem] shadow-2xl inline-block text-white">
                  <IconComponent className="w-6 h-6 sm:w-12 sm:h-12" />
                </div>
                <h1 className="text-3xl sm:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                  {loan.title}
                </h1>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 sm:px-6 sm:py-3 rounded-full border border-white/30 shadow-lg">
                    <p className="text-[10px] sm:text-xl text-white font-black uppercase tracking-wider">
                      {translations[language].hero.badge.split(':')[0]}: {FIXED_RATE}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 items-start">
          
          <div className="lg:col-span-2 space-y-8 sm:space-y-12">
            {/* Main Content Card */}
            <div className="bg-white rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-16 border border-gray-100 shadow-2xl space-y-8 sm:space-y-10">
              <h2 className="text-2xl sm:text-4xl font-black text-gray-900">{t.advantages}</h2>
              <p className="text-base sm:text-2xl text-gray-600 leading-relaxed font-medium">
                {loan.description}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-10">
                <div className="bg-emerald-50 p-8 sm:p-10 rounded-[2.5rem] border border-emerald-100 shadow-sm group hover:scale-[1.02] transition-transform">
                  <div className="flex justify-between items-start mb-6 sm:mb-8">
                    <p className="text-[10px] sm:text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">{t.labels.maxAmount}</p>
                    <Euro className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                  </div>
                  <p className="text-3xl sm:text-5xl font-black text-teal-900">{loan.maxAmount.toLocaleString()} €</p>
                </div>
                <div className="bg-teal-50 p-8 sm:p-10 rounded-[2.5rem] border border-teal-100 shadow-sm group hover:scale-[1.02] transition-transform">
                  <div className="flex justify-between items-start mb-6 sm:mb-8">
                    <p className="text-[10px] sm:text-xs font-black text-teal-600 uppercase tracking-[0.2em]">{t.labels.maxDuration}</p>
                    <PieChart className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />
                  </div>
                  <p className="text-3xl sm:text-5xl font-black text-teal-900">{loan.maxDuration} {translations[language].calculator.months}</p>
                </div>
              </div>
            </div>

            {/* Advantages List */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {t.conditions.map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-lg hover:shadow-2xl transition-all group">
                  <div className="bg-emerald-50 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-all">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm sm:text-xl font-bold text-gray-700 group-hover:text-gray-900 transition-colors">{feature}</span>
                </div>
              ))}
            </div>

            {/* Eligibility Card */}
            <div className="bg-teal-900 rounded-[2.5rem] sm:rounded-[3.5rem] p-10 sm:p-20 text-white space-y-8 sm:space-y-10 relative overflow-hidden group shadow-2xl">
              <div className="absolute bottom-0 right-0 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                <ShieldCheck className="w-48 h-48 sm:w-80 sm:h-80 -mr-16 sm:-mr-24 -mb-16 sm:-mb-24" />
              </div>
              <div className="space-y-4 sm:space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 bg-emerald-600/30 px-4 py-2 rounded-full text-[10px] sm:text-sm font-black uppercase tracking-[0.2em] text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t.protection}
                </div>
                <h4 className="text-3xl sm:text-5xl font-black">{t.eligibility}</h4>
              </div>
              <ul className="space-y-6 sm:space-y-8 relative z-10">
                {t.conditions.map((cond: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-4 sm:gap-6 group/item">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-500 group-hover/item:scale-150 transition-transform"></div>
                    <span className="text-lg sm:text-2xl font-medium text-gray-300 group-hover/item:text-white transition-colors">{cond}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8 sm:space-y-10 lg:sticky lg:top-32">
            <LoanCalculator 
              language={language} 
              onApply={onApply} 
            />
            
            <div className="bg-white rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-10 border border-gray-100 shadow-xl space-y-6 sm:space-y-8">
               <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Pourquoi nous choisir ?</h3>
               <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="bg-emerald-100 p-3 rounded-xl sm:rounded-2xl text-emerald-600 shadow-sm"><TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                    <p className="text-sm sm:text-lg font-bold text-gray-700">Taux le plus bas du marché</p>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="bg-emerald-100 p-3 rounded-xl sm:rounded-2xl text-emerald-600 shadow-sm"><UserCheck className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                    <p className="text-sm sm:text-lg font-bold text-gray-700">Conseiller dédié 24/7</p>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="bg-emerald-100 p-3 rounded-xl sm:rounded-2xl text-emerald-600 shadow-sm"><ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                    <p className="text-sm sm:text-lg font-bold text-gray-700">Fonds débloqués sous 48h</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-20 sm:mt-40 space-y-20 sm:space-y-32">
          {loan.specificTestimonials && loan.specificTestimonials.length > 0 && (
            <section>
              <ReviewsSection language={language} customReviews={loan.specificTestimonials} />
            </section>
          )}
          {loan.specificFaqs && loan.specificFaqs.length > 0 && (
            <section className="bg-white rounded-[3rem] sm:rounded-[4rem] p-8 sm:p-24 border border-gray-100 shadow-sm">
              <FaqSection language={language} customFaqs={loan.specificFaqs} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanDetail;
