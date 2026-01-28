
import React, { useState, useEffect, useMemo } from 'react';
import { getLoansData, TESTIMONIALS } from '../constants';
import LoanCard from '../components/LoanCard';
import LoanCalculator from '../components/LoanCalculator';
import TrustWidgets from '../components/TrustWidgets';
import FaqSection from '../components/FaqSection';
import ReviewsSection from '../components/ReviewsSection';
import PartnersSection from '../components/PartnersSection';
import { RateComparison, StepByStep, SecurityBanner } from '../components/PromotionWidgets';
import { ChevronRight, Play, Star, ShieldCheck, Zap, Landmark, CheckCircle2, Users2, Sparkles, TrendingUp, Shield } from 'lucide-react';
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
  const tw = translations[language].why_choose_us;
  const tq = translations[language].who_we_are;

  const phrases = useMemo(() => {
    return t.h1_variants || [t.h1];
  }, [language, t.h1, t.h1_variants]);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    setPhraseIndex(0);
    setDisplayedText('');
    setIsDeleting(false);
  }, [language]);

  useEffect(() => {
    const currentFullText = phrases[phraseIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        setTypingSpeed(100);
        
        if (displayedText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        setTypingSpeed(50);
        
        if (displayedText === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, phrases, typingSpeed]);

  return (
    <div className="space-y-12 sm:space-y-24 pb-20">
      {/* Hero Section */}
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
              
              <div className="min-h-[160px] sm:min-h-[200px] lg:min-h-[280px]">
                <h1 className="text-4xl lg:text-7xl font-black text-gray-900 leading-tight">
                  {displayedText}
                  <span className="inline-block w-1 h-10 lg:h-16 bg-blue-600 ml-1 animate-pulse"></span>
                </h1>
              </div>

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
      <section id="loans" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-40 -z-10 pointer-events-none"></div>
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20 space-y-4 relative">
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 relative z-10">{tl.h2}</h2>
          <p className="text-sm sm:text-xl text-gray-600 relative z-10">{tl.p}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {getLoansData(language).map((loan) => (
            <LoanCard key={loan.id} loan={loan} onClick={() => onSelectLoan(loan.id)} language={language} />
          ))}
          <div className="hidden lg:flex bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2.5rem] p-10 flex-col justify-center items-center text-center text-white shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-1000">
               <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                 <path d="M0 0 L100 0 L100 100 Z" />
               </svg>
            </div>
            <Sparkles className="w-16 h-16 mb-6 text-yellow-300 animate-pulse" />
            <h3 className="text-2xl font-black mb-4">{tl.advice_title}</h3>
            <p className="text-blue-100 font-medium mb-8">{tl.advice_p}</p>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-black hover:bg-blue-50 transition-all shadow-lg"
            >
              {tl.advice_btn}
            </button>
          </div>
        </div>
      </section>

      {/* Qui sommes-nous Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 bg-white rounded-[3rem] shadow-sm">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-black tracking-widest uppercase">
              <Users2 className="w-4 h-4" />
              {tq.title}
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight">
              {tq.subtitle}
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-gray-600 leading-relaxed">
                {tq.p1}
              </p>
              <p className="text-lg text-gray-500 leading-relaxed font-medium">
                {tq.p2}
              </p>
            </div>
            <div className="pt-4">
              <button 
                onClick={() => onNavigate('about')}
                className="group flex items-center gap-4 text-blue-600 font-black text-xl hover:gap-6 transition-all"
              >
                {tq.btn}
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/5 rounded-[4rem] group-hover:bg-blue-600/10 transition-colors"></div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1600880212340-02d956381b90?auto=format&fit=crop&q=80&w=1200" 
                alt="Notre équipe" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              <div className="absolute bottom-10 left-10 flex gap-4">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl">
                  <p className="text-2xl font-black text-blue-600">15+</p>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{translations[language].about_page.stats.years.split(' ')[0]}</p>
                </div>
                <div className="bg-blue-600/90 backdrop-blur-md p-4 rounded-2xl shadow-xl">
                  <p className="text-2xl font-black text-white">50k</p>
                  <p className="text-xs font-bold text-blue-100 uppercase tracking-widest">{translations[language].stats.clients.split(' ')[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none -z-10">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1"/>
                 </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[400px] lg:h-[600px] group">
            <img 
              src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1200" 
              alt="Satisfaction" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 p-3 rounded-xl">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-white font-black text-lg">{translations[language].about_page.stats.years}</p>
                  <p className="text-blue-100 text-sm font-medium">{translations[language].security.orias}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10 relative">
            <div className="absolute -top-10 -right-20 w-64 h-64 bg-blue-100/50 rounded-full blur-[80px] -z-10"></div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
                {tw.title}
              </h2>
              <p className="text-xl text-gray-600 font-medium leading-relaxed">
                {tw.subtitle}
              </p>
            </div>

            <div className="grid gap-8">
              {tw.items.map((item: any, i: number) => (
                <div key={i} className="flex gap-6 group">
                  <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-all duration-300 relative shadow-sm">
                    <CheckCircle2 className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={() => onNavigate('about')}
                className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-xl flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                {tq.btn}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
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

      {/* Final CTA Section: PRÊT À RÉALISER VOS PROJETS ? */}
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
