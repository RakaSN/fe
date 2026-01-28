"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Fingerprint, Quote } from "lucide-react";

export default function KepalaSekolah() {
  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden">
      {/* --- UNIFIED BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      {/* ------------------------------------ */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* FOTO */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[380px] group">
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-500 z-20 transition-all group-hover:-top-2 group-hover:-left-2"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-purple-500 z-20 transition-all group-hover:-bottom-2 group-hover:-right-2"></div>

                <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                    <Image
                        src="/ibu.png" 
                        alt="Kepala Sekolah"
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/20 backdrop-blur-md border-t border-white/5">
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">Kartika Ariyani, S.Pd</h3>
                        <p className="text-cyan-400 font-mono text-[10px] tracking-[0.2em] flex items-center gap-2">
                           <ShieldCheck size={12} /> PRINCIPAL_DIRECTIVE
                        </p>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* TEKS */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-2">
                <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase block">
                    &gt;&gt; SYSTEM.MESSAGE(LEAD)
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
                    Misi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 pr-4">Akselerasi</span> Generasi
                </h2>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-800">
                <Quote size={40} className="absolute -top-4 -left-8 text-white/5" />
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed italic font-light">
                    "Selamat datang di markas inovasi kami. Di era digital yang bergerak eksponensial, kami tidak hanya mengajar; kami memprogram masa depan. Komitmen kami adalah menyinkronkan potensi siswa dengan standar industri global."
                </p>
                <div className="mt-6 flex items-center gap-3 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                    <Fingerprint size={18} className="text-cyan-900" />
                    <span>Identity_Verified: K_ARIYANI_9921</span>
                </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}