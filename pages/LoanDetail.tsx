
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
    <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      {/* Hero Header with Responsive Sizing */}
      <div className="relative h-[250px] sm:h-[500px] w-full overflow-hidden">
        <img 
          src={loan.image} 
          alt={loan.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-teal-900/60 to-gray-50"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end pb-6 sm:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-3 sm:space-y-6">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-white/80 hover:text-white text-xs sm:text-base font-bold transition-colors group mb-2"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              {t.back}
            </button>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-6">
              <div className="space-y-2 sm:space-y-4">
                <div className="bg-emerald-500 p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl inline-block text-white">
                  <IconComponent className="w-6 h-6 sm:w-10 sm:h-10" />
                </div>
                <h1 className="text-2xl sm:text-6xl font-black text-white leading-tight drop-shadow-lg">
                  {loan.title}
                </h1>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-white/30">
                    <p className="text-[10px] sm:text-lg text-white font-extrabold">
                      {translations[language].hero.badge.split(':')[0]}: {FIXED_RATE}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 items-start">
          
          <div className="lg:col-span-2 space-y-8 sm:space-y-12">
            {/* Main Content Card */}
            <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 border border-gray-100 shadow-xl space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">{t.advantages}</h2>
              <p className="text-base sm:text-xl text-gray-600 leading-relaxed font-medium">
                {loan.description}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 pt-4 sm:pt-6">
                <div className="bg-emerald-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-emerald-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <p className="text-[10px] sm:text-sm font-black text-emerald-600 uppercase tracking-widest">{t.labels.maxAmount}</p>
                    <Euro className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  </div>
                  <p className="text-2xl sm:text-4xl font-black text-teal-900">{loan.maxAmount.toLocaleString()} €</p>
                </div>
                <div className="bg-teal-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-teal-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <p className="text-[10px] sm:text-sm font-black text-teal-600 uppercase tracking-widest">{t.labels.maxDuration}</p>
                    <PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
                  </div>
                  <p className="text-2xl sm:text-4xl font-black text-teal-900">{loan.maxDuration} {translations[language].calculator.months}</p>
                </div>
              </div>
            </div>

            {/* Advantages List */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {t.conditions.map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="bg-emerald-50 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm sm:text-lg font-bold text-gray-700 group-hover:text-gray-900 transition-colors">{feature}</span>
                </div>
              ))}
            </div>

            {/* Eligibility Card */}
            <div className="bg-teal-900 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-16 text-white space-y-6 sm:space-y-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute bottom-0 right-0 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                <ShieldCheck className="w-48 h-48 sm:w-64 sm:h-64 -mr-12 sm:-mr-16 -mb-12 sm:-mb-16" />
              </div>
              <div className="space-y-3 sm:space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 bg-emerald-600/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {t.protection}
                </div>
                <h4 className="text-2xl sm:text-3xl font-black">{t.eligibility}</h4>
              </div>
              <ul className="space-y-4 sm:space-y-6 text-gray-400 relative z-10">
                {t.conditions.map((cond: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 sm:gap-4 group/item">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 group-hover/item:scale-150 transition-transform"></div>
                    <span className="text-base sm:text-lg font-medium group-hover/item:text-white transition-colors">{cond}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 sticky top-32">
            <LoanCalculator 
              language={language} 
              onApply={onApply} 
            />
            
            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 border border-gray-100 shadow-xl space-y-4 sm:space-y-6">
               <h3 className="text-lg sm:text-xl font-black text-gray-900">Pourquoi nous choisir ?</h3>
               <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="bg-emerald-100 p-2 rounded-lg sm:rounded-xl text-emerald-600"><TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                    <p className="text-xs sm:text-sm font-bold text-gray-600">Taux le plus bas du marché</p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="bg-emerald-100 p-2 rounded-lg sm:rounded-xl text-emerald-600"><UserCheck className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                    <p className="text-xs sm:text-sm font-bold text-gray-600">Conseiller dédié 24/7</p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="bg-emerald-100 p-2 rounded-lg sm:rounded-xl text-emerald-600"><ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                    <p className="text-xs sm:text-sm font-bold text-gray-600">Fonds débloqués sous 48h</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-32 space-y-16 sm:space-y-20">
          {loan.specificTestimonials && (
            <section>
              <ReviewsSection language={language} customReviews={loan.specificTestimonials} />
            </section>
          )}
          {loan.specificFaqs && (
            <section className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-16 border border-gray-100 shadow-sm">
              <FaqSection language={language} customFaqs={loan.specificFaqs} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanDetail;
