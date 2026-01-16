"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  MonitorPlay, 
  BookOpen, 
  FileText, 
  Users, 
  Bell, 
  Calendar, 
  ArrowUpRight, 
  Laptop2 
} from "lucide-react";

// Data Layanan (Apps)
const services = [
  {
    title: "E-Learning (LMS)",
    desc: "Akses materi & tugas online.",
    icon: <MonitorPlay size={32} />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50",
    href: "#"
  },
  {
    title: "Digital Library",
    desc: "Ribuan e-book & jurnal.",
    icon: <BookOpen size={32} />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/50",
    href: "#"
  },
  {
    title: "E-Rapor",
    desc: "Cek nilai & presensi real-time.",
    icon: <FileText size={32} />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "group-hover:border-amber-500/50",
    href: "#"
  },
  {
    title: "Portal Alumni",
    desc: "Jejaring karir & lowongan.",
    icon: <Users size={32} />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "group-hover:border-purple-500/50",
    href: "#"
  },
];

// Data Pengumuman (Live Feed)
const announcements = [
  {
    date: "12 Okt 2024",
    category: "Akademik",
    title: "Jadwal Ujian Tengah Semester (UTS) Ganjil T.A 2024/2025"
  },
  {
    date: "10 Okt 2024",
    category: "Event",
    title: "Workshop Artificial Intelligence bersama Google Developer Expert"
  },
  {
    date: "08 Okt 2024",
    category: "Prestasi",
    title: "Selamat! Tim Robotics Meraih Gold Medal di Japan Design Invetion Expo"
  },
];

export default function LayananSection() {
  return (
    <section className="py-24 bg-slate-950 relative border-t border-white/5">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* KOLOM KIRI: LAYANAN DIGITAL (APPS GRID) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Laptop2 className="text-cyan-400" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">Ecosystem <span className="text-cyan-400">Digital</span></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((item, index) => (
                <motion.a 
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group relative p-6 rounded-2xl bg-slate-900 border border-white/5 transition-all duration-300 hover:bg-slate-800 ${item.border}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                        <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="text-slate-600 group-hover:text-white transition-colors" size={20} />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* KOLOM KANAN: INFORMASI TERKINI (NEWS FEED) */}
          <div className="lg:col-span-1">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/10 rounded-lg">
                        <Bell className="text-pink-400" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Info Terkini</h2>
                </div>
                <Link href="/berita" className="text-sm text-slate-400 hover:text-white">Lihat Semua</Link>
            </div>

            <div className="bg-slate-900/50 rounded-2xl border border-white/5 p-6 backdrop-blur-sm relative overflow-hidden">
                {/* Garis Aksen */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>

                <div className="space-y-6">
                    {announcements.map((news, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (idx * 0.1) }}
                            viewport={{ once: true }}
                            className="group border-b border-white/5 last:border-0 pb-6 last:pb-0"
                        >
                            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                                <Calendar size={12} /> {news.date}
                                <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                                <span className="text-pink-400">{news.category}</span>
                            </div>
                            <Link href="#" className="block text-slate-200 font-medium hover:text-cyan-300 transition-colors line-clamp-2">
                                {news.title}
                            </Link>
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/5 text-center">
                    <Link href="/berita" className="inline-flex items-center text-sm font-semibold text-slate-400 hover:text-white transition-colors">
                        Arsip Pengumuman &rarr;
                    </Link>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}