'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [glitchText, setGlitchText] = useState("SMK PK KAMPUNG JAWA");
  
  // --- 1. LOGIC: CANVAS PARTICLE NETWORK (JARINGAN DIGITAL) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Konfigurasi Partikel
    const particleCount = 100; // Jumlah titik
    const connectionDistance = 150; // Jarak koneksi garis
    const mouseDistance = 200; // Jarak reaksi mouse

    let particles: Particle[] = [];
    let mouse = { x: 0, y: 0 };

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number; color: string;
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5; // Kecepatan X
        this.vy = (Math.random() - 0.5) * 1.5; // Kecepatan Y
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#06b6d4' : '#3b82f6'; // Cyan atau Blue
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        // Pantul tembok
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Init Particles
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    // Animasi Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p, index) => {
        p.update();
        p.draw();

        // Gambar Garis (Connection)
        for (let j = index; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${1 - dist / connectionDistance})`; // Cyan Line
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Interaksi Mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distMouse = Math.sqrt(dx * dx + dy * dy);
        if (distMouse < mouseDistance) {
            const forceDirectionX = dx / distMouse;
            const forceDirectionY = dy / distMouse;
            const force = (mouseDistance - distMouse) / mouseDistance;
            // Partikel kabur dari mouse (efek magnet tolak)
            p.vx -= forceDirectionX * force * 0.5;
            p.vy -= forceDirectionY * force * 0.5;
        }
      });
      requestAnimationFrame(animate);
    };
    animate();

    // Handle Resize & Mouse Move
    const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    const handleMouseMove = (e: MouseEvent) => { 
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left; 
        mouse.y = e.clientY - rect.top; 
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // --- 2. LOGIC: HACKER TEXT DECODE EFFECT ---
  useEffect(() => {
    const originalText = "SMK PK KAMPUNG JAWA";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
    let iteration = 0;
    let interval: any = null;

    const startGlitch = () => {
        clearInterval(interval);
        interval = setInterval(() => {
            setGlitchText(prev => 
                originalText.split("").map((letter, index) => {
                    if(index < iteration) return originalText[index];
                    return letters[Math.floor(Math.random() * 26)];
                }).join("")
            );
            if(iteration >= originalText.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
    };

    startGlitch(); // Run on mount
    const loopGlitch = setInterval(() => { iteration = 0; startGlitch(); }, 5000); // Rerun every 5s

    return () => { clearInterval(interval); clearInterval(loopGlitch); };
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505] text-white">
      
      {/* --- LAYER 1: CANVAS NETWORK (Visualisasi Data) --- */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-[#050505]" />
      
      {/* --- LAYER 2: SCANLINES & VIGNETTE (Efek Monitor CRT) --- */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]"></div>
      <div className="absolute inset-0 z-1 pointer-events-none bg-radial-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

      {/* --- LAYER 3: HUD CORNERS (Dekorasi Pojok) --- */}
      <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-3xl pointer-events-none hidden md:block"></div>
      <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-3xl pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-3xl pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-cyan-500/50 rounded-br-3xl pointer-events-none hidden md:block"></div>

      {/* --- LAYER 4: KONTEN UTAMA --- */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        
        {/* SYSTEM STATUS BADGE */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1 bg-cyan-900/20 border border-cyan-500/30 rounded-none transform -skew-x-12">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-mono text-xs tracking-[0.2em] transform skew-x-12">SYSTEM INITIALIZED</span>
        </div>

        {/* GLITCH TITLE */}
        <h1 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            {glitchText}
        </h1>

        <p className="text-cyan-300/80 font-mono text-lg md:text-xl mb-10 max-w-2xl mx-auto tracking-wide">
            {`> ACCESSING FUTURE PROTOCOLS...`} <br/>
            {`> LOADING: GENERASI_EMAS_2045.EXE`}
        </p>

        {/* CYBER BUTTONS - Fixed & Centered */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-30">
            {/* START ENGINE BUTTON */}
            <Link 
              href="/ppdb" 
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-cyan-600 hover:bg-cyan-400 text-black font-black text-lg uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden clip-path-button shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
                {/* White Shimmer Effect - Diperbaiki agar tidak keluar batas */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                
                <span className="relative">START ENGINE</span>
            </Link>

            {/* SYSTEM DATA BUTTON */}
            <Link 
              href="/jurusan" 
              className="group relative inline-flex items-center justify-center px-10 py-4 border border-cyan-500/50 text-cyan-400 hover:text-white font-mono text-lg uppercase tracking-widest transition-all duration-300 overflow-hidden"
            >
                {/* Background Fill on Hover */}
                <span className="absolute inset-0 w-0 bg-cyan-500/10 group-hover:w-full transition-all duration-300 ease-out"></span>
                
                {/* Animated Bottom Line */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                
                <span className="relative">SYSTEM DATA</span>
            </Link>
        </div>

      </div>

      {/* DECORATION: VERTICAL LINES */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 h-1/2 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent hidden lg:block"></div>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 h-1/2 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent hidden lg:block"></div>
    
    </section>
  );
}