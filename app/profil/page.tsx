"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Lightbulb, Users, Trophy, Terminal, Activity, ShieldCheck } from "lucide-react";
import DeveloperCard from "@/components/DeveloperCard";

export default function ProfilPage() {
  return (
    // bg-transparent agar grid global terlihat tembus
    <main className="min-h-screen bg-transparent pt-24 pb-20 overflow-hidden relative">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] opacity-50"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative py-20 mb-10 z-10">
        <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
            >
              <Activity size={14} className="text-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase">Institute_Profile_v2.0</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none"
            >
              Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Education.</span><br/>
              Future <span className="italic font-light">Incubator.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed border-l-2 border-white/10 px-6"
            >
              Lebih dari sekadar sekolah. Kami adalah inkubator talenta digital yang siap membentuk masa depan teknologi Indonesia melalui kurikulum berbasis industri 5.0.
            </motion.p>
        </div>
      </section>

      {/* --- SAMBUTAN KEPALA SEKOLAH --- */}
      <section className="container mx-auto px-6 mb-32 relative z-10">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
          {/* Scanline Effect inside Card */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,6px_100%] opacity-20"></div>

          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            {/* Foto Kepsek */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full md:w-1/3"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <Image 
                  src="/ibu.png" 
                  alt="Kepala Sekolah"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Kartika Ariyani, S.Pd</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-px w-4 bg-cyan-500"></div>
                    <p className="text-cyan-400 text-[10px] font-mono uppercase tracking-widest">Chief Executive Principal</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Teks Sambutan */}
            <div className="w-full md:w-2/3 text-slate-300 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Terminal size={16} className="text-cyan-400" />
                <span className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em]">Direct_Message.txt</span>
              </div>
              
              <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-tight">
                Membangun Generasi <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Inovator Digital</span>
              </h2>
              
              <div className="space-y-4 leading-relaxed text-lg font-light text-slate-400">
                <p>
                  "Di era Revolusi <span className="text-white font-medium">Industri 5.0</span>, pendidikan tidak bisa lagi berjalan linier. Kita tidak hanya butuh siswa yang pandai menghafal, tapi siswa yang mampu <span className="text-cyan-400 italic">problem-solving</span> dengan teknologi."
                </p>
                <p>
                  SMK PK Kampung Jawa hadir dengan kurikulum adaptif yang selaras dengan standar global. Kami memangkas jarak antara teori di kelas dengan kebutuhan industri real-time.
                </p>
                <p className="text-white italic">
                  "Mari bergabung, dan jadilah pemain utama dalam transformasi digital dunia."
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex justify-between items-center opacity-50">
                <Image src="/signature.png" width={120} height={40} alt="Tanda Tangan" className="invert brightness-200" />
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Verified_Identity_Hash: 0x8291...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VISI & MISI --- */}
      <section className="container mx-auto px-6 mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Kartu Visi */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-cyan-500/20 relative overflow-hidden group"
          >
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-[40px]"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 border border-cyan-500/20 group-hover:rotate-12 transition-transform duration-500">
                <Lightbulb size={32} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.4em]">The_North_Star</span>
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">Visi Institusi</h3>
              </div>
            </div>
            
            <p className="text-2xl text-slate-300 font-light leading-relaxed italic">
              "Menjadi pusat pendidikan teknologi terdepan yang mencetak <span className="text-white font-bold tracking-tighter underline decoration-cyan-500 decoration-2 underline-offset-4 uppercase">Sociopreneur Digital</span> berkarakter dan berdaya saing global pada tahun 2030."
            </p>
          </motion.div>

          {/* Kartu Misi */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { text: "Implementasi Project Based Learning berskala industri.", icon: Target, label: "01_Strategic" },
              { text: "Sinergi ekosistem kolaborasi dengan Startup & Tech Giant.", icon: Users, label: "02_Synergy" },
              { text: "Sertifikasi kompetensi standar internasional (Mikrotik/Cisco).", icon: Trophy, label: "03_Credentials" },
              { text: "Pembentukan karakter unggul berlandaskan etika digital.", icon: ShieldCheck, label: "04_Ethic" },
            ].map((misi, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/40 hover:bg-white/10 transition-all duration-500"
              >
                <div className="shrink-0 text-cyan-400 group-hover:scale-110 transition-transform">
                  <misi.icon size={24} />
                </div>
                <div>
                   <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">{misi.label}</span>
                   <p className="text-slate-300 font-medium uppercase tracking-tight text-sm md:text-base">{misi.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* --- DEVELOPER SECTION --- */}
      <section className="relative z-10">
        <DeveloperCard />
      </section>
    </main>
  );
}