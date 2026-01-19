"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Users, GraduationCap, Building2, Trophy } from "lucide-react";

export default function KepalaSekolah() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      
      {/* Background Ornament */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* BAGIAN FOTO (Kiri) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-cyan-900/20">
              {/* Ganti src dengan foto kepala sekolah asli nanti */}
              <Image
                src="/ibu.png" 
                alt="Kepala Sekolah"
                fill
                className="object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
              
              {/* Nama di atas foto */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                    <h3 className="text-xl font-bold text-white">Kartika Ariyani, S.Pd</h3>
                    <p className="text-cyan-400 text-sm">Kepala Sekolah</p>
                </div>
              </div>
            </div>

            {/* Elemen Dekorasi Kotak-kotak */}
            <div className="absolute -z-10 top-10 -left-10 w-full h-full border border-dashed border-white/10 rounded-3xl hidden lg:block"></div>
          </motion.div>

          {/* BAGIAN TEKS SAMBUTAN (Kanan) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-sm font-semibold">
                <Quote size={16} /> Sambutan Kepala Sekolah
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Mewujudkan Generasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Unggul & Berkarakter</span>
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed text-justify">
              "Selamat datang di website resmi kami. Di era digital yang berkembang pesat ini, kami berkomitmen untuk tidak hanya mencetak lulusan yang kompeten secara teknis, tetapi juga memiliki karakter kuat dan siap bersaing di kancah global. Kurikulum kami dirancang selaras dengan industri (Link and Match) untuk memastikan setiap siswa siap kerja, wirausaha, atau melanjutkan studi."
            </p>

            {/* STATISTIK MINI */}
            <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-slate-900 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                    <Users className="text-cyan-400 mb-2" size={32} />
                    <div className="text-3xl font-bold text-white">1.250+</div>
                    <div className="text-sm text-slate-500">Siswa Aktif</div>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors">
                    <Building2 className="text-purple-400 mb-2" size={32} />
                    <div className="text-3xl font-bold text-white">50+</div>
                    <div className="text-sm text-slate-500">Mitra Industri</div>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
                    <GraduationCap className="text-green-400 mb-2" size={32} />
                    <div className="text-3xl font-bold text-white">98%</div>
                    <div className="text-sm text-slate-500">Terserap Kerja</div>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors">
                    <Trophy className="text-amber-400 mb-2" size={32} />
                    <div className="text-3xl font-bold text-white">120+</div>
                    <div className="text-sm text-slate-500">Prestasi</div>
                </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}