
import React, { useState, useEffect, useMemo } from 'react';
import { getLoansData, TESTIMONIALS } from '../constants';
import LoanCard from '../components/LoanCard';
import LoanCalculator from '../components/LoanCalculator';
import TrustWidgets from '../components/TrustWidgets';
import FaqSection from '../components/FaqSection';
import ReviewsSection from '../components/ReviewsSection';
import PartnersSection from '../components/PartnersSection';
import { RateComparison, StepByStep, SecurityBanner } from '../components/PromotionWidgets';
import { ChevronRight, Star, Zap, CheckCircle2, Users2, Sparkles, TrendingUp, ChevronLeft, ShieldCheck, Clock, Wallet } from 'lucide-react';
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

  const carouselImages = [
    { 
      url: 'https://i.postimg.cc/wM0BTvww/side-view-man-working-as-real-estate-agent.jpg', 
      label: 'Immobilier', 
      badge: 'Projet Maison',
      info: 'Taux 2% fixe',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />
    },
    { 
      url: 'https://i.postimg.cc/LX4K4Vww/young-family-choosing-car-car-showroom.jpg', 
      label: 'Automobile',
      badge: 'Mobilité',
      info: 'Réponse 24h',
      icon: <Zap className="w-4 h-4 text-yellow-500" />
    },
    { 
      url: 'https://i.postimg.cc/GhFrb9SK/pexels-mizunokozuki-12912114.jpg', 
      label: 'Personnel',
      badge: 'Liberté',
      info: 'Sans justificatif',
      icon: <Wallet className="w-4 h-4 text-blue-500" />
    },
    { 
      url: 'https://i.postimg.cc/g0NtsbtD/pexels-vlada-karpovich-7433905.jpg', 
      label: 'Entreprise',
      badge: 'Croissance',
      info: 'Jusqu\'à 5M€',
      icon: <TrendingUp className="w-4 h-4 text-purple-500" />
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const slideDuration = 6000;
    const interval = 50;
    const step = (interval / slideDuration) * 100;
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentSlide(curr => (curr + 1) % carouselImages.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setProgress(0);
  };

  const phrases = useMemo(() => t.h1_variants || [t.h1], [t.h1, t.h1_variants]);
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
    <div className="space-y-12 sm:space-y-24 pb-20 overflow-x-hidden">
      {/* Hero Section Mobile-First Adaptation - Height reduced to 55vh */}
      <section className="relative h-[55vh] sm:h-[90vh] min-h-[480px] flex items-center overflow-hidden bg-gray-900">
        {/* Carrousel as Background */}
        <div className="absolute inset-0 z-0">
          {carouselImages.map((img, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
              {/* No scale (zoom) on mobile */}
              <img src={img.url} className="w-full h-full object-cover object-center scale-100" alt={img.label} />
              {/* Balanced overlays for mobile clarity */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/5 to-black/70"></div>
            </div>
          ))}
        </div>

        {/* Floating progress bar top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 z-30 opacity-70">
           <div className="h-full bg-emerald-500 transition-all duration-50 ease-linear" style={{ width: `${progress}%` }} />
        </div>

        {/* Content Overlay - Centered and compact */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            
            <div className="space-y-4 sm:space-y-10 text-center lg:text-left pt-16 sm:pt-12">
              <div className="inline-flex items-center gap-2 bg-emerald-500/30 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-widest border border-white/20 shadow-lg mx-auto lg:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {t.badge}
              </div>
              
              <div className="min-h-[100px] sm:min-h-[220px]">
                <h1 className="text-2xl sm:text-6xl lg:text-7xl font-black text-white leading-tight sm:leading-[1.1] tracking-tight drop-shadow-2xl">
                  {displayedText}
                  <span className="inline-block w-1 h-6 sm:w-1.5 sm:h-16 bg-emerald-500 ml-1 animate-pulse"></span>
                </h1>
              </div>

              <p className="hidden md:block text-base sm:text-2xl text-gray-200 leading-relaxed max-w-xl font-medium mx-auto lg:mx-0">
                {t.p}
              </p>
              
              <div className="flex flex-row gap-2 pt-2 justify-center lg:justify-start max-w-xs sm:max-w-none mx-auto sm:mx-0">
                <button onClick={() => onNavigate('loan-application')} className="bg-emerald-600 text-white px-5 py-3.5 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-lg hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-900/40 flex items-center justify-center gap-2 active:scale-95">
                  {t.cta1} <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </button>
                <button onClick={() => onNavigate('simulator')} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-5 py-3.5 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all active:scale-95">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-emerald-400" /> {language === 'fr' ? 'Simu' : 'Sim'}
                </button>
              </div>
            </div>

            {/* Desktop only sidebar */}
            <div className="hidden lg:flex flex-col gap-6 items-end">
               <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] text-white w-full max-w-sm space-y-6 shadow-2xl">
                  <div className="flex items-center gap-4">
                     <div className="bg-emerald-500/20 p-3 rounded-2xl"><ShieldCheck className="w-6 h-6 text-emerald-400" /></div>
                     <div>
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Sécurité</p>
                        <p className="text-lg font-black">100% Garanti</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="bg-blue-500/20 p-3 rounded-2xl"><Clock className="w-6 h-6 text-blue-400" /></div>
                     <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Rapidité</p>
                        <p className="text-lg font-black">Fonds en 48h</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Indicators for mobile visibility */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30 lg:hidden">
           {carouselImages.map((_, idx) => (
             <button key={idx} onClick={() => goToSlide(idx)} className={`h-1 transition-all duration-500 rounded-full ${idx === currentSlide ? 'w-8 bg-emerald-500' : 'w-1.5 bg-white/40'}`} />
           ))}
        </div>
      </section>

      {/* Main Content Start */}
      <section id="loans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-3.5rem] sm:mt-[-5vh] relative z-20">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-2 sm:space-y-4">
          <h2 className="text-xl sm:text-5xl font-black text-gray-900 leading-tight">{tl.h2}</h2>
          <p className="text-xs sm:text-xl text-gray-600">{tl.p}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {getLoansData(language).map((loan) => (
            <LoanCard key={loan.id} loan={loan} onClick={() => onSelectLoan(loan.id)} language={language} />
          ))}
          <div className="hidden lg:flex bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2.5rem] p-10 flex-col justify-center items-center text-center text-white shadow-xl relative overflow-hidden group">
            <Sparkles className="w-16 h-16 mb-6 text-yellow-300 animate-pulse" />
            <h3 className="text-2xl font-black mb-4">{tl.advice_title}</h3>
            <p className="text-emerald-100 font-medium mb-8">{tl.advice_p}</p>
            <button onClick={() => onNavigate('contact')} className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-black hover:bg-emerald-50 transition-all hover:scale-105">
              {tl.advice_btn}
            </button>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain unchanged */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] sm:rounded-[4rem] p-6 sm:p-20 shadow-xl border border-gray-100">
           <TrustWidgets language={language} />
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="bg-emerald-50 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-16 border border-emerald-100 shadow-sm overflow-hidden relative group">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 sm:space-y-4">
                <h2 className="text-2xl sm:text-5xl font-black text-gray-900 leading-tight">
                  {translations[language].calculator.title}
                </h2>
                <p className="text-base sm:text-xl text-gray-600 font-medium leading-relaxed">
                  {translations[language].calculator.subtitle}
                </p>
              </div>
              <div className="grid gap-3 sm:gap-6">
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-2xl shadow-sm">
                   <div className="bg-emerald-100 p-2 sm:p-2.5 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 h-6 text-emerald-600" />
                   </div>
                   <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">100% Sans engagement</p>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">Testez différents scénarios sans frais.</p>
                   </div>
                </div>
              </div>
            </div>
            <div className="relative z-20">
              <LoanCalculator language={language} onApply={() => onNavigate('loan-application')} />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-24 bg-white rounded-[2rem] sm:rounded-[3rem] shadow-sm overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-[10px] sm:text-sm font-black uppercase tracking-widest">
              <Users2 className="w-4 h-4" />
              {tq.title}
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              {tq.subtitle}
            </h2>
            <div className="pt-2">
              <button onClick={() => onNavigate('about')} className="group flex items-center gap-3 sm:gap-4 text-emerald-600 font-black text-lg sm:text-xl hover:translate-x-2 transition-transform">
                {tq.btn}
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
          <div className="relative group h-[300px] sm:h-[500px]">
              <img src="https://images.unsplash.com/photo-1600880212340-02d956381b90?auto=format&fit=crop&q=80&w=1200" alt="Equipe" className="w-full h-full object-cover rounded-3xl" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-24">
        <ReviewsSection language={language} />
        <PartnersSection language={language} />
        <RateComparison language={language} />
      </div>

      <SecurityBanner language={language} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mb-2 sm:mb-4">{tp.h2}</h2>
          <p className="text-sm sm:text-xl text-gray-600">{tp.p}</p>
        </div>
        <StepByStep language={language} />
      </section>

      <FaqSection language={language} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-24 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-10">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight">{tc.h2}</h2>
            <p className="text-sm sm:text-xl text-emerald-100 font-medium">{tc.p}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-4">
              <button onClick={() => onNavigate('loan-application')} className="bg-white text-teal-900 px-8 py-4 sm:py-6 rounded-2xl font-black text-lg sm:text-xl shadow-xl hover:scale-105 transition-transform">
                {tc.btn1}
              </button>
              <button onClick={() => onNavigate('contact')} className="bg-emerald-500/30 backdrop-blur-md border border-white/30 px-8 py-4 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl hover:bg-white/20 transition-all">
                {tc.btn2}
              </button>
            </div>
            <p className="text-emerald-200 text-[10px] sm:text-xs pt-4">{tc.warning}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
