
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

const STORY_DURATION = 5000; // 5 secondes par story

const Home: React.FC<HomeProps> = ({ onSelectLoan, onNavigate, language }) => {
  const t = translations[language].hero;
  const tl = translations[language].loans_section;
  const tp = translations[language].process;
  const tc = translations[language].cta_footer;
  const tw = translations[language].why_choose_us;
  const tq = translations[language].who_we_are;

  // --- Story Carousel Logic ---
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

  // --- Typing Animation Logic ---
  const phrases = useMemo(() => {
    return t.h1_variants || [t.h1];
  }, [t.h1, t.h1_variants]);

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
    <div className="space-y-8 sm:space-y-24 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                {t.badge}
              </div>
              
              <div className="min-h-[100px] sm:min-h-[160px] lg:min-h-[220px]">
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1]">
                  {displayedText}
                  <span className="inline-block w-1 h-8 sm:h-12 lg:h-16 bg-emerald-600 ml-1 animate-pulse"></span>
                </h1>
              </div>

              <p className="text-sm sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl font-medium">{t.p}</p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button onClick={() => onNavigate('loan-application')} className="bg-emerald-600 text-white px-8 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg hover:bg-emerald-700 transition-all shadow-xl flex items-center justify-center gap-2">
                  {t.cta1} <ChevronRight className="w-5 h-5" />
                </button>
                <button onClick={() => onNavigate('simulator')} className="bg-white text-gray-900 px-8 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <TrendingUp className="w-5 h-5 text-emerald-600" /> Simulateur
                </button>
              </div>
              
              <div className="flex items-center gap-4 sm:gap-6 pt-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => <img key={i} src={`https://picsum.photos/id/${i+40}/50/50`} className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover" alt="User" />)}
                </div>
                <div>
                  <div className="flex text-yellow-400">{[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 sm:w-5 sm:h-5 fill-yellow-400" />)}</div>
                  <p className="text-[10px] sm:text-sm font-bold text-gray-900">{t.reviews}</p>
                </div>
              </div>
            </div>
            
            {/* WhatsApp Style Story Carousel */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 bg-emerald-100/30 rounded-[4rem] blur-3xl -z-10 animate-pulse"></div>
              <div className="relative bg-white p-2 rounded-[3.5rem] shadow-2xl border border-gray-100 group">
                <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden bg-gray-900">
                  
                  {/* Progress Bars */}
                  <div className="absolute top-4 left-4 right-4 z-30 flex gap-2">
                    {stories.map((_, i) => (
                      <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white transition-all duration-100 ease-linear"
                          style={{ 
                            width: i === activeStory ? `${progress}%` : i < activeStory ? '100%' : '0%' 
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>

                  {/* Images */}
                  {stories.map((story, i) => (
                    <div 
                      key={story.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === activeStory ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                      <img 
                        src={story.img} 
                        alt={story.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                      
                      <div className="absolute bottom-10 left-8 right-8 text-white space-y-2">
                        <span className="bg-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                          Offre Spéciale
                        </span>
                        <h3 className="text-3xl font-black">{story.title}</h3>
                        <p className="text-emerald-100 text-sm font-medium opacity-90">Taux fixe de 2% garanti par contrat.</p>
                      </div>
                    </div>
                  ))}

                  {/* Navigation Regions (Invisible) */}
                  <div className="absolute inset-0 z-20 flex">
                    <div className="flex-1 cursor-pointer" onClick={prevStory}></div>
                    <div className="flex-1 cursor-pointer" onClick={nextStory}></div>
                  </div>

                  {/* Visible Nav Buttons (Appear on Hover) */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevStory(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextStory(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Floating Stats Badge */}
                <div className="absolute -bottom-6 -right-6 bg-teal-900 text-white p-6 rounded-3xl shadow-2xl space-y-1 animate-in slide-in-from-right duration-700">
                  <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Taux de validation</p>
                  <p className="text-3xl font-black">98.4%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section - Ultra-Compact on mobile */}
      <section id="loans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-20 space-y-1 sm:space-y-4">
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

      {/* Loan Calculator Section */}
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

      {/* Qui sommes-nous Section */}
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

      {/* Pourquoi nous choisir Section */}
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

      {/* Widgets Grid */}
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

      {/* Final CTA */}
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
