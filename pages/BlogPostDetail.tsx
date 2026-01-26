
import React, { useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { ChevronLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

interface BlogPostDetailProps {
  postId: string;
  language: Language;
  onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ postId, language, onBack }) => {
  const t = translations[language].blog;
  const post = t.posts.find((p: any) => p.id === postId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) return null;

  // Metadata mapping (keeping images consistent)
  const images: Record<string, string> = {
    'rate-2-percent': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200',
    'real-estate-2024': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
    'debt-consolidation': 'https://images.unsplash.com/photo-1573163281538-559e1c48073b?auto=format&fit=crop&q=80&w=1200',
    'entrepreneurship-financing': 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=1200',
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold mb-12 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t.back}
        </button>

        <article className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-gray-100">
              <div className="flex items-center gap-8 text-sm text-gray-400 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-2 text-blue-600"><Calendar className="w-4 h-4" /> 12 MARS 2024</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 6 MIN LECTURE</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Partager</span>
                <div className="flex gap-2">
                  {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                    <button key={i} className="p-2 bg-gray-50 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px]">
            <img src={images[postId]} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-xl max-w-none text-gray-600 leading-relaxed space-y-8 font-medium">
            <p className="text-2xl text-gray-900 font-bold italic border-l-4 border-blue-600 pl-8 py-2">
              {post.excerpt}
            </p>
            <p>{post.content}</p>
            <p>Dans la gestion de votre patrimoine, chaque pourcentage compte. En choisissant FinancePlus, vous optez pour la clarté et la pérennité. Nos experts sont à votre disposition pour détailler comment cette offre s'applique spécifiquement à votre situation personnelle ou professionnelle.</p>
          </div>

          <div className="bg-blue-600 rounded-[2.5rem] p-10 sm:p-16 text-white text-center space-y-8 shadow-2xl shadow-blue-200">
            <h3 className="text-3xl sm:text-4xl font-black">Prêt à franchir le pas ?</h3>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">Rejoignez plus de 50 000 clients qui ont fait confiance à FinancePlus pour leurs projets à 2%.</p>
            <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform">Démarrer ma simulation gratuite</button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostDetail;
