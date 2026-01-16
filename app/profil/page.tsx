"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Lightbulb, Users, Trophy } from "lucide-react";
import DeveloperCard from "@/components/DeveloperCard";

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-20 overflow-hidden">
      
      {/* --- HERO SECTION KECIL --- */}
      <section className="relative py-20 mb-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
           <motion.h1 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-6xl font-extrabold text-white mb-6"
           >
             Mengenal <span className="text-cyan-400">SMK PUSAT KEUNGGULAN KAMPUNG JAWA JAKARTA</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-slate-400 max-w-2xl mx-auto text-lg"
           >
             Lebih dari sekadar sekolah. Kami adalah inkubator talenta digital yang siap membentuk masa depan teknologi Indonesia.
           </motion.p>
        </div>
      </section>

      {/* --- SAMBUTAN KEPALA SEKOLAH --- */}
      <section className="container mx-auto px-4 mb-32">
        <div className="bg-gradient-to-br from-slate-900 to-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Dekorasi Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>

          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            {/* Foto Kepsek */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/3"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <Image 
                  src="/ibu.png" // Placeholder Foto Pria Jas
                  alt="Kepala Sekolah"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay Nama */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h3 className="text-xl font-bold text-white">Kartika Ariyani, S.Pd</h3>
                  <p className="text-cyan-400 text-sm">Kepala Sekolah</p>
                </div>
              </div>
            </motion.div>

            {/* Teks Sambutan */}
            <div className="w-full md:w-2/3 text-slate-300 space-y-6">
              <h2 className="text-3xl font-bold text-white">Membangun Generasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Inovator</span></h2>
              
              <div className="space-y-4 leading-relaxed text-lg">
                <p>
                  "Di era Revolusi Industri 4.0 (menuju 5.0), pendidikan tidak bisa lagi berjalan linier. Kita tidak hanya butuh siswa yang pandai menghafal, tapi siswa yang mampu <strong>memecahkan masalah</strong> dengan teknologi."
                </p>
                <p>
                  Future Academy hadir dengan kurikulum adaptif yang selaras dengan Silicon Valley. Kami memangkas jarak antara teori di kelas dengan kebutuhan industri global.
                </p>
                <p>
                  Mari bergabung bersama kami, dan jadilah pemain utama dalam transformasi digital dunia."
                </p>
              </div>

              <div className="pt-4">
                <Image src="/signature.png" width={150} height={50} alt="Tanda Tangan" className="opacity-50 invert" /> 
                {/* Catatan: Kalau tdk ada gambar signature, ini akan blank putih/broken, bisa dihapus kalau mau */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VISI & MISI (GRID) --- */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Kartu Visi */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-slate-900 border border-cyan-500/30 relative overflow-hidden group hover:bg-slate-800 transition-all"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-[60px] group-hover:bg-cyan-500/30 transition-all"></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white">Visi Kami</h3>
            </div>
            <p className="text-xl text-slate-300 font-medium leading-relaxed">
              "Menjadi pusat pendidikan teknologi terdepan di Asia Tenggara yang mencetak sociopreneur digital berkarakter dan berdaya saing global pada tahun 2030."
            </p>
          </motion.div>

          {/* Kartu Misi */}
          <div className="space-y-4">
            {[
              { text: "Menyelenggarakan pendidikan berbasis Project Based Learning.", icon: Target },
              { text: "Membangun ekosistem kolaborasi dengan industri global.", icon: Users },
              { text: "Mencetak lulusan yang tersertifikasi internasional.", icon: Trophy },
            ].map((misi, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/50 hover:bg-white/10 transition-all"
              >
                <div className="shrink-0 text-cyan-400">
                  <misi.icon size={24} />
                </div>
                <p className="text-slate-300 font-medium">{misi.text}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
            <DeveloperCard />
    </main>
  );
}