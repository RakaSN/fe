"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Code2, Github, Instagram, Linkedin, Cpu, Zap, Database } from "lucide-react";

export default function DeveloperCard() {
  return (
    <section className="py-20 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
            
            {/* Header Kecil */}
            <div className="text-center mb-10">
                <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
                    // Behind The Code
                </span>
                <h2 className="text-3xl font-bold text-white mt-2">Developed by</h2>
            </div>

            {/* KARTU UTAMA */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden group"
            >
                {/* Efek Hover Glow Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/30 rounded-3xl transition-colors duration-500 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                    
                    {/* FOTO PROFIL (KIRI) */}
                    <div className="relative shrink-0">
                        <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-slate-800 relative overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                             {/* Pastikan file dev.png ada di folder public */}
                             <Image 
                                src="/dev.png" 
                                alt="Foto Developer" 
                                fill
                                className="object-cover"
                             />
                        </div>
                        {/* Badge Status */}
                        <div className="absolute bottom-2 right-2 bg-green-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full border-2 border-slate-900 flex items-center gap-1">
                            <span className="w-2 h-2 bg-slate-900 rounded-full animate-pulse"></span>
                            Now Online
                        </div>
                    </div>

                    {/* INFO TEXT (KANAN) */}
                    <div className="text-center md:text-left flex-1">
                        <h3 className="text-3xl font-bold text-white mb-2">Raka Sepyan Nurfiqri, S.Kom</h3>
                        <p className="text-cyan-400 font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
                            <Code2 size={18} /> Fullstack Web Developer
                        </p>
                        
                        <p className="text-slate-400 leading-relaxed mb-6">
                            "Website ini dibangun dengan cinta dan kopi ☕. Menggunakan teknologi modern <strong>Next.js 14</strong>, <strong>Laravel</strong>, <strong>Tailwind CSS</strong>, dan <strong>Framer Motion</strong> untuk performa maksimal dan animasi yang halus."
                        </p>

                        {/* Tech Stack Badges */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
                            {['Next.js', 'Laravel','React', 'TypeScript', 'Tailwind', 'Framer Motion'].map((tech) => (
                                <span key={tech} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-mono flex items-center gap-1">
                                    <Zap size={10} className="text-yellow-400" /> {tech}
                                </span>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center md:justify-start gap-4">
                            <Link href="https://github.com/username-kamu" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-black hover:text-white transition-all border border-white/5 hover:border-white/20">
                                <Github size={20} />
                            </Link>
                            <Link href="https://instagram.com/username-kamu" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-pink-600 hover:text-white transition-all border border-white/5 hover:border-white/20">
                                <Instagram size={20} />
                            </Link>
                            <Link href="https://linkedin.com/in/username-kamu" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all border border-white/5 hover:border-white/20">
                                <Linkedin size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
}