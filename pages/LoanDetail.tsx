
import React, { useEffect } from 'react';
import { LoanInfo, Language } from '../types';
import { ICON_MAP, FIXED_RATE } from '../constants';
import { ChevronLeft, CheckCircle2, ShieldCheck, Calculator, UserCheck } from 'lucide-react';
import LoanCalculator from '../components/LoanCalculator';
import { translations } from '../translations';

interface LoanDetailProps {
  loan: LoanInfo;
  onBack: () => void;
  language: Language;
}

const LoanDetail: React.FC<LoanDetailProps> = ({ loan, onBack, language }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const IconComponent = ICON_MAP[loan.icon];
  const t = translations[language].loan_detail;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold mb-12 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t.back}
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
              <p className="text-2xl text-blue-600 font-extrabold">{translations[language].hero.badge.split(':')[0]}: {FIXED_RATE}%</p>
              <p className="text-xl text-gray-600 leading-relaxed">
                {loan.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{t.labels.maxAmount}</p>
                <p className="text-4xl font-black text-gray-900">{loan.maxAmount.toLocaleString()} €</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{t.labels.maxDuration}</p>
                <p className="text-4xl font-black text-gray-900">{loan.maxDuration} {translations[language].calculator.months}</p>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900">{t.advantages}</h3>
              <div className="grid gap-4">
                {t.conditions.map((feature: string, i: number) => (
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
              <h4 className="text-2xl font-bold">{t.eligibility}</h4>
              <ul className="space-y-4 text-gray-400">
                {t.conditions.map((cond: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {cond}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-32 space-y-8">
            <LoanCalculator 
              language={language} 
              onApply={() => {
                // We need to trigger a navigation to the application form
                // This will be handled by the App component as it provides handleNavigate('loan-application')
                // For now, in this scope we'll assume App component passed the correct handler via a prop if we were in a real router.
                // Since App.tsx is the parent, we'll make sure it's wired correctly.
                window.dispatchEvent(new CustomEvent('navigate-to-application'));
              }} 
            />
            
            <div className="grid gap-4">
              {[
                { icon: Calculator, title: t.sim_title, desc: t.sim_desc },
                { icon: UserCheck, title: t.advisor_title, desc: t.advisor_desc },
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
