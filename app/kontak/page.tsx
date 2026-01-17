"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Globe } from "lucide-react";

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
            <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl md:text-6xl font-black text-white mb-4"
            >
                Pusat <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Informasi</span>
            </motion.h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
                Terhubung langsung dengan tim administrasi kami. Kami siap menjawab pertanyaan Anda 24/7 melalui berbagai saluran digital.
            </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
                { icon: <MapPin size={30} />, title: "Lokasi Kampus", desc: "Jl. Teknologi Masa Depan No. 1, Cyber City, Jakarta Selatan", color: "text-red-400" },
                { icon: <Mail size={30} />, title: "Email Resmi", desc: "admissions@future-academy.sch.id", color: "text-cyan-400" },
                { icon: <Clock size={30} />, title: "Jam Operasional", desc: "Senin - Jumat: 07.00 - 16.00 WIB", color: "text-yellow-400" },
            ].map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-slate-900/50 backdrop-blur border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:border-cyan-500/30 transition-colors group"
                >
                    <div className={`w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center mb-4 border border-white/10 group-hover:scale-110 transition-transform ${item.color}`}>
                        {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                </motion.div>
            ))}
        </div>

        {/* Map & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            
            {/* Kiri: Peta Dark Mode */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
            >
                {/* Overlay Hover */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 pointer-events-none transition-colors z-10 border-4 border-transparent group-hover:border-cyan-500/20 rounded-3xl"></div>
                
                {/* TRICK: Filter CSS untuk mengubah Peta Google (Putih) menjadi Dark Mode 
                   grayscale(100%) -> jadi hitam putih
                   invert(90%) -> warna dibalik (hitam jadi putih, putih jadi hitam)
                */}
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.051480072046!2d106.82496467499066!3d-6.256955693731599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3d2b63dc0bd%3A0x6295579997184496!2sKemang%20Village!5e0!3m2!1sen!2sid!4v1705663673752!5m2!1sen!2sid" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                ></iframe>

                <div className="absolute bottom-6 left-6 z-20 bg-slate-900/90 backdrop-blur px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-white">Live Location</span>
                </div>
            </motion.div>

            {/* Kanan: Form Pesan */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-slate-900 border border-white/10 p-8 md:p-10 rounded-3xl relative"
            >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Send className="text-cyan-400" /> Kirim Pesan
                </h2>
                
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
                            <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                            <input type="email" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="email@contoh.com" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Subjek</label>
                        <select className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none transition-colors">
                            <option>Info Pendaftaran (PPDB)</option>
                            <option>Kerjasama Industri</option>
                            <option>Layanan Alumni</option>
                            <option>Lainnya</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Pesan</label>
                        <textarea rows={5} className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="Tulis pesan Anda di sini..."></textarea>
                    </div>

                    <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2">
                        Kirim Transmisi <Send size={18} />
                    </button>
                </form>
            </motion.div>

        </div>
      </div>
    </main>
  );
}