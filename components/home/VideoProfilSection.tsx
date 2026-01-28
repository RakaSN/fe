"use client";
import { motion } from "framer-motion";
import { Play, Zap, Monitor, Crosshair, Radio } from "lucide-react";

export default function VideoProfilSection() {
  return (
   <section className="py-24 bg-[#020617] relative overflow-hidden">
      {/* --- UNIFIED BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-cyan-500/10 border-l-2 border-cyan-500 text-cyan-400 text-xs font-mono tracking-[0.2em] mb-6"
          >
            <Radio size={14} className="animate-pulse" /> LIVE_TRANSMISSION: CAMPJAVA_TOUR
          </motion.div>
          
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic"
          >
            tour <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 pr-2">SEKOLAH</span>
          </motion.h2>
          
          <p className="text-slate-500 text-lg font-light leading-relaxed">
            Saksikan sinergi antara teknologi industri dan metode pembelajaran kolaboratif yang kami terapkan di <span className="text-slate-200">CAMPJAVA</span>.
          </p>
        </div>

        {/* VIDEO CONTAINER (HIGH-TECH THEATER) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto group"
        >
            {/* Ambient Background Glow (Dynamic Cyan) */}
            <div className="absolute -inset-10 bg-cyan-500/10 blur-[120px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>

            {/* Tech Decoration: Corner Brackets */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-500 z-20"></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-slate-700 z-20 group-hover:border-cyan-500 transition-colors"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-slate-700 z-20 group-hover:border-cyan-500 transition-colors"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-cyan-500 z-20"></div>

            {/* Video Frame */}
            <div className="relative rounded-sm overflow-hidden border border-slate-800 bg-black shadow-2xl aspect-video z-10">
                
                {/* Overlay Scanning Line Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] z-20 opacity-30"></div>
                
                {/* Watermark/HUD Info */}
                <div className="absolute top-6 left-6 z-30 flex flex-col gap-1 pointer-events-none">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-500 bg-black/50 px-2 py-0.5 border border-cyan-500/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                        REC 00:45:12:09
                    </div>
                    <span className="text-[8px] font-mono text-slate-500 bg-black/50 px-2 tracking-widest">CAM_01 // 4K_UHD</span>
                </div>

                {/* Iframe YouTube */}
                <iframe 
                    className="w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    src="https://www.youtube.com/embed/wDHsjwCtEys?si=ahxs4CWNGCiydfXp&rel=0&modestbranding=1" 
                    title="Profil Sekolah"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                ></iframe>

                {/* Glass Glint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20"></div>
            </div>

            {/* Bottom Status Info */}
            <div className="mt-6 flex justify-between items-center font-mono text-[10px] text-slate-600 tracking-widest px-2">
                <div className="flex items-center gap-4">
                    <span>LAT: -6.1833</span>
                    <span>LONG: 106.8451</span>
                </div>
                <div className="flex items-center gap-4 text-cyan-900">
                    <span className="animate-pulse">DECRYPTING_SIGNAL...</span>
                    <Monitor size={12} />
                </div>
            </div>

        </motion.div>
      </div>
    </section>
  );
}