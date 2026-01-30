
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Star, Users, Award } from 'lucide-react';
import { Language } from '../types';

interface TrustWidgetsProps { language: Language; }

const TrustWidgets: React.FC<TrustWidgetsProps> = () => {
  const { t } = useTranslation();
  
  const stats = [
    { icon: Users, label: t('stats.clients'), value: '50k+', delay: 'delay-1' },
    { icon: Award, label: t('stats.exp'), value: '15+', delay: 'delay-2' },
    { icon: Star, label: t('stats.rating'), value: '4.9/5', delay: 'delay-3' },
    { icon: ShieldCheck, label: t('stats.safety'), value: '100%', delay: 'delay-4' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {stats.map((stat, i) => (
        <div key={i} className={`reveal-item ${stat.delay} bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-xl transition-all hover:-translate-y-2 group`}>
          <div className="bg-emerald-50 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-500">
            <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 group-hover:text-white transition-colors" />
          </div>
          <p className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">{stat.value}</p>
          <p className="text-[10px] sm:text-xs text-gray-400 font-black uppercase tracking-widest mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustWidgets;
