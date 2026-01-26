
import React, { useState, useEffect, useMemo } from 'react';
import { FIXED_RATE } from '../constants';
import { TrendingUp, Calendar, Euro, Zap } from 'lucide-react';

const LoanCalculator: React.FC = () => {
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
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      <div className="bg-blue-600 p-8 text-white">
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          Simulateur Express
        </h3>
        <p className="text-blue-100 mt-2">Calculez votre mensualité instantanément au taux fixe de {FIXED_RATE}%.</p>
      </div>
      
      <div className="p-8 space-y-10">
        {/* Amount Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-gray-700 font-semibold flex items-center gap-2">
              <Euro className="w-5 h-5 text-blue-600" />
              Montant du prêt
            </label>
            <span className="text-2xl font-bold text-blue-600">{amount.toLocaleString()} €</span>
          </div>
          <input
            type="range"
            min="1000"
            max="250000"
            step="500"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 font-medium">
            <span>1 000 €</span>
            <span>250 000 €</span>
          </div>
        </div>

        {/* Duration Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-gray-700 font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Durée du remboursement
            </label>
            <span className="text-2xl font-bold text-blue-600">{duration} mois</span>
          </div>
          <input
            type="range"
            min="6"
            max="120"
            step="6"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 font-medium">
            <span>6 mois</span>
            <span>120 mois</span>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-1">Mensualité</p>
            <p className="text-4xl font-black text-blue-900">{monthlyPayment.toFixed(2)} €</p>
          </div>
          <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
            <p className="text-sm text-green-600 font-bold uppercase tracking-wider mb-1">Coût total crédit</p>
            <p className="text-4xl font-black text-green-900">{totalCost.toFixed(2)} €</p>
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
          Demander ce prêt maintenant
          <TrendingUp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default LoanCalculator;
