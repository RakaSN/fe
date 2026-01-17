"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail, Twitter, Award, Star, Zap } from "lucide-react";

const teachers = [
  {
    name: "Kartika Ariyani, S.Pd",
    role: "Kepala Sekolah",
    mapel: "Leadership",
    exp: "20 Thn",
    level: "Legendary",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974",
    color: "from-yellow-400 to-orange-500"
  },
  {
    name: "Sarah Wijaya, M.Kom",
    role: "Kaprodi RPL",
    mapel: "Fullstack Dev",
    exp: "8 Thn",
    level: "Expert",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976",
    color: "from-cyan-400 to-blue-500"
  },
  {
    name: "Budi Santoso, S.T",
    role: "Kaprodi TKJ",
    mapel: "Network Eng.",
    exp: "12 Thn",
    level: "Master",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
    color: "from-green-400 to-emerald-600"
  },
  {
    name: "Jessica Lee, B.Des",
    role: "Guru Multimedia",
    mapel: "UI/UX Design",
    exp: "5 Thn",
    level: "Creative",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961",
    color: "from-purple-400 to-pink-500"
  },
  {
    name: "Raka Sepyan Nurfiqri",
    role: "Guru Informatika",
    mapel: "Informatika, Koding dan AI",
    exp: "15 Thn",
    level: "Native",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070",
    color: "from-red-400 to-rose-600"
  },
  {
    name: "Erik 'The Hacker'",
    role: "Guru Keamanan Siber",
    mapel: "Ethical Hacking",
    exp: "Unknown",
    level: "Classified",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974",
    color: "from-slate-400 to-slate-600"
  },
];

export default function GuruPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-cyan-900/20 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
            >
                Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Mentors</span>
            </motion.h1>
            <p className="text-slate-400 text-lg">
                Bukan sekadar guru biasa. Mereka adalah praktisi industri, inovator, dan pemandu masa depanmu.
            </p>
        </div>

        {/* Grid Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative h-[400px] w-full perspective-1000"
                >
                    {/* The Card */}
                    <div className="relative w-full h-full bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
                        
                        {/* Gradient Overlay Behind Image */}
                        <div className={`absolute inset-0 bg-gradient-to-tr ${teacher.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                        {/* Image */}
                        <div className="absolute top-0 left-0 w-full h-3/4 overflow-hidden">
                            <Image 
                                src={teacher.image} 
                                alt={teacher.name} 
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                            />
                            {/* Overlay Gradient bawah gambar agar teks terbaca */}
                            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
                        </div>

                        {/* Info Content */}
                        <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <p className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${teacher.color} bg-clip-text text-transparent mb-1`}>
                                        {teacher.role}
                                    </p>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors">{teacher.name}</h3>
                                </div>
                            </div>
                            
                            {/* Stats (Hidden by default, shown on hover) */}
                            <div className="h-0 group-hover:h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                                <div className="text-center">
                                    <Zap size={18} className="mx-auto text-yellow-400 mb-1" />
                                    <p className="text-[10px] text-slate-400 uppercase">Mapel</p>
                                    <p className="text-xs font-bold text-white">{teacher.mapel}</p>
                                </div>
                                <div className="text-center">
                                    <Award size={18} className="mx-auto text-cyan-400 mb-1" />
                                    <p className="text-[10px] text-slate-400 uppercase">Exp</p>
                                    <p className="text-xs font-bold text-white">{teacher.exp}</p>
                                </div>
                                <div className="text-center">
                                    <Star size={18} className="mx-auto text-purple-400 mb-1" />
                                    <p className="text-[10px] text-slate-400 uppercase">Rank</p>
                                    <p className="text-xs font-bold text-white">{teacher.level}</p>
                                </div>
                            </div>

                            {/* Social Icons (Floating) */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                <button className="p-2 bg-slate-950/50 backdrop-blur rounded-full text-white hover:bg-blue-600 hover:scale-110 transition-all"><Linkedin size={16} /></button>
                                <button className="p-2 bg-slate-950/50 backdrop-blur rounded-full text-white hover:bg-sky-500 hover:scale-110 transition-all"><Twitter size={16} /></button>
                                <button className="p-2 bg-slate-950/50 backdrop-blur rounded-full text-white hover:bg-red-500 hover:scale-110 transition-all"><Mail size={16} /></button>
                            </div>
                        </div>

                    </div>
                </motion.div>
            ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-colors"></div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">Tertarik menjadi bagian dari The Squad?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto relative z-10">
                Kami selalu mencari talenta pengajar yang memiliki visi masa depan. Kirim CV Anda sekarang.
            </p>
            <button className="relative z-10 px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-cyan-400 transition-all shadow-lg hover:scale-105">
                Karir di Future Academy
            </button>
        </div>

      </div>
    </main>
  );
}