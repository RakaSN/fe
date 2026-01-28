"use client";

import { motion } from "framer-motion";
import { Quote, Play, Pause, Briefcase, User } from "lucide-react";
import { useState } from "react";
// import Image from "next/image"; // Aktifkan jika sudah ada foto alumni

// --- DATA ALUMNI (Ganti dengan data asli nanti) ---
const testimonials = [
  {
    id: 1,
    name: "Rizky Firmansyah",
    role: "Network Engineer",
    company: "PT. Telkom Akses",
    batch: "Angkatan 2022",
    message: "Masuk sini nggak cuma diajarin kabel, tapi mental kerja. Pas magang langsung kepakai ilmunya. Sekarang udah pegang project fiber optic satu kecamatan.",
    avatar: "/images/alumni1.jpg", // Siapkan foto nanti
    status: "online"
  },
  {
    id: 2,
    name: "Siti Aminah",
    role: "IoT Developer",
    company: "Polytron R&D",
    batch: "Angkatan 2021",
    message: "Fasilitas lab-nya ngeri! Dulu sering nginep di sekolah buat ngoprek Arduino. Alhamdulillah sekarang keterima di bagian Research & Development.",
    avatar: "/images/alumni2.jpg",
    status: "busy"
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "Mekanik Senior",
    company: "Auto2000",
    batch: "Angkatan 2020",
    message: "Guru-gurunya praktisi semua. Apa yang diajarin di bengkel sekolah bener-bener sama kayak standar dealer resmi. Lulus langsung ditarik kerja.",
    avatar: "/images/alumni3.jpg",
    status: "offline"
  }
];

// --- COMPONENT CARD ---
const TestiCard = ({ item, index }: { item: any; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative group"
    >
      {/* Connector Line (Hiasan Garis ke Tengah) */}
      <div className={`hidden md:block absolute top-10 ${index % 2 === 0 ? '-right-12 border-r-2 rounded-tr-xl' : '-left-12 border-l-2 rounded-tl-xl'} w-12 h-full border-t-2 border-slate-800 -z-10`}></div>

      {/* Main Card */}
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        
        {/* Header: Profile & Info */}
        <div className="flex items-start gap-4 mb-4 relative z-10">
            {/* Avatar Container */}
            <div className="relative">
                <div className="w-14 h-14 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center overflow-hidden">
                    {/* Placeholder Icon User (Ganti <Image> kalau ada foto) */}
                    <User className="text-slate-500" size={24} />
                    {/* <Image src={item.avatar} alt={item.name} fill className="object-cover" /> */}
                </div>
                {/* Status Dot */}
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${item.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : item.status === 'busy' ? 'bg-yellow-500' : 'bg-slate-500'}`}></div>
            </div>

            {/* Name & Job */}
            <div>
                <h4 className="text-white font-bold text-lg leading-tight group-hover:text-cyan-400 transition-colors">
                    {item.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <Briefcase size={12} />
                    <span>{item.role} @ <span className="text-slate-200 font-semibold">{item.company}</span></span>
                </div>
                <span className="text-[10px] text-slate-600 font-mono border border-slate-800 px-1 rounded mt-1 inline-block">
                    ID: {item.batch.replace('Angkatan ', 'BATCH_')}
                </span>
            </div>

            <Quote size={40} className="absolute top-0 right-0 text-slate-800 group-hover:text-cyan-900/40 transition-colors" />
        </div>

        {/* Message Area */}
        <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light relative z-10 border-l-2 border-slate-700 pl-3 italic">
            "{item.message}"
        </p>

        {/* Fake Audio Player UI */}
        <div className="bg-slate-950/50 rounded-lg p-3 flex items-center gap-3 border border-slate-800/50">
            <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all"
            >
                {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            </button>
            
            {/* Visualizer Bars Animation */}
            <div className="flex items-center gap-1 h-4 flex-1">
                {[...Array(15)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-1 bg-slate-700 rounded-full transition-all duration-300 ${isPlaying ? 'animate-music-bar bg-cyan-500' : ''}`}
                        style={{ 
                            height: isPlaying ? `${Math.random() * 100}%` : '20%',
                            animationDelay: `${i * 0.05}s`
                        }}
                    ></div>
                ))}
            </div>
            <span className="text-[10px] font-mono text-slate-500">00:14</span>
        </div>

      </div>
    </motion.div>
  );
};

export default function TestimoniSection() {
  return (
    <section className="py-24 bg-[#080c14] relative overflow-hidden">
        
        {/* Decor: World Map Texture Background */}
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] opacity-[0.03] bg-fixed bg-center bg-no-repeat bg-cover pointer-events-none grayscale invert"></div>

        <div className="container mx-auto px-4 relative z-10">
            
            {/* Header */}
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase mb-2 block">
                        // Testimonials Log
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
                        Alumni <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 pr-6">Kami</span>
                    </h2>
                    <p className="text-slate-400 mt-4 max-w-xl mx-auto">
                        Laporan langsung dari agen (alumni) kami yang telah berhasil menembus industri teknologi & otomotif tingkat lanjut.
                    </p>
                </motion.div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((item, index) => (
                    <TestiCard key={item.id} item={item} index={index} />
                ))}
            </div>

            {/* Stat Decorative Bottom */}
            <div className="mt-16 border-t border-slate-800 pt-8 flex justify-between items-center text-xs font-mono text-slate-500 opacity-60">
                <span>SYNC STATUS: COMPLETED</span>
                <span className="hidden md:inline">ENCRYPTION: AES-256</span>
                <span>DATA SOURCE: ALUMNI_DB</span>
            </div>

        </div>
    </section>
  );
}