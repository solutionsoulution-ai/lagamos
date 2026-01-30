
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ChevronDown, HelpCircle, ChevronLeft, Home as HomeIcon, 
  Car, Briefcase, User, RefreshCcw, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { Language } from '../types';

interface FaqProps {
  language: Language;
  onBack: () => void;
}

const Faq: React.FC<FaqProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('general');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'general', label: t('faq.categories.general'), icon: ShieldCheck },
    { id: 'immobilier', label: t('faq.categories.immobilier'), icon: HomeIcon },
    { id: 'automobile', label: t('faq.categories.automobile'), icon: Car },
    { id: 'entreprise', label: t('faq.categories.entreprise'), icon: Briefcase },
    { id: 'personnel', label: t('faq.categories.personnel'), icon: User },
    { id: 'rachat', label: t('faq.categories.rachat'), icon: RefreshCcw },
  ];

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-black mb-12">
          <ChevronLeft className="w-5 h-5" /> {t('faq_page.back')}
        </button>

        <div className="text-center mb-16 space-y-6">
          <div className="bg-emerald-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <HelpCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl sm:text-7xl font-black text-gray-900 leading-none">{t('faq_page.title')}</h1>
          <p className="text-lg sm:text-2xl text-gray-500">{t('faq_page.subtitle')}</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-12">
          <aside className="space-y-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-3 w-full px-6 py-4 rounded-2xl font-black transition-all ${
                  activeCategory === cat.id ? 'bg-emerald-600 text-white shadow-xl' : 'bg-white text-gray-500 hover:bg-emerald-50'
                }`}
              >
                <cat.icon className="w-5 h-5" /> {cat.label}
              </button>
            ))}
          </aside>

          <main className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-2xl relative overflow-hidden">
               <h2 className="text-3xl font-black mb-8">{t(`faq.categories.${activeCategory}`)}</h2>
               {/* Contenu FAQ dynamique */}
               <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border-b border-gray-50 pb-4">
                       <button onClick={() => setOpenIndex(openIndex === `${i}` ? null : `${i}`)} className="w-full text-left flex justify-between items-center py-4 font-bold text-gray-900">
                          {t(`faq.q${i}`)} <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === `${i}` ? 'rotate-180' : ''}`} />
                       </button>
                       {openIndex === `${i}` && <p className="text-gray-500 py-2 leading-relaxed">{t(`faq.a${i}`)}</p>}
                    </div>
                  ))}
               </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Faq;
