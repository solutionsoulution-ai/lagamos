
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import LoanCard from '../components/LoanCard';
import LoanCalculator from '../components/LoanCalculator';
import TrustWidgets from '../components/TrustWidgets';
import FaqSection from '../components/FaqSection';
import ReviewsSection from '../components/ReviewsSection';
import PartnersSection from '../components/PartnersSection';
import { RateComparison, SecurityBanner } from '../components/PromotionWidgets';
import { ChevronRight, Zap, Users2, Shield, HeartHandshake, Award, ShieldCheck } from 'lucide-react';
import { Language, LoanInfo } from '../types';

interface HomeProps {
  onSelectLoan: (loanId: string) => void;
  onNavigate: (page: string) => void;
  language: Language;
  loans: LoanInfo[];
}

const Home: React.FC<HomeProps> = ({ onSelectLoan, onNavigate, language, loans }) => {
  const { t } = useTranslation();

  const carouselImages = [
    { url: 'https://i.postimg.cc/wM0BTvww/side-view-man-working-as-real-estate-agent.jpg' },
    { url: 'https://i.postimg.cc/LX4K4Vww/young-family-choosing-car-car-showroom.jpg' },
    { url: 'https://i.postimg.cc/GhFrb9SK/pexels-mizunokozuki-12912114.jpg' },
    { url: 'https://i.postimg.cc/g0NtsbtD/pexels-vlada-karpovich-7433905.jpg' }
  ];

  const whoIcons = [ShieldCheck, HeartHandshake, Zap];

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

  const phrases = useMemo(() => {
    const res = t('hero.h1_variants', { returnObjects: true });
    return Array.isArray(res) ? res : [t('hero.h1')];
  }, [t]);

  const whoWeAreValues = useMemo(() => {
    const val = t('who_we_are.values', { returnObjects: true });
    return Array.isArray(val) ? val : [];
  }, [t]);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;
    const currentFullText = phrases[phraseIndex] || '';
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
      <section className="relative h-[60vh] sm:h-[90vh] min-h-[520px] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          {carouselImages.map((img, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
              <img src={img.url} className="w-full h-full object-cover object-center" alt="Finance background" />
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
              {t('hero.badge')}
            </div>
            
            <div className="min-h-[80px] sm:min-h-[220px]">
              <h1 className="text-3xl sm:text-6xl lg:text-8xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
                {displayedText}
                <span className="inline-block w-1 h-8 sm:w-2 sm:h-20 bg-emerald-500 ml-1 animate-pulse"></span>
              </h1>
            </div>

            <p className="text-sm sm:text-2xl text-gray-200 leading-relaxed font-medium max-w-xl">
              {t('hero.p')}
            </p>
            
            <div className="flex flex-row gap-2 pt-4">
              <button onClick={() => onNavigate('loan-application')} className="bg-emerald-600 text-white px-5 py-3.5 sm:px-10 sm:py-5 rounded-xl font-black text-[10px] sm:text-lg hover:bg-emerald-700 transition-all flex items-center gap-2">
                {t('hero.cta1')} <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate('simulator')} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-5 py-3.5 sm:px-10 sm:py-5 rounded-xl font-black text-[10px] sm:text-lg hover:bg-white/20 transition-all">
                {t('nav.simulator')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="loans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-3rem] relative z-20">
        <div className="text-left sm:text-center max-w-3xl sm:mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-4">
          <h2 className="text-2xl sm:text-5xl font-black text-gray-900">{t('loans_section.h2')}</h2>
          <p className="text-sm sm:text-xl text-gray-600">{t('loans_section.p')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {loans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} onClick={() => onSelectLoan(loan.id)} language={language} />
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="bg-white rounded-[2rem] sm:rounded-[4rem] p-8 sm:p-20 shadow-xl border border-gray-100">
           <div className="text-left mb-12 sm:mb-20 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
                 <Shield className="w-4 h-4 text-emerald-600" />
                 <span className="text-[10px] sm:text-xs font-black text-emerald-600 uppercase tracking-widest">{t('stats.badge')}</span>
              </div>
              <h2 className="text-3xl sm:text-6xl font-black leading-tight tracking-tight animate-gradient-text">
                {t('stats.title')}
              </h2>
              <p className="text-sm sm:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
                {t('stats.p')}
              </p>
           </div>
           
           <TrustWidgets language={language} />
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-emerald-50 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-16 border border-emerald-100 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900">{t('calculator.title')}</h2>
              <p className="text-base sm:text-xl text-gray-600 font-medium">{t('calculator.subtitle')}</p>
            </div>
            <LoanCalculator language={language} onApply={() => onNavigate('loan-application')} />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-10 -left-10 w-full h-full border-2 border-dashed border-emerald-200 rounded-[3rem] -z-10 animate-pulse hidden sm:block"></div>
            <div className="relative rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl h-[400px] sm:h-[600px] group">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200" 
                alt="Europfy Team" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-emerald-900/10 backdrop-blur-[1px]"></div>
              <div className="absolute bottom-10 right-10 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl space-y-2 max-w-[200px] animate-bounce duration-[3000ms]">
                <Award className="w-10 h-10 text-emerald-600" />
                <p className="text-sm font-black text-gray-900 leading-tight">Expert Finance Européen 2026</p>
              </div>
            </div>
          </div>

          <div className="space-y-8 sm:space-y-12 order-1 lg:order-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
                <Users2 className="w-4 h-4" />
                {t('who_we_are.title')}
              </div>
              <h2 className="text-3xl sm:text-6xl font-black text-gray-900 leading-tight">
                {t('who_we_are.subtitle')}
              </h2>
              <p className="text-base sm:text-xl text-gray-600 leading-relaxed font-medium">
                {t('who_we_are.p1')} {t('who_we_are.p2')}
              </p>
            </div>

            <div className="grid gap-6">
              {whoWeAreValues.map((val: any, i: number) => {
                const Icon = whoIcons[i] || ShieldCheck;
                return (
                  <div key={i} className="flex gap-5 group">
                    <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-all duration-300">
                      <Icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-gray-900 mb-1">{val.title}</h4>
                      <p className="text-sm text-gray-500 font-medium">{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-3 text-emerald-600 font-black text-lg hover:gap-5 transition-all"
            >
              {t('who_we_are.btn')} <ChevronRight className="w-6 h-6" />
            </button>
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[2.5rem] p-8 sm:p-24 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-6xl font-black leading-tight">{t('cta_footer.h2')}</h2>
            <p className="text-sm sm:text-xl text-emerald-100 font-medium">{t('cta_footer.p')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button onClick={() => onNavigate('loan-application')} className="bg-white text-teal-900 px-8 py-4 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-transform">
                {t('cta_footer.btn1')}
              </button>
              <button onClick={() => onNavigate('contact')} className="bg-emerald-500/30 backdrop-blur-md border border-white/30 px-8 py-4 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all">
                {t('cta_footer.btn2')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
