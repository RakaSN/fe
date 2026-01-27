import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Linkedin, Twitter, Mail, Quote, Briefcase, GraduationCap } from "lucide-react";
import { TeacherItem } from "@/components/guru/GuruClient";

// Helper Warna (Copy dari client)
const colorMap: Record<string, string> = {
  cyan:   "from-cyan-400 to-blue-500",
  blue:   "from-blue-500 to-indigo-600",
  purple: "from-purple-400 to-pink-500",
  red:    "from-red-400 to-rose-600",
  orange: "from-yellow-400 to-orange-500",
  green:  "from-green-400 to-emerald-600",
  slate:  "from-slate-400 to-slate-600",
};

// Fetch Data Detail
async function getTeacherDetail(id: string): Promise<TeacherItem | null> {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/teachers/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

// Metadata Dinamis
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const teacher = await getTeacherDetail(params.id);
  return {
    title: teacher ? `${teacher.name} | Profil Guru` : "Guru Tidak Ditemukan",
  };
}

export default async function TeacherDetailPage({ params }: { params: { id: string } }) {
  const teacher = await getTeacherDetail(params.id);

  if (!teacher) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Data Guru Tidak Ditemukan</div>;
  }

  const gradientClass = colorMap[teacher.theme_color] || colorMap['cyan'];

  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-20 overflow-hidden relative">
      
      {/* Background Glow */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b ${gradientClass} opacity-20 blur-[120px] rounded-full pointer-events-none`}></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Tombol Kembali */}
        <Link href="/guru" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
           <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/> Kembali ke Daftar Guru
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 items-start">
            
            {/* KOLOM KIRI: Foto & Quick Stats */}
            <div className="space-y-6">
                <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image 
                        src={teacher.image_url} 
                        alt={teacher.name} 
                        fill 
                        className="object-cover"
                        priority
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${gradientClass} opacity-30 mix-blend-overlay`}></div>
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 justify-center">
                    {teacher.linkedin && (
                         <a href={teacher.linkedin} target="_blank" className="p-3 bg-slate-900 border border-white/10 rounded-full text-slate-400 hover:text-white hover:border-cyan-500 transition-all"><Linkedin size={20}/></a>
                    )}
                    {teacher.twitter && (
                         <a href={teacher.twitter} target="_blank" className="p-3 bg-slate-900 border border-white/10 rounded-full text-slate-400 hover:text-white hover:border-cyan-500 transition-all"><Twitter size={20}/></a>
                    )}
                    {teacher.email && (
                         <a href={`mailto:${teacher.email}`} className="p-3 bg-slate-900 border border-white/10 rounded-full text-slate-400 hover:text-white hover:border-cyan-500 transition-all"><Mail size={20}/></a>
                    )}
                </div>
            </div>

            {/* KOLOM KANAN: Detail Info */}
            <div>
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${gradientClass} text-white mb-6 shadow-lg shadow-cyan-500/20`}>
                    {teacher.role}
                </span>
                
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                    {teacher.name}
                </h1>
                
                <p className="text-xl text-slate-400 mb-10 flex items-center gap-2">
                    <Briefcase size={20} className="text-cyan-400"/> {teacher.subject} Specialist
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                     <div className="p-4 rounded-2xl bg-slate-900 border border-white/5">
                        <p className="text-slate-500 text-xs uppercase mb-1">Pengalaman</p>
                        <p className="text-2xl font-bold text-white">{teacher.experience}</p>
                     </div>
                     <div className="p-4 rounded-2xl bg-slate-900 border border-white/5">
                        <p className="text-slate-500 text-xs uppercase mb-1">Level</p>
                        <p className="text-2xl font-bold text-white">{teacher.level}</p>
                     </div>
                     <div className="p-4 rounded-2xl bg-slate-900 border border-white/5">
                        <p className="text-slate-500 text-xs uppercase mb-1">Status</p>
                        <p className="text-2xl font-bold text-green-400">Active</p>
                     </div>
                     <div className="p-4 rounded-2xl bg-slate-900 border border-white/5">
                        <p className="text-slate-500 text-xs uppercase mb-1">Rating</p>
                        <p className="text-2xl font-bold text-yellow-400 flex items-center gap-1">4.9 <Star size={16} fill="currentColor"/></p>
                     </div>
                </div>

                {/* Quote / Bio */}
                <div className="relative p-8 rounded-3xl bg-slate-900/50 border border-white/5 overflow-hidden">
                    <Quote className="absolute top-4 left-4 text-white/5" size={80} />
                    <h3 className="text-white font-bold text-lg mb-4 relative z-10 flex items-center gap-2">
                        <GraduationCap className="text-cyan-400"/> Teaching Philosophy
                    </h3>
                    <p className="text-slate-400 leading-relaxed relative z-10">
                        "Pendidikan bukan sekadar mengisi wadah yang kosong, melainkan menyalakan api keingintahuan. 
                        Di era digital ini, saya berkomitmen untuk mencetak talenta yang tidak hanya jago koding, 
                        tapi juga memiliki etika dan kemampuan problem solving yang kuat."
                    </p>
                </div>

                {/* CTA */}
                <div className="mt-8">
                    <button className="px-8 py-3 bg-white text-slate-950 font-bold rounded-full hover:bg-cyan-400 transition-all">
                        Jadwalkan Konsultasi
                    </button>
                </div>

            </div>
        </div>
      </div>
    </main>
  );
}