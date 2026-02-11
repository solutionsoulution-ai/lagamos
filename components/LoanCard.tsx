
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoanInfo, Language } from '../types';
import { ICON_MAP } from '../constants';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LoanCardProps {
  loan: LoanInfo;
  onClick: () => void;
  language: Language;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan, onClick, language }) => {
  const { t } = useTranslation();
  const IconComponent = ICON_MAP[loan.icon];

  return (
    <div 
      onClick={onClick}
      className="group relative bg-gray-900 rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[16/7] sm:aspect-square lg:aspect-[4/5]"
    >
      {/* Background Image */}
      <img 
        src={loan.image} 
        alt={loan.title} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
      />
      
      {/* Dynamic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-900/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
      
      {/* Top Badge: Taux Fixe - Smaller on mobile */}
      <div className="absolute top-3 left-3 sm:top-6 sm:left-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1 sm:gap-2">
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
          <span className="text-[8px] sm:text-[10px] font-black text-white uppercase tracking-widest">{t('loans_section.fixed_rate')}</span>
        </div>
      </div>

      {/* Content Overlay - More compact on mobile */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 space-y-2 sm:space-y-4 translate-y-1 group-hover:translate-y-0 transition-transform">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-emerald-500 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg shadow-emerald-900/40 text-white transform group-hover:rotate-12 transition-transform">
            <IconComponent className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-white leading-tight">
            {loan.title}
          </h3>
        </div>
        
        {/* Hide separator/Discover on mobile to save vertical space */}
        <div className="hidden sm:flex pt-4 items-center justify-between border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-emerald-400 text-xs font-black uppercase tracking-[0.2em]">{t('loans_section.discover')}</span>
          <div className="bg-white text-emerald-600 p-2 rounded-full">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Glossy Reflection Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none bg-gradient-to-tr from-white/20 via-transparent to-transparent"></div>
    </div>
  );
};

export default LoanCard;
