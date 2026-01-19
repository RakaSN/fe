"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
// Note: Saya ganti 'Motorbike' jadi 'Car' karena di lucide-react standar tidak ada Motorbike,
// dan 'Car' lebih cocok untuk Teknik Kendaraan Ringan (Mobil).
import { Wifi, Plug, Car, ArrowRight } from "lucide-react"; 
import Link from "next/link";

// --- DATA JURUSAN (STATIS) ---
const majors = [
  {
    title: "Teknik Instalasi Tenaga Listrik",
    desc: "Jurusan Teknik Instalasi Tenaga Listrik (TITL) membekali peserta didik dengan kompetensi teknis di bidang instalasi dan pemeliharaan sistem tenaga listrik modern, meliputi panel listrik, sistem kontrol berbasis PLC, HMI, otomasi industri, hingga integrasi IoT untuk monitoring kelistrikan.",
    icon: <Plug size={40} />, // Ukuran icon disesuaikan
    color: "text-amber-400",
    borderColor: "group-hover:border-amber-500/50",
    href: "/jurusan/titl" // Saya rapikan linknya
  },
  {
    title: "Teknik Jaringan Komputer & Telekomunikasi",
    desc: "Membekali peserta didik dengan kompetensi di bidang jaringan komputer, server, routing switching (Mikrotik/Cisco), fiber optik, keamanan jaringan (Cyber Security), serta integrasi layanan berbasis Cloud dan IoT. Siap menjadi Network Engineer handal.",
    icon: <Wifi size={40} />,
    color: "text-blue-400",
    borderColor: "group-hover:border-blue-500/50",
    href: "/jurusan/tjkt"
  },
  {
    title: "Teknik Kendaraan Ringan Otomotif",
    desc: "Fokus pada perawatan dan perbaikan kendaraan ringan, meliputi engine, kelistrikan bodi, sasis, sistem EFI (Electronic Fuel Injection), ECU, dan teknologi mobil hybrid/listrik. Mencetak mekanik profesional dan wirausahawan bengkel modern.",
    icon: <Car size={40} />,
    color: "text-red-400", // Saya ganti merah biar aura otomotif
    borderColor: "group-hover:border-red-500/50",
    href: "/jurusan/tkro"
  },
];

// --- KOMPONEN KARTU (SPOTLIGHT EFFECT) ---
const SpotlightCard = ({ item, index }: { item: any; index: number }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 px-8 py-10 transition-colors hover:border-white/20 group h-full flex flex-col`}
    >
      {/* EFFEK SPOTLIGHT (Cahaya ngikutin mouse) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon Box */}
        <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 border border-white/5 ${item.color} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-700`}>
          {item.icon}
        </div>
        
        <h3 className="mb-4 text-2xl font-bold text-slate-100 group-hover:text-white transition-colors">
            {item.title}
        </h3>
        
        <p className="mb-8 flex-grow text-slate-400 leading-relaxed text-sm text-justify">
          {item.desc}
        </p>

        {/* Link Button */}
        <div className="mt-auto">
            <Link 
            href={item.href}
            className="inline-flex items-center text-sm font-bold text-cyan-400 transition-all group-hover:translate-x-2 group-hover:text-cyan-300"
            >
            Lihat Kurikulum <ArrowRight size={16} className="ml-2"/>
            </Link>
        </div>
      </div>

      {/* Dekorasi Background Grid Halus */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
    </motion.div>
  );
};

export default function JurusanSection() {
  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden">
      
      {/* Background Decor (Glow Halus) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-cyan-400 font-bold tracking-widest uppercase text-sm border border-cyan-500/20 px-4 py-1 rounded-full bg-cyan-950/30"
          >
            JURUSAN UNGGULAN
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mt-6 mb-6 leading-tight"
          >
            Tentukan <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Impianmu</span> Disini
          </motion.h2>
          <p className="text-slate-400 text-lg">
            Fokus pada satu keahlian, kuasai sampai akar-akarnya. 
            Kurikulum kami dirancang untuk mencetak spesialis yang siap kerja.
          </p>
        </div>

        {/* Grid Jurusan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {majors.map((major, index) => (
            <SpotlightCard key={index} item={major} index={index} />
          ))}
        </div>

        {/* Tombol Lihat Semua */}
        <div className="mt-20 text-center">
            <Link href="/jurusan" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 hover:scale-105 transition-all">
                Lihat Semua Kompetensi <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
        </div>

      </div>
    </section>
  );
}