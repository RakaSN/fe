"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // 👈 1. IMPORT INI WAJIB
import { Menu, X, ArrowRight, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname(); // 👈 2. PANGGIL HOOK INI
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ============================================================
  // 🔥 LOGIKA NGUMPET (RAHASIA SUPAYA GAK MUNCUL DI ADMIN)
  // ============================================================
  // Kalau URL diawali "/admin" ATAU "/login", Navbar ini pulang kampung (gak muncul).
  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profil' },
    { name: 'Jurusan', href: '/jurusan' },
    { name: "Guru", href: "/guru" },
    { name: "Galeri", href: "/galeri" },
    { name: 'Berita', href: '/berita' },
    { name: "PPDB", href: "/ppdb" },
    { name: "Kontak", href: "/kontak" },
  ];

  // 🔥 UPDATE LINK LOGIN
  // Kita ganti ke "/login" (Internal Next.js) karena Admin Laravel (Port 8000) udah gak kepake.
  const LOGIN_URL = "/login"; 

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-slate-950/90 backdrop-blur-xl py-3 border-b border-white/10" 
        : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* --- 1. LOGO --- */}
        <Link href="/" className="flex items-center gap-3 group relative z-50">
          <div className="relative w-10 h-10 transform group-hover:rotate-12 transition-transform duration-300">
             {/* Pastikan file logo.png ada di folder public */}
             <Image 
                src="/logo.png" 
                alt="Logo" 
                fill
                className="object-contain drop-shadow-lg"
             />
          </div>
          <div className="flex flex-col justify-center">
             <span className="text-sm md:text-lg font-extrabold tracking-tight text-white leading-none">
                SMK <span className="text-cyan-400">PK</span>
             </span>
             <span className="text-[10px] md:text-xs font-medium text-slate-400 tracking-[0.2em] uppercase">
                Kampung Jawa Jakarta
             </span>
          </div>
        </Link>

        {/* --- 2. DESKTOP MENU --- */}
        <div className="hidden xl:flex items-center bg-slate-900/50 p-1 rounded-full border border-white/5 backdrop-blur-sm">
          {navLinks.map((item) => (
            <Link key={item.name} href={item.href} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white relative group rounded-full hover:bg-white/10 transition-all">
               {item.name}
            </Link>
          ))}
        </div>

        {/* --- 3. TOMBOL KANAN (Desktop) --- */}
        <div className="hidden xl:flex items-center gap-3">
            <Link href="/tech" className="text-slate-400 hover:text-cyan-400 transition-colors p-2" title="Tech Stack">
                <Rocket size={20} />
            </Link>

            {/* 🔥 BUTTON LOGIN (Pake Link Next.js) */}
            <Link 
                href={LOGIN_URL}
                className="px-5 py-2.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
                Login Admin
            </Link>
        </div>

        {/* --- 4. HAMBURGER BUTTON --- */}
        <button 
          className="xl:hidden text-white z-50 p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* --- 5. MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 space-y-6"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            {navLinks.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="w-full max-w-xs"
              >
                <Link 
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center text-2xl font-bold text-slate-300 hover:text-white hover:scale-105 transition-transform"
                >
                    {item.name}
                </Link>
              </motion.div>
            ))}

            <div className="flex flex-col w-full max-w-xs gap-4 pt-6 border-t border-white/10 mt-4">
                <Link 
                    href="/tech"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 bg-slate-900 border border-white/10 rounded-xl text-slate-300 font-bold"
                >
                    <Rocket size={18} className="text-cyan-400" /> Tech Stack
                </Link>
                
                {/* 🔥 BUTTON LOGIN MOBILE */}
                <Link 
                    href={LOGIN_URL}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-bold shadow-lg shadow-cyan-500/20"
                >
                    Login Sistem <ArrowRight size={18} />
                </Link>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
      
    </nav>
  );
}