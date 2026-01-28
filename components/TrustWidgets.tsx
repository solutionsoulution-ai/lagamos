
import React from 'react';
import { ShieldCheck, Star, Users, Award } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface TrustWidgetsProps { language: Language; }

const TrustWidgets: React.FC<TrustWidgetsProps> = ({ language }) => {
  const t = translations[language].stats;
  const stats = [
    { icon: Users, label: t.clients, value: '50k+' },
    { icon: Award, label: t.exp, value: '15+' },
    { icon: Star, label: t.rating, value: '4.9/5' },
    { icon: ShieldCheck, label: t.safety, value: '100%' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <stat.icon className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 tracking-tight">{stat.value}</p>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustWidgets;
