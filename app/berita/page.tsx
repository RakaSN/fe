"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, Tag, ArrowRight, User } from "lucide-react";

// Data Berita Dummy
const newsData = [
  {
    id: 1,
    title: "Tim Robotics Sabet Emas di Tokyo Tech Expo 2024",
    excerpt: "Inovasi robot pemilah sampah berbasis AI karya siswa kelas 11 berhasil memukau juri internasional dan mengalahkan 50 negara peserta.",
    date: "14 Okt 2024",
    category: "Prestasi",
    author: "Admin Sekolah",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070",
    featured: true // Berita Utama
  },
  {
    id: 2,
    title: "Workshop Metaverse: Belajar Bikin Dunia Virtual Sendiri",
    excerpt: "Kolaborasi dengan Meta Indonesia, siswa diajak membangun ruang kelas virtual menggunakan Unity dan Blender.",
    date: "10 Okt 2024",
    category: "Event",
    author: "Humas",
    image: "https://images.unsplash.com/photo-1617802690992-1ce567c68e6d?q=80&w=2070",
    featured: false
  },
  {
    id: 3,
    title: "Update Sistem: E-Rapor Versi 5.0 Rilis Hari Ini",
    excerpt: "Tampilan baru, akses lebih cepat, dan fitur analisis grafik nilai siswa sudah bisa diakses orang tua.",
    date: "08 Okt 2024",
    category: "Teknologi",
    author: "IT Support",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    featured: false
  },
  {
    id: 4,
    title: "Kunjungan Industri ke Kantor Google Indonesia",
    excerpt: "Siswa jurusan RPL melihat langsung budaya kerja di perusahaan teknologi raksasa dunia.",
    date: "01 Okt 2024",
    category: "Kegiatan",
    author: "Humas",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
    featured: false
  },
];

export default function BeritaPage() {
  const featuredNews = newsData.find(n => n.featured);
  const regularNews = newsData.filter(n => !n.featured);

  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-20">
      
      {/* HEADER & SEARCH */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
            <div>
                <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-5xl font-extrabold text-white mb-4"
                >
                    Jendela <span className="text-cyan-400">Informasi</span>
                </motion.h1>
                <p className="text-slate-400">Update terkini seputar prestasi, teknologi, dan kegiatan sekolah.</p>
            </div>

            {/* Search Bar */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full md:w-80 relative group"
            >
                <input 
                    type="text" 
                    placeholder="Cari berita..." 
                    className="w-full bg-slate-900 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
            </motion.div>
        </div>

        {/* Categories (Filter) */}
        <div className="flex flex-wrap gap-3 pb-6 border-b border-white/10">
            {["Semua", "Prestasi", "Teknologi", "Event", "Akademik"].map((cat, i) => (
                <button key={i} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    {cat}
                </button>
            ))}
        </div>
      </section>

      {/* FEATURED NEWS (BIG CARD) */}
      <section className="container mx-auto px-4 mb-16">
        {featuredNews && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/9] md:aspect-[21/9]"
            >
                <Image 
                    src={featuredNews.image} 
                    alt={featuredNews.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-4xl">
                    <span className="inline-block px-3 py-1 bg-cyan-600 text-white text-xs font-bold rounded-lg mb-4">
                        {featuredNews.category}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-400 transition-colors">
                        <Link href="#">{featuredNews.title}</Link>
                    </h2>
                    <p className="text-slate-300 text-lg mb-6 line-clamp-2 md:line-clamp-none">
                        {featuredNews.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-slate-400">
                        <span className="flex items-center gap-2"><Calendar size={16} /> {featuredNews.date}</span>
                        <span className="flex items-center gap-2"><User size={16} /> {featuredNews.author}</span>
                    </div>
                </div>
            </motion.div>
        )}
      </section>

      {/* NEWS GRID */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularNews.map((news, index) => (
                <motion.article 
                    key={news.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group flex flex-col bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all"
                >
                    {/* Image Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                        <Image 
                            src={news.image} 
                            alt={news.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="px-2 py-1 bg-slate-950/80 backdrop-blur text-cyan-400 text-xs font-bold rounded border border-white/10">
                                {news.category}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                            <Calendar size={14} /> {news.date}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                            <Link href="#">{news.title}</Link>
                        </h3>
                        <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                            {news.excerpt}
                        </p>
                        
                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                <User size={12} /> {news.author}
                            </span>
                            <Link href="#" className="text-cyan-400 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                                Baca <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </motion.article>
            ))}
        </div>

        {/* Pagination Dummy */}
        <div className="mt-16 text-center">
            <button className="px-8 py-3 rounded-full border border-white/10 text-white hover:bg-white/10 transition-all font-medium">
                Muat Lebih Banyak
            </button>
        </div>
      </section>

    </main>
  );
}