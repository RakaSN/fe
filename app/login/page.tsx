"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Lock, Mail, ArrowRight, Loader2, Github, Chrome } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Simulasi Login (Hanya efek visual)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Pura-pura loading 2 detik
    setTimeout(() => {
      setIsLoading(false);
      alert("Login Berhasil! (Ini cuma simulasi ya)");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-slate-950 flex">
      
      {/* --- BAGIAN KIRI: FORMULIR --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 pt-24 relative overflow-hidden">
        {/* Background Decor Mobile */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none lg:hidden"></div>
        
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-8 relative z-10"
        >
            {/* Header Form */}
            <div className="text-center lg:text-left">
                <div className="inline-block p-3 rounded-2xl bg-cyan-900/20 text-cyan-400 mb-6 border border-cyan-500/20">
                    <Lock size={24} />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, <span className="text-cyan-400">Student!</span></h1>
                <p className="text-slate-400">Masuk ke dashboard pembelajaran masa depan.</p>
            </div>

            {/* Form Input */}
            <form onSubmit={handleLogin} className="space-y-6">
                
                {/* Email Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">Email Sekolah</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                            <Mail size={20} />
                        </div>
                        <input 
                            type="email" 
                            required
                            placeholder="nama@siswa.future.sch.id"
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                        <Link href="#" className="text-xs text-cyan-400 hover:text-cyan-300">Lupa Password?</Link>
                    </div>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                            <Lock size={20} />
                        </div>
                        <input 
                            type="password" 
                            required
                            placeholder="••••••••"
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        />
                    </div>
                </div>

                {/* Tombol Login */}
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 group"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" /> Memproses...
                        </>
                    ) : (
                        <>
                            Masuk Portal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>

            </form>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-950 px-2 text-slate-500">Atau masuk dengan</span>
                </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-slate-300 text-sm font-medium">
                    <Chrome size={18} /> Google
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-slate-300 text-sm font-medium">
                    <Github size={18} /> GitHub
                </button>
            </div>

            <p className="text-center text-sm text-slate-500">
                Belum punya akun? <Link href="/ppdb" className="text-cyan-400 hover:underline">Daftar PPDB Online</Link>
            </p>
        </motion.div>
      </div>

      {/* --- BAGIAN KANAN: VISUAL ART (Desktop Only) --- */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
        {/* Background Image / Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-slate-900 to-slate-900 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070')] bg-cover bg-center opacity-30 grayscale mix-blend-overlay"></div>
        
        {/* Animated Shapes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }}></div>

        {/* Floating Card */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative z-20 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl max-w-md mx-12 shadow-2xl"
        >
            <div className="flex gap-1 mb-6">
                {[1,2,3].map(i => <div key={i} className="w-3 h-3 rounded-full bg-white/20"></div>)}
            </div>
            <p className="text-xl font-medium text-white mb-6 leading-relaxed">
                "Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan, Anda dapat mengubah dunia."
            </p>
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full overflow-hidden p-0.5">
                    <Image src="/logo.png" width={48} height={48} alt="Logo" className="object-contain" />
                </div>
                <div>
                    <h4 className="text-white font-bold">Nelson Mandela</h4>
                    <p className="text-slate-400 text-sm">Tokoh Dunia</p>
                </div>
            </div>
        </motion.div>

      </div>

    </main>
  );
}