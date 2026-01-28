"use client";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Target, Globe, Award, MousePointer2 } from "lucide-react";

// Komponen Counter dengan Spring Physics yang lebih smooth
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    damping: 40,
    stiffness: 80,
  });

  const displayValue = useTransform(springValue, (current) => 
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  return (
    <span ref={ref} className="font-black tracking-tighter text-white">
      <motion.span>{displayValue}</motion.span>{suffix}
    </span>
  );
};

const stats = [
  { label: "Talenta Terlatih", value: 1250, suffix: "+", icon: Globe, color: "from-cyan-400 to-blue-500" },
  { label: "Aliansi Industri", value: 50, suffix: "+", icon: Target, color: "from-purple-500 to-pink-500" },
  { label: "Absorption Rate", value: 98, suffix: "%", icon: Zap, color: "from-green-400 to-emerald-600" },
  { label: "Sistem Selesai", value: 120, suffix: "+", icon: Award, color: "from-amber-400 to-orange-600" },
];

export default function StatsSection() {
  return (
   <section className="py-24 bg-[#020617] relative overflow-hidden">
      {/* --- UNIFIED BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
       {/* Background Decor: Grid & Glitch Glow */}
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative p-6 bg-slate-900/20 border border-slate-800 rounded-sm group hover:border-cyan-500/50 transition-all duration-500 overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity`}></div>
              
              <stat.icon className="text-slate-700 group-hover:text-cyan-400 transition-colors mb-4" size={24} />
              
              <div className="text-4xl md:text-5xl font-black mb-1">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mt-2 border-t border-slate-800 pt-3">
                &gt; {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FINAL CALL TO ACTION (THE COMMAND CENTER) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto"
        >
            {/* Outer Frame Brackets */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-slate-800"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-slate-800"></div>

            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-black border border-white/10 p-10 md:p-20 text-center rounded-sm shadow-2xl">
                
                {/* Tech Overlays */}
                <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-slate-700 text-right leading-none hidden md:block">
                    SYSTEM_INITIATED: v1.0.4<br/>
                    STATUS: READY_FOR_DEPLOYMENT
                </div>

                <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                    <div className="flex justify-center">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="p-4 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-500"
                        >
                            <MousePointer2 size={32} />
                        </motion.div>
                    </div>

                    <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                        Siap Menjadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 pr-6">Arsitek</span> Masa Depan?
                    </h2>
                    
                    <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
                        Jadilah bagian dari elite talenta digital. Kuota pendaftaran pangkalan <span className="text-white font-bold underline decoration-cyan-500">CAMPJAVA</span> terbatas.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                        {/* Primary Button */}
                        <Link 
                            href="/ppdb" 
                            className="relative group overflow-hidden bg-cyan-500 text-black px-10 py-5 font-black uppercase tracking-widest text-sm hover:bg-white transition-all duration-300"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Inisiasi Pendaftaran <ArrowRight size={20} />
                            </span>
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </Link>

                        {/* Secondary Button */}
                        <Link 
                            href="/kontak" 
                            className="border-2 border-slate-800 text-white px-10 py-5 font-black uppercase tracking-widest text-sm hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                            Hubungi Markas
                        </Link>
                    </div>

                    {/* Footer Note */}
                    <p className="text-[10px] font-mono text-slate-600 tracking-[0.3em] uppercase pt-10">
                        * NO_REGISTRATION_FEES_APPLY // SECURE_ENROLLMENT_LINK
                    </p>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>
        </motion.div>

      </div>
    </section>
  );
}