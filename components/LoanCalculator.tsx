import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FIXED_RATE } from '../constants';
import { TrendingUp, Calendar, Euro, Zap, Info, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface LoanCalculatorProps {
  language?: Language;
  onApply?: () => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onApply }) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(15000);
  const [duration, setDuration] = useState(48);
  
  const monthlyPayment = useMemo(() => {
    const r = (FIXED_RATE / 100) / 12;
    const n = duration;
    if (r === 0) return amount / n;
    return (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [amount, duration]);

  const totalCost = useMemo(() => {
    return (monthlyPayment * duration) - amount;
  }, [monthlyPayment, duration, amount]);

  const totalDue = useMemo(() => {
    return monthlyPayment * duration;
  }, [monthlyPayment, duration]);

  return (
    <div className="relative z-20 bg-white rounded-[1.5rem] sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-full">
      <div className="bg-emerald-600 p-4 sm:p-8 text-white relative">
        <div className="absolute top-0 right-0 p-3 sm:p-6 opacity-10">
          <Euro className="w-20 h-20 sm:w-32 sm:h-32 rotate-12" />
        </div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h3 className="text-lg sm:text-2xl font-black flex items-center gap-2">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300" />
              {t('calculator.title')}
            </h3>
            <div className="mt-1 flex items-center gap-1.5">
               <ShieldCheck className="w-3 h-3 text-emerald-200" />
               <p className="text-[9px] sm:text-xs text-emerald-100 uppercase font-black tracking-[0.2em]">Crédit Responsable</p>
            </div>
          </div>
          <div className="bg-yellow-400 text-emerald-950 px-3 py-2 rounded-xl border-b-4 border-yellow-600 text-center scale-90 sm:scale-100 shadow-lg">
            <p className="text-[8px] font-black uppercase leading-tight">TAEG FIXE</p>
            <p className="text-xl sm:text-3xl font-black tracking-tighter">2,00 %</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
        <div className="flex justify-between text-[9px] sm:text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">
          <span>Min: 6 mois</span>
          <span>Max: 300 mois (25 ans)</span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[10px] sm:text-sm text-gray-500 font-black uppercase tracking-widest flex items-center gap-2">
              <Euro className="w-4 h-4 text-emerald-600" />
              {t('calculator.amount')}
            </label>
            <span className="text-xl sm:text-3xl font-black text-emerald-600 tracking-tight">{amount.toLocaleString()} €</span>
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

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[10px] sm:text-sm text-gray-500 font-black uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              {t('calculator.duration')}
            </label>
            <span className="text-xl sm:text-3xl font-black text-emerald-600 tracking-tight">{duration} {t('calculator.months')}</span>
          </div>
          <input 
            type="range" 
            min="6" 
            max="300" 
            step="6" 
            value={duration} 
            onChange={(e) => setDuration(Number(e.target.value))} 
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600 touch-none" 
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-emerald-50 p-4 sm:p-6 rounded-2xl border border-emerald-100 text-center">
            <p className="text-[9px] sm:text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-1">{t('calculator.monthly')}</p>
            <p className="text-xl sm:text-3xl font-black text-emerald-950 tracking-tight">{monthlyPayment.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</p>
          </div>
          <div className="bg-teal-50 p-4 sm:p-6 rounded-2xl border border-teal-100 text-center">
            <p className="text-[9px] sm:text-[10px] text-teal-600 font-black uppercase tracking-widest mb-1">{t('calculator.total')}</p>
            <p className="text-xl sm:text-3xl font-black text-teal-950 tracking-tight">{totalCost.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</p>
          </div>
        </div>

        <div className="bg-blue-50/50 rounded-2xl p-4 sm:p-6 border border-blue-100 space-y-3">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
            <Info className="w-4 h-4" /> {t('calculator.representative_example_title')}
          </p>
          <p className="text-[11px] sm:text-xs text-gray-700 leading-relaxed font-medium">
            {t('calculator.representative_example_text', {
              amount: amount.toLocaleString(),
              duration: duration,
              monthly: monthlyPayment.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
              total: totalDue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            })}
          </p>
        </div>

        <button 
          onClick={onApply}
          className="w-full bg-emerald-600 text-white py-4 sm:py-6 rounded-2xl font-black text-base sm:text-xl shadow-2xl shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          {t('calculator.cta')}
          <TrendingUp className="w-5 h-5" />
        </button>

        <p className="text-[10px] text-gray-400 text-center font-bold leading-relaxed italic px-4">
          {t('calculator.legal_warning')}
        </p>
      </div>
    </div>
  );
};

export default LoanCalculator;