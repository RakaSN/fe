"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Glitch 404 Text */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600 relative">
          404
          {/* Efek Bayangan Glitch */}
          <span className="absolute top-1 left-1 text-cyan-500 opacity-30 -z-10 animate-pulse">404</span>
          <span className="absolute -top-1 -left-1 text-red-500 opacity-30 -z-10 animate-pulse" style={{ animationDelay: "0.1s" }}>404</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 mt-8 max-w-lg"
      >
        <div className="flex items-center justify-center gap-3 text-red-400 mb-4 font-mono">
            <AlertTriangle size={20} />
            <span>SYSTEM_ERROR: PAGE_MISSING</span>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">Tersesat di Dunia Digital?</h2>
        <p className="text-slate-400 mb-8 text-lg">
          Halaman yang kamu cari sepertinya telah dipindahkan, dihapus, atau ditelan oleh *black hole*.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-950 font-bold rounded-full hover:bg-cyan-400 hover:scale-105 transition-all shadow-lg shadow-white/10"
        >
          <Home size={20} /> Kembali ke Markas
        </Link>
      </motion.div>

    </main>
  );
}