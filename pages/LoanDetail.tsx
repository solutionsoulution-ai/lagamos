
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LoanInfo, Language } from '../types';
import { FIXED_RATE } from '../constants';
import { ChevronLeft, ShieldCheck, UserCheck, TrendingUp, Zap, HeartHandshake, ArrowDown, ArrowRight, FileCheck, Info, List, CheckCircle2 } from 'lucide-react';
import LoanCalculator from '../components/LoanCalculator';
import FaqSection from '../components/FaqSection';
import ReviewsSection from '../components/ReviewsSection';

interface LoanDetailProps {
  loan: LoanInfo;
  onBack: () => void;
  language: Language;
  onApply: () => void;
}

const LoanDetail: React.FC<LoanDetailProps> = ({ loan, onBack, language, onApply }) => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loan.id]);

  const whyIcons = [ShieldCheck, UserCheck, TrendingUp];

  const whyProps = useMemo(() => {
    const val = t('loan_detail.why_props', { returnObjects: true });
    return Array.isArray(val) ? val : [];
  }, [t]);

  const journeySteps = useMemo(() => {
    const val = t('loan_detail.steps', { returnObjects: true });
    return Array.isArray(val) ? val : [];
  }, [t]);

  return (
    <div className="pb-20 bg-gray-50 min-h-screen overflow-x-hidden">
      <div className="relative h-[50vh] sm:h-[75vh] w-full overflow-hidden">
        <img src={loan.image} alt={loan.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 pt-28 sm:pt-32 pb-12 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
            <div className="mb-auto">
              <button onClick={onBack} className="inline-flex items-center gap-2 text-white bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full hover:bg-white/20 transition-all group">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
                <span className="text-sm sm:text-base font-bold">{t('loan_detail.back')}</span>
              </button>
            </div>
            
            <div className="space-y-4 sm:space-y-8">
              <h1 className="text-4xl sm:text-8xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">{loan.title}</h1>
              <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 text-white font-black text-lg sm:text-2xl">
                {FIXED_RATE}% <span className="text-xs sm:text-sm uppercase tracking-widest opacity-80 font-bold">{t('loan_detail.fixed')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-24 relative z-10 space-y-16 sm:space-y-24">
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Bloc CTA */}
            <div className="bg-white rounded-[2rem] p-6 border border-emerald-100 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <div className="flex items-center gap-4 z-10">
                   <div className="bg-emerald-50 p-4 rounded-2xl">
                      <FileCheck className="w-8 h-8 text-emerald-600" />
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-gray-900">{t('loan_detail.interested_title')}</h3>
                      <p className="text-sm text-gray-500 font-medium">{t('loan_detail.interested_subtitle')}</p>
                   </div>
                </div>
                <button 
                  onClick={onApply}
                  className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 z-10"
                >
                  {t('calculator.cta')} <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* Avantages */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl border border-gray-100 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">{t('loan_detail.advantages')}</h2>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">{loan.description}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 sm:p-6 rounded-2xl border border-emerald-100">
                  <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">{t('loan_detail.labels.maxAmount')}</p>
                  <p className="text-2xl sm:text-3xl font-black text-teal-950">{loan.maxAmount.toLocaleString()} €</p>
                </div>
                <div className="bg-teal-50 p-4 sm:p-6 rounded-2xl border border-teal-100">
                  <p className="text-[10px] font-black text-teal-600 uppercase mb-1">{t('loan_detail.labels.maxDuration')}</p>
                  <p className="text-2xl sm:text-3xl font-black text-teal-950">{loan.maxDuration} {t('calculator.months')}</p>
                </div>
              </div>
            </div>

            {/* NOUVELLE SECTION : Définition & Caractéristiques */}
            {loan.definition && (
              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10"></div>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-2xl text-blue-600 shrink-0">
                      <Info className="w-6 h-6" />
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                        {loan.definition.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed font-medium text-lg">
                        {loan.definition.text}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-3xl p-6 sm:p-8">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <List className="w-4 h-4" /> Caractéristiques clés
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
                      {loan.definition.characteristics.map((char, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                          <span className="font-bold text-gray-500">{char.label}</span>
                          <span className="font-black text-gray-900 flex items-center gap-2">
                            {char.value === '2% Fixe' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                            {char.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
          <div className="sticky top-32">
            <LoanCalculator language={language} onApply={onApply} />
          </div>
        </div>

        <section className="bg-white rounded-[3rem] sm:rounded-[5rem] p-8 sm:p-24 shadow-2xl border border-gray-50">
          <div className="grid lg:grid-cols-2 gap-16 sm:gap-24 items-center">
            <div className="relative rounded-[3rem] sm:rounded-[4rem] overflow-hidden shadow-2xl h-[400px] sm:h-[600px]">
              <img src="https://i.postimg.cc/tJfXY3ZJ/pexels-fauxels-3183197.jpg" className="w-full h-full object-cover" />
              <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-md p-6 rounded-[2.5rem] shadow-2xl flex items-center gap-4">
                <div className="bg-emerald-600 p-3 rounded-2xl text-white"><Zap className="w-6 h-6" /></div>
                <p className="text-sm sm:text-lg font-black text-gray-900">Support 24/7 Europfy</p>
              </div>
            </div>
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase">
                  <HeartHandshake className="w-4 h-4" /> {t('loan_detail.best_offer')}
                </div>
                <h2 className="text-4xl sm:text-7xl font-black text-gray-900">{t('loan_detail.why_title')}</h2>
                <p className="text-lg sm:text-2xl text-gray-500">{t('loan_detail.why_subtitle')}</p>
              </div>
              <div className="grid gap-8">
                {whyProps.map((prop: any, i: number) => {
                  const Icon = whyIcons[i] || ShieldCheck;
                  return (
                    <div key={i} className="flex gap-6">
                      <div className="bg-emerald-50 w-14 h-14 rounded-3xl flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="text-xl sm:text-2xl font-black text-gray-900">{prop.title}</h4>
                        <p className="text-sm sm:text-lg text-gray-500">{prop.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-7xl font-black text-gray-900">{t('loan_detail.journey_title')}</h2>
            <p className="text-lg sm:text-2xl text-gray-500">{t('loan_detail.journey_subtitle')}</p>
          </div>
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {journeySteps.map((step: any, i: number) => (
              <React.Fragment key={i}>
                <div className="w-full bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-xl flex items-center gap-10">
                  <div className="bg-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-2xl">{i + 1}</div>
                  <div>
                    <h4 className="text-xl sm:text-3xl font-black text-gray-900">{step.t}</h4>
                    <p className="text-sm sm:text-xl text-gray-500">{step.d}</p>
                  </div>
                </div>
                {i < journeySteps.length - 1 && <div className="py-6"><ArrowDown className="w-6 h-6 text-emerald-600 animate-bounce" /></div>}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Les avis seront maintenant affichés si customReviews contient des données */}
        <ReviewsSection language={language} customReviews={loan.specificTestimonials} />
        <FaqSection language={language} customFaqs={loan.specificFaqs} />
      </div>
    </div>
  );
};

export default LoanDetail;
