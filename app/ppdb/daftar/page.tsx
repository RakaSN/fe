"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, School, Phone, Send, ArrowLeft, ShieldCheck, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PendaftaranPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    nama: "",
    sekolahAsal: "",
    noHp: "",
    jurusan: "TJKT" // Default pilihan
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                name: formData.nama,
                school_origin: formData.sekolahAsal,
                phone: formData.noHp,
                major: formData.jurusan,
            }),
        });

        if (!response.ok) throw new Error('Gagal menyimpan data ke server');

        setSuccess(true);
        
        const nomorAdmin = "62895414622824"; 
        const pesan = `
*REGISTRASI PPDB ONLINE* 🚀
---------------------------------------
Halo Admin SMK PK Kampung Jawa!
Saya telah mengisi formulir pendaftaran di website.

📝 *PROFIL PENDAFTAR:*
• *Nama:* ${formData.nama}
• *Asal Sekolah:* ${formData.sekolahAsal}
• *WhatsApp:* ${formData.noHp}
• *Pilihan Jurusan:* ${formData.jurusan}

Mohon instruksi selanjutnya untuk proses verifikasi. Terima kasih!
        `;

        const linkWA = `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`;

        setTimeout(() => {
             window.open(linkWA, "_blank");
             setLoading(false);
        }, 1500);

    } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan sistem. Pastikan backend Laravel Anda aktif.");
        setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-transparent py-28 px-4 flex items-center justify-center relative overflow-hidden">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/5 via-transparent to-transparent pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10"
      >
        <Link href="/ppdb" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 mb-10 font-mono text-[10px] uppercase tracking-[0.3em] transition-all group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back_To_Portal
        </Link>

        <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="text-cyan-500" size={20} />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Secure_Registration_v2</span>
            </div>
            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Onboarding.</span></h1>
            <p className="text-slate-400 text-sm mt-2 italic font-light">Lengkapi transmisi data di bawah untuk inisialisasi pendaftaran.</p>
        </div>

        {/* NOTIFIKASI SUKSES */}
        <AnimatePresence>
            {success && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-8 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center gap-4 text-cyan-400"
                >
                    <div className="animate-spin h-5 w-5 border-2 border-cyan-500 border-t-transparent rounded-full"></div>
                    <span className="text-xs font-mono uppercase tracking-widest">Data_Synced. Redirecting_to_WhatsApp...</span>
                </motion.div>
            )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Input Nama */}
            <div className="space-y-3">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 ml-1">Nama Lengkap</label>
                <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-500 transition-colors" size={18} />
                    <input 
                        type="text"
                        name="nama"
                        required
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Nama Lengkap Sesuai Ijazah"
                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-slate-700 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all font-light italic"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Asal Sekolah */}
                <div className="space-y-3">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 ml-1">Asal Sekolah</label>
                    <div className="relative group">
                        <School className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-500 transition-colors" size={18} />
                        <input 
                            type="text"
                            name="sekolahAsal"
                            required
                            value={formData.sekolahAsal}
                            onChange={handleChange}
                            placeholder="Contoh: SMPN 1 Jawa"
                            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-slate-700 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all font-light italic"
                        />
                    </div>
                </div>

                {/* No HP */}
                <div className="space-y-3">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 ml-1">Nomor yang bisa dihubungi</label>
                    <div className="relative group">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-500 transition-colors" size={18} />
                        <input 
                            type="number"
                            name="noHp"
                            required
                            value={formData.noHp}
                            onChange={handleChange}
                            placeholder="08xx-xxxx-xxxx"
                            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-slate-700 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all font-light italic"
                        />
                    </div>
                </div>
            </div>

            {/* Pilihan Jurusan */}
            <div className="space-y-4">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 ml-1">Select_Specialization</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['TKRO', 'TITL', 'TJKT'].map((jur) => (
                        <div key={jur} onClick={() => setFormData({...formData, jurusan: jur})} 
                             className={`group cursor-pointer border rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-300 ${
                                formData.jurusan === jur 
                                ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                                : 'bg-slate-950/50 border-white/5 hover:border-white/20'
                             }`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.jurusan === jur ? 'border-cyan-500' : 'border-slate-700 group-hover:border-slate-500'}`}>
                                {formData.jurusan === jur && <CheckCircle size={14} className="text-cyan-500" />}
                            </div>
                            <span className={`font-black italic tracking-widest text-sm transition-colors ${formData.jurusan === jur ? 'text-white' : 'text-slate-600'}`}>{jur}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tombol Submit */}
            <div className="pt-6">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full relative overflow-hidden group bg-white text-slate-950 font-black uppercase italic tracking-[0.2em] py-5 rounded-2xl transition-all disabled:opacity-50"
                >
                    <span className="relative z-10 flex items-center justify-center gap-3 text-xs">
                        {loading ? 'Processing_Data...' : <><Send size={16} /> Finalize_&_Chat_Admin</>}
                    </span>
                    <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
                <p className="text-[9px] font-mono text-center text-slate-600 mt-6 uppercase tracking-[0.2em]">
                    Encrypted submission. Your data will be stored in our secure database.
                </p>
            </div>

        </form>
      </motion.div>
    </main>
  );
}