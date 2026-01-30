
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FIXED_RATE } from '../constants';
import { TrendingUp, Calendar, Euro, Zap } from 'lucide-react';
import { Language } from '../types';

interface LoanCalculatorProps {
  language?: Language;
  onApply?: () => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onApply }) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(15000);
  const [duration, setDuration] = useState(24);
  
  const monthlyPayment = useMemo(() => {
    const r = (FIXED_RATE / 100) / 12;
    const n = duration;
    if (r === 0) return amount / n;
    return (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [amount, duration]);

  const totalCost = useMemo(() => {
    return (monthlyPayment * duration) - amount;
  }, [monthlyPayment, duration, amount]);

  return (
    <div className="relative z-20 bg-white rounded-[1.5rem] sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-full">
      <div className="bg-emerald-600 p-4 sm:p-8 text-white">
        <h3 className="text-base sm:text-2xl font-black flex items-center gap-2 sm:gap-3">
          <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300" />
          {t('calculator.title')}
        </h3>
        <p className="text-[10px] sm:text-base text-emerald-100 mt-0.5 uppercase font-black tracking-widest">{t('calculator.subtitle')} (2%)</p>
      </div>
      
      <div className="p-4 sm:p-8 space-y-5 sm:space-y-10">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[10px] sm:text-sm text-gray-500 font-black uppercase tracking-widest flex items-center gap-1.5 sm:gap-2">
              <Euro className="w-3.5 h-3.5 text-emerald-600" />
              {t('calculator.amount')}
            </label>
            <span className="text-base sm:text-2xl font-black text-emerald-600">{amount.toLocaleString()} €</span>
          </div>
          <input 
            type="range" 
            min="1000" 
            max="250000" 
            step="500" 
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))} 
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600 touch-none" 
          />
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[10px] sm:text-sm text-gray-500 font-black uppercase tracking-widest flex items-center gap-1.5 sm:gap-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              {t('calculator.duration')}
            </label>
            <span className="text-base sm:text-2xl font-black text-emerald-600">{duration} {t('calculator.months')}</span>
          </div>
          <input 
            type="range" 
            min="6" 
            max="120" 
            step="6" 
            value={duration} 
            onChange={(e) => setDuration(Number(e.target.value))} 
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600 touch-none" 
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-emerald-50 p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-emerald-100 text-center">
            <p className="text-[8px] sm:text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-0.5 sm:mb-1">{t('calculator.monthly')}</p>
            <p className="text-lg sm:text-3xl font-black text-emerald-900">{monthlyPayment.toFixed(2)} €</p>
          </div>
          <div className="bg-teal-50 p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-teal-100 text-center">
            <p className="text-[8px] sm:text-[10px] text-teal-600 font-black uppercase tracking-widest mb-0.5 sm:mb-1">{t('calculator.total')}</p>
            <p className="text-lg sm:text-3xl font-black text-teal-900">{totalCost.toFixed(2)} €</p>
          </div>
        </div>

        <button 
          onClick={onApply}
          className="w-full bg-emerald-600 text-white py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-lg shadow-xl shadow-emerald-100/50 hover:bg-emerald-700 active:bg-emerald-800 transform-gpu transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3"
        >
          {t('calculator.cta')}
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default LoanCalculator;
