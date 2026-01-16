"use client";
import { motion } from "framer-motion";
import { Play, Zap } from "lucide-react";

export default function VideoProfilSection() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10"></div>

      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6"
          >
            <Zap size={14} className="fill-cyan-400" /> Tour Sekolah
          </motion.div>
          
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Intip Suasana <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Masa Depan</span>
          </motion.h2>
          
          <p className="text-slate-400 text-lg">
            Lihat bagaimana kami memadukan teknologi canggih dengan lingkungan belajar yang nyaman dan kolaboratif.
          </p>
        </div>

        {/* VIDEO CONTAINER (THEATER MODE) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
            {/* Efek Glow di Belakang Video (Ambilight) */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] md:blur-[100px] rounded-full transform scale-90 -z-10"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl opacity-30 blur-sm"></div>

            {/* Bingkai Video */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl aspect-video group">
                
                {/* Iframe YouTube */}
                <iframe 
                    className="w-full h-full object-cover"
                    src="https://www.youtube.com/embed/wDHsjwCtEys?si=ahxs4CWNGCiydfXp&rel=0&modestbranding=1" 
                    title="Profil Sekolah"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                ></iframe>

            </div>

            {/* Hiasan Garis Tech di Pinggir */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50 hidden md:block"></div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50 hidden md:block"></div>

        </motion.div>
      </div>
    </section>
  );
}