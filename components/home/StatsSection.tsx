"use client";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Komponen Angka yang Jalan Sendiri (Counter)
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    damping: 30,
    stiffness: 100,
    duration: 3
  });

  const displayValue = useTransform(springValue, (current) => 
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <span ref={ref} className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
      <motion.span>{displayValue}</motion.span>{suffix}
    </span>
  );
};

const stats = [
  { label: "Lulusan", value: 1250, suffix: "+" },
  { label: "Mitra Industri", value: 30, suffix: "+" },
  { label: "Lulusan Terserap", value: 98, suffix: "%" },
  { label: "Project Selesai", value: 50, suffix: "+" },
];

export default function StatsSection() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl md:text-7xl font-extrabold mb-2 tracking-tight">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-cyan-400 font-medium text-sm md:text-base uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA (CALL TO ACTION) FINAL */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 p-10 md:p-16 text-center"
        >
          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Siap Menjadi Bagian dari Masa Depan?
            </h2>
            <p className="text-blue-100 text-lg mb-10">
              Jangan sampai tertinggal. Kuota pendaftaran terbatas untuk calon talenta digital terbaik.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ppdb" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                    Daftar Sekarang <ArrowRight size={20} />
                </Link>
                <Link href="/kontak" className="px-8 py-4 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-colors">
                    Hubungi Kami
                </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}