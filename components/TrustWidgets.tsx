
import React from 'react';
import { ShieldCheck, Star, Users, Award } from 'lucide-react';

const TrustWidgets: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Clients satisfaits', value: '50k+' },
    { icon: Award, label: 'Années d\'expérience', value: '15+' },
    { icon: Star, label: 'Note moyenne', value: '4.9/5' },
    { icon: ShieldCheck, label: 'Sécurité garantie', value: '100%' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <stat.icon className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustWidgets;
