import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  ChevronLeft, 
  Home as HomeIcon,
  Car,
  Briefcase,
  User,
  RefreshCcw,
  ShieldCheck,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface FaqProps {
  language: Language;
  onBack: () => void;
}

const Faq: React.FC<FaqProps> = ({ language, onBack }) => {
  const t = translations[language].faq_page;
  const generalT = translations[language].faq;
  const loanSpecifics = translations[language].loan_specifics;
  
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('general');
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'general', label: generalT.categories.general, icon: ShieldCheck },
    { id: 'immobilier', label: generalT.categories.immobilier, icon: HomeIcon },
    { id: 'automobile', label: generalT.categories.automobile, icon: Car },
    { id: 'entreprise', label: generalT.categories.entreprise, icon: Briefcase },
    { id: 'personnel', label: generalT.categories.personnel, icon: User },
    { id: 'rachat', label: generalT.categories.rachat, icon: RefreshCcw },
  ];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollLeft > 20) {
      setShowScrollHint(false);
    } else {
      setShowScrollHint(true);
    }
  };

  const getFaqsForCategory = (catId: string) => {
    if (catId === 'general') {
      return [
        { q: generalT.q1, a: generalT.a1 },
        { q: generalT.q2, a: generalT.a2 },
        { q: generalT.q3, a: generalT.a3 },
        { q: generalT.q4, a: generalT.a4 },
      ];
    }
    return loanSpecifics[catId]?.faqs || [];
  };

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation retour */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-black mb-12 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t.back}
        </button>

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <div className="bg-emerald-50 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-100/50 border border-emerald-100 transform -rotate-6">
            <HelpCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl sm:text-7xl font-black text-gray-900 tracking-tight leading-none">
            {t.title}
          </h1>
          <p className="text-lg sm:text-2xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8 lg:gap-12 items-start">
          
          {/* Menu des catégories avec indicateur de scroll mobile */}
          <aside className="w-full lg:sticky lg:top-32 z-30 relative">
            <p className="hidden lg:block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 ml-2">Navigation</p>
            
            <div className="relative lg:static">
              {/* Flèche d'indication mobile */}
              {showScrollHint && (
                <div className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 z-40 animate-bounce-horizontal pr-2 pointer-events-none">
                  <div className="bg-emerald-600 p-2 rounded-full shadow-lg">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
              
              {/* Masquage dégradé mobile */}
              <div className={`lg:hidden absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-30 pointer-events-none transition-opacity duration-300 ${showScrollHint ? 'opacity-100' : 'opacity-0'}`}></div>

              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-6 lg:pb-0 gap-3 no-scrollbar snap-x touch-pan-x px-1"
              >
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black transition-all text-left whitespace-nowrap lg:whitespace-normal snap-start shrink-0 lg:shrink ${
                      activeCategory === cat.id 
                        ? 'bg-emerald-600 text-white shadow-2xl shadow-emerald-200 lg:translate-x-2' 
                        : 'bg-white text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 shadow-sm border border-gray-100'
                    }`}
                  >
                    <cat.icon className={`w-5 h-5 shrink-0 ${activeCategory === cat.id ? 'text-emerald-200' : 'text-gray-300'}`} />
                    <span className="text-xs sm:text-sm uppercase tracking-wider">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Liste des questions */}
          <main className="w-full lg:col-span-3 space-y-6">
            <div className="bg-white rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-12 border border-gray-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-600 to-teal-400"></div>
              
              <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
                    {categories.find(c => c.id === activeCategory)?.label}
                  </h2>
                  <p className="text-emerald-600 font-bold text-sm uppercase tracking-widest">Questions & Réponses</p>
                </div>
                <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl text-[10px] font-black uppercase border border-emerald-100 self-start sm:self-center shrink-0">
                  {getFaqsForCategory(activeCategory).length} items
                </div>
              </div>

              <div className="space-y-4">
                {getFaqsForCategory(activeCategory).map((faq: any, i: number) => {
                  const uniqueId = `${activeCategory}-${i}`;
                  const isOpen = openIndex === uniqueId;
                  
                  return (
                    <div 
                      key={uniqueId} 
                      className={`rounded-[2rem] overflow-hidden transition-all duration-500 ${
                        isOpen ? 'bg-emerald-50/40 border-2 border-emerald-100' : 'bg-gray-50/50 border-2 border-transparent hover:bg-white hover:border-gray-200'
                      }`}
                    >
                      <button 
                        onClick={() => toggleAccordion(uniqueId)}
                        className="w-full text-left p-6 sm:p-8 flex justify-between items-center gap-6 group"
                      >
                        <span className={`font-black text-lg sm:text-xl leading-snug transition-colors ${isOpen ? 'text-emerald-800' : 'text-gray-900 group-hover:text-emerald-600'}`}>
                          {faq.q}
                        </span>
                        <div className={`p-3 rounded-2xl shrink-0 transition-all duration-300 ${isOpen ? 'bg-emerald-600 text-white rotate-180' : 'bg-white text-gray-400 shadow-sm'}`}>
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 sm:px-8 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                          <div className="h-px bg-emerald-200/50 mb-6 w-12"></div>
                          <p className="text-gray-600 text-base sm:text-xl leading-relaxed font-medium">
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {getFaqsForCategory(activeCategory).length === 0 && (
                <div className="text-center py-24 space-y-4">
                   <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-gray-400">
                      <HelpCircle className="w-8 h-8" />
                   </div>
                   <p className="text-gray-400 font-black uppercase tracking-widest text-sm">Contenu en cours de traduction...</p>
                </div>
              )}
            </div>

            {/* CTA Final */}
            <div className="bg-teal-900 rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl group">
               <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                  <RefreshCcw className="w-64 h-64" />
               </div>
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-3xl sm:text-5xl font-black leading-tight">Vous avez d'autres questions ?</h3>
                    <p className="text-teal-200 text-lg sm:text-xl font-medium max-w-xl">
                      Nos experts en financement européen sont à votre disposition pour une étude personnalisée de votre dossier.
                    </p>
                  </div>
                  <button 
                    onClick={() => onBack()} // Redirection contact simulée par retour accueil ou onNavigate
                    className="bg-emerald-600 text-white px-10 py-6 rounded-[1.5rem] font-black text-xl hover:bg-emerald-700 transition-all shrink-0 shadow-2xl shadow-emerald-950 flex items-center gap-3 hover:gap-5"
                  >
                    Contactez-nous <ArrowRight className="w-6 h-6" />
                  </button>
               </div>
            </div>
          </main>

        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0) translateY(-50%); }
          50% { transform: translateX(-10px) translateY(-50%); }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default Faq;