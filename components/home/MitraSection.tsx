"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Building2, Handshake, Briefcase, Trophy } from "lucide-react";
import Image from "next/image"; // <-- PENTING: Import Image dari Next.js

// --- DATA STATISTIK (Tetap sama) ---
const stats = [
  { 
    id: 1, 
    label: "MITRA INDUSTRI", 
    value: 10, 
    suffix: "+", 
    icon: <Handshake size={24} />,
    color: "text-cyan-400"
  },
  { 
    id: 2, 
    label: "SERAPAN KERJA", 
    value: 90, 
    suffix: "%", 
    icon: <Briefcase size={24} />,
    color: "text-green-400"
  },
  { 
    id: 3, 
    label: "PRESTASI NASIONAL", 
    value: 20, 
    suffix: "+", 
    icon: <Trophy size={24} />,
    color: "text-yellow-400"
  },
  { 
    id: 4, 
    label: "TOTAL ALUMNI", 
    value: 2500, 
    suffix: "", 
    icon: <Building2 size={24} />,
    color: "text-purple-400"
  },
];

// --- DATA MITRA (UPDATE: MENGGUNAKAN GAMBAR) ---
// Pastikan nama file di 'src' sesuai dengan file yang Abang taruh di folder public/logos/
const partners = [
  { name: "BREXA Indonesia", src: "/logos/brexa.png" },
  { name: "PT. DAIHATSU", src: "/logos/daihatsu.png" },
  { name: "HOLIDAY INN", src: "/logos/holiday.png" },
  { name: "Novotel", src: "/logos/novotel.png" },
  
  // Tambahkan lagi sesuai kebutuhan...
];

// --- COMPONENT COUNTER ANIMATION ---
const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = (duration / end) * 0.8;

      const timer = setInterval(() => {
        start += Math.ceil(end / 50);
        if (start > end) start = end;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, 30);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function MitraSection() {
  return (
    <section className="py-20 bg-black border-y border-slate-800 relative overflow-hidden">
      
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* 1. STATISTIK GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-slate-600 transition-colors"
                >
                    <div className={`mb-3 p-3 rounded-full bg-slate-800/80 ${stat.color} group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                        {stat.icon}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-white font-mono mb-1 tracking-tighter">
                        <Counter value={stat.value} suffix={stat.suffix} />
                    </h3>
                    <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-300">
                        {stat.label}
                    </p>
                </motion.div>
            ))}
        </div>

        {/* 2. HEADER MITRA */}
        <div className="text-center mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-[0.2em] flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500"></span>
                TRUSTED BY INDUSTRY
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500"></span>
            </h2>
        </div>

      </div>

      {/* 3. INFINITE LOGO SLIDER (MARQUEE DENGAN GAMBAR) */}
      <div className="relative w-full overflow-hidden bg-slate-900/50 py-10 border-t border-slate-800 backdrop-blur-sm group/slider hover:[animation-play-state:paused]">
        
        {/* Gradient Fade di Kiri & Kanan biar halus */}
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

        {/* Moving Track */}
        <div className="flex w-max">
            <motion.div 
                className="flex gap-12 px-8"
                animate={{ x: "-50%" }}
                transition={{ repeat: Infinity, ease: "linear", duration: 30 }} // Durasi diperlambat biar logo terlihat jelas
            >
                {/* Kita duplikat array partner 3x biar looping-nya mulus */}
                {[...partners, ...partners, ...partners].map((partner, index) => (
                    <div key={index} className="relative group/logo cursor-pointer">
                        
                        {/* CONTAINER GAMBAR DENGAN EFEK CYBERPUNK */}
                        {/* Default: Opacity rendah, Grayscale (Hitam Putih) */}
                        {/* Hover: Opacity penuh, Warna asli, Ada efek bayangan glow */}
                        <div className="relative w-32 h-16 md:w-40 md:h-20 transition-all duration-500 opacity-40 grayscale group-hover/logo:opacity-100 group-hover/logo:grayscale-0 group-hover/logo:drop-shadow-[0_0_10px_rgba(6,182,212,0.6)] hover:scale-110">
                            <Image
                                src={partner.src}
                                alt={partner.name}
                                fill
                                className="object-contain" // Agar gambar tidak gepeng
                            />
                        </div>

                    </div>
                ))}
            </motion.div>
        </div>
      </div>

    </section>
  );
}