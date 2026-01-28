"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Cpu, 
  Wifi, 
  ArrowRight,
  Briefcase,
  Motorbike,
  Plug,
  Terminal,
  Zap
} from "lucide-react";

const majors = [
  {
    id: "tjkt",
    name: "TJKT",
    indoName: "Teknik Jaringan Komputer dan Telekomunikasi",
    icon: <Wifi size={40} />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/50",
    glow: "bg-emerald-500/20",
    desc: "Membekali kompetensi teknis di bidang jaringan komputer, sistem server, routing switching, fiber optik, hingga integrasi cloud dan IoT. Siap mencetak Network Engineer masa depan.",
    skills: ["MikroTik MTCNA", "Cisco CCNA", "Linux Server", "AWS Cloud", "Fiber Optic"],
    careers: ["Network Engineer", "System Admin", "DevOps Engineer"]
  },
  {
    id: "titl",
    name: "TITL",
    indoName: "Teknik Instalasi Tenaga Listrik",
    icon: <Plug size={40} />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "group-hover:border-amber-500/50",
    glow: "bg-amber-500/20",
    desc: "Fokus pada otomasi industri, PLC, HMI, dan kontrol kelistrikan berbasis IoT. Program unggulan pemerintah untuk mencetak teknisi listrik modern di era 4.0.",
    skills: ["Panel Kontrol", "PLC & HMI", "Otomasi Industri", "IoT Monitoring"],
    careers: ["Industrial Electrician", "PLC Programmer", "Maintenance Tech"]
  },
  {
    id: "tkro",
    name: "TKRO",
    indoName: "Teknik Kendaraan Ringan dan Otomotif",
    icon: <Motorbike size={40} />,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "group-hover:border-red-500/50",
    glow: "bg-red-500/20",
    desc: "Eksplorasi teknologi mesin modern, EFI, ECU, Rem ABS, dan diagnosa kendaraan digital. Menyiapkan ahli otomotif yang adaptif dengan perkembangan teknologi mesin.",
    skills: ["EFI & ECU Diagnosis", "Engine Overhaul", "ABS System", "Digital Tuning"],
    careers: ["Automotive Technician", "Service Advisor", "Tuning Expert"]
  },
];

export default function JurusanPage() {
  return (
    <main className="min-h-screen bg-transparent pt-28 pb-20 relative overflow-hidden">
      
      {/* HEADER */}
      <section className="container mx-auto px-6 mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
        >
          <Zap size={14} className="text-blue-400 fill-blue-400" />
          <span className="text-[10px] font-mono text-blue-400 tracking-[0.3em] uppercase">Specialization_Module</span>
        </motion.div>
        
        <motion.h1 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none"
        >
           Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 pr-4">Skillset</span> Utama
        </motion.h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light italic border-r-2 border-white/10 pr-6">
          Kurikulum adaptif yang didesain bersama raksasa industri. Kami tidak mencetak pekerja, kami mencetak <span className="text-white">Technical Leader.</span>
        </p>
      </section>

      {/* GRID JURUSAN */}
      <section className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {majors.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 overflow-hidden transition-all duration-500 ${item.border}`}
            >
              {/* Animated Corner accent */}
              <div className={`absolute top-0 left-0 w-12 h-1 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-all duration-500 ${item.color.replace('text', 'border')}`}></div>

              {/* Background Glow */}
              <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 ${item.glow}`}></div>

              <div className="relative z-10">
                {/* Header Card */}
                <div className="flex items-start justify-between mb-8">
                  <div className={`p-5 rounded-2xl ${item.bg} ${item.color} border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-mono text-slate-500 tracking-widest uppercase mb-1">Sector_Code</span>
                    <span className="text-xs font-mono text-white bg-white/5 px-2 py-1 rounded border border-white/10 uppercase tracking-tighter">
                      {item.id}
                    </span>
                  </div>
                </div>

                {/* Judul */}
                <h3 className="text-3xl font-black text-white mb-2 italic uppercase tracking-tighter group-hover:translate-x-2 transition-transform">{item.name}</h3>
                <p className={`text-sm font-mono uppercase tracking-widest ${item.color} mb-6`}>{item.indoName}</p>
                
                <p className="text-slate-400 leading-relaxed mb-8 font-light text-base border-l-2 border-white/5 pl-6 group-hover:border-cyan-500/50 transition-colors">
                  {item.desc}
                </p>

                {/* Skills & Careers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Skills List */}
                  <div>
                    <h4 className="text-white text-xs font-mono uppercase tracking-[0.2em] mb-4 flex items-center gap-2 opacity-60">
                      <Terminal size={14} className={item.color} /> Core_Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span key={skill} className="text-[10px] font-mono text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/20 transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Careers List */}
                  <div>
                    <h4 className="text-white text-xs font-mono uppercase tracking-[0.2em] mb-4 flex items-center gap-2 opacity-60">
                      <Briefcase size={14} className={item.color} /> Career_Path
                    </h4>
                    <ul className="space-y-2">
                      {item.careers.map((career) => (
                        <li key={career} className="text-xs text-slate-400 flex items-center gap-3">
                          <div className={`w-1.5 h-px ${item.color.replace('text', 'bg-')}`}></div>
                          <span className="font-light tracking-wide">{career}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* CTA Button */}
                <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em]">Access_Granted: 100%</span>
                  <Link href="#" className={`flex items-center gap-2 text-xs font-black uppercase italic tracking-widest ${item.color} hover:gap-4 transition-all`}>
                    Lihat Kurikulum <ArrowRight size={16} />
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="container mx-auto px-6 mt-32 relative z-10">
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-12 max-w-4xl mx-auto text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
          
          <h3 className="text-4xl font-black text-white mb-4 italic uppercase tracking-tighter">Bingung Memulai?</h3>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto font-light">
            Sistem kami dapat membantu menganalisis potensi teknismu. Hubungi konselor akademik untuk konsultasi roadmap karir.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="#" className="bg-white text-slate-900 px-10 py-4 rounded-xl font-black uppercase italic tracking-widest text-sm hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95">
              Tes Minat Bakat
            </Link>
            <Link href="#" className="bg-transparent border border-white/20 text-white px-10 py-4 rounded-xl font-black uppercase italic tracking-widest text-sm hover:bg-white/5 transition-all">
              Hubungi Konselor
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}