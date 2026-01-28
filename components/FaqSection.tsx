
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Language, FaqItem } from '../types';
import { translations } from '../translations';

interface FaqSectionProps { 
  language: Language; 
  customFaqs?: FaqItem[];
}

const FaqSection: React.FC<FaqSectionProps> = ({ language, customFaqs }) => {
  const t = translations[language].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = customFaqs || [
    { q: t.q1, a: t.a1 },
    { q: t.q2, a: t.a2 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
  ];

  return (
    <div className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{t.h2}</h2>
        <p className="text-sm sm:text-xl text-gray-600">{t.p}</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left p-6 flex justify-between items-center gap-4 transition-colors"
            >
              <span className="font-bold text-gray-900 text-base sm:text-lg leading-tight">
                {faq.q}
              </span>
              <div className="bg-gray-50 p-2 rounded-full shrink-0">
                {openIndex === i ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </button>
            {openIndex === i && (
              <div className="px-6 pb-6 text-gray-600 text-sm sm:text-base border-t border-gray-50 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
