
import React, { useState, useMemo } from 'react';
import { FIXED_RATE } from '../constants';
import { TrendingUp, Calendar, Euro, Zap } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface LoanCalculatorProps {
  language?: Language;
  onApply?: () => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ language = 'fr', onApply }) => {
  const [amount, setAmount] = useState(15000);
  const [duration, setDuration] = useState(24);
  const t = translations[language].calculator;

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
    <div className="bg-white rounded-[2rem] sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-full">
      <div className="bg-emerald-600 p-6 sm:p-8 text-white">
        <h3 className="text-lg sm:text-2xl font-black flex items-center gap-2 sm:gap-3">
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300" />
          {t.title}
        </h3>
        <p className="text-xs sm:text-base text-emerald-100 mt-1 uppercase font-black tracking-widest">{t.subtitle} (2%)</p>
      </div>
      
      <div className="p-6 sm:p-8 space-y-8 sm:space-y-10">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs sm:text-sm text-gray-500 font-black uppercase tracking-widest flex items-center gap-2">
              <Euro className="w-4 h-4 text-emerald-600" />
              {t.amount}
            </label>
            <span className="text-lg sm:text-2xl font-black text-emerald-600">{amount.toLocaleString()} €</span>
          </div>
          <input 
            type="range" min="1000" max="250000" step="500" value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))} 
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600" 
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs sm:text-sm text-gray-500 font-black uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              {t.duration}
            </label>
            <span className="text-lg sm:text-2xl font-black text-emerald-600">{duration} {t.months}</span>
          </div>
          <input 
            type="range" min="6" max="120" step="6" value={duration} 
            onChange={(e) => setDuration(Number(e.target.value))} 
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600" 
          />
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 text-center">
            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-1">{t.monthly}</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-900">{monthlyPayment.toFixed(2)} €</p>
          </div>
          <div className="bg-teal-50 p-5 rounded-2xl border border-teal-100 text-center">
            <p className="text-[10px] text-teal-600 font-black uppercase tracking-widest mb-1">{t.total}</p>
            <p className="text-2xl sm:text-3xl font-black text-teal-900">{totalCost.toFixed(2)} €</p>
          </div>
        </div>

        <button 
          onClick={onApply}
          className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          {t.cta}
          <TrendingUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default LoanCalculator;
