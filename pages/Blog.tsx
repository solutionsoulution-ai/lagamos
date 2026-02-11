
import React from 'react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

interface BlogProps {
  language: Language;
  onSelectPost: (postId: string) => void;
  postsData: any[];
}

const Blog: React.FC<BlogProps> = ({ language, onSelectPost, postsData }) => {
  const { t } = useTranslation();
  const blogT = t('blog', { returnObjects: true }) as any;
  
  const blogMeta = [
    { id: 'rate-2-percent', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800', category: 'Finance', date: '12 Mars 2026' },
    { id: 'real-estate-2026', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800', category: 'Immobilier', date: '08 Avril 2026' },
    { id: 'debt-consolidation-2026', image: 'https://images.unsplash.com/photo-1573163281538-559e1c48073b?auto=format&fit=crop&q=80&w=800', category: 'Budget', date: '15 Avril 2026' },
    { id: 'ai-finance-2026', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800', category: 'Tech & Banques', date: '22 Avril 2026' },
  ];

  // Fusionner les données de traduction avec les métadonnées (images, dates)
  const posts = (postsData || []).map((post: any) => ({
    ...post,
    ...blogMeta.find(m => m.id === post.id)
  })).filter((post: any) => post.image); // Filtrer si pas de métadonnées trouvées

  if (!blogT) return null;

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h1 className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tight">{blogT.title}</h1>
          <p className="text-xl text-gray-600 font-medium">{blogT.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {posts.map((post: any) => (
            <div 
              key={post.id}
              onClick={() => onSelectPost(post.id)}
              className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-80 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute top-6 left-6">
                  <span className="glass-effect bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 shadow-lg">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-10 space-y-6">
                <div className="flex items-center gap-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2 text-emerald-600"><Calendar className="w-4 h-4" /> {post.date}</span>
                </div>
                <h2 className="text-3xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight">{post.title}</h2>
                <p className="text-gray-500 font-medium line-clamp-3 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-emerald-600 font-black text-lg group-hover:gap-4 transition-all pt-4">
                  {blogT.readMore} <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
