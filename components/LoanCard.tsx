
import React from 'react';
import { LoanInfo, Language } from '../types';
import { ICON_MAP } from '../constants';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LoanCardProps {
  loan: LoanInfo;
  onClick: () => void;
  language: Language;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan, onClick, language }) => {
  const IconComponent = ICON_MAP[loan.icon];

  return (
    <div 
      onClick={onClick}
      className="group relative bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[4/5] sm:aspect-square lg:aspect-[4/5]"
    >
      {/* Background Image - Occupies full card now */}
      <img 
        src={loan.image} 
        alt={loan.title} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
      />
      
      {/* Dynamic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
      
      {/* Top Badge: Taux Fixe */}
      <div className="absolute top-6 left-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Taux 2% Fixe</span>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-8 space-y-4 translate-y-2 group-hover:translate-y-0 transition-transform">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-500 p-3 rounded-2xl shadow-lg shadow-emerald-900/40 text-white transform group-hover:rotate-12 transition-transform">
            <IconComponent className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {loan.title}
          </h3>
        </div>
        
        {/* Subtle separator and action */}
        <div className="pt-4 flex items-center justify-between border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-emerald-400 text-xs font-black uppercase tracking-[0.2em]">Découvrir l'offre</span>
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
