
import React, { useEffect } from 'react';
import { LoanInfo } from '../types';
import { ICON_MAP, FIXED_RATE } from '../constants';
import { ChevronLeft, CheckCircle2, ArrowRight, ShieldCheck, Calculator, UserCheck } from 'lucide-react';
import LoanCalculator from '../components/LoanCalculator';

interface LoanDetailProps {
  loan: LoanInfo;
  onBack: () => void;
}

const LoanDetail: React.FC<LoanDetailProps> = ({ loan, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const IconComponent = ICON_MAP[loan.icon];

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold mb-12 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour aux offres
        </button>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="bg-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-200">
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                {loan.title}
              </h1>
              <p className="text-2xl text-blue-600 font-extrabold">Taux fixe unique : {FIXED_RATE}%</p>
              <p className="text-xl text-gray-600 leading-relaxed">
                {loan.longDescription}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Montant Max</p>
                <p className="text-4xl font-black text-gray-900">{loan.maxAmount.toLocaleString()} €</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Durée Max</p>
                <p className="text-4xl font-black text-gray-900">{loan.maxDuration} mois</p>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900">Vos avantages exclusifs</h3>
              <div className="grid gap-4">
                {loan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <CheckCircle2 className="w-7 h-7 text-green-500 flex-shrink-0" />
                    <span className="text-lg font-semibold text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white space-y-6 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 opacity-10">
                <ShieldCheck className="w-48 h-48 -mr-10 -mb-10" />
              </div>
              <h4 className="text-2xl font-bold">Conditions d'éligibilité</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Résider fiscalement en Europe
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Avoir plus de 18 ans
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Justifier d'un revenu stable
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-32 space-y-8">
            <LoanCalculator />
            
            <div className="grid gap-4">
              {[
                { icon: Calculator, title: "Simulation Gratuite", desc: "Aucun engagement de votre part" },
                { icon: UserCheck, title: "Conseiller dédié", desc: "Accompagnement personnalisé" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetail;
