
import React from 'react';
import { MousePointerClick, FileCheck, Landmark, ShieldCheck, Zap, ArrowDownToLine } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface WidgetProps { language: Language; }

export const RateComparison: React.FC<WidgetProps> = ({ language }) => {
  const t = translations[language].comparison;
  return (
    <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-gray-100 shadow-2xl">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-black text-gray-900 mb-6">{t.h3.split(' ')[0]} <span className="text-emerald-600">{t.h3.split(' ').slice(1).join(' ')}</span></h3>
          <p className="text-gray-600 text-lg mb-8">{t.p}</p>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-gray-500 uppercase">
                <span>{t.market}</span>
                <span>5.45%</span>
              </div>
              <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden"><div className="bg-gray-400 h-full w-[85%]"></div></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-emerald-600 uppercase">
                <span>{t.ours}</span>
                <span>2.00%</span>
              </div>
              <div className="w-full bg-emerald-100 h-4 rounded-full overflow-hidden"><div className="bg-emerald-600 h-full w-[35%] animate-pulse"></div></div>
            </div>
          </div>
        </div>
        <div className="bg-emerald-50 rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm"><ArrowDownToLine className="w-10 h-10 text-emerald-600" /></div>
          <p className="text-4xl font-black text-teal-900">-3.45%</p>
          <p className="text-teal-700 font-semibold italic text-lg">{t.saving}</p>
        </div>
      </div>
    </div>
  );
};

export const StepByStep: React.FC<WidgetProps> = ({ language }) => {
  const t = translations[language].process;
  const steps = [
    { icon: MousePointerClick, title: t.s1t, desc: t.s1d, color: "bg-orange-50 text-orange-600" },
    { icon: FileCheck, title: t.s2t, desc: t.s2d, color: "bg-emerald-50 text-emerald-600" },
    { icon: Landmark, title: t.s3t, desc: t.s3d, color: "bg-teal-50 text-teal-600" }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {steps.map((step, i) => (
        <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl relative z-10">
          <div className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}><step.icon className="w-8 h-8" /></div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">0{i+1}. {step.title}</h4>
          <p className="text-gray-500 font-medium">{step.desc}</p>
        </div>
      ))}
    </div>
  );
};

export const SecurityBanner: React.FC<WidgetProps> = ({ language }) => {
  const t = translations[language].security;
  return (
    <div className="bg-gray-50 border-y border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-12 lg:gap-24 grayscale opacity-60">
        <div className="flex items-center gap-3"><ShieldCheck className="w-8 h-8 text-emerald-600" /> <span className="font-bold text-gray-900 tracking-tight">{t.rgpd}</span></div>
        <div className="flex items-center gap-3"><Zap className="w-8 h-8 text-emerald-600" /> <span className="font-bold text-gray-900 tracking-tight">{t.h24}</span></div>
        <div className="flex items-center gap-3"><Landmark className="w-8 h-8 text-emerald-600" /> <span className="font-bold text-gray-900 tracking-tight">{t.orias}</span></div>
      </div>
    </div>
  );
};
