
import React from 'react';
import { LoanInfo } from '../types';
import { ICON_MAP } from '../constants';
import { ArrowRight, Check } from 'lucide-react';

interface LoanCardProps {
  loan: LoanInfo;
  onClick: () => void;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan, onClick }) => {
  const IconComponent = ICON_MAP[loan.icon];

  return (
    <div 
      onClick={onClick}
      className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer flex flex-col h-full"
    >
      <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
        <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{loan.title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{loan.description}</p>
      
      <div className="space-y-3 mb-8">
        {loan.features.slice(0, 3).map((feature, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <Check className="w-4 h-4 text-green-500" />
            {feature}
          </div>
        ))}
      </div>

      <div className="flex items-center text-blue-600 font-bold group-hover:gap-3 gap-2 transition-all">
        En savoir plus
        <ArrowRight className="w-5 h-5" />
      </div>
    </div>
  );
};

export default LoanCard;
