"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ArrowLeft, Linkedin, Mail, Quote, 
  Sparkles, Star, Award, Briefcase, Calendar 
} from "lucide-react";

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

export default function GuruDetailPage() {
  const params = useParams(); 
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      if (!params?.id) return;

      try {
        const res = await fetch(`/api/teachers/${params.id}`);
        if (!res.ok) throw new Error("Gagal");
        const data = await res.json();
        setTeacher(data);
      } catch (error) {
        console.error("Guru tidak ditemukan");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeacher();
  }, [params.id]);

  if (isLoading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-medium tracking-wide">
        <Sparkles className="animate-spin mr-3 text-cyan-400"/> Memuat profil mentor...
    </div>
  );

  if (!teacher) return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Guru tidak ditemukan 😔</h1>
        <button onClick={() => router.back()} className="text-cyan-400 hover:underline">Kembali</button>
    </div>
  );

  // Fallback warna jika data kosong
  const themeColor = teacher?.theme_color || "cyan"; 
  const accentColorClass = `text-${themeColor}-400`; // Untuk text highlight
  const bgAccentClass = `bg-${themeColor}-600`; // Untuk elemen background

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 relative overflow-x-hidden font-sans selection:bg-cyan-500/30">
      
      {/* --- BACKGROUND GLOW EFFECTS (Ambient) --- */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"/>
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"/>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* HEADER: Tombol Kembali */}
        <nav className="flex justify-between items-center mb-12">
             <button onClick={() => router.back()} className="flex items-center gap-3 text-slate-400 hover:text-white transition-all group px-4 py-2 rounded-full hover:bg-white/5">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Kembali ke List</span>
            </button>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* ================= KIRI: FOTO PROFIL ================= */}
            <div className="lg:col-span-5 flex flex-col gap-6 sticky top-10">
                
                {/* 1. KARTU FOTO UTAMA */}
                <div className="relative w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 group">
                    {teacher?.image ? (
                        <Image 
                            src={teacher.image} 
                            alt={teacher.name || "Guru"} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-105" 
                            unoptimized
                        />
                    ) : (
                         <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500">No Image</div>
                    )}
                    
                    {/* Gradient Overlay Gelap (Supaya tulisan terbaca) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90"></div>
                    
                    {/* INFO DI ATAS FOTO */}
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
                        {/* Label Level (SENIOR/EXPERT) */}
                        <div className="mb-3">
                             <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase bg-black/30 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                                {teacher?.level || "MENTOR"}
                            </span>
                        </div>
                        
                        {/* Nama Guru */}
                        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                            {teacher?.name}
                        </h1>
                        
                        {/* Role / Jabatan */}
                        <p className="text-slate-400 font-medium text-lg flex items-center gap-2">
                            {teacher?.role}
                        </p>
                    </div>
                </div>

                {/* 2. TOMBOL SOSIAL MEDIA (Grid 2 Kolom) */}
                <div className="grid grid-cols-2 gap-4">
                     {/* Tombol Email */}
                    <a href={teacher?.email ? `mailto:${teacher.email}` : "#"} className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#121212] border border-white/5 text-slate-300 hover:text-white hover:border-white/20 hover:bg-[#1a1a1a] transition-all font-medium group">
                        <Mail size={18} className="group-hover:text-cyan-400 transition-colors"/> 
                        <span>Email</span>
                    </a>
                    
                    {/* Tombol LinkedIn */}
                    <a href={teacher?.linkedin || "#"} target="_blank" className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#0077b5]/10 border border-[#0077b5]/20 text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all font-medium">
                        <Linkedin size={18}/> 
                        <span>LinkedIn</span>
                    </a>
                </div>
            </div>


            {/* ================= KANAN: DETAIL & BIO ================= */}
            <div className="lg:col-span-7 flex flex-col gap-8">
                
                {/* 1. SECTION QUOTES (Box Gelap Besar) */}
                <div className="relative bg-[#0F0F11] p-8 md:p-10 rounded-[2rem] border border-white/5 shadow-xl overflow-hidden">
                    {/* Ikon Kutipan Besar Transparan */}
                    <Quote className="absolute top-8 left-8 text-white/5 rotate-180" size={100} />
                    
                    <div className="relative z-10 text-center md:text-left">
                        <div className="flex justify-center md:justify-start items-center gap-4 mb-6">
                            <div className="h-[1px] w-12 bg-slate-700"></div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kata-kata Mentor</span>
                            <div className="h-[1px] w-full bg-slate-700/30"></div>
                        </div>

                        <p className="text-xl md:text-3xl font-serif italic text-slate-200 leading-relaxed mb-4">
                            "Coding bukan sekadar menulis baris kode, tapi tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold">memecahkan masalah</span> dan menciptakan solusi yang mengubah dunia."
                        </p>
                    </div>
                </div>

                {/* 2. STATISTIK (Spesialisasi & Pengalaman) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Card Spesialisasi */}
                    <div className="bg-[#0F0F11] p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-colors group">
                        <div className="flex items-center gap-3 mb-4 text-slate-500 group-hover:text-slate-300 transition-colors">
                            <Briefcase size={20}/> 
                            <span className="text-xs font-bold uppercase tracking-wider">Spesialisasi</span>
                        </div>
                        <p className="text-lg font-semibold text-white leading-snug">
                            {teacher?.subject || "Teknologi Informasi"}
                        </p>
                    </div>

                    {/* Card Pengalaman */}
                    <div className="bg-[#0F0F11] p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-colors group">
                        <div className="flex items-center gap-3 mb-4 text-slate-500 group-hover:text-slate-300 transition-colors">
                            <Star size={20}/> 
                            <span className="text-xs font-bold uppercase tracking-wider">Pengalaman</span>
                        </div>
                        <p className="text-4xl font-bold text-white mb-1">
                            {teacher?.experience || "0"} <span className="text-base font-medium text-slate-500">Tahun</span>
                        </p>
                    </div>
                </div>

                {/* 3. BIODATA / TENTANG */}
                <div className="py-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-4">
                        <Award className="text-purple-500"/> 
                        Tentang {teacher?.name?.split(' ')[0]}
                    </h3>
                    <div className="text-slate-400 leading-relaxed space-y-4 text-lg">
                        <p>
                            {teacher?.name} adalah seorang profesional di bidang IT yang berdedikasi tinggi. 
                            Dengan pengalaman matang di dunia {teacher?.subject}, beliau telah membimbing banyak siswa untuk mencapai potensi terbaik mereka.
                        </p>
                        <p>
                            Gaya mengajarnya dikenal {teacher?.level === 'Expert' ? 'mendalam' : 'sabar'} dan aplikatif, 
                            membuat materi {teacher?.subject} yang kompleks menjadi lebih mudah dipahami dan relevan dengan industri saat ini.
                            Di luar jam mengajar, beliau aktif berkontribusi di komunitas teknologi.
                        </p>
                    </div>
                </div>

                {/* 4. TOMBOL CTA (Call to Action) */}
                <div className="pt-2">
                    <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold text-lg shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2">
                        <Calendar size={20} />
                        Jadwalkan Sesi Mentoring
                    </button>
                    <p className="text-center text-slate-600 text-xs mt-4 font-medium">
                        *Slot terbatas setiap minggunya, pastikan Anda mendaftar lebih awal.
                    </p>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}