"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, ImagePlus, Trash2, ShieldAlert, User, Phone, Tag, AlertTriangle, FileText } from "lucide-react";
import Image from "next/image";
import imageCompression from 'browser-image-compression';

export default function PengaduanPage() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    noHp: "",
    category: "Bullying",
    urgency: "Biasa",
    message: ""
  });

  // --- GANTI NOMOR WA ADMIN DISINI ---
  const ADMIN_WA = "62895414622824"; 

  // --- LOGIC (SAMA SEPERTI SEBELUMNYA) ---
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Harap upload file gambar saja (JPG/PNG)");
      return;
    }

    const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };

    try {
      const compressedFile = await imageCompression(file, options);
      setImage(compressedFile);
      setPreview(URL.createObjectURL(compressedFile));
    } catch (error) {
      console.log(error);
      alert("Gagal memproses gambar.");
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("noHp", formData.noHp);
      dataToSend.append("category", formData.category);
      dataToSend.append("urgency", formData.urgency);
      dataToSend.append("message", formData.message);
      dataToSend.append("isAnonymous", String(isAnonymous));
      if (image) dataToSend.append("image", image);

      const res = await fetch("/api/pengaduan", { method: "POST", body: dataToSend });
      const responseJson = await res.json();
      if (!res.ok) throw new Error("Gagal upload ke DB");

      const imagePath = responseJson.data?.image;
      const domain = window.location.origin;
      const fullLink = imagePath ? `${domain}${imagePath}` : "";

      const header = isAnonymous ? "🕵️ *LAPORAN ANONIM*" : "🚨 *LAPORAN RESMI*";
      const identitas = isAnonymous 
        ? "Nama: _Dirahasiakan_\nNo HP: _-" 
        : `Nama: *${formData.name}*\nNo HP: *${formData.noHp}*`;

      const noteFoto = fullLink 
        ? `\n📷 *Bukti Foto:* \n${fullLink} \n_(Klik link di atas untuk melihat bukti)_` 
        : "";

      const textWA = `${header}\n\n${identitas}\nKategori: *${formData.category}*\nUrgensi: *${formData.urgency}*\n\n📝 *Isi Laporan:*\n"${formData.message}"\n${noteFoto}\n\n_Tersimpan di Database._`;

      window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(textWA)}`, "_blank");
      
      alert("Laporan berhasil dikirim!");
      setFormData({ name: "", noHp: "", category: "Bullying", urgency: "Biasa", message: "" });
      removeImage();
      setIsSubmitting(false);

    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data.");
      setIsSubmitting(false);
    }
  };

  // --- TAMPILAN BARU ---
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* BACKGROUND EFFECTS (Glow di belakang) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-600/30 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 mb-4 shadow-lg shadow-rose-500/30">
            <ShieldAlert size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Layanan Pengaduan Siswa
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Suarakan kebenaran. Identitas Anda aman bersama kami.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SWITCH ANONIM */}
          <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:border-rose-500/50 transition-colors cursor-pointer" onClick={() => setIsAnonymous(!isAnonymous)}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors ${isAnonymous ? "bg-rose-500" : "bg-slate-600"}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${isAnonymous ? "translate-x-4" : "translate-x-0"}`} />
              </div>
              <span className={`font-medium ${isAnonymous ? "text-rose-400" : "text-slate-300"}`}>
                {isAnonymous ? "Mode Rahasia (Anonim) Aktif" : "Kirim sebagai Diri Sendiri"}
              </span>
            </div>
          </div>

          {/* INPUT DATA DIRI (ANIMASI HILANG TIMBUL) */}
          <motion.div 
            animate={{ height: isAnonymous ? 0 : "auto", opacity: isAnonymous ? 0 : 1 }}
            className="overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="relative group">
              <User className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-rose-400 transition-colors" size={18} />
              <input 
                required={!isAnonymous} type="text" placeholder="Nama Lengkap"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder:text-slate-600"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="relative group">
              <Phone className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-rose-400 transition-colors" size={18} />
              <input 
                required={!isAnonymous} type="tel" placeholder="Nomor WhatsApp"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder:text-slate-600"
                value={formData.noHp} onChange={(e) => setFormData({...formData, noHp: e.target.value})}
              />
            </div>
          </motion.div>

          {/* DROPDOWN KATEGORI & URGENSI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <Tag className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-rose-400 transition-colors" size={18} />
              <select 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 appearance-none focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all text-slate-300 cursor-pointer"
                value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option>Bullying</option>
                <option>Fasilitas Rusak</option>
                <option>Kekerasan Seksual</option>
                <option>Pungli / Korupsi</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div className="relative group">
              <AlertTriangle className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-rose-400 transition-colors" size={18} />
              <select 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 appearance-none focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all text-slate-300 cursor-pointer"
                value={formData.urgency} onChange={(e) => setFormData({...formData, urgency: e.target.value})}
              >
                <option>Biasa</option>
                <option>Penting</option>
                <option>Darurat (Segera!)</option>
              </select>
            </div>
          </div>

          {/* TEXT AREA */}
          <div className="relative group">
            <FileText className="absolute left-4 top-4 text-slate-500 group-focus-within:text-rose-400 transition-colors" size={18} />
            <textarea 
              required rows={5} placeholder="Ceritakan detail kejadian secara lengkap..."
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder:text-slate-600 resize-none"
              value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          {/* UPLOAD FOTO KEREN */}
          <div>
            <span className="block text-sm font-medium text-slate-400 mb-2 ml-1">Bukti Foto (Opsional)</span>
            {!preview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group border-2 border-dashed border-slate-700 hover:border-rose-500 bg-slate-900/30 hover:bg-slate-800/50 rounded-2xl h-32 flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
              >
                <div className="bg-slate-800 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                  <ImagePlus className="text-slate-400 group-hover:text-rose-400" size={24} />
                </div>
                <span className="text-xs text-slate-500 group-hover:text-slate-300">Klik untuk pilih foto</span>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>
            ) : (
              <div className="relative w-full h-48 bg-black rounded-2xl overflow-hidden border border-slate-700 group">
                <Image src={preview} alt="Preview" fill className="object-contain" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button type="button" onClick={removeImage} className="bg-red-500/80 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-sm transition-transform hover:scale-110">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SUBMIT BUTTON GRADIENT */}
          <button 
            disabled={isSubmitting} type="submit" 
            className="w-full bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Mengirim Data...</span>
            ) : (
              <>
                <Send size={20} />
                <span>Kirim Laporan Sekarang</span>
              </>
            )}
          </button>
          
        </form>

        <p className="text-center text-slate-500 text-xs mt-6">
          &copy; {new Date().getFullYear()} Sekolah Aman & Nyaman.
        </p>
      </motion.div>
    </div>
  );
}