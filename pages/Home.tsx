
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
    <div className="space-y-6 sm:space-y-24 pb-20 overflow-x-hidden">
      <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center pt-24 sm:pt-32 overflow-hidden bg-white">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-[120px] -z-0"></div>
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] -z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Content Column */}
            <div className="space-y-6 sm:space-y-10 order-1">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {t.badge}
              </div>
              
              <div className="min-h-[100px] sm:min-h-[220px]">
                <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight">
                  {displayedText}
                  <span className="inline-block w-1.5 h-8 sm:h-16 bg-emerald-500 ml-1 animate-pulse"></span>
                </h1>
              </div>

              <p className="text-base sm:text-2xl text-gray-600 leading-relaxed max-w-xl font-medium">
                {t.p}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={() => onNavigate('loan-application')} className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-100 flex items-center justify-center gap-3 hover:scale-105 active:scale-95">
                  {t.cta1} <ChevronRight className="w-6 h-6" />
                </button>
                <button onClick={() => onNavigate('simulator')} className="bg-gray-50 text-gray-900 border border-gray-200 px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-95">
                  <TrendingUp className="w-6 h-6 text-emerald-600" /> Simulateur
                </button>
              </div>

              {/* Stats Section (Moved above carousel on mobile via natural flow) */}
              <div className="flex items-center gap-6 pt-8 border-t border-gray-100">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform cursor-pointer" alt="User" />
                  ))}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black text-gray-900">4.9/5 satisfaction</p>
                    <div className="flex text-yellow-400"><Star className="w-3 h-3 fill-yellow-400" /></div>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{t.reviews}</p>
                </div>
              </div>
            </div>

            {/* Right Enhanced Carousel Column */}
            <div className="relative order-2 group mt-8 lg:mt-0">
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-100/30 to-blue-100/30 rounded-[3rem] sm:rounded-[5rem] blur-2xl -z-10 group-hover:scale-110 transition-transform duration-1000"></div>

              {/* aspect-[16/10] on mobile for medium height, aspect-[4/5] on desktop */}
              <div className="relative aspect-[16/10] sm:aspect-square lg:aspect-[4/5] rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.18)] border border-gray-100 bg-white">
                
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100/20 z-30">
                  <div className="h-full bg-emerald-500 transition-all duration-50 ease-linear" style={{ width: `${progress}%` }} />
                </div>

                {carouselImages.map((img, idx) => (
                  <div key={idx} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                    <img src={img.url} className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${idx === currentSlide ? 'scale-110' : 'scale-100'}`} alt={img.label} />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/10 to-transparent"></div>
                    
                    <div className={`absolute bottom-6 sm:bottom-12 left-6 sm:left-8 transition-all duration-700 delay-300 transform ${idx === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 sm:px-6 py-2 sm:py-4 rounded-2xl sm:rounded-3xl text-white shadow-2xl">
                        <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
                          {img.icon}
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{img.badge}</span>
                        </div>
                        <p className="text-base sm:text-xl font-black">{img.info}</p>
                      </div>
                    </div>

                    <div className={`absolute top-6 sm:top-10 left-6 sm:left-8 transition-all duration-700 delay-100 transform ${idx === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                       <div className="bg-emerald-600 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-white font-black text-[10px] sm:text-sm uppercase tracking-[0.2em] shadow-lg">
                          {img.label}
                       </div>
                    </div>
                  </div>
                ))}

                <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 flex flex-col gap-2 sm:gap-3 z-30">
                  {carouselImages.map((_, idx) => (
                    <button key={idx} onClick={() => goToSlide(idx)} className="group relative flex items-center justify-end transition-all duration-300">
                      <span className={`mr-2 sm:mr-3 text-[8px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${idx === currentSlide ? 'text-white opacity-100 translate-x-0' : 'text-white/0 opacity-0 translate-x-4'}`}>
                        0{idx + 1}
                      </span>
                      <div className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentSlide ? 'w-6 sm:w-10 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)]' : 'w-1.5 bg-white/40 group-hover:bg-white/60'}`} />
                    </button>
                  ))}
                </div>

                <div className="absolute inset-x-4 sm:inset-x-8 bottom-6 sm:bottom-8 flex gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-40">
                  <button onClick={() => goToSlide((currentSlide - 1 + carouselImages.length) % carouselImages.length)} className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white hover:text-emerald-600 transition-all active:scale-90">
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button onClick={() => goToSlide((currentSlide + 1) % carouselImages.length)} className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white hover:text-emerald-600 transition-all active:scale-90">
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 bg-white p-5 rounded-[2rem] shadow-2xl border border-gray-100 animate-float hidden lg:block">
                 <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-xl"><ShieldCheck className="w-5 h-5 text-emerald-600" /></div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Garantie</p>
                       <p className="text-xs font-black text-gray-900">100% Sécurisé</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="loans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-2rem] sm:mt-[-5vh] relative z-20">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16 space-y-1 sm:space-y-4">
          <h2 className="text-xl sm:text-5xl font-black text-gray-900 leading-tight">{tl.h2}</h2>
          <p className="text-xs sm:text-xl text-gray-600">{tl.p}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8">
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

      {/* Reste des sections inchangé */}
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
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-2xl shadow-sm">
                   <div className="bg-emerald-100 p-2 sm:p-2.5 rounded-xl">
                      <Zap className="w-5 h-5 sm:w-6 h-6 text-emerald-600" />
                   </div>
                   <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">Réponse de principe immédiate</p>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">Recevez un premier avis dès la fin de votre simulation.</p>
                   </div>
                </div>
              </div>
            </div>
            <div className="relative z-20">
              <div className="absolute -inset-4 bg-emerald-600/5 rounded-[4rem] blur-2xl -z-10"></div>
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
            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-xl text-gray-600 leading-relaxed font-medium">
                {tq.p1}
              </p>
            </div>
            <div className="pt-2">
              <button onClick={() => onNavigate('about')} className="group flex items-center gap-3 sm:gap-4 text-emerald-600 font-black text-lg sm:text-xl hover:translate-x-2 transition-transform">
                {tq.btn}
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
          <div className="relative group">
            <div className="relative rounded-3xl sm:rounded-[3rem] overflow-hidden shadow-2xl h-[300px] sm:h-[500px]">
              <img src="https://images.unsplash.com/photo-1600880212340-02d956381b90?auto=format&fit=crop&q=80&w=1200" alt="Equipe" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-24">
        <ReviewsSection language={language} />
        <TrustWidgets language={language} />
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
      
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
