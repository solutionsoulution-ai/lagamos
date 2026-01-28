
import React, { useRef, useEffect } from 'react';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import { Language, Testimonial } from '../types';
import { translations } from '../translations';

interface ReviewsSectionProps { 
  language: Language; 
  customReviews?: Testimonial[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ language, customReviews }) => {
  const t = translations[language].testimonials;
  const scrollRef = useRef<HTMLDivElement>(null);
  const reviews = customReviews || TESTIMONIALS;

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const cardWidth = 400;
      const scrollTo = direction === 'left' ? scrollLeft - cardWidth : scrollLeft + cardWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-12 relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">{t.h2}</h2>
          <p className="text-sm sm:text-xl text-gray-600 font-medium">{t.p}</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => scroll('left')}
            className="p-4 rounded-2xl bg-white border border-gray-100 shadow-lg hover:bg-blue-600 hover:text-white transition-all group"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-4 rounded-2xl bg-white border border-gray-100 shadow-lg hover:bg-blue-600 hover:text-white transition-all group"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory touch-pan-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="flex-none w-[300px] sm:w-[400px] snap-center"
          >
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all h-full flex flex-col">
              <Quote className="absolute -top-4 -right-4 w-20 h-20 text-gray-50 group-hover:text-blue-50 transition-colors" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 italic mb-8 flex-grow leading-relaxed text-lg">
                  "{review.content}"
                </p>

                <div className="flex items-center gap-4 border-t border-gray-50 pt-6 mt-auto">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <p className="font-bold text-gray-900 flex items-center gap-1 text-lg">
                      {review.name}
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    </p>
                    <p className="text-xs text-gray-500 font-black uppercase tracking-widest">{review.role}</p>
                  </div>
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
