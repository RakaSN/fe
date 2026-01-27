"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MonitorPlay, 
  FileSpreadsheet, 
  Library, 
  Briefcase, 
  ArrowRight, 
  CalendarDays,
  Megaphone,
  MessageSquareWarning
} from "lucide-react";

// 1. Tipe Data Berita (KEMBALI KE CREATED_AT)
export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  created_at: string; // <--- SAYA KEMBALIKAN KE SINI
}

// 2. Props Component
interface LayananSectionProps {
  latestNews?: NewsItem[]; 
}

// Data Ecosystem Digital (Statis)
const services = [
  {
    title: "Learning Management System",
    desc: "Akses materi pelajaran, tugas, dan ujian online terpusat.",
    icon: <MonitorPlay size={24} />,
    href: "/lms",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "group-hover:border-cyan-500/50"
  },
  {
    title: "E-Rapor & Presensi",
    desc: "Pantau nilai akademik dan kehadiran siswa secara real-time.",
    icon: <FileSpreadsheet size={24} />,
    href: "/rapor",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "group-hover:border-yellow-500/50"
  },
  {
    title: "Digital Library",
    desc: "Akses ribuan e-book, jurnal, dan modul pembelajaran gratis.",
    icon: <Library size={24} />,
    href: "/perpus",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/50"
  },
  {
    title: "BKK & Portal Alumni",
    desc: "Info lowongan kerja, magang industri, dan jejaring alumni.",
    icon: <Briefcase size={24} />,
    href: "/bkk",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "group-hover:border-purple-500/50"
  },
  // Item ke-5: LAYANAN PENGADUAN
  {
    title: "Layanan Pengaduan",
    desc: "Suarakan aspirasi, laporan bullying, atau saran secara aman & rahasia.",
    icon: <MessageSquareWarning size={24} />,
    href: "/pengaduan",
    color: "text-rose-400", 
    bg: "bg-rose-500/10",
    border: "group-hover:border-rose-500/50"
  }
];

export default function LayananSection({ latestNews = [] }: LayananSectionProps) {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* --- KOLOM KIRI: ECOSYSTEM DIGITAL --- */}
          <div>
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
             >
                <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                  Integrated System
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Ecosystem <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Digital</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                  Integrasi teknologi pembelajaran modern untuk mendukung aktivitas siswa, guru, dan orang tua dalam satu genggaman.
                </p>
             </motion.div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={index === services.length - 1 ? "sm:col-span-2" : ""}
                  >
                    <Link 
                      href={item.href} 
                      className={`group block bg-slate-900 border border-white/10 p-6 rounded-2xl hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1 ${item.border}`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </Link>
                  </motion.div>
                ))}
             </div>
          </div>

          {/* --- KOLOM KANAN: INFO TERKINI --- */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-2xl h-full flex flex-col">
              
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2"></div>

              <div className="flex justify-between items-end mb-8 relative z-10">
                <div>
                   <div className="flex items-center gap-2 mb-2">
                      <Megaphone size={16} className="text-cyan-400 animate-pulse" />
                      <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">Update Sekolah</span>
                   </div>
                   <h2 className="text-3xl font-bold text-white">Info Terkini</h2>
                </div>
                <Link href="/berita" className="text-sm text-slate-400 hover:text-white transition flex items-center gap-1 group">
                  Lihat Semua <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* LIST BERITA */}
              <div className="flex-grow space-y-4 relative z-10">
                {latestNews.length > 0 ? (
                  latestNews.map((item) => (
                    <Link 
                      href={`/berita/${item.slug}`} 
                      key={item.id}
                      className="block bg-slate-950/50 hover:bg-slate-800 rounded-xl p-5 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1 text-slate-500 text-xs">
                           <CalendarDays size={12} />
                           
                           {/* V-- DI SINI SUDAH SAYA GANTI JADI created_at LAGI */}
                           {item.created_at} 
                        </div>
                      </div>
                      <h3 className="text-white font-medium leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>
                  ))
                ) : (
                  <div className="h-40 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-xl text-slate-500">
                      <Megaphone size={32} className="mb-2 opacity-20" />
                      <p className="text-sm">Belum ada info terbaru.</p>
                  </div>
                )}
              </div>
              
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}