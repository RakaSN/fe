"use client";
import { motion } from "framer-motion";
import { Cpu, Globe, Rocket, Shield, Trophy, Users } from "lucide-react";

// Data Keunggulan (Bisa diedit isinya disini)
const features = [
  {
    id: 1,
    title: "Kurikulum Standar Industri",
    desc: "Materi belajar disesuaikan langsung dengan kebutuhan startup unicorn dan perusahaan multinasional. No more teori usang!",
    icon: <Cpu size={40} className="text-cyan-400" />,
    className: "md:col-span-2 md:row-span-2", // Kotak Paling Besar
    gradient: "from-cyan-500/20 to-blue-500/20"
  },
  {
    id: 2,
    title: "Jaminan Penyaluran Kerja",
    desc: "MoU dengan 50+ Perusahaan IT, Teknik, Otomotif. Lulus langsung diserbu HRD, bukan nyari kerja.",
    icon: <Rocket size={40} className="text-purple-400" />,
    className: "md:col-span-1 md:row-span-2", // Kotak Tinggi (Kanan)
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 3,
    title: "Fasilitas 'Lengkap'",
    desc: "Teaching Factory, Laboratorium Komputer, Bengkel Otomotif, Perpustakaan, Pelayananan Ramah dan Lingkungan Bersih.",
    icon: <Globe size={32} className="text-emerald-400" />,
    className: "md:col-span-1", // Kotak Kecil
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: 4,
    title: "Sertifikasi Nasional",
    desc: "Lulus bawa sertifikat Mikrotik dan lainnya",
    icon: <Shield size={32} className="text-amber-400" />,
    className: "md:col-span-1", // Kotak Kecil
    gradient: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: 5,
    title: "Guru Praktisi Expert",
    desc: "Diajar langsung oleh Senior Developer, Guru Tamu dan Industri",
    icon: <Users size={32} className="text-rose-400" />,
    className: "md:col-span-1", // Kotak Kecil
    gradient: "from-rose-500/20 to-red-500/20"
  },
];

export default function KeunggulanSection() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Glow Halus */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Kenapa Harus <span className="text-cyan-400">SMK PUSAT KEUNGGULAN KAMPUNG JAWA JAKARTA?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg"
          >
            SMK Pusat Keunggulan Kampung Jawa Jakarta menghadirkan pendidikan vokasi berbasis link and match dengan dunia industri, didukung kurikulum yang selaras dengan kebutuhan kerja masa kini dan masa depan. Pembelajaran didukung fasilitas praktik modern, penguatan teknologi digital, serta kompetensi abad 21 seperti problem solving, kolaborasi, dan literasi teknologi. Melalui Program SMK Pusat Keunggulan dari Pemerintah, sekolah mendapatkan dukungan peningkatan sarana-prasarana, pengembangan kurikulum berbasis industri, pelatihan guru, serta penguatan sertifikasi peserta didik. Dengan jurusan TJKT, TITL, dan TKRO, SMK Kampung Jawa Jakarta mencetak lulusan yang siap kerja, siap berwirausaha, dan siap melanjutkan pendidikan ke jenjang lebih tinggi, berkarakter, kompeten, dan berdaya saing.
          </motion.p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all ${item.className}`}
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="mb-6 p-3 bg-white/10 w-fit rounded-2xl backdrop-blur-md border border-white/5 shadow-inner">
                  {item.icon}
                </div>
                
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}