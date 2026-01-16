"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Cog, Globe, Laptop, Palette, Wifi , Motorbike, Plug} from "lucide-react";
import Link from "next/link";

// Data Jurusan
const majors = [
   {
    title: "Teknik Instalasi Tenaga Listrik",
    desc: "Jurusan Teknik Instalasi Tenaga Listrik (TITL) membekali peserta didik dengan kompetensi teknis di bidang instalasi dan pemeliharaan sistem tenaga listrik modern, meliputi panel listrik, sistem kontrol berbasis PLC, HMI (Human Machine Interface), otomasi industri, sensor, hingga integrasi IoT (Internet of Things) untuk monitoring dan kontrol kelistrikan secara digital. Lulusan TITL dipersiapkan agar siap kerja, siap berwirausaha, dan adaptif terhadap kebutuhan industri 4.0, dengan peluang karier di sektor industri, gedung bertingkat, utilitas, dan proyek infrastruktur. Selain itu, Jurusan TITL mendapatkan Program Keunggulan dari Pemerintah, sebagai dukungan peningkatan sarana praktik, kurikulum berbasis industri, serta penguatan kompetensi dan sertifikasi peserta didik agar selaras dengan kebutuhan dunia kerja.",
    icon: <Plug size={48} />,
    color: "text-amber-400",
    bgGlow: "group-hover:shadow-amber-500/50",
    href: "/jurusan/te"
  },
  {
    title: "Teknik Jaringan Komputer dan Telekomunikasi",
    desc: "Jurusan Teknik Jaringan Komputer dan Telekomunikasi (TJKT) membekali peserta didik dengan kompetensi teknis di bidang jaringan komputer, sistem server, routing dan switching, konfigurasi Mikrotik, fiber optik, wireless network, keamanan jaringan, serta integrasi layanan berbasis cloud dan IoT. Lulusan TJKT dipersiapkan untuk memiliki skill teknis dan problem solving yang dibutuhkan di era digital, sehingga memiliki prospek siap kerja sebagai teknisi jaringan, IT support, network administrator, dan teknisi telekomunikasi; siap berwirausaha melalui jasa instalasi jaringan, ISP skala kecil, dan layanan IT; serta siap melanjutkan kuliah di bidang Teknik Informatika, Sistem Informasi, atau Telekomunikasi dengan bekal kompetensi yang kuat dan relevan dengan kebutuhan industri.",
    icon: <Wifi size={48} />,
    color: "text-blue-400",
    bgGlow: "group-hover:shadow-blue-500/50",
    href: "/jurusan/sija"
  },
  {
    title: "Teknik Kendaraan Ringan dan Otomotif",
    desc: "Jurusan Teknik Kendaraan Ringan Otomotif (TKRO) membekali peserta didik dengan kompetensi teknis di bidang perawatan dan perbaikan kendaraan ringan, meliputi sistem engine, pemindah tenaga, sasis, kelistrikan kendaraan, EFI (Electronic Fuel Injection), ECU, sensor, sistem rem ABS, serta teknologi kendaraan modern. Lulusan TKRO dipersiapkan untuk memiliki keahlian siap kerja sebagai mekanik bengkel, teknisi otomotif, dan teknisi servis kendaraan; siap berwirausaha dengan membuka bengkel mandiri atau jasa perawatan kendaraan; serta siap melanjutkan kuliah di bidang Teknik Otomotif atau Teknik Mesin, dengan bekal kompetensi praktik yang kuat dan selaras dengan kebutuhan industri otomotif yang terus berkembang.",
    icon: <Motorbike size={48} />,
    color: "text-purple-400",
    bgGlow: "group-hover:shadow-purple-500/50",
    href: "/jurusan/bdp"
  },
];

// Komponen Kartu Satuan dengan Logic Spotlight
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
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 px-8 py-10 transition-colors hover:border-white/20 group`}
    >
      {/* EFFEK SPOTLIGHT (Cahaya ngikutin mouse) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 border border-white/5 ${item.color} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-700`}>
          {item.icon}
        </div>
        
        <h3 className="mb-4 text-2xl font-bold text-slate-100">{item.title}</h3>
        <p className="mb-8 flex-grow text-slate-400 leading-relaxed">
          {item.desc}
        </p>

        <Link 
          href={item.href}
          className="inline-flex items-center text-sm font-bold text-cyan-400 transition-all group-hover:translate-x-2 group-hover:text-cyan-300"
        >
          Lihat Kurikulum &rarr;
        </Link>
      </div>

      {/* Dekorasi Background Grid Halus */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
    </motion.div>
  );
};

// Ikon ShieldCheck perlu diimport manual karena tadi kelupaan di atas
import { ShieldCheck } from "lucide-react"; 

export default function JurusanSection() {
  return (
    <section className="py-32 bg-slate-950 relative">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-cyan-400 font-bold tracking-widest uppercase text-sm"
          >
            JURUSAN UNGGULAN
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-6"
          >
            Tentukan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Impianmu</span>
          </motion.h2>
          <p className="text-slate-400 text-lg">
            Fokus pada satu keahlian, kuasai sampai akar-akarnya. 
            Kurikulum kami dirancang untuk mencetak spesialis, bukan generalis.
          </p>
        </div>

        {/* Grid Jurusan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {majors.map((major, index) => (
            <SpotlightCard key={index} item={major} index={index} />
          ))}
        </div>

        {/* Tombol Lihat Semua (Optional) */}
        <div className="mt-16 text-center">
            <Link href="/jurusan" className="inline-block px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 hover:scale-105 transition-all">
                Lihat Semua Kompetensi
            </Link>
        </div>

      </div>
    </section>
  );
}