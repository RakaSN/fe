"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  CheckCircle2, 
  CreditCard, 
  FileText, 
  UserPlus, 
  HelpCircle, 
  ChevronDown, 
  Download,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";
import { useState } from "react";

const steps = [
  {
    icon: <UserPlus size={24} />,
    title: "Buat Akun",
    desc: "Inisialisasi data diri awal untuk mendapatkan akses sistem portal PPDB."
  },
  {
    icon: <CreditCard size={24} />,
    title: "Administrasi",
    desc: "Verifikasi biaya pendaftaran sebesar Rp 350.000 via Automated Payment."
  },
  {
    icon: <FileText size={24} />,
    title: "Validasi Berkas",
    desc: "Digitalisasi dokumen (KK, Akta, Rapor) melalui upload portal PDF."
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: "Selection Day",
    desc: "Tes potensi akademik & interview minat bakat secara komprehensif."
  },
];

const faqs = [
  {
    q: "Apakah ada jalur beasiswa prestasi?",
    a: "Kami menyediakan 'Full Scholarship' bagi peraih medali OSN Nasional dan 'Tech-Grant' potongan 50% bagi prestasi tingkat Provinsi."
  },
  {
    q: "Spesifikasi perangkat belajar (Laptop)?",
    a: "Sekolah menyediakan Lab High-End. Namun untuk mobilitas, siswa disarankan memiliki perangkat dengan standar minimal Core i5/Ryzen 5 RAM 16GB."
  },
  {
    q: "Skema jika belum lolos seleksi utama?",
    a: "Calon siswa akan ditawarkan program 'Bridging Course' selama 1 bulan untuk persiapan intensif sebelum pengulangan tes seleksi."
  },
];

export default function PPDBPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">
      
      {/* --- GLOW EFFECTS --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* HEADER SECTION */}
      <section className="container mx-auto px-6 text-center mb-32 relative z-10">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 mb-8"
        >
            <Zap size={14} className="text-cyan-400 fill-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-[0.3em]">
                Admission_Open: Batch 2025/2026
            </span>
        </motion.div>

        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-white mb-8 italic uppercase tracking-tighter leading-none"
        >
            Build The <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Future Here.</span>
        </motion.h1>

        <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light italic leading-relaxed">
            Kami tidak hanya mencari siswa, kami mencari <span className="text-white font-bold italic">Next-Gen Innovators</span>. Bergabunglah dengan 150 talenta terpilih musim ini.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/ppdb/daftar" className="group relative px-10 py-4 bg-white text-slate-900 font-black uppercase italic tracking-widest text-sm rounded-xl hover:bg-cyan-400 transition-all shadow-xl hover:scale-105">
                Apply_Now
            </Link>
            <button className="flex items-center gap-3 px-8 py-4 border border-white/10 hover:bg-white/5 text-white font-mono text-[11px] uppercase tracking-widest rounded-xl transition-all">
                <Download size={18} /> Syllabus_2025.PDF
            </button>
        </div>
      </section>

      {/* ALUR PENDAFTARAN (PIPELINE) */}
      <section className="container mx-auto px-6 mb-32">
        <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Registration Pipeline</h2>
            <div className="h-1 w-12 bg-cyan-500 mt-2"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 -z-10"></div>

            {steps.map((step, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative bg-slate-900/50 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] text-center hover:border-cyan-500/30 transition-all group"
                >
                    <div className="w-16 h-16 mx-auto bg-slate-950 rounded-2xl flex items-center justify-center text-cyan-400 border border-white/10 mb-6 group-hover:rotate-12 transition-transform shadow-2xl">
                        {step.icon}
                    </div>
                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter mb-3">{step.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">{step.desc}</p>
                    
                    <div className="absolute top-6 right-8 text-3xl font-black text-white/5 italic">
                        0{i+1}
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* INVESTASI PENDIDIKAN (PREMIUM CARD) */}
      <section className="container mx-auto px-6 mb-32">
         <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]"></div>

            <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                <div className="lg:w-1/2">
                    <div className="flex items-center gap-3 mb-6">
                        <ShieldCheck className="text-cyan-400" />
                        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.3em]">Institutional_Value</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">Investment in <br/> <span className="text-cyan-400 underline decoration-cyan-500/30 underline-offset-8 text-3xl md:text-4xl">Excellence.</span></h2>
                    <p className="text-slate-400 mb-10 leading-relaxed italic font-light">
                        Biaya pendidikan di SMK PK Kampung Jawa dirancang untuk mendukung ekosistem belajar kelas dunia dengan standar industri internasional.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        {["Gedung Smart-Campus", "MacBook Pro Ready", "Industry Certifications", "Health & Catering"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300 font-mono text-[10px] uppercase tracking-wider">
                                <CheckCircle2 size={16} className="text-cyan-500" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:w-1/2 w-full">
                    <div className="group relative p-[1px] rounded-[2.5rem] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/50 to-blue-600/50 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative bg-slate-950 rounded-[2.45rem] p-8 md:p-12 shadow-2xl">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-2">Total Entry_Fees</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">12.5M</span>
                                        <span className="text-slate-600 text-sm line-through italic">15M</span>
                                    </div>
                                </div>
                                <div className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-bold px-3 py-1.5 rounded-lg tracking-widest uppercase italic animate-pulse">
                                    Limited_Offer
                                </div>
                            </div>

                            <div className="space-y-4 border-y border-white/5 py-8 mb-8">
                                <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider">
                                    <span className="text-slate-500">Monthly Tuition (SPP)</span>
                                    <span className="text-white">IDR 850.000</span>
                                </div>
                                <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider">
                                    <span className="text-slate-500">System Enrollment</span>
                                    <span className="text-white">IDR 350.000</span>
                                </div>
                            </div>

                            <button className="w-full bg-white text-slate-900 font-black uppercase italic tracking-[0.2em] py-4 rounded-2xl hover:bg-cyan-400 transition-all text-xs">
                                Download_Payment_Plan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* FAQ SECTION (MINIMALIST) */}
      <section className="container mx-auto px-6 max-w-3xl mb-32">
        <div className="text-center mb-16">
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter flex items-center justify-center gap-4">
                <HelpCircle className="text-cyan-500" /> Decentralized Support
            </h2>
        </div>

        <div className="space-y-4">
            {faqs.map((item, i) => (
                <div key={i} className="group border border-white/5 rounded-2xl bg-slate-900/30 overflow-hidden hover:border-white/10 transition-colors">
                    <button 
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-6 text-left transition-colors"
                    >
                        <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors italic uppercase tracking-tight">{item.q}</span>
                        <ChevronDown 
                            size={18} 
                            className={`text-slate-600 transition-transform duration-500 ${openFaq === i ? 'rotate-180 text-cyan-500' : ''}`} 
                        />
                    </button>
                    <AnimatePresence>
                        {openFaq === i && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 pt-0 text-slate-400 leading-relaxed text-sm font-light italic border-t border-white/5">
                                    {item.a}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
      </section>

    </main>
  );
}