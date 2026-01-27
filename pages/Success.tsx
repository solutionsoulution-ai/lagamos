
import React, { useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { CheckCircle, ArrowRight, ShieldCheck, Clock, Mail, Phone, ChevronRight } from 'lucide-react';

interface SuccessProps {
  language: Language;
  onNavigate: (page: string) => void;
}

const Success: React.FC<SuccessProps> = ({ language, onNavigate }) => {
  const t = translations[language].success_page;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
          {/* Top Banner with Animation */}
          <div className="bg-blue-600 p-12 sm:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="20" cy="20" r="10" fill="white" />
                <circle cx="80" cy="50" r="15" fill="white" />
                <circle cx="40" cy="80" r="12" fill="white" />
              </svg>
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
                {t.title}
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 font-medium">
                {t.subtitle}
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-16 space-y-12">
            <div className="text-center space-y-4">
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                {t.message}
              </p>
            </div>

            {/* Next Steps */}
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-600" />
                {t.steps_title}
              </h2>
              <div className="grid gap-4">
                {t.steps.map((step: string, i: number) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center font-black text-blue-600 shadow-sm shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-lg font-bold text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators (Translated) */}
            <div className="flex flex-wrap justify-center gap-8 py-8 border-y border-gray-50">
              <div className="flex items-center gap-3 text-gray-400 font-bold text-sm uppercase tracking-widest">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                {t.trust_labels.secured}
              </div>
              <div className="flex items-center gap-3 text-gray-400 font-bold text-sm uppercase tracking-widest">
                <Mail className="w-5 h-5 text-blue-500" />
                {t.trust_labels.email}
              </div>
              <div className="flex items-center gap-3 text-gray-400 font-bold text-sm uppercase tracking-widest">
                <Phone className="w-5 h-5 text-blue-500" />
                {t.trust_labels.advisor}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => onNavigate('home')}
                className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
              >
                {t.cta_home}
                <ChevronRight className="w-6 h-6" />
              </button>
              <button 
                onClick={() => onNavigate('blog')}
                className="flex-1 bg-gray-50 text-gray-900 py-5 rounded-2xl font-black text-xl border border-gray-200 hover:bg-white transition-all flex items-center justify-center gap-3"
              >
                {t.cta_blog}
                <ArrowRight className="w-6 h-6 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
