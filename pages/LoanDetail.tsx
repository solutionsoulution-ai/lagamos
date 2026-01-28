
import React, { useEffect } from 'react';
import { LoanInfo, Language } from '../types';
import { ICON_MAP, FIXED_RATE } from '../constants';
import { ChevronLeft, CheckCircle2, ShieldCheck, Calculator, UserCheck, TrendingUp, Sparkles, PieChart } from 'lucide-react';
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
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold mb-12 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t.back}
        </button>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <div className="bg-white rounded-[3rem] p-10 sm:p-12 border border-gray-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <IconComponent className="w-64 h-64" />
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="bg-emerald-600 w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-200">
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                  {loan.title}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                    <p className="text-lg text-emerald-600 font-extrabold">{translations[language].hero.badge.split(':')[0]}: {FIXED_RATE}%</p>
                  </div>
                  <div className="bg-teal-50 px-4 py-2 rounded-full border border-teal-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <p className="text-sm text-teal-600 font-bold">{t.best_offer}</p>
                  </div>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed font-medium">
                  {loan.description}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg group hover:bg-emerald-600 transition-all duration-500">
                <div className="flex justify-between items-start mb-6">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest group-hover:text-emerald-100 transition-colors">{t.labels.maxAmount}</p>
                  <TrendingUp className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <p className="text-4xl font-black text-gray-900 group-hover:text-white transition-colors">{loan.maxAmount.toLocaleString()} €</p>
                <div className="mt-4 h-1 w-full bg-gray-100 rounded-full group-hover:bg-emerald-400/30">
                  <div className="h-full w-2/3 bg-emerald-600 rounded-full group-hover:bg-white animate-pulse"></div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg group hover:bg-teal-900 transition-all duration-500">
                <div className="flex justify-between items-start mb-6">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest group-hover:text-teal-400 transition-colors">{t.labels.maxDuration}</p>
                  <PieChart className="w-6 h-6 text-emerald-600 group-hover:text-emerald-400 transition-colors" />
                </div>
                <p className="text-4xl font-black text-gray-900 group-hover:text-white transition-colors">{loan.maxDuration} {translations[language].calculator.months}</p>
                <div className="mt-4 h-1 w-full bg-gray-100 rounded-full group-hover:bg-teal-700">
                  <div className="h-full w-1/2 bg-emerald-600 rounded-full group-hover:bg-emerald-500 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-50 p-3 rounded-xl">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">{t.advantages}</h3>
              </div>
              <div className="grid gap-6">
                {t.conditions.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-lg font-bold text-gray-700 group-hover:text-gray-900 transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-teal-900 rounded-[3rem] p-10 sm:p-16 text-white space-y-8 relative overflow-hidden group shadow-2xl shadow-teal-900/20">
              <div className="absolute bottom-0 right-0 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                <ShieldCheck className="w-64 h-64 -mr-16 -mb-16" />
              </div>
              
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 bg-emerald-600/30 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  {t.protection}
                </div>
                <h4 className="text-3xl font-black">{t.eligibility}</h4>
              </div>
              
              <ul className="space-y-6 text-gray-400 relative z-10">
                {t.conditions.map((cond: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-4 group/item">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover/item:scale-150 transition-transform"></div>
                    <span className="text-lg font-medium group-hover/item:text-white transition-colors">{cond}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="relative">
               <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
               <LoanCalculator 
                language={language} 
                onApply={onApply} 
              />
            </div>
            
            <div className="grid gap-4">
              {[
                { icon: Calculator, title: t.sim_title, desc: t.sim_desc, color: "bg-emerald-50 text-emerald-600" },
                { icon: UserCheck, title: t.advisor_title, desc: t.advisor_desc, color: "bg-teal-50 text-teal-600" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className={`${item.color} p-5 rounded-[1.5rem] shadow-sm group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors">{item.title}</p>
                    <p className="text-gray-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 sm:mt-32 space-y-20 sm:space-y-32">
          {loan.specificTestimonials && (
            <section>
              <ReviewsSection language={language} customReviews={loan.specificTestimonials} />
            </section>
          )}

          {loan.specificFaqs && (
            <section className="bg-white rounded-[3rem] p-8 sm:p-16 border border-gray-100 shadow-sm">
              <FaqSection language={language} customFaqs={loan.specificFaqs} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanDetail;
