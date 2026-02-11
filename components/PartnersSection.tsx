
import React from 'react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';

interface PartnersSectionProps { language: Language; }

const PartnersSection: React.FC<PartnersSectionProps> = ({ language }) => {
  const { t } = useTranslation();
  const partnersT = t('partners', { returnObjects: true }) as any;

  const partners = [
    { name: 'BNP Paribas' }, { name: 'Santander' }, { name: 'AXA' },
    { name: 'Société Générale' }, { name: 'Crédit Agricole' }, { name: 'Stripe' },
    { name: 'HSBC' }, { name: 'ING' }, { name: 'Deutsche Bank' }, { name: 'Intesa Sanpaolo' },
  ];
  const extendedPartners = [...partners, ...partners];

  if (!partnersT) return null;

  return (
    <div className="py-24 overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 px-4">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{partnersT.h2}</h2>
        <p className="text-sm sm:text-xl text-gray-500 font-medium">{partnersT.p}</p>
      </div>
      <style>{`@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-infinite-scroll { display: flex; width: fit-content; animation: scroll 40s linear infinite; } .animate-infinite-scroll:hover { animation-play-state: paused; }`}</style>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="bg-white py-12 sm:py-16 border-y border-gray-100 shadow-sm">
          <div className="animate-infinite-scroll">
            {extendedPartners.map((partner, i) => (
              <div key={i} className="flex items-center justify-center px-12 sm:px-20 shrink-0 group">
                <span className="text-2xl sm:text-4xl font-bold text-gray-300 tracking-tighter group-hover:text-blue-600 transition-all duration-300 select-none">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-col items-center gap-6 text-center">
        <div className="h-px w-16 bg-gray-200"></div>
        <p className="text-gray-400 text-[10px] sm:text-xs font-medium italic max-w-3xl px-8 leading-relaxed opacity-80">
          * {partnersT.p}
        </p>
      </div>
    </div>
  );
};

export default PartnersSection;
