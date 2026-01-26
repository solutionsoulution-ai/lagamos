
import React from 'react';
import { LoanInfo, Language } from '../types';
import { ICON_MAP } from '../constants';
import { ArrowRight, Check } from 'lucide-react';
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
      className="group bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-md sm:shadow-xl hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all cursor-pointer flex flex-col h-full"
    >
      {/* Layout adaptatif : Ligne sur mobile avec plus d'espace, Colonne sur desktop */}
      <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0 sm:mb-6">
        <div className="bg-blue-50 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
          <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900 line-clamp-2 sm:line-clamp-none">
          {loan.title}
        </h3>
      </div>
      
      <p className="text-sm sm:text-base text-gray-600 mt-3 sm:mt-0 mb-4 sm:mb-6 flex-grow line-clamp-2 sm:line-clamp-none">
        {loan.description}
      </p>
      
      {/* Masqué sur mobile pour garder l'aspect compact de la grille */}
      <div className="hidden sm:block space-y-3 mb-8">
        {loan.features.slice(0, 3).map((feature, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <Check className="w-4 h-4 text-green-500" />
            {feature}
          </div>
        ))}
      </div>

      <div className="flex items-center text-blue-600 font-bold text-sm sm:text-base group-hover:gap-3 gap-2 transition-all">
        {t.more}
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
    </div>
  );
};

export default LoanCard;
