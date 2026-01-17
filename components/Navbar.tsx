"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react'; // Tambah Menu & X
import { motion, AnimatePresence } from 'framer-motion'; // Kita butuh animasi

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State untuk menu HP

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Daftar Menu biar rapi
  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profil' },
    { name: 'Jurusan', href: '/jurusan' },
    { name: "Guru", href: "/guru" },
    { name: "Galeri", href: "/galeri" },
    { name: 'Berita', href: '/berita' },
    { name: "PPDB", href: "/ppdb" },
    { name: "Kontak", href: "/kontak" },
    { name: "Tech Stack & Architecture", href: "/tech" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled || mobileMenuOpen ? "bg-slate-950/90 backdrop-blur-xl py-4 border-b border-white/10" : "bg-transparent py-6"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group z-50 relative">
          {/* Wadah Gambar Logo */}
          <div className="relative w-10 h-10 md:w-12 md:h-12 transform group-hover:rotate-12 transition-transform duration-300">
             <Image 
                src="/logo.png" 
                alt="Logo Future Academy" 
                fill
                className="object-contain drop-shadow-lg"
             />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            SMK PK<span className="text-cyan-400">KAMPUNG JAWA JAKARTA</span>
          </span>
        </Link>

        {/* --- DESKTOP MENU (Hidden di HP) --- */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((item) => (
            <Link key={item.name} href={item.href} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white relative group overflow-hidden rounded-lg">
               <span className="relative z-10">{item.name}</span>
               <span className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-lg"></span>
            </Link>
          ))}
        </div>

        {/* Tombol Login Desktop */}
        <Link href="/login" className="hidden md:flex relative group px-6 py-2.5 font-bold text-sm rounded-full overflow-hidden bg-slate-800 text-white border border-white/10 hover:border-cyan-500/50 transition-colors">
            <span className="relative z-10 flex items-center gap-2">Login Sistem </span>
            <div className="absolute inset-0 h-full w-[200%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_deg,transparent_90deg,#06b6d4_180deg,transparent_270deg,transparent_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:group-hover:animate-[spin_2s_linear_infinite]" style={{ top: '-50%', left: '-50%' }}></div>
        </Link>

        {/* --- MOBILE HAMBURGER BUTTON --- */}
        <button 
          className="md:hidden text-white z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/10 md:hidden flex flex-col p-4 shadow-2xl"
          >
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setMobileMenuOpen(false)} // Tutup menu saat diklik
                className="py-4 text-center text-lg font-medium text-slate-300 hover:text-white border-b border-white/5 last:border-0"
              >
                {item.name}
              </Link>
            ))}
            
            <Link 
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 w-full bg-gradient-to-r from-cyan-600 to-blue-600 py-3 rounded-xl text-white font-bold text-center flex justify-center items-center gap-2"
            >
              Login Sistem <ArrowRight size={18} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      
    </nav>
  );
}