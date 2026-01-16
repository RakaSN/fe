"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap } from "lucide-react";
import Typewriter from 'typewriter-effect';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      
      {/* Background Grid & Gradient */}
      <div className="absolute inset-0 bg-grid-pattern bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-purple-500/10 to-transparent blur-3xl"></div>
      
      {/* Aksen Cahaya Bergerak */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] opacity-30 animate-pulse"></div>

      <div className="container mx-auto px-4 relative z-10 pt-20 text-center">
        
        {/* --- 2. LOGO SEKOLAH (BARU) --- */}
        {/* --- 2. LOGO SEKOLAH (UKURAN DIPERBESAR) --- */}
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-10" // Ditambah mb-10 biar jarak ke bawah agak lega
        >
            {/* BAGIAN INI YANG DIGANTI UKURANNYA */}
            <div className="relative w-32 h-32 md:w-48 md:h-48">
                {/* Efek Glow di belakang logo (otomatis menyesuaikan ukuran) */}
                <div className="absolute inset-0 bg-cyan-500/50 blur-[50px] rounded-full"></div>
                
                {/* Gambar Logo */}
                <Image 
                    src="/logo.png" // Pastikan file ada di folder public
                    alt="Logo Sekolah"
                    fill
                    className="object-contain drop-shadow-2xl relative z-10"
                    priority
                />
            </div>
        </motion.div>
        {/* ----------------------------- */}

        {/* Badge PPDB */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-md border border-cyan-500/30 rounded-full px-4 py-2 text-cyan-300 text-sm font-medium mb-8"
        >
          <Zap size={16} className="text-cyan-400 fill-cyan-400" /> SPMB 2026 Dibuka!
        </motion.div>

        {/* Headline Typewriter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="text-6xl md:text-8xl font-extrabold tracking-tight leading-tight text-white mb-8 min-h-[180px] md:min-h-0"
        >
          <h1>Mencetak Generasi</h1>          {/* 2. Tambah 'pb-4' (padding bottom) disini */}
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mt-2 pb-4">
            <Typewriter
              options={{
                strings: [
                  'Unggul',
                  'Tangguh', 
                  'Siap Kerja', 
                  'Berdaya',
                  'Kompeten'
                ],
                autoStart: true, // Wajib true
                loop: true,      // Wajib true biar ngulang
                delay: 75,       // Kecepatan ngetik
                deleteSpeed: 50, // Kecepatan hapus
              }}
            />
          </div>
        </motion.div>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Sekolah vokasi berbasis teknologi industri. Mencetak talenta digital yang siap mendominasi era global.
        </motion.p>

        {/* Tombol Aksi */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <Link href="/ppdb" className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-cyan-600 px-8 font-bold text-white transition-all hover:bg-cyan-500">
            <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white/20 rounded-full"></span>
            <span className="relative flex items-center gap-2">Daftar Sekarang <ArrowRight className="group-hover:translate-x-1 transition-transform"/></span>
          </Link>
          
          <Link href="/profil" className="px-8 py-4 rounded-full font-bold text-white border-2 border-white/10 hover:bg-white/5 hover:border-white/30 transition-all">
            Jelajahi Lebih Lanjut
          </Link>
        </motion.div>
      </div>

       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </section>
  );
}