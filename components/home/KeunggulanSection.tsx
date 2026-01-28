"use client";

import { motion } from "framer-motion";
import { Cpu, Rocket, Globe, Shield, Users, CheckCircle2, Terminal, Activity } from "lucide-react";

const features = [
  {
    id: "01",
    title: "Kurikulum Standar Industri",
    desc: "Sinkronisasi materi dengan Startup Unicorn & Multinasional. Belajar apa yang dipakai di dunia kerja saat ini.",
    icon: <Cpu size={32} />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    className: "md:col-span-2 md:row-span-2", 
  },
  {
    id: "02",
    title: "Jaminan Penyaluran Kerja",
    desc: "MoU aktif dengan 50+ Perusahaan IT & Otomotif. Lulusan diprioritaskan oleh mitra industri.",
    icon: <Rocket size={32} />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: "03",
    title: "Fasilitas Sultan",
    desc: "Teaching Factory, Lab Fiber Optic, Bengkel Standar Honda, & Smart Class IoT.",
    icon: <Globe size={28} />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    className: "md:col-span-1", 
  },
  {
    id: "04",
    title: "Sertifikasi BNSP",
    desc: "Lulus bawa sertifikat kompetensi (Mikrotik/Cisco/AWS) yang diakui negara.",
    icon: <Shield size={28} />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    className: "md:col-span-1", 
  },
  {
    id: "05",
    title: "Guru Expert",
    desc: "Dididik langsung oleh praktisi industri dan senior engineer yang berpengalaman.",
    icon: <Users size={28} />,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    className: "md:col-span-1", 
  },
];

export default function KeunggulanSection() {
  return (
   <section className="py-24 bg-[#020617] relative overflow-hidden">
      {/* --- UNIFIED BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        
      {/* 1. AMBIENT GLOWS (Sinkron dengan section lain) */}
     
      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
               <div className="h-px w-8 bg-cyan-500"></div>
               <span className="text-cyan-500 font-mono text-[10px] tracking-[0.4em] uppercase">Status: Excellence_Verified</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white leading-none mb-6 italic uppercase tracking-tighter">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 pr-6">SMK PK</span> <br/>
              KAMPUNG JAWA?
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-lg font-light border-l-2 border-white/10 pl-6">
              Membangun ekosistem pendidikan yang tidak hanya memberi ijazah, tapi juga **keahlian nyata** yang divalidasi oleh industri global.
            </p>
          </motion.div>

          {/* Terminal Box Style */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl relative group"
          >
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,6px_100%] opacity-20"></div>

            <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <Terminal size={14} className="text-cyan-400" />
                <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">system_analysis.exe</span>
                <div className="flex gap-1.5 ml-auto">
                    <div className="w-2 h-2 rounded-full bg-red-500/30"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/30"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/30"></div>
                </div>
            </div>
            
            <div className="p-8 font-mono text-xs md:text-sm text-slate-300 leading-relaxed">
                <p className="flex items-start gap-3 mb-6">
                  <span className="text-cyan-500 shrink-0">&gt;_</span>
                  <span>SMK Pusat Keunggulan menghadirkan pendidikan vokasi berbasis <span className="text-white font-bold text-cyan-400 italic">"LINK & MATCH"</span>.</span>
                </p>
                <div className="space-y-3">
                    {["SIAP KERJA PROFESIONAL", "SIAP WIRAUSAHA DIGITAL", "SIAP KULIAH LANJUTAN"].map((text) => (
                      <div key={text} className="flex items-center gap-3 text-slate-400 group/item">
                        <CheckCircle2 size={14} className="text-cyan-500 group-hover/item:animate-pulse"/> 
                        <span className="uppercase tracking-tighter group-hover/item:text-white transition-colors">{text}</span>
                      </div>
                    ))}
                </div>
            </div>
          </motion.div>
        </div>

        {/* --- BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[200px] gap-4">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative p-8 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-white/20 ${item.className}`}
            >
              {/* Decorative Number */}
              <div className="absolute -top-2 -right-2 text-7xl font-black text-white/[0.03] select-none font-mono group-hover:text-white/[0.07] transition-colors duration-700">
                {item.id}
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-700 group-hover:scale-110 group-hover:rotate-[360deg] shadow-lg ${item.bg} ${item.color}`}>
                   {item.icon}
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <Activity size={12} className={item.color} />
                     <div className="h-px w-12 bg-white/10"></div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-tighter italic leading-none">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-mono group-hover:text-slate-300 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Hover Light Streak */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}