
import React, { useEffect } from 'react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Calendar, Clock, Facebook, Twitter, Linkedin, Share2, ArrowRight } from 'lucide-react';

interface BlogPostDetailProps {
  postId: string;
  language: Language;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ postId, language, onBack, onNavigate }) => {
  const { t } = useTranslation();
  const blogT = t('blog', { returnObjects: true }) as any;
  const post = blogT?.posts?.find((p: any) => p.id === postId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) return <div className="pt-32 text-center text-xl font-bold text-gray-400">Article introuvable</div>;

  const images: Record<string, string> = {
    'rate-2-percent': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200',
    'real-estate-2026': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
    'debt-consolidation-2026': 'https://images.unsplash.com/photo-1573163281538-559e1c48073b?auto=format&fit=crop&q=80&w=1200',
    'ai-finance-2026': 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=1200',
  };

  const dates: Record<string, string> = {
    'rate-2-percent': '12 Mars 2026',
    'real-estate-2026': '08 Avril 2026',
    'debt-consolidation-2026': '15 Avril 2026',
    'ai-finance-2026': '22 Avril 2026',
  };

  // Fonction utilitaire pour nettoyer le texte si jamais il reste des ###
  const cleanContent = (text: string) => {
    return text.replace(/### /g, ''); 
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold mb-12 transition-colors group px-4 py-2 rounded-full hover:bg-emerald-50 w-fit"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {blogT.back}
        </button>

        <article className="space-y-12">
          <div className="space-y-8 text-center">
            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 py-6 border-y border-gray-100">
              <div className="flex items-center gap-8 text-xs font-black text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-2 text-emerald-600"><Calendar className="w-4 h-4" /> {dates[postId] || '2026'}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 5 MIN LECTURE</span>
              </div>
            </div>
          </div>

          <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px] sm:h-[500px] relative group">
            <img src={images[postId]} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <div className="max-w-3xl mx-auto space-y-10">
            <p className="text-2xl sm:text-3xl text-gray-900 font-bold italic leading-relaxed text-center">
              "{post.excerpt}"
            </p>
            
            <div className="prose prose-lg sm:prose-xl max-w-none text-gray-600 leading-relaxed font-medium whitespace-pre-line text-justify">
              {cleanContent(post.content)}
            </div>

            {/* CTA Section */}
            <div className="bg-emerald-50 rounded-[2.5rem] p-8 sm:p-12 text-center space-y-6 my-16 border border-emerald-100">
               <h3 className="text-2xl sm:text-4xl font-black text-emerald-900">Convaincu ? Lancez votre projet maintenant.</h3>
               <p className="text-emerald-700 font-medium text-lg">Profitez de notre taux fixe exceptionnel de 2% dès aujourd'hui.</p>
               <button 
                 onClick={() => onNavigate('loan-application')}
                 className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 hover:scale-105 transition-all"
               >
                 Lancer ma demande <ArrowRight className="w-5 h-5" />
               </button>
            </div>

            <div className="border-t border-gray-100 pt-10 mt-10">
               <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Partager cet article</span>
                  <div className="flex gap-3">
                    {[Facebook, Twitter, Linkedin, Share2].map((Icon, i) => (
                      <button key={i} className="p-3 bg-gray-50 rounded-full hover:bg-emerald-600 hover:text-white transition-all text-gray-400">
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostDetail;
