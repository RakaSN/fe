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
  MessageSquareWarning,
  Activity
} from "lucide-react";

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  created_at: string;
}

interface LayananSectionProps {
  latestNews?: NewsItem[]; 
}

const services = [
  {
    title: "Learning Management System",
    desc: "Akses materi pelajaran, tugas, dan ujian online terpusat.",
    icon: <MonitorPlay size={24} />,
    href: "/lms",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "E-Rapor & Presensi",
    desc: "Pantau nilai akademik dan kehadiran siswa secara real-time.",
    icon: <FileSpreadsheet size={24} />,
    href: "/rapor",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Digital Library",
    desc: "Akses ribuan e-book, jurnal, dan modul pembelajaran gratis.",
    icon: <Library size={24} />,
    href: "/perpus",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "BKK & Portal Alumni",
    desc: "Info lowongan kerja, magang industri, dan jejaring alumni.",
    icon: <Briefcase size={24} />,
    href: "/bkk",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    title: "Layanan Pengaduan",
    desc: "Suarakan aspirasi, laporan bullying, atau saran secara aman & rahasia.",
    icon: <MessageSquareWarning size={24} />,
    href: "/pengaduan",
    color: "text-rose-400", 
    bg: "bg-rose-500/10",
  }
];

export default function LayananSection({ latestNews = [] }: LayananSectionProps) {
  return (
    // 1. bg-transparent agar grid global dari layout.tsx terlihat tembus
    <section className="py-24 bg-[#020617] relative overflow-hidden">
      {/* --- UNIFIED BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* --- KOLOM KIRI: ECOSYSTEM DIGITAL --- */}
          <div>
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-8 bg-cyan-500"></div>
                    <span className="text-cyan-500 text-[10px] font-mono tracking-[0.4em] uppercase">
                      Core_Infrastructure
                    </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
                  Ecosystem <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 pr-6">
                    Digital_Hub
                  </span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-lg font-light">
                  Integrasi teknologi pembelajaran modern dalam satu genggaman digital untuk efisiensi akademik.
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
                      className="group block bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:bg-slate-800/60 transition-all duration-500 hover:border-white/20 relative overflow-hidden"
                    >
                      {/* Corner Accents (Sama dengan JurusanCard) */}
                      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:border-white/30 transition-colors duration-500 rounded-tr-2xl" />
                      
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${item.bg} ${item.color} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                        {item.icon}
                      </div>
                      
                      <h3 className="text-lg font-black text-white mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-tighter italic">
                        {item.title}
                      </h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed font-mono line-clamp-2">
                        {item.desc}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
          </div>

          {/* --- KOLOM KANAN: INFO TERKINI (Style Terminal) --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
              
              {/* Scanline Effect (Sama dengan KeunggulanSection) */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,6px_100%] opacity-10"></div>

              <div className="flex justify-between items-center mb-10 relative z-10">
                <div>
                   <div className="flex items-center gap-2 mb-1">
                      <Activity size={14} className="text-cyan-400" />
                      <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.3em]">System_Feed</span>
                   </div>
                   <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">News_Archive</h2>
                </div>
                <Link href="/berita" className="group flex items-center gap-2 text-[10px] font-mono text-slate-500 hover:text-white transition-all uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  Expand <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* LIST BERITA */}
              <div className="space-y-4 relative z-10">
                {latestNews.length > 0 ? (
                  latestNews.map((item) => (
                    <Link 
                      href={`/berita/${item.slug}`} 
                      key={item.id}
                      className="block bg-black/40 hover:bg-white/5 rounded-xl p-5 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] font-mono font-bold text-cyan-400 border border-cyan-400/20 px-2 py-0.5 rounded tracking-tighter uppercase">
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1 text-slate-600 font-mono text-[10px]">
                           <CalendarDays size={10} />
                           {item.created_at} 
                        </div>
                      </div>
                      <h3 className="text-white font-bold leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2 uppercase tracking-tight text-sm italic">
                        {item.title}
                      </h3>
                    </Link>
                  ))
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl text-slate-600">
                      <Megaphone size={32} className="mb-4 opacity-10" />
                      <p className="text-[10px] font-mono tracking-[0.5em] uppercase">No_Recent_Logs</p>
                  </div>
                )}
              </div>
              
              {/* Terminal Footer Decor */}
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-40">
                  <div className="text-[9px] font-mono text-slate-500 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    ENCRYPTED_LINK_ACTIVE
                  </div>
                  <div className="text-[9px] font-mono text-slate-500 italic uppercase">ver_1.0_smk</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}