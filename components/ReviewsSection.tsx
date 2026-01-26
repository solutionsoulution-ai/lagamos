
import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import { Language } from '../types';
import { translations } from '../translations';

interface ReviewsSectionProps { language: Language; }

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ language }) => {
  const t = translations[language].testimonials;

  return (
    <div className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{t.h2}</h2>
        <p className="text-sm sm:text-xl text-gray-600">{t.p}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TESTIMONIALS.map((review) => (
          <div 
            key={review.id} 
            className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-all"
          >
            <Quote className="absolute -top-4 -right-4 w-24 h-24 text-gray-50 group-hover:text-blue-50 transition-colors" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 italic mb-8 flex-grow leading-relaxed">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <p className="font-bold text-gray-900 flex items-center gap-1">
                    {review.name}
                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                  </p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{review.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
