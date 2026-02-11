
import React, { useRef, useEffect, useState } from 'react';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import { Language, Testimonial } from '../types';
import { useTranslation } from 'react-i18next';

interface ReviewsSectionProps { 
  language: Language; 
  customReviews?: Testimonial[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ language, customReviews }) => {
  const { t } = useTranslation();
  const reviewsT = t('testimonials', { returnObjects: true }) as any;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const reviews = customReviews || TESTIMONIALS;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const firstChild = scrollRef.current.firstChild as HTMLElement;
      const itemWidth = firstChild ? firstChild.offsetWidth + 24 : clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - itemWidth : scrollLeft + itemWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!reviewsT) return null;

  return (
    <div className="py-12 relative group/section">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
            <Star className="w-4 h-4 fill-emerald-600" />
            {t('testimonials.h2', { defaultValue: 'Avis Clients' })}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight">{reviewsT.h2}</h2>
          <p className="text-sm sm:text-xl text-gray-600 font-medium">{reviewsT.p}</p>
        </div>
        
        <div className="flex gap-3">
          <button onClick={() => { scroll('left'); setIsPaused(true); }} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-lg hover:bg-emerald-600 hover:text-white transition-all group active:scale-90"><ChevronLeft className="w-6 h-6" /></button>
          <button onClick={() => { scroll('right'); setIsPaused(true); }} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-lg hover:bg-emerald-600 hover:text-white transition-all group active:scale-90"><ChevronRight className="w-6 h-6" /></button>
        </div>
      </div>

      <div ref={scrollRef} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onTouchStart={() => setIsPaused(true)} className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory touch-pan-x" style={{ scrollBehavior: 'smooth' }}>
        {reviews.map((review) => (
          <div key={review.id} className="flex-none w-[85%] sm:w-[450px] snap-center">
            <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all h-full flex flex-col hover:-translate-y-1 duration-500">
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-gray-50 group-hover:text-emerald-50 transition-colors duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex text-yellow-400 mb-8">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-10 flex-grow leading-relaxed text-lg sm:text-xl font-medium">"{review.content}"</p>
                <div className="flex items-center gap-5 border-t border-gray-50 pt-8 mt-auto">
                  <div className="relative">
                    <img src={review.avatar} alt={review.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-white shadow-md" />
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-white"><CheckCircle2 className="w-3 h-3 text-white" /></div>
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-lg sm:text-xl">{review.name}</p>
                    <p className="text-[10px] sm:text-xs text-emerald-600 font-black uppercase tracking-[0.2em]">{review.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default ReviewsSection;
