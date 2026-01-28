
import React from 'react';
import { LoanInfo, Language } from '../types';
import { ICON_MAP } from '../constants';
import { ArrowRight, Check, Euro } from 'lucide-react';
import { translations } from '../translations';

interface LoanCardProps {
  loan: LoanInfo;
  onClick: () => void;
  language: Language;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan, onClick, language }) => {
  const IconComponent = ICON_MAP[loan.icon];
  const t = translations[language].loans_section;

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col h-full"
    >
      {/* Background Image Header */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img 
          src={loan.image} 
          alt={loan.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/40 to-transparent"></div>
        
        {/* Floating Icon */}
        <div className="absolute bottom-6 left-6 flex items-center gap-4">
          <div className="bg-emerald-500 p-3 rounded-2xl shadow-lg shadow-emerald-900/40 text-white">
            <IconComponent className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {loan.title}
          </h3>
        </div>
      </div>
      
      <div className="p-6 sm:p-8 flex-grow flex flex-col">
        <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium leading-relaxed">
          {loan.description}
        </p>
        
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-sm text-gray-500 font-bold bg-gray-50 p-3 rounded-xl border border-gray-100">
             <Euro className="w-4 h-4 text-emerald-600" />
             <span>Max: {loan.maxAmount.toLocaleString()} €</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 font-bold bg-gray-50 p-3 rounded-xl border border-gray-100">
             <Check className="w-4 h-4 text-emerald-600" />
             <span>Taux fixe 2%</span>
          </div>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-emerald-600 font-black text-sm uppercase tracking-widest group-hover:tracking-[0.2em] transition-all">
            {t.more}
          </span>
          <div className="bg-emerald-50 p-2 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;
