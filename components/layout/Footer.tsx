"use client";

import { motion } from "framer-motion";
import { 
  Facebook, Instagram, Linkedin, Twitter, Youtube, 
  MapPin, Phone, Mail, ArrowUp, Send, ShieldCheck 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#020202] border-t border-slate-800 relative overflow-hidden pt-20 pb-10 font-sans">
      
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* 1. BRANDING (LOGO ASLI) */}
            <div className="space-y-6">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-14 h-14 bg-slate-900 border border-slate-800 p-2 rounded-xl group-hover:border-cyan-500 transition-colors">
                        <Image 
                            src="/logo.png" 
                            alt="Logo Future Academy" 
                            fill
                            className="object-contain p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black tracking-tighter text-white leading-none">
                            CAMP<span className="text-cyan-500 italic">JAVA</span>
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono tracking-[0.2em]">FUTURE_ACADEMY_V1.0</span>
                    </div>
                </Link>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Mencetak talenta digital berstandar global. Sekolah berbasis teknologi dengan kurikulum masa depan.
                    <br/>
                    <span className="text-cyan-900 font-mono text-[10px] mt-2 block">&gt;&gt; ESTABLISHED_FOR_INNOVATION</span>
                </p>
                <div className="flex gap-3">
                    {[Facebook, Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                        <a key={i} href="#" className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-black hover:border-cyan-400 transition-all duration-300">
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
            </div>

            {/* 2. NAVIGATION (Gaya List Baru) */}
            <div>
                <h3 className="text-white font-bold uppercase tracking-widest mb-6 border-l-4 border-cyan-500 pl-3">
                    Akses Data
                </h3>
                <ul className="space-y-3">
                    {['Beranda', 'Profil Sekolah', 'Daftar Jurusan', 'Berita & Artikel', 'Hubungi Kami'].map((item, i) => (
                        <li key={i}>
                            <Link href="#" className="text-slate-400 hover:text-cyan-400 text-sm flex items-center gap-2 group transition-all">
                                <span className="w-1 h-3 bg-slate-800 group-hover:bg-cyan-500 transition-colors"></span>
                                <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 3. PROGRAM KEAHLIAN (ALUMNI/JURUSAN) */}
            <div>
                <h3 className="text-white font-bold uppercase tracking-widest mb-6 border-l-4 border-cyan-500 pl-3">
                    Spesialisasi
                </h3>
                <div className="grid grid-cols-1 gap-3">
                    {['TITL', 'TJKT', 'TKRO'].map((item) => (
                        <Link key={item} href="#" className="bg-slate-900/50 border border-slate-800 px-4 py-2 rounded text-sm text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all font-mono">
                            # {item}
                        </Link>
                    ))}
                </div>
            </div>

            {/* 4. KONTAK ASLI */}
            <div>
                <h3 className="text-white font-bold uppercase tracking-widest mb-6 border-l-4 border-cyan-500 pl-3">
                    Kordinat Lokasi
                </h3>
                <ul className="space-y-4 text-sm text-slate-400">
                    <li className="flex gap-3 items-start">
                        <MapPin size={18} className="text-cyan-500 shrink-0 mt-1" />
                        <span className="leading-relaxed">Jl. Percetakan Negara II No.9 11, Johar Baru, Jakarta Pusat 10560</span>
                    </li>
                    <li className="flex gap-3 items-center">
                        <Phone size={18} className="text-cyan-500 shrink-0" />
                        <span>(021) 4212680</span>
                    </li>
                    <li className="flex gap-3 items-center">
                        <Mail size={18} className="text-cyan-500 shrink-0" />
                        <span className="truncate">admissions@future.sch.id</span>
                    </li>
                </ul>
            </div>
            

        </div>
        
<div>
                <h3 className="text-white font-bold uppercase tracking-widest mb-6 border-l-4 border-cyan-500 pl-3">
                    Update Data
                </h3>
                <p className="text-xs text-slate-500 mb-4">Dapatkan info terbaru mengenai PPDB dan prestasi siswa langsung ke inbox Anda.</p>
                
                <div className="relative group">
                    <input 
                        type="email" 
                        placeholder="user@domain.com" 
                        className="w-full bg-black border border-slate-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all font-mono rounded-lg"
                    />
                    <button className="absolute right-2 top-2 bg-slate-800 text-cyan-500 p-1.5 rounded hover:bg-cyan-500 hover:text-black transition-colors">
                        <Send size={16} />
                    </button>
                </div>
                <p className="text-[10px] text-slate-600 mt-2 font-mono">
                    *SECURE_CONNECTION_ESTABLISHED
                </p>
            </div>
        {/* BOTTOM SECTION */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="text-center md:text-left">
                <p className="text-[10px] md:text-xs text-slate-500 font-mono">
                    &copy; {new Date().getFullYear()} Raka Sepyan Nurfiqri. ALL RIGHTS RESERVED.
                    <span className="hidden md:inline"> | </span> POWERED BY NEXT.JS 14
                </p>
                <div className="flex gap-4 mt-2 text-[10px] text-slate-600 uppercase tracking-tighter">
                    <Link href="#" className="hover:text-cyan-800">Privacy Policy</Link>
                    <Link href="#" className="hover:text-cyan-800">Terms of Service</Link>
                </div>
            </div>
                    
            {/* Server Status (Fitur Tambahan) */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-full border border-slate-800">
                <ShieldCheck size={14} className="text-green-500" />
                <span className="text-[10px] font-mono text-slate-400 tracking-tighter">ENCRYPTED_CONNECTION: ACTIVE</span>
            </div>
            {/* Server Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-full border border-slate-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-bold text-green-500 tracking-widest">SYSTEM ONLINE</span>
            </div>
            {/* Scroll Top Button */}
             {/* Back to Top Button */}
            <button 
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest"
            >
                Back to Top 
                <div className="p-2 border border-slate-700 rounded bg-black group-hover:border-cyan-500 group-hover:-translate-y-1 transition-all">
                    <ArrowUp size={14} />
                </div>
            </button>
        </div>

      </div>
    </footer>
  );
}