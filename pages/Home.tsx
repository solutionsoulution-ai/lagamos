
import React, { useState, useEffect, useMemo } from 'react';
import { getLoansData, TESTIMONIALS } from '../constants';
import LoanCard from '../components/LoanCard';
import LoanCalculator from '../components/LoanCalculator';
import TrustWidgets from '../components/TrustWidgets';
import FaqSection from '../components/FaqSection';
import ReviewsSection from '../components/ReviewsSection';
import PartnersSection from '../components/PartnersSection';
import { RateComparison, StepByStep, SecurityBanner } from '../components/PromotionWidgets';
import { ChevronRight, Star, Zap, CheckCircle2, Users2, Sparkles, TrendingUp, ChevronLeft, ShieldCheck, Clock, Wallet, Shield } from 'lucide-react';
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
    { url: 'https://i.postimg.cc/wM0BTvww/side-view-man-working-as-real-estate-agent.jpg' },
    { url: 'https://i.postimg.cc/LX4K4Vww/young-family-choosing-car-car-showroom.jpg' },
    { url: 'https://i.postimg.cc/GhFrb9SK/pexels-mizunokozuki-12912114.jpg' },
    { url: 'https://i.postimg.cc/g0NtsbtD/pexels-vlada-karpovich-7433905.jpg' }
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

  const phrases = useMemo(() => t.h1_variants || [t.h1], [t.h1, t.h1_variants]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

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
      {/* Hero Section - Height 60vh, Left Aligned, No Zoom */}
      <section className="relative h-[60vh] sm:h-[90vh] min-h-[520px] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          {carouselImages.map((img, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
              <img src={img.url} className="w-full h-full object-cover object-center scale-100" alt="Finance background" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4 sm:space-y-10 text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/30 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-widest border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {t.badge}
            </div>
            
            <div className="min-h-[80px] sm:min-h-[220px]">
              <h1 className="text-3xl sm:text-6xl lg:text-8xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
                {displayedText}
                <span className="inline-block w-1 h-8 sm:w-2 sm:h-20 bg-emerald-500 ml-1 animate-pulse"></span>
              </h1>
            </div>

            <p className="text-sm sm:text-2xl text-gray-200 leading-relaxed font-medium max-w-xl">
              Financez vos projets avec un taux transparent. Accompagnement sur mesure sans frais cachés.
            </p>
            
            <div className="flex flex-row gap-2 pt-4">
              <button onClick={() => onNavigate('loan-application')} className="bg-emerald-600 text-white px-5 py-3.5 sm:px-10 sm:py-5 rounded-xl font-black text-[10px] sm:text-lg hover:bg-emerald-700 transition-all flex items-center gap-2">
                {t.cta1} <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate('simulator')} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-5 py-3.5 sm:px-10 sm:py-5 rounded-xl font-black text-[10px] sm:text-lg hover:bg-white/20 transition-all">
                {language === 'fr' ? 'Simulateur' : 'Simulator'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Section Prêts (Placée en premier pour chevaucher la Hero) */}
      <section id="loans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-3rem] relative z-20">
        <div className="text-left sm:text-center max-w-3xl sm:mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-4">
          <h2 className="text-2xl sm:text-5xl font-black text-gray-900">{tl.h2}</h2>
          <p className="text-sm sm:text-xl text-gray-600">{tl.p}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {getLoansData(language).map((loan) => (
            <LoanCard key={loan.id} loan={loan} onClick={() => onSelectLoan(loan.id)} language={language} />
          ))}
        </div>
      </section>

      {/* 2. Section Intro & Stats (Maintenant en dessous des prêts) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="bg-white rounded-[2rem] sm:rounded-[4rem] p-8 sm:p-20 shadow-xl border border-gray-100">
           
           {/* INTRODUCTION SECTION BEFORE STATS */}
           <div className="text-left mb-12 sm:mb-20 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
                 <Shield className="w-4 h-4 text-emerald-600" />
                 <span className="text-[10px] sm:text-xs font-black text-emerald-600 uppercase tracking-widest">Preuve de fiabilité</span>
              </div>
              <h2 className="text-3xl sm:text-6xl font-black leading-tight tracking-tight animate-gradient-text">
                Une confiance bâtie sur des résultats concrets.
              </h2>
              <p className="text-sm sm:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
                Rejoignez des milliers d'Européens qui ont déjà optimisé leur avenir financier avec Europfy. Notre solidité financière et notre transparence sont vos meilleures garanties.
              </p>
           </div>
           
           <TrustWidgets language={language} />
        </div>
      </div>

      {/* Le reste des sections suit normalement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-emerald-50 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-16 border border-emerald-100 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900">{translations[language].calculator.title}</h2>
              <p className="text-base sm:text-xl text-gray-600 font-medium">{translations[language].calculator.subtitle}</p>
            </div>
            <LoanCalculator language={language} onApply={() => onNavigate('loan-application')} />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ReviewsSection language={language} />
        <PartnersSection language={language} />
        <RateComparison language={language} />
      </div>

      <SecurityBanner language={language} />
      <FaqSection language={language} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[2.5rem] p-8 sm:p-24 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-6xl font-black leading-tight">{tc.h2}</h2>
            <p className="text-sm sm:text-xl text-emerald-100 font-medium">{tc.p}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button onClick={() => onNavigate('loan-application')} className="bg-white text-teal-900 px-8 py-4 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-transform">
                {tc.btn1}
              </button>
              <button onClick={() => onNavigate('contact')} className="bg-emerald-500/30 backdrop-blur-md border border-white/30 px-8 py-4 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all">
                {tc.btn2}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
