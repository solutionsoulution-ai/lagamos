
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import LoanCard from '../components/LoanCard';
import LoanCalculator from '../components/LoanCalculator';
import TrustWidgets from '../components/TrustWidgets';
import FaqSection from '../components/FaqSection';
import ReviewsSection from '../components/ReviewsSection';
import PartnersSection from '../components/PartnersSection';
import Navbar from '../components/Navbar';
import { RateComparison, SecurityBanner } from '../components/PromotionWidgets';
import { ChevronRight, Zap, Users2, Shield, HeartHandshake, Award, ShieldCheck, Globe, Heart, Sparkles, Target, History, RefreshCcw, UserCheck, ArrowRight, Tag } from 'lucide-react';
import { Language, LoanInfo, User } from '../types';

interface HomeProps {
  onSelectLoan: (loanId: string) => void;
  onNavigate: (page: string) => void;
  language: Language;
  loans: LoanInfo[];
  user: User | null;
  onLogout: () => void;
  onLanguageChange: (lang: Language) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectLoan, onNavigate, language, loans, user, onLogout, onLanguageChange }) => {
  const { t } = useTranslation();

  const carouselImages = [
    { url: 'https://i.postimg.cc/wM0BTvww/side-view-man-working-as-real-estate-agent.jpg' },
    { url: 'https://i.postimg.cc/LX4K4Vww/young-family-choosing-car-car-showroom.jpg' },
    { url: 'https://i.postimg.cc/GhFrb9SK/pexels-mizunokozuki-12912114.jpg' },
    { url: 'https://i.postimg.cc/g0NtsbtD/pexels-vlada-karpovich-7433905.jpg' }
  ];

  const whoIcons = [ShieldCheck, HeartHandshake, Zap];
  const identityIcons: Record<string, any> = { Globe, Heart, Shield };
  const aboutUsIcons: Record<string, any> = { Target, History, ShieldCheck };
  const highlightIcons: Record<string, any> = { ShieldCheck, RefreshCcw, UserCheck };

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

  const aboutUsItems = useMemo(() => {
    const val = t('about_us_section.items', { returnObjects: true });
    return Array.isArray(val) ? val : [];
  }, [t]);

  const highlightItems = useMemo(() => {
    const val = t('feature_highlight.items', { returnObjects: true });
    return Array.isArray(val) ? val : [];
  }, [t]);

  const identityPillars = useMemo(() => {
    const val = t('identity.pillars', { returnObjects: true });
    return Array.isArray(val) ? val : [];
  }, [t]);

  // Récupération des articles de blog pour l'aperçu
  const blogPosts = useMemo(() => {
    const posts = t('blog.posts', { returnObjects: true });
    return Array.isArray(posts) ? posts.slice(0, 3) : [];
  }, [t]);

  const blogImages: Record<string, string> = {
    'rate-2-percent': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    'real-estate-2026': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    'debt-consolidation-2026': 'https://images.unsplash.com/photo-1573163281538-559e1c48073b?auto=format&fit=crop&q=80&w=800',
    'ai-finance-2026': 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800',
  };

  const blogCategories: Record<string, string> = {
    'rate-2-percent': 'Finance',
    'real-estate-2026': 'Immobilier',
    'debt-consolidation-2026': 'Budget',
    'ai-finance-2026': 'Tech',
  };

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
      {/* Wrapper pour inclure la Navbar dans le flux de la Hero Section */}
      <div className="relative">
        {/* Navbar positionnée de manière absolue sur le carrousel */}
        <Navbar 
          position="absolute"
          isTransparent={true}
          onNavigate={onNavigate} 
          currentPage="home" 
          user={user} 
          onLogout={onLogout} 
          currentLanguage={language}
          onLanguageChange={onLanguageChange}
        />

        {/* Hero Section */}
        <section className="relative h-[55vh] sm:h-[90vh] min-h-[450px] sm:min-h-[550px] flex items-center overflow-hidden bg-gray-900">
          <div className="absolute inset-0 z-0">
            {carouselImages.map((img, idx) => (
              <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <img src={img.url} className="w-full h-full object-cover object-center" alt="Finance background" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              </div>
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
            <div className="max-w-4xl space-y-3 sm:space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-500/30 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[8px] sm:text-xs font-black uppercase tracking-widest border border-white/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                {t('hero.badge')}
              </div>
              
              <div className="min-h-[50px] sm:min-h-[140px] flex flex-col justify-end">
                <h1 className="text-2xl sm:text-6xl lg:text-8xl font-black text-white leading-tight sm:leading-[1.1] tracking-tight drop-shadow-2xl">
                  {displayedText}
                  <span className="inline-block w-1 h-5 sm:w-2 sm:h-20 bg-emerald-500 ml-0.5 sm:ml-1 animate-pulse"></span>
                </h1>
              </div>

              <p className="text-xs sm:text-2xl text-gray-200 leading-snug sm:leading-relaxed font-medium max-w-[300px] sm:max-w-xl">
                {t('hero.p')}
              </p>
              
              <div className="flex flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                <button onClick={() => onNavigate('loan-application')} className="bg-emerald-600 text-white px-4 py-2.5 sm:px-10 sm:py-5 rounded-lg sm:rounded-xl font-black text-[9px] sm:text-lg hover:bg-emerald-700 transition-all flex items-center gap-1.5 sm:gap-2 shadow-xl shadow-emerald-900/20">
                  {t('hero.cta1')} <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button onClick={() => onNavigate('simulator')} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2.5 sm:px-10 sm:py-5 rounded-lg sm:rounded-xl font-black text-[9px] sm:text-lg hover:bg-white/20 transition-all">
                  {t('nav.simulator')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Simulator Section (Moved up, overlapping hero) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-20 relative z-30">
        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-12 border border-gray-100 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                <Zap className="w-3.5 h-3.5" />
                Estimation instantanée
              </div>
              <h2 className="text-2xl sm:text-5xl font-black text-gray-900 leading-tight">{t('calculator.title')}</h2>
              <p className="text-sm sm:text-xl text-gray-600 font-medium leading-relaxed">{t('calculator.subtitle')}</p>
            </div>
            <LoanCalculator language={language} onApply={() => onNavigate('loan-application')} />
          </div>
        </div>
      </section>

      {/* Loans Section */}
      <section id="loans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="text-left sm:text-center max-w-3xl sm:mx-auto mb-8 sm:mb-16 space-y-2 sm:space-y-4">
          <h2 className="text-2xl sm:text-5xl font-black text-gray-900">{t('loans_section.h2')}</h2>
          <p className="text-sm sm:text-xl text-gray-600">{t('loans_section.p')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {loans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} onClick={() => onSelectLoan(loan.id)} language={language} />
          ))}
        </div>
      </section>

      {/* Feature Highlight Section (Modified for mobile order) */}
      <section className="bg-emerald-50/50 py-16 sm:py-32 overflow-hidden border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16 sm:gap-24">
            {/* Image Column */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-200/50 rounded-full blur-3xl group-hover:bg-emerald-300 transition-colors"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-200/50 rounded-full blur-3xl group-hover:bg-teal-300 transition-colors"></div>
              
              <div className="relative rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white h-[400px] sm:h-[600px]">
                <img 
                  src="https://i.postimg.cc/HkF7fM6L/pexels-august-de-richelieu-4427901.jpg" 
                  alt="Transparence Bancaire" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-emerald-950/10 group-hover:bg-transparent transition-colors duration-500"></div>
                
                <div className="absolute bottom-6 right-6 sm:bottom-auto sm:top-10 sm:right-10 bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl space-y-1 sm:space-y-2 animate-float">
                  <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                  <div>
                    <p className="text-[10px] sm:text-xs font-black text-gray-900 uppercase">{t('feature_highlight.audit_title')}</p>
                    <p className="text-[8px] sm:text-[10px] text-gray-500 font-bold">{t('feature_highlight.audit_subtitle')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-200 shadow-sm">
                <Sparkles className="w-4 h-4" />
                {t('feature_highlight.badge')}
              </div>
              <h2 className="text-3xl sm:text-6xl font-black text-gray-900 leading-[1.1]">
                {t('feature_highlight.title')}
              </h2>
              <p className="text-base sm:text-xl text-gray-500 font-medium leading-relaxed">
                {t('feature_highlight.p')}
              </p>
              
              <div className="grid gap-6 sm:gap-8 pt-4">
                {highlightItems.map((item: any, i: number) => {
                  const Icon = highlightIcons[item.icon] || ShieldCheck;
                  return (
                    <div key={i} className="flex gap-5 group">
                      <div className="bg-white w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-black text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-20 items-center">
          <div className="w-full lg:w-1/2 space-y-5 sm:space-y-8">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-widest border border-emerald-100">
              <Users2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {t('about_us_section.badge')}
            </div>
            <h2 className="text-2xl sm:text-6xl font-black text-gray-900 leading-tight">
              {t('about_us_section.title')}
            </h2>
            <p className="text-base sm:text-xl text-gray-500 font-medium leading-relaxed">
              {t('about_us_section.p')}
            </p>
            
            <div className="flex flex-col gap-5 sm:gap-8 pt-2 sm:pt-4">
              {aboutUsItems.map((item: any, i: number) => {
                const Icon = aboutUsIcons[item.icon] || Target;
                return (
                  <div key={i} className="flex gap-4 sm:gap-5 items-start group">
                    <div className="bg-emerald-50 w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-colors">
                      <Icon className="w-5 h-5 sm:w-8 sm:h-8 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-2xl font-black text-gray-900 mb-0.5 sm:mb-1">{item.title}</h4>
                      <p className="text-xs sm:text-lg text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative hidden sm:block">
             <div className="absolute -inset-10 border-2 border-emerald-100 rounded-[5rem] -z-10"></div>
             <div className="rounded-[4rem] overflow-hidden shadow-2xl h-[650px] relative">
                <img 
                  src="https://i.postimg.cc/Bn9Y4jYx/pexels-kampus-8428061.jpg" 
                  alt="Europfy Vision" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-xl space-y-1">
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{t('about_us_section.trust_title')}</p>
                   <p className="text-sm sm:text-lg font-bold text-gray-900">{t('about_us_section.trust_subtitle')}</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="bg-white rounded-[2rem] sm:rounded-[4rem] p-6 sm:p-20 shadow-xl border border-gray-100">
           <div className="text-left mb-8 sm:mb-20 space-y-3 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
                 <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                 <span className="text-[9px] sm:text-xs font-black text-emerald-600 uppercase tracking-widest">{t('stats.badge')}</span>
              </div>
              <h2 className="text-2xl sm:text-6xl font-black leading-tight tracking-tight animate-gradient-text">
                {t('stats.title')}
              </h2>
              <p className="text-xs sm:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
                {t('stats.p')}
              </p>
           </div>
           
           <TrustWidgets language={language} />
        </div>
      </div>

      {/* Identity Section */}
      <section className="bg-gray-900 py-16 sm:py-32 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-600/5 blur-[120px] pointer-events-none"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-24 space-y-4 sm:space-y-6">
               <div className="inline-flex items-center gap-2 bg-emerald-600/20 text-emerald-400 px-3 py-1.5 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-[0.2em] border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {t('identity.title')}
               </div>
               <h2 className="text-2xl sm:text-6xl font-black text-white leading-tight">
                  {t('identity.subtitle')}
               </h2>
               <p className="text-sm sm:text-xl text-gray-400 font-medium leading-relaxed">
                  {t('identity.p')}
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-12">
               {identityPillars.map((pillar: any, i: number) => {
                 const Icon = identityIcons[pillar.icon] || Globe;
                 return (
                   <div key={i} className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-12 rounded-[2rem] sm:rounded-[2.5rem] hover:bg-white/10 transition-all duration-500">
                      <div className="bg-emerald-600 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform">
                         <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-4">{pillar.title}</h3>
                      <p className="text-xs sm:text-base text-gray-400 leading-relaxed font-medium">
                        {pillar.desc}
                      </p>
                   </div>
                 );
               })}
            </div>
         </div>
      </section>

      {/* Partners, Reviews & Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ReviewsSection language={language} />
        <PartnersSection language={language} />
        <RateComparison language={language} />
      </div>

      {/* SECTION BLOG PREVIEW - NOUVEAU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
                 <Tag className="w-3.5 h-3.5" />
                 {t('blog.title')}
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900">{t('blog.subtitle')}</h2>
           </div>
           <button onClick={() => onNavigate('blog')} className="flex items-center gap-2 text-emerald-600 font-black hover:gap-4 transition-all">
              {t('blog.readMore')} <ArrowRight className="w-5 h-5" />
           </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {blogPosts.map((post: any) => (
             <div 
               key={post.id} 
               onClick={() => {
                 // onNavigate pour aller au blog puis sélectionner, ou deep link si géré
                 // Ici on navigue vers le blog, l'utilisateur devra recliquer (simplification pour l'instant)
                 // Idéalement on passerait un state, mais ici on va juste aller au blog
                 onNavigate('blog');
               }}
               className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
             >
                <div className="h-48 overflow-hidden relative">
                   <img 
                     src={blogImages[post.id] || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'} 
                     alt={post.title} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                   />
                   <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-600">
                         {blogCategories[post.id] || 'Info'}
                      </span>
                   </div>
                </div>
                <div className="p-6 space-y-4">
                   <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                   <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                   <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest pt-2 flex items-center gap-2">
                      Lire l'article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                   </p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <SecurityBanner language={language} />
      <FaqSection language={language} />

      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-24 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-6xl font-black leading-tight">{t('cta_footer.h2')}</h2>
            <p className="text-xs sm:text-xl text-emerald-100 font-medium">{t('cta_footer.p')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
              <button onClick={() => onNavigate('loan-application')} className="bg-white text-teal-900 px-6 py-3.5 rounded-xl font-black text-base sm:text-xl shadow-xl hover:scale-105 transition-transform">
                {t('cta_footer.btn1')}
              </button>
              <button onClick={() => onNavigate('contact')} className="bg-emerald-500/30 backdrop-blur-md border border-white/30 px-6 py-3.5 rounded-xl font-bold text-base sm:text-xl hover:bg-white/20 transition-all">
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
