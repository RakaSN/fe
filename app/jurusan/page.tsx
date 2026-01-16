"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Code2, 
  Cpu, 
  Globe, 
  Palette, 
  Wifi, 
  Server, 
  ShieldCheck, 
  ArrowRight,
  Briefcase,
  Motorbike,
  Plug,
} from "lucide-react";

// Data Jurusan (Bisa ditambah/edit)
const majors = [

  {
    id: "tjKT",
    name: "TJKT",
    indoName: "Teknik Jaringan Komputer dan Telekomunikasi",
    icon: <Wifi size={40} />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/50",
    desc: "Jurusan Teknik Jaringan Komputer dan Telekomunikasi (TJKT) membekali peserta didik dengan kompetensi teknis di bidang jaringan komputer, sistem server, routing dan switching, konfigurasi Mikrotik, fiber optik, wireless network, keamanan jaringan, serta integrasi layanan berbasis cloud dan IoT. Lulusan TJKT dipersiapkan untuk memiliki skill teknis dan problem solving yang dibutuhkan di era digital, sehingga memiliki prospek siap kerja sebagai teknisi jaringan, IT support, network administrator, dan teknisi telekomunikasi; siap berwirausaha melalui jasa instalasi jaringan, ISP skala kecil, dan layanan IT; serta siap melanjutkan kuliah di bidang Teknik Informatika, Sistem Informasi, atau Telekomunikasi dengan bekal kompetensi yang kuat dan relevan dengan kebutuhan industri.",
    skills: ["MikroTik MTCNA", "Cisco CCNA", "Linux Server", "AWS Cloud", "Fiber Optic"],
    careers: ["Network Engineer", "System Admin", "DevOps Engineer"]
  },
  {
    id: "titl",
    name: "TITL",
    indoName: "Teknik Instalasi Tenaga Listrik",
    icon: <Plug size={40} />,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "group-hover:border-pink-500/50",
    desc: "Jurusan Teknik Instalasi Tenaga Listrik (TITL) membekali peserta didik dengan kompetensi teknis di bidang instalasi dan pemeliharaan sistem tenaga listrik modern, meliputi panel listrik, sistem kontrol berbasis PLC, HMI (Human Machine Interface), otomasi industri, sensor, hingga integrasi IoT (Internet of Things) untuk monitoring dan kontrol kelistrikan secara digital. Lulusan TITL dipersiapkan agar siap kerja, siap berwirausaha, dan adaptif terhadap kebutuhan industri 4.0, dengan peluang karier di sektor industri, gedung bertingkat, utilitas, dan proyek infrastruktur. Selain itu, Jurusan TITL mendapatkan Program Keunggulan dari Pemerintah, sebagai dukungan peningkatan sarana praktik, kurikulum berbasis industri, serta penguatan kompetensi dan sertifikasi peserta didik agar selaras dengan kebutuhan dunia kerja.",
    skills: ["Instalasi tenaga listrik", "Panel dan kontrol listrik", "PLC & HMI, otomasi industri","Monitoring kelistrikan berbasis IoT"],
    careers: ["Teknisi Listrik", "Installer Listrik", "Teknisi Perawatan Industri", "Teknisi Sistem Kontrol"]
  },
  {
    id: "tkro",
    name: "TKRO",
    indoName: "Teknik Kendaraan Ringan dan Otomotif",
    icon: <Motorbike size={40} />,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "group-hover:border-red-500/50",
    desc: "Jurusan Teknik Kendaraan Ringan Otomotif (TKRO) membekali peserta didik dengan kompetensi teknis di bidang perawatan dan perbaikan kendaraan ringan, meliputi sistem engine, pemindah tenaga, sasis, kelistrikan kendaraan, EFI (Electronic Fuel Injection), ECU, sensor, sistem rem ABS, serta teknologi kendaraan modern. Lulusan TKRO dipersiapkan untuk memiliki keahlian siap kerja sebagai mekanik bengkel, teknisi otomotif, dan teknisi servis kendaraan; siap berwirausaha dengan membuka bengkel mandiri atau jasa perawatan kendaraan; serta siap melanjutkan kuliah di bidang Teknik Otomotif atau Teknik Mesin, dengan bekal kompetensi praktik yang kuat dan selaras dengan kebutuhan industri otomotif yang terus berkembang.",
    skills: ["Perawatan mesin kendaraan", "Sistem kelistrikan otomotif", "EFI & ECU", "Sasis dan sistem pengereman", "Diagnosis kendaraan"],
    careers: ["Teknisi Otomotif", "Mekanik Kendaraan", "Service Advisor", "Teknisi Perawatan Kendaraan"]
  },
];

export default function JurusanPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-20">
      
      {/* HEADER */}
      <section className="container mx-auto px-4 mb-20 text-center">
        <motion.h1 
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-4xl md:text-6xl font-extrabold text-white mb-6"
        >
           Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Jalan Ninjamu</span>
        </motion.h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Kurikulum kami didesain bersama praktisi industri. Fokus pada *hands-on experience* agar lulusan siap kerja, bukan cuma siap teori.
        </p>
      </section>

      {/* GRID JURUSAN */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {majors.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative bg-slate-900 border border-white/10 rounded-3xl p-8 overflow-hidden transition-all duration-300 hover:bg-slate-800 ${item.border}`}
            >
              {/* Background Glow */}
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 transition-opacity group-hover:opacity-40 ${item.bg.replace('/10', '')}`}></div>

              <div className="relative z-10">
                {/* Header Card */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${item.bg} ${item.color}`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono text-slate-500 border border-white/10 px-2 py-1 rounded">
                    CODE: {item.id.toUpperCase()}
                  </span>
                </div>

                {/* Judul */}
                <h3 className="text-2xl font-bold text-white mb-1">{item.name}</h3>
                <p className={`text-sm font-medium ${item.color} mb-4`}>{item.indoName}</p>
                <p className="text-slate-400 leading-relaxed mb-8 border-b border-white/5 pb-8">
                  {item.desc}
                </p>

                {/* Skills & Careers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Skills List */}
                  <div>
                    <h4 className="text-white text-sm font-bold mb-3 flex items-center gap-2">
                      <Cpu size={14} className="text-slate-500" /> Skills Unlocked
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span key={skill} className="text-xs text-slate-300 bg-white/5 px-2 py-1 rounded border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Careers List */}
                  <div>
                    <h4 className="text-white text-sm font-bold mb-3 flex items-center gap-2">
                      <Briefcase size={14} className="text-slate-500" /> Career Path
                    </h4>
                    <ul className="space-y-1">
                      {item.careers.map((career) => (
                        <li key={career} className="text-xs text-slate-400 flex items-center gap-2">
                          <span className={`w-1 h-1 rounded-full ${item.color.replace('text-', 'bg-')}`}></span>
                          {career}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* CTA Button per Card */}
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                  <Link href="#" className={`flex items-center gap-2 text-sm font-bold ${item.color} hover:text-white transition-colors`}>
                    Lihat Detail Kurikulum <ArrowRight size={16} />
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="container mx-auto px-4 mt-20 text-center">
        <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 rounded-3xl p-10 max-w-4xl mx-auto backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-4">Bingung Pilih yang Mana?</h3>
          <p className="text-slate-300 mb-8">
            Jangan khawatir. Ikuti tes minat bakat gratis kami atau konsultasi langsung dengan konselor akademik.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="#" className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-all">
              Tes Minat Bakat
            </Link>
            <Link href="#" className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all">
              Chat Konselor (WA)
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}