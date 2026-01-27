'use client'; // Wajib ada karena kita main state (interaksi klik)

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion'; // Opsional: Biar animasi mulus (bisa dihapus jika error)

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

  // --- LOGIKA KATEGORI DINAMIS ---
  // 1. Ambil semua kategori dari data berita
  // 2. Buat jadi unik (hapus duplikat) pakai Set
  // 3. Tambahkan "Semua" di paling depan
  const categories = ["Semua", ...Array.from(new Set(news.map((item) => item.category)))];

  // --- LOGIKA FILTER ---
  const filteredNews = activeCategory === "Semua" 
    ? news 
    : news.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Lensa <span className="text-blue-500">Kampus</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dokumentasi hidup aktivitas, fasilitas, dan karya terbaik siswa.
          </p>
        </div>

        {/* Filter Buttons (DINAMIS) */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid News */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <Link 
              href={`/berita/${item.slug}`} 
              key={item.id}
              className="group bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full hover:-translate-y-2 border border-gray-700/50"
            >
              {/* Gambar */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized={true}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow relative">
                <div className="flex items-center text-xs text-gray-400 mb-4 gap-4">
                  <span className="flex items-center gap-1">
                    📅 {item.created_at}
                  </span>
                  <span className="flex items-center gap-1">
                    ✍️ {item.author}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {item.excerpt}
                </p>

                <div className="pt-4 border-t border-gray-700/50 flex items-center justify-between">
                  <span className="text-blue-400 font-medium text-sm group-hover:text-blue-300 transition-colors flex items-center gap-2">
                    Baca Selengkapnya 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* State Kosong */}
        {filteredNews.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-800/50 rounded-3xl p-8 inline-block">
              <p className="text-gray-400 text-lg">Belum ada artikel di kategori <span className="text-blue-400 font-bold">"{activeCategory}"</span>.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}