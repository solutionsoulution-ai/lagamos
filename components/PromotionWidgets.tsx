
import React from 'react';
import { MousePointerClick, FileCheck, Landmark, ShieldCheck, Zap, ArrowDownToLine } from 'lucide-react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';

interface WidgetProps { language: Language; }

export const RateComparison: React.FC<WidgetProps> = () => {
  const { t } = useTranslation();
  const heading = t('comparison.h3');
  const words = heading.split(' ');
  const firstWord = words[0];
  const rest = words.slice(1).join(' ');

  return (
    <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 border border-gray-100 shadow-2xl">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6">{firstWord} <span className="text-emerald-600">{rest}</span></h3>
          <p className="text-sm sm:text-lg text-gray-600 mb-8 font-medium leading-relaxed">{t('comparison.p')}</p>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span>{t('comparison.market')}</span>
                <span>5.45%</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden"><div className="bg-gray-300 h-full w-[85%]"></div></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                <span>{t('comparison.ours')}</span>
                <span>2.00%</span>
              </div>
              <div className="w-full bg-emerald-100 h-3 rounded-full overflow-hidden"><div className="bg-emerald-600 h-full w-[35%] animate-pulse"></div></div>
            </div>
          </div>
        </div>
        <div className="bg-emerald-50 rounded-3xl p-6 sm:p-10 flex flex-col justify-center items-center text-center space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm"><ArrowDownToLine className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" /></div>
          <p className="text-3xl sm:text-4xl font-black text-teal-900">-3.45%</p>
          <p className="text-teal-700 font-bold italic text-sm sm:text-lg">{t('comparison.saving')}</p>
        </div>
      </div>
    </div>
  );
};

export const StepByStep: React.FC<WidgetProps> = () => {
  const { t } = useTranslation();
  const steps = [
    { icon: MousePointerClick, title: t('process.s1t'), desc: t('process.s1d'), color: "bg-orange-50 text-orange-600" },
    { icon: FileCheck, title: t('process.s2t'), desc: t('process.s2d'), color: "bg-emerald-50 text-emerald-600" },
    { icon: Landmark, title: t('process.s3t'), desc: t('process.s3d'), color: "bg-teal-50 text-teal-600" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
      {steps.map((step, i) => (
        <div key={i} className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-xl relative">
          <div className={`${step.color} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6`}><step.icon className="w-7 h-7 sm:w-8 sm:h-8" /></div>
          <h4 className="text-lg sm:text-xl font-black text-gray-900 mb-2">0{i+1}. {step.title}</h4>
          <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed">{step.desc}</p>
        </div>
      ))}
    </div>
  );
};

export const SecurityBanner: React.FC<WidgetProps> = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-50 border-y border-gray-200 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-24 opacity-60">
        <div className="flex items-center gap-2 sm:gap-3"><ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" /> <span className="text-[10px] sm:text-sm font-black text-gray-900 tracking-widest">{t('security.rgpd')}</span></div>
        <div className="flex items-center gap-2 sm:gap-3"><Zap className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" /> <span className="text-[10px] sm:text-sm font-black text-gray-900 tracking-widest">{t('security.h24')}</span></div>
        <div className="flex items-center gap-2 sm:gap-3"><Landmark className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" /> <span className="text-[10px] sm:text-sm font-black text-gray-900 tracking-widest">{t('security.orias')}</span></div>
      </div>
    </div>
  );
};
