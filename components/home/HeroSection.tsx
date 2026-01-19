"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';

export default function HeroSection() {
  // --- LOGIC SLIDESHOW & DATA ---
  const [backgrounds, setBackgrounds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Ambil Data Gambar dari API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/heroes')
      .then((res) => res.json())
      .then((data) => {
        const images = data.map((item: any) => item.image);
        if (images.length > 0) {
          setBackgrounds(images);
        }
      })
      .catch((err) => console.error("Gagal ambil banner:", err));
  }, []);

  // 2. Logic Ganti Gambar Otomatis
  useEffect(() => {
    if (backgrounds.length <= 1) return; 

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [backgrounds]);

  // Gambar Default & Current Image
  const defaultImage = "/bg.jpg"; // Pastikan ada di folder public
  const currentImage = backgrounds.length > 0 ? backgrounds[currentIndex] : defaultImage;

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">
      
      {/* --- BACKGROUND SLIDESHOW --- */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={currentImage}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
            unoptimized={true}
          />
          {/* Overlay Gelap */}
          <div className="absolute inset-0 bg-slate-900/60 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </motion.div>
      </AnimatePresence>
      
      {/* --- KONTEN UTAMA --- */}
      <div className="relative z-10 container mx-auto px-4 text-center mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          
          {/* === 1. LOGO SEKOLAH (DITAMBAHKAN DI SINI) === */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6" // Jarak ke badge di bawahnya
          >
             <div className="relative w-28 h-28 md:w-40 md:h-40">
                {/* Efek Glow di belakang logo */}
                <div className="absolute inset-0 bg-cyan-500/50 blur-[50px] rounded-full"></div>
                
                {/* Gambar Logo */}
                <Image 
                    src="/logo.png" // Pastikan file logo.png ada di folder public
                    alt="Logo Sekolah"
                    fill
                    className="object-contain drop-shadow-2xl relative z-10"
                    priority
                />
             </div>
          </motion.div>
          {/* ============================================== */}


          {/* Badge */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-sm font-medium backdrop-blur-sm">
            🚀 Penerimaan Siswa Baru 2026/2027
          </span>

          {/* Judul Utama dengan Typewriter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight text-white mb-8 min-h-[160px] md:min-h-0"
          >
            <h1>Mencetak Generasi</h1>
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
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                }}
              />
            </div>
          </motion.div>

          {/* Subjudul */}
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Mencetak generasi unggul yang siap kerja, cerdas berteknologi, dan berakhlak mulia. Bergabunglah bersama kami meraih masa depan gemilang.
          </p>

          {/* Tombol */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/ppdb" 
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2"
            >
              Daftar Sekarang <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/jurusan" 
              className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all"
            >
              Lihat Jurusan
            </Link>
          </div>
        </motion.div>
      </div>

    </section>
  );
}