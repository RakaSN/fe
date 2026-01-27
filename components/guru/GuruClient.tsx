"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // <--- JANGAN LUPA INI
import { Linkedin, Mail, Twitter, Award, Star, Zap } from "lucide-react";

export interface TeacherItem {
  id: number;
  name: string;
  role: string;
  subject: string;
  experience: string;
  level: string;
  image_url: string;
  theme_color: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

const colorMap: Record<string, string> = {
  cyan:   "from-cyan-400 to-blue-500",
  blue:   "from-blue-500 to-indigo-600",
  purple: "from-purple-400 to-pink-500",
  red:    "from-red-400 to-rose-600",
  orange: "from-yellow-400 to-orange-500",
  green:  "from-green-400 to-emerald-600",
  slate:  "from-slate-400 to-slate-600",
};

export default function GuruClient({ teachers }: { teachers: TeacherItem[] }) {
  return (
    <div className="container mx-auto px-4">
        {/* Header (Sama seperti sebelumnya) */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
            >
                Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Mentors</span>
            </motion.h1>
            <p className="text-slate-400 text-lg">
                Klik kartu guru untuk melihat profil lengkap, spesialisasi, dan kontak mereka.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, i) => {
                const gradientClass = colorMap[teacher.theme_color] || colorMap['cyan'];

                return (
                    <motion.div 
                        key={teacher.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative h-[400px] w-full perspective-1000"
                    >
                        {/* WRAPPER LINK AGAR BISA DIKLIK */}
                        <Link href={`/guru/${teacher.id}`} className="block w-full h-full">
                            <div className="relative w-full h-full bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
                                
                                <div className={`absolute inset-0 bg-gradient-to-tr ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay`}></div>
                                <div className={`absolute inset-0 bg-gradient-to-tr ${gradientClass} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                                <div className="absolute top-0 left-0 w-full h-3/4 overflow-hidden">
                                    <Image 
                                        src={teacher.image_url} 
                                        alt={teacher.name} 
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                        unoptimized={true}
                                    />
                                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                                    <div className="flex justify-between items-end mb-2">
                                        <div>
                                            <p className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent mb-1`}>
                                                {teacher.role}
                                            </p>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors">{teacher.name}</h3>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                                        <div className="text-center">
                                            <Zap size={18} className="mx-auto text-yellow-400 mb-1" />
                                            <p className="text-[10px] text-slate-400 uppercase">Mapel</p>
                                            <p className="text-xs font-bold text-white truncate w-20">{teacher.subject}</p>
                                        </div>
                                        <div className="text-center">
                                            <Award size={18} className="mx-auto text-cyan-400 mb-1" />
                                            <p className="text-[10px] text-slate-400 uppercase">Exp</p>
                                            <p className="text-xs font-bold text-white">{teacher.experience}</p>
                                        </div>
                                        <div className="text-center">
                                            <Star size={18} className="mx-auto text-purple-400 mb-1" />
                                            <p className="text-[10px] text-slate-400 uppercase">Rank</p>
                                            <p className="text-xs font-bold text-white">{teacher.level}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    </div>
  );
}