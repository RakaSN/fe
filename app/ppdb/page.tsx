"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  CheckCircle2, 
  CreditCard, 
  FileText, 
  UserPlus, 
  HelpCircle, 
  ChevronDown, 
  Download 
} from "lucide-react";
import { useState } from "react";

// Data Alur Pendaftaran
const steps = [
  {
    icon: <UserPlus size={24} />,
    title: "Buat Akun",
    desc: "Isi data diri awal untuk mendapatkan username & password sistem PPDB."
  },
  {
    icon: <CreditCard size={24} />,
    title: "Pembayaran Formulir",
    desc: "Transfer biaya pendaftaran sebesar Rp 350.000 via Virtual Account."
  },
  {
    icon: <FileText size={24} />,
    title: "Lengkapi Berkas",
    desc: "Upload scan KK, Akta Lahir, dan Rapor semester 1-5 format PDF."
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: "Tes & Wawancara",
    desc: "Ikuti tes potensi akademik online & wawancara minat bakat."
  },
];

// Data FAQ
const faqs = [
  {
    q: "Apakah ada jalur beasiswa prestasi?",
    a: "Ada! Kami menyediakan potongan DSP hingga 100% untuk peraih medali OSN tingkat Nasional dan 50% tingkat Provinsi."
  },
  {
    q: "Apakah laptop disediakan sekolah?",
    a: "Untuk lab komputer tersedia Mac & High-End PC. Namun siswa disarankan membawa laptop pribadi untuk tugas mandiri (spek minimal Core i5/Ryzen 5)."
  },
  {
    q: "Bagaimana jika tidak lulus tes masuk?",
    a: "Calon siswa akan diarahkan ke program matrikulasi (persiapan) selama 1 bulan sebelum tahun ajaran dimulai."
  },
];

export default function PPDBPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-20">
      
      {/* HEADER */}
      <section className="container mx-auto px-4 text-center mb-20">
        <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-bold border border-cyan-500/20 mb-4"
        >
            Tahun Ajaran 2025/2026
        </motion.span>
        <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
        >
            Bergabung dengan <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Para Visioner</span>
        </motion.h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Kuota terbatas. Kami hanya menerima 150 siswa terpilih untuk dididik menjadi pemimpin teknologi masa depan.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ppdb/daftar" className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all shadow-lg shadow-cyan-500/25">
                Daftar Sekarang
            </Link>
            <button className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2">
                <Download size={20} /> Download Brosur
            </button>
        </div>
      </section>

      {/* ALUR PENDAFTARAN (STEPS) */}
      <section className="container mx-auto px-4 mb-24">
        <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white">Alur Pendaftaran</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Garis Penghubung (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 -z-10"></div>

            {steps.map((step, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="relative bg-slate-900 border border-white/10 p-6 rounded-2xl text-center hover:border-cyan-500/50 transition-colors group"
                >
                    <div className="w-16 h-16 mx-auto bg-slate-800 rounded-full flex items-center justify-center text-cyan-400 border-4 border-slate-950 mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-900/20">
                        {step.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-400">{step.desc}</p>
                    
                    {/* Number Badge */}
                    <div className="absolute top-4 right-4 text-4xl font-black text-white/5 select-none">
                        0{i+1}
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* BIAYA PENDIDIKAN (PRICING) */}
      <section className="container mx-auto px-4 mb-24">
         <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-bold text-white mb-4">Investasi Pendidikan</h2>
                    <p className="text-slate-400 mb-6 leading-relaxed">
                        Biaya yang Anda keluarkan sebanding dengan fasilitas "Sultan", sertifikasi internasional (Adobe, Cisco, MikroTik), dan jaminan penyaluran kerja yang kami tawarkan.
                    </p>
                    <ul className="space-y-4 mb-8">
                        {["Gedung Full AC & High-Speed WiFi 6", "1 Siswa 1 Device (MacBook/PC Gaming)", "Makan Siang Katering Sehat", "Seragam Lengkap (3 Setel)"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300">
                                <CheckCircle2 size={18} className="text-cyan-400 shrink-0" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:w-1/2 w-full">
                    <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative">
                        <div className="absolute top-0 right-0 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">EARLY BIRD</div>
                        <p className="text-slate-400 text-sm mb-1">Total Biaya Masuk (DSP)</p>
                        <div className="flex items-end gap-2 mb-6">
                            <span className="text-4xl font-bold text-white">Rp 12.500.000</span>
                            <span className="text-slate-500 text-sm mb-1 line-through">Rp 15jt</span>
                        </div>

                        <div className="space-y-3 border-t border-white/10 pt-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">SPP Bulanan</span>
                                <span className="text-white font-medium">Rp 850.000</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Formulir</span>
                                <span className="text-white font-medium">Rp 350.000</span>
                            </div>
                        </div>

                        <button className="w-full mt-8 bg-white text-slate-950 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">
                            Lihat Rincian Cicilan
                        </button>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* FAQ SECTION */}
      <section className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                <HelpCircle className="text-cyan-400" /> Sering Ditanyakan
            </h2>
        </div>

        <div className="space-y-4">
            {faqs.map((item, i) => (
                <div key={i} className="border border-white/10 rounded-xl bg-slate-900/50 overflow-hidden">
                    <button 
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                    >
                        <span className="font-medium text-white">{item.q}</span>
                        <ChevronDown 
                            size={20} 
                            className={`text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} 
                        />
                    </button>
                    <div 
                        className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? 'grid-rows-[1fr] opacity-100 p-4 pt-0' : 'grid-rows-[0fr] opacity-0 p-0'}`}
                    >
                        <div className="overflow-hidden text-slate-400 leading-relaxed text-sm">
                            {item.a}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

    </main>
  );
}