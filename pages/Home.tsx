
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getLoansData, TESTIMONIALS } from '../constants';
import LoanCard from '../components/LoanCard';
import LoanCalculator from '../components/LoanCalculator';
import TrustWidgets from '../components/TrustWidgets';
import FaqSection from '../components/FaqSection';
import ReviewsSection from '../components/ReviewsSection';
import PartnersSection from '../components/PartnersSection';
import { RateComparison, StepByStep, SecurityBanner } from '../components/PromotionWidgets';
import { ChevronRight, Play, Star, ShieldCheck, Zap, Landmark, CheckCircle2, Users2, Sparkles, TrendingUp, Shield, ChevronLeft } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HomeProps {
  onSelectLoan: (loanId: string) => void;
  onNavigate: (page: string) => void;
  language: Language;
}

const STORY_DURATION = 5000;

const Home: React.FC<HomeProps> = ({ onSelectLoan, onNavigate, language }) => {
  const t = translations[language].hero;
  const tl = translations[language].loans_section;
  const tp = translations[language].process;
  const tc = translations[language].cta_footer;
  const tw = translations[language].why_choose_us;
  const tq = translations[language].who_we_are;

  const stories = useMemo(() => [
    { id: 'personnel', title: translations[language].nav.loans + ' Personnel', img: 'https://i.postimg.cc/GhFrb9SK/pexels-mizunokozuki-12912114.jpg' },
    { id: 'immobilier', title: translations[language].nav.loans + ' Immobilier', img: 'https://i.postimg.cc/wM0BTvww/side-view-man-working-as-real-estate-agent.jpg' },
    { id: 'automobile', title: translations[language].nav.loans + ' Automobile', img: 'https://i.postimg.cc/LX4K4Vww/young-family-choosing-car-car-showroom.jpg' },
    { id: 'entreprise', title: translations[language].nav.loans + ' Entreprise', img: 'https://i.postimg.cc/g0NtsbtD/pexels-vlada-karpovich-7433905.jpg' },
    { id: 'rachat', title: 'Rachat de Crédit', img: 'https://i.postimg.cc/fywxrV3X/pexels-rdne-7414047.jpg' }
  ], [language]);

  const [activeStory, setActiveStory] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextStory = useCallback(() => {
    setActiveStory((prev) => (prev + 1) % stories.length);
    setProgress(0);
  }, [stories.length]);

  const prevStory = useCallback(() => {
    setActiveStory((prev) => (prev - 1 + stories.length) % stories.length);
    setProgress(0);
  }, [stories.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextStory();
          return 0;
        }
        return prev + (100 / (STORY_DURATION / 100));
      });
    }, 100);
    return () => clearInterval(interval);
  }, [nextStory]);

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
      {/* Dynamic Hero Section with Background Photo */}
      <section className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center pt-20 overflow-hidden bg-gray-900">
        {/* Background Images with Fade Effect */}
        {stories.map((story, i) => (
          <div 
            key={story.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === activeStory ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={story.img} 
              alt={story.title} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Overlay Darkner */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/50 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Progress Bars (Story style) */}
        <div className="absolute top-24 left-4 right-4 z-30 flex gap-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {stories.map((_, i) => (
            <div key={i} className="h-0.5 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-400 transition-all duration-100 ease-linear"
                style={{ 
                  width: i === activeStory ? `${progress}%` : i < activeStory ? '100%' : '0%' 
                }}
              ></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="max-w-2xl space-y-6 sm:space-y-10">
            <div className="inline-flex items-center gap-2 bg-emerald-600/30 backdrop-blur-md text-emerald-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {t.badge}
            </div>
            
            <div className="min-h-[100px] sm:min-h-[220px]">
              <h1 className="text-3xl sm:text-7xl font-black text-white leading-[1.05] tracking-tight">
                {displayedText}
                <span className="inline-block w-1.5 h-8 sm:h-16 bg-emerald-500 ml-1 animate-pulse"></span>
              </h1>
            </div>

            <p className="text-base sm:text-2xl text-gray-200 leading-relaxed max-w-xl font-medium drop-shadow-md">
              {t.p}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => onNavigate('loan-application')} 
                className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-2xl flex items-center justify-center gap-3 hover:scale-105"
              >
                {t.cta1} <ChevronRight className="w-6 h-6" />
              </button>
              <button 
                onClick={() => onNavigate('simulator')} 
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
              >
                <TrendingUp className="w-6 h-6 text-emerald-400" /> Simulateur
              </button>
            </div>
          </div>
        </div>

        {/* Floating Stat Widget in Hero */}
        <div className="hidden lg:block absolute bottom-12 right-12 z-20">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl space-y-2 animate-in slide-in-from-right duration-1000">
             <p className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em]">Satisfaction Client</p>
             <div className="flex items-end gap-3">
                <span className="text-5xl font-black text-white">4.9/5</span>
                <div className="flex text-emerald-400 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-emerald-400" />)}
                </div>
             </div>
             <p className="text-sm text-gray-300 font-medium">Basé sur plus de 10,000 avis certifiés.</p>
          </div>
        </div>
      </section>

      {/* Solutions Section - Positioned to be visible immediately after Hero */}
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
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-black hover:bg-emerald-50 transition-all"
            >
              {tl.advice_btn}
            </button>
          </div>
        </div>
      </section>

      {/* Other Sections ... */}
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
            
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-600/5 rounded-[4rem] blur-2xl"></div>
              <LoanCalculator language={language} onApply={() => onNavigate('loan-application')} />
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the home page sections... */}
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
              <button 
                onClick={() => onNavigate('about')}
                className="group flex items-center gap-3 sm:gap-4 text-emerald-600 font-black text-lg sm:text-xl"
              >
                {tq.btn}
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
          <div className="relative group">
            <div className="relative rounded-3xl sm:rounded-[3rem] overflow-hidden shadow-2xl h-[300px] sm:h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1600880212340-02d956381b90?auto=format&fit=crop&q=80&w=1200" 
                alt="Equipe" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          <div className="relative rounded-3xl sm:rounded-[3rem] overflow-hidden shadow-2xl h-[300px] sm:h-[600px] group order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1200" 
              alt="Satisfaction" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-8 sm:space-y-10 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                {tw.title}
              </h2>
              <p className="text-sm sm:text-xl text-gray-600 font-medium">
                {tw.subtitle}
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8">
              {tw.items.map((item: any, i: number) => (
                <div key={i} className="flex gap-4 sm:gap-6 group">
                  <div className="bg-emerald-50 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-black text-gray-900">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
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
              <button onClick={() => onNavigate('loan-application')} className="bg-white text-teal-900 px-8 py-4 sm:py-6 rounded-2xl font-black text-lg sm:text-xl shadow-xl">
                {tc.btn1}
              </button>
              <button onClick={() => onNavigate('contact')} className="bg-emerald-500/30 backdrop-blur-md border border-white/30 px-8 py-4 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl">
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
