"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface PartnerItem {
  id: number;
  name: string;
  logo: string;
}

export default function MitraSection({ data = [] }: { data: PartnerItem[] }) {
  if (data.length === 0) return null;

  // Duplikasi data untuk efek infinite loop
  const marqueeData = [...data, ...data, ...data, ...data];

  return (
    <section className="py-12 bg-slate-950 border-t border-white/5 relative z-20">
      
      {/* Header Kecil */}
      <div className="container mx-auto px-4 mb-10 text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
          Dipercaya oleh Industri & Kampus
        </p>
      </div>

      <div className="relative w-full flex overflow-hidden">
        
        {/* Gradient Fade */}
        <div className="absolute top-0 left-0 z-10 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent"></div>
        <div className="absolute top-0 right-0 z-10 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent"></div>

        {/* Track Animasi */}
        <motion.div
          // UBAH 1: Jarak antar logo diperbesar (gap-16 jadi gap-24 di desktop) agar tidak dempet
          className="flex items-center gap-16 md:gap-28 pr-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40, // Diperlambat sedikit karena jalurnya makin panjang
          }}
        >
          {marqueeData.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              // UBAH 2: UKURAN DIPERBESAR DISINI
              // Mobile: w-44 h-24 (Lumayan besar)
              // Desktop (md:): w-64 h-32 (Sangat besar & jelas)
              className="relative w-44 h-24 md:w-64 md:h-32 shrink-0 opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              {/* Container effect (Tetap sama) */}
              <div className="relative w-full h-full grayscale hover:grayscale-0 brightness-200 invert hover:invert-0 hover:brightness-100 transition-all duration-300">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    // object-contain memastikan logo tidak gepeng/terpotong
                    className="object-contain"
                    unoptimized={true}
                  />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}