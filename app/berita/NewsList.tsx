'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag, Filter } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  created_at: string;
}

export default function NewsList({ news }: { news: NewsItem[] }) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = ["Semua", ...Array.from(new Set(news.map((item) => item.category)))];

  const filteredNews = activeCategory === "Semua" 
    ? news 
    : news.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-transparent text-white pt-10 pb-20">
      <div className="container mx-auto px-4">
        
        {/* --- FILTER BUTTONS --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 border-b border-white/5 pb-10">
          <div className="flex items-center gap-3">
            <Filter size={18} className="text-cyan-500" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Filter_Database</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-xl font-mono text-[11px] uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === category
                    ? "bg-cyan-500 text-slate-900 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    : "bg-white/5 text-slate-400 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* --- GRID NEWS WITH ANIMATION --- */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredNews.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Link 
                  href={`/berita/${item.slug}`} 
                  className="group bg-slate-900/40 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/5 flex flex-col h-full hover:border-cyan-500/40 transition-all duration-500 relative"
                >
                  {/* Decorative Scanline Effect */}
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-10"></div>

                  {/* Image Section */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-700"
                      unoptimized={true}
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-slate-900/80 backdrop-blur-md text-cyan-400 text-[9px] font-mono font-bold px-3 py-1 rounded-lg border border-cyan-500/20 uppercase tracking-tighter">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex flex-col flex-grow relative">
                    <div className="flex items-center text-[10px] font-mono text-slate-500 mb-6 gap-6 uppercase tracking-widest">
                      <span className="flex items-center gap-2">
                        <Calendar size={12} className="text-cyan-500" /> {item.created_at}
                      </span>
                      <span className="flex items-center gap-2">
                        <User size={12} className="text-blue-500" /> {item.author}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white mb-4 italic uppercase tracking-tighter leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm font-light italic line-clamp-3 mb-8 flex-grow leading-relaxed">
                      {item.excerpt}
                    </p>

                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all flex items-center gap-3">
                        Read_Article 
                        <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- EMPTY STATE --- */}
        {filteredNews.length === 0 && (
          <div className="text-center py-20 bg-slate-900/20 backdrop-blur-sm rounded-[2.5rem] border border-dashed border-white/10">
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
              Zero_Results: <span className="text-cyan-500">"{activeCategory}"</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}