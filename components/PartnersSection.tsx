
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface PartnersSectionProps { language: Language; }

const PartnersSection: React.FC<PartnersSectionProps> = ({ language }) => {
  const t = translations[language].partners;

  // Liste des partenaires majeurs - Formatage en "Wordmark"
  const partners = [
    { name: 'BNP Paribas' },
    { name: 'Santander' },
    { name: 'AXA' },
    { name: 'Société Générale' },
    { name: 'Crédit Agricole' },
    { name: 'Stripe' },
  ];

  return (
    <div className="py-24">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{t.h2}</h2>
        <p className="text-sm sm:text-xl text-gray-500 font-medium">{t.p}</p>
      </div>

      <div className="bg-white p-12 sm:p-20 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/40">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 sm:gap-12 items-center justify-items-center">
          {partners.map((partner, i) => (
            <div 
              key={i} 
              className="group relative flex items-center justify-center w-full transition-all duration-300 cursor-pointer"
            >
              {/* Le style "Stripe" : Bold, Tight tracking, Modern Sans-serif */}
              <span className="text-xl sm:text-2xl font-bold text-gray-300 tracking-tighter group-hover:text-blue-600 transition-all duration-300 select-none">
                {partner.name}
              </span>
              
              {/* Point décoratif discret au survol comme un accent tech */}
              <div className="absolute -top-1 right-1/4 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 flex flex-col items-center gap-6 text-center">
        <div className="h-px w-16 bg-gray-200"></div>
        <p className="text-gray-400 text-[10px] sm:text-xs font-medium italic max-w-3xl px-8 leading-relaxed opacity-80">
          * FinancePlus collabore en toute transparence avec ces institutions financières pour garantir la sécurité de vos fonds. Les noms cités sont des marques déposées de leurs propriétaires respectifs.
        </p>
      </div>
    </div>
  );
};

export default PartnersSection;
