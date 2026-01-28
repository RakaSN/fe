"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wifi, Zap, Car, ArrowUpRight, Activity } from "lucide-react"; 
import Link from "next/link";
import Image from "next/image";

const majors = [
  {
    id: "01",
    title: "INSTALASI TENAGA LISTRIK",
    code: "TITL-SYS",
    desc: "Mastering High Voltage, IoT Automation & Solar Energy Control Systems.",
    icon: <Zap size={28} />,
    color: "text-yellow-400",
    bg: "bg-yellow-400",
    border: "group-hover:border-yellow-400",
    image: "/images/titl.png", 
    href: "/jurusan/titl"
  },
  {
    id: "02",
    title: "JARINGAN KOMPUTER & TELEKOMUNIKASI",
    code: "TJKT-NET",
    desc: "Cyber Security Defense, Fiber Optic Infrastructure & Cloud Server Architecture.",
    icon: <Wifi size={28} />,
    color: "text-cyan-400",
    bg: "bg-cyan-400",
    border: "group-hover:border-cyan-400",
    image: "/images/tkj.png", 
    href: "/jurusan/tjkt"
  },
  {
    id: "03",
    title: "KENDARAAN RINGAN & OTOMOTIF",
    code: "TKRO-AUTO",
    desc: "Hybrid Engine Diagnostics, ECU Remapping & Electric Vehicle Technology.",
    icon: <Car size={28} />,
    color: "text-rose-500",
    bg: "bg-rose-500",
    border: "group-hover:border-rose-500",
    image: "/images/tkr.png", 
    href: "/jurusan/tkro"
  },
];

const CyberCard = ({ item, index }: { item: any; index: number }) => {
  const [randomString, setRandomString] = useState("DATA_NULL");
  const [isHovered, setIsHovered] = useState(false);

  // Perbaikan: Logic Decoding Effect yang lebih aman
  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%";
        setRandomString(Array.from({length: 8}, () => chars[Math.floor(Math.random() * chars.length)]).join(""));
      }, 80);
    } else {
      setRandomString("SECURED");
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group h-[520px] w-full"
    >
      {/* 1. MAIN CARD SHAPE */}
      <div className={`absolute inset-0 bg-slate-900/80 backdrop-blur-sm border border-white/10 transition-all duration-500 ${item.border} overflow-hidden rounded-2xl`}>
        
        {/* IMAGE LAYER */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={item.image} 
            alt={item.title} 
            fill 
            className="object-cover opacity-30 group-hover:opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent z-10" />
        </div>

        {/* 2. SCANNER LINE */}
        <div className={`absolute top-0 left-0 w-full h-[2px] bg-white/50 shadow-[0_0_15px_#fff] opacity-0 group-hover:opacity-100 group-hover:animate-scan z-20`}></div>

        {/* 3. CONTENT AREA */}
        <div className="absolute inset-0 z-30 p-8 flex flex-col justify-between">
          
          {/* Top Info */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className={`text-[10px] font-mono font-bold tracking-[0.3em] ${item.color}`}>
                ID://{item.id}
              </span>
              <span className="text-[9px] text-slate-400 font-mono bg-black/50 px-2 py-0.5 rounded border border-white/5 uppercase">
                {item.code}
              </span>
            </div>
            <div className={`p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl ${item.color} group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-xl`}>
              {item.icon}
            </div>
          </div>

          {/* Decorative HUD */}
          <div className="flex items-center gap-4 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-white/20" />
            <Activity size={14} className={item.color} />
            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-white/20" />
          </div>

          {/* Bottom Info */}
          <div>
            <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter leading-[0.9]">
              {item.title}
            </h3>
            
            <div className="overflow-hidden max-h-0 group-hover:max-h-60 transition-all duration-700 ease-in-out">
              <p className="text-slate-400 text-sm font-mono mb-6 leading-relaxed">
                {item.desc}
              </p>
              
              {/* Data Stream Decor */}
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-6 py-2 border-y border-white/5 uppercase">
                <span>Buffer: {randomString}</span>
                <span className="animate-pulse">Status: Syncing</span>
              </div>

              <Link href={item.href} className={`w-full py-4 flex items-center justify-center gap-2 font-black uppercase tracking-[0.2em] text-[12px] text-black ${item.bg} hover:brightness-125 transition-all rounded-lg shadow-lg`}>
                Enter Module <ArrowUpRight size={18} />
              </Link>
            </div>

            {/* Hint text */}
            <div className="group-hover:hidden flex items-center gap-2 text-[10px] font-mono text-slate-500 tracking-widest uppercase animate-pulse">
              <div className="w-1 h-1 bg-slate-500 rounded-full" />
              Decrypting_Access_Key
            </div>
          </div>

        </div>
      </div>
      
      {/* Corner Brackets */}
      <div className={`absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 ${item.border.replace('group-hover:', '')} opacity-20 group-hover:opacity-100 transition-all duration-500`} />
      <div className={`absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 ${item.border.replace('group-hover:', '')} opacity-20 group-hover:opacity-100 transition-all duration-500`} />
    </motion.div>
  );
};

export default function JurusanSection() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      
      {/* Catatan: Hapus grid lokal jika sudah ada grid global di layout.tsx */}
      {/* <div className="absolute inset-0 bg-unified-grid opacity-10 pointer-events-none" /> */}

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Header Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6 border-b border-white/5 pb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-[1px] bg-cyan-500" />
               <span className="text-cyan-500 font-mono text-xs tracking-[0.4em] uppercase">Academic_Assets</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white">
              Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-600 pr-6">Programs</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-right font-mono text-[10px] text-slate-500 tracking-[0.2em] leading-relaxed hidden md:block uppercase"
          >
            Environment: Production_Final<br/>
            Access_Level: Authorized_Only
          </motion.div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {majors.map((major, index) => (
            <CyberCard key={major.id} item={major} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}