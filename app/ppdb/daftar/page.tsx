"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, School, Phone, Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PendaftaranPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // State untuk notif sukses
  
  // State untuk menyimpan data input
  const [formData, setFormData] = useState({
    nama: "",
    sekolahAsal: "",
    noHp: "",
    jurusan: "RPL" // Default pilihan
  });

  // Fungsi saat user mengetik
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi Submit (Simpan ke DB -> Lalu ke WA)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        // 1. Kirim Data ke Laravel Backend
        const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                // Pastikan key ini sesuai dengan validasi di Controller Laravel
                name: formData.nama,
                school_origin: formData.sekolahAsal,
                phone: formData.noHp,
                major: formData.jurusan,
            }),
        });

        if (!response.ok) {
            throw new Error('Gagal menyimpan data ke server');
        }

        // 2. Jika Sukses Simpan ke DB, Lanjut ke WhatsApp
        setSuccess(true); // Tampilkan notif sukses sesaat
        
        const nomorAdmin = "62895414622824"; 
        const pesan = `
Halo Admin TAMVAN! 👋
Saya ingin mendaftar PPDB Online.
Saya sudah isi formulir di Website.

📝 *Data Diri:*
Nama: ${formData.nama}
Asal Sekolah: ${formData.sekolahAsal}
No HP: ${formData.noHp}
Minat Jurusan: ${formData.jurusan}

Mohon diproses ya kak! Terima kasih.
        `;

        const linkWA = `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`;

        // Delay sedikit biar user lihat notif sukses, baru buka WA
        setTimeout(() => {
             window.open(linkWA, "_blank");
             setLoading(false);
             // Reset form atau redirect (opsional)
             // setFormData({ nama: "", sekolahAsal: "", noHp: "", jurusan: "RPL" });
        }, 1500);

    } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat menyimpan data. Cek koneksi backend.");
        setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 py-28 px-4 flex items-center justify-center relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10"
      >
        <Link href="/ppdb" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm transition-colors">
            <ArrowLeft size={16} /> Kembali
        </Link>

        <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Formulir Pendaftaran</h1>
            <p className="text-slate-400">Isi data diri kamu, data akan tersimpan otomatis.</p>
        </div>

        {/* Notifikasi Sukses Sederhana */}
        {success && (
             <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center font-bold animate-pulse">
                 ✅ Data Berhasil Disimpan! Mengalihkan ke WhatsApp...
             </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input Nama */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Nama Lengkap</label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400" size={20} />
                    <input 
                        type="text"
                        name="nama"
                        required
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Contoh: Raka Satria"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                </div>
            </div>

            {/* Grid 2 Kolom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Asal Sekolah */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Asal Sekolah (SMP/MTs)</label>
                    <div className="relative group">
                        <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400" size={20} />
                        <input 
                            type="text"
                            name="sekolahAsal"
                            required
                            value={formData.sekolahAsal}
                            onChange={handleChange}
                            placeholder="SMP Negeri 1 Jakarta"
                            className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                        />
                    </div>
                </div>

                {/* No HP */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Nomor WhatsApp</label>
                    <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400" size={20} />
                        <input 
                            type="number"
                            name="noHp"
                            required
                            value={formData.noHp}
                            onChange={handleChange}
                            placeholder="0812..."
                            className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Pilihan Jurusan */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Minat Jurusan</label>
                <div className="grid grid-cols-2 gap-3">
                    {['RPL', 'TKJ', 'DKV', 'Cyber Security'].map((jur) => (
                        <div key={jur} onClick={() => setFormData({...formData, jurusan: jur})} 
                             className={`cursor-pointer border rounded-xl p-3 flex items-center gap-3 transition-all ${formData.jurusan === jur ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-slate-950 border-white/10 text-slate-500 hover:bg-white/5'}`}>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.jurusan === jur ? 'border-cyan-400' : 'border-slate-600'}`}>
                                {formData.jurusan === jur && <div className="w-2 h-2 rounded-full bg-cyan-400"></div>}
                            </div>
                            <span className="font-bold text-sm">{jur}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tombol Submit */}
            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
                {loading ? 'Menyimpan Data...' : <><Send size={20} /> Daftar & Chat WA</>}
            </button>
            
            <p className="text-xs text-center text-slate-500">
                Data akan disimpan ke database sekolah dan dilanjutkan ke WhatsApp Admin.
            </p>

        </form>
      </motion.div>
    </main>
  );
}