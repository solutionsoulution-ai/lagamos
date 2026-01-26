
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface BlogProps {
  language: Language;
  onSelectPost: (postId: string) => void;
}

const Blog: React.FC<BlogProps> = ({ language, onSelectPost }) => {
  const t = translations[language].blog;
  
  // High quality images for the 4 blogs
  const blogMeta = [
    { id: 'rate-2-percent', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800', category: 'Finance', date: '12 Mar 2024', readTime: '5 min' },
    { id: 'real-estate-2024', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800', category: 'Immobilier', date: '08 Mar 2024', readTime: '7 min' },
    { id: 'debt-consolidation', image: 'https://images.unsplash.com/photo-1573163281538-559e1c48073b?auto=format&fit=crop&q=80&w=800', category: 'Budget', date: '05 Mar 2024', readTime: '6 min' },
    { id: 'entrepreneurship-financing', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800', category: 'Business', date: '01 Mar 2024', readTime: '4 min' },
  ];

  const posts = t.posts.map((post: any) => ({
    ...post,
    ...blogMeta.find(m => m.id === post.id)
  }));

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h1 className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tight">{t.title}</h1>
          <p className="text-xl text-gray-600 font-medium">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
          {posts.map((post: any) => (
            <div 
              key={post.id}
              onClick={() => onSelectPost(post.id)}
              className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="glass-effect bg-white/80 px-4 py-2 rounded-full text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-10 space-y-6">
                <div className="flex items-center gap-6 text-sm text-gray-400 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</span>
                </div>
                
                <h2 className="text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-gray-500 text-lg leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-blue-600 font-black text-lg group-hover:gap-4 transition-all">
                  {t.readMore} <ArrowRight className="w-6 h-6" />
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
