"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // <--- PENTING: Import Link
import { Linkedin, Mail, Search, Loader2, Sparkles, ExternalLink } from "lucide-react";

interface Teacher {
  id: number;
  name: string;
  role: string;
  subject: string;
  experience: string;
  level: string;
  image: string;
  theme_color: string;
  linkedin?: string;
  email?: string;
}

export default function GuruPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch("/api/teachers");
        const data = await res.json();
        if (Array.isArray(data)) setTeachers(data);
      } catch (error) {
        console.error("Gagal load guru", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto py-20 px-6">
        
        {/* --- HEADER --- */}
        <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles size={14} /> Expert Mentors
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Masters</span>
            </h1>
            
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Bergabunglah dengan para mentor elit yang siap membawamu dari pemula menjadi profesional.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative mt-10 group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-30 group-hover:opacity-100 transition duration-500 blur"></div>
                <div className="relative flex items-center bg-slate-900 rounded-full">
                    <Search className="absolute left-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20}/>
                    <input 
                        type="text" 
                        placeholder="Cari mentor (e.g. React, Python)..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent border-none text-white placeholder:text-slate-600 py-4 pl-14 pr-6 rounded-full focus:outline-none focus:ring-0"
                    />
                </div>
            </div>
        </div>

        {/* --- CONTENT GRID --- */}
        {isLoading ? (
             <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-cyan-500 mb-4" size={48} />
                <p className="text-slate-500 animate-pulse">Memanggil data dari server...</p>
             </div>
        ) : filteredTeachers.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/30 backdrop-blur-sm rounded-3xl border border-slate-800 border-dashed">
                <p className="text-slate-400 text-xl">Tidak ada mentor yang cocok.</p>
                <button onClick={() => setSearch("")} className="mt-4 text-cyan-400 hover:text-cyan-300 underline underline-offset-4">Reset Pencarian</button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTeachers.map((t) => (
                    <div key={t.id} className="group relative bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/5 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col items-center text-center p-8">
                        
                        {/* 1. Foto Profil (Sekarang link ke detail) */}
                        <Link href={`/guru/${t.id}`} className="relative mb-6 cursor-pointer">
                            <div className={`absolute -inset-1 bg-gradient-to-r from-${t.theme_color}-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-75 blur transition duration-500`}></div>
                            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-slate-950 shadow-2xl">
                                {t.image ? (
                                    <Image src={t.image} alt={t.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized/>
                                ) : (
                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">No Img</div>
                                )}
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-slate-950 rounded-full border border-slate-800 shadow-lg flex items-center gap-1 whitespace-nowrap">
                                <span className={`w-2 h-2 rounded-full bg-${t.theme_color}-500 animate-pulse`}></span>
                                <span className="text-xs font-bold tracking-wide uppercase text-white">{t.level}</span>
                            </div>
                        </Link>

                        {/* 2. Info */}
                        <div className="w-full mt-4 space-y-2">
                            {/* Nama jadi Link juga */}
                            <Link href={`/guru/${t.id}`} className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors block hover:underline decoration-cyan-500/50 underline-offset-4 decoration-2">
                                {t.name}
                            </Link>
                            <p className={`text-sm font-medium tracking-wide uppercase text-${t.theme_color}-400`}>
                                {t.role}
                            </p>
                        </div>

                        <div className="my-6 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

                        <div className="space-y-4 w-full">
                            <div className="bg-slate-800/50 rounded-xl p-3 border border-white/5">
                                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Spesialisasi</p>
                                <p className="text-slate-200 font-medium">{t.subject}</p>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                                <Sparkles size={14} className="text-yellow-500"/>
                                <span>{t.experience} Pengalaman</span>
                            </div>
                        </div>

                        {/* 3. Social & Detail Button */}
                        <div className="mt-8 flex items-center justify-center gap-4 w-full">
                            {t.email && (
                                <a href={`mailto:${t.email}`} className="p-3 rounded-full bg-slate-800/50 text-slate-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 border border-white/5 hover:border-cyan-400">
                                    <Mail size={20} />
                                </a>
                            )}
                            {t.linkedin && (
                                <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-800/50 text-slate-400 hover:bg-[#0077b5] hover:text-white transition-all duration-300 border border-white/5 hover:border-[#0077b5]">
                                    <Linkedin size={20} />
                                </a>
                            )}
                            
                            {/* --- TOMBOL DETAIL YANG SUDAH DIPERBAIKI --- */}
                            <Link 
                                href={`/guru/${t.id}`} 
                                className="px-6 py-3 rounded-full bg-white text-slate-950 text-sm font-bold hover:bg-cyan-50 transition-colors flex items-center gap-2"
                            >
                                Detail <ExternalLink size={14}/>
                            </Link>
                        </div>

                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}