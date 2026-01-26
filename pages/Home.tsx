
import React from 'react';
import { getLoansData, TESTIMONIALS } from '../constants';
import LoanCard from '../components/LoanCard';
import LoanCalculator from '../components/LoanCalculator';
import TrustWidgets from '../components/TrustWidgets';
import FaqSection from '../components/FaqSection';
import ReviewsSection from '../components/ReviewsSection';
import PartnersSection from '../components/PartnersSection';
import { RateComparison, StepByStep, SecurityBanner } from '../components/PromotionWidgets';
import { ChevronRight, Play, Star, ShieldCheck, Zap, Landmark } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HomeProps {
  onSelectLoan: (loanId: string) => void;
  onNavigate: (page: string) => void;
  language: Language;
}

const Home: React.FC<HomeProps> = ({ onSelectLoan, onNavigate, language }) => {
  const t = translations[language].hero;
  const tl = translations[language].loans_section;
  const tp = translations[language].process;
  const tc = translations[language].cta_footer;

  return (
    <div className="space-y-12 sm:space-y-24 pb-20">
      {/* Hero Section (Contains Simulator Express) */}
      <section className="relative pt-24 pb-12 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold border border-blue-100">
                <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-blue-600"></span>
                </span>
                {t.badge}
              </div>
              <h1 className="text-4xl lg:text-7xl font-black text-gray-900 leading-tight">
                {t.h1.split(' ').slice(0, -1).join(' ')} <span className="text-blue-600">{t.h1.split(' ').slice(-1)}</span>
              </h1>
              <p className="text-base sm:text-xl text-gray-600 leading-relaxed max-w-xl">{t.p}</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button onClick={() => onNavigate('loan-application')} className="bg-blue-600 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center gap-2">
                  {t.cta1} <ChevronRight className="w-5 h-5" />
                </button>
                <button className="bg-white text-gray-900 px-8 py-4 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-gray-50 border border-gray-200 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5 text-blue-600 fill-blue-600" /> {t.cta2}
                </button>
              </div>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => <img key={i} src={`https://picsum.photos/id/${i+40}/50/50`} className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-white object-cover" alt="User" />)}
                </div>
                <div>
                  <div className="flex text-yellow-400">{[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 sm:w-5 sm:h-5 fill-yellow-400" />)}</div>
                  <p className="text-[10px] sm:text-sm font-bold text-gray-900">{t.reviews}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <LoanCalculator language={language} onApply={() => onNavigate('loan-application')} />
            </div>
          </div>
        </div>
      </section>

      {/* Nos Solutions Section */}
      <section id="loans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-2 sm:space-y-4">
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900">{tl.h2}</h2>
          <p className="text-sm sm:text-xl text-gray-600">{tl.p}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {getLoansData(language).map((loan) => (
            <LoanCard key={loan.id} loan={loan} onClick={() => onSelectLoan(loan.id)} language={language} />
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReviewsSection language={language} />
      </section>

      {/* Trust Widgets Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrustWidgets language={language} />
      </section>

      {/* Partners Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PartnersSection language={language} />
      </section>

      {/* Rate Comparison Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RateComparison language={language} />
      </section>

      <SecurityBanner language={language} />

      {/* Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 sm:mb-4">{tp.h2}</h2>
          <p className="text-sm sm:text-xl text-gray-600">{tp.p}</p>
        </div>
        <StepByStep language={language} />
      </section>

      {/* Faq Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqSection language={language} />
      </section>

      {/* Final CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl sm:rounded-[3rem] p-8 sm:p-12 lg:p-24 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-10">
            <h2 className="text-3xl lg:text-6xl font-black leading-tight">{tc.h2}</h2>
            <p className="text-base sm:text-xl text-blue-100 font-medium">{tc.p}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <button onClick={() => onNavigate('loan-application')} className="bg-white text-blue-900 px-8 py-4 sm:px-12 sm:py-6 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl hover:scale-105 transition-transform">{tc.btn1}</button>
              <button onClick={() => onNavigate('contact')} className="bg-blue-500/30 backdrop-blur-md border border-white/30 px-8 py-4 sm:px-12 sm:py-6 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl">{tc.btn2}</button>
            </div>
            <p className="text-blue-200 text-[10px] sm:text-sm">{tc.warning}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
