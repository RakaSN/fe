"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ImagePlus, Trash2, ShieldAlert, User, Phone, Tag, AlertTriangle, FileText, Fingerprint, EyeOff, CheckCircle2 } from "lucide-react";
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

  const ADMIN_WA = "62895414622824"; 

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Format file tidak didukung. Harap gunakan JPG/PNG.");
      return;
    }

    const options = { maxSizeMB: 0.8, maxWidthOrHeight: 1024, useWebWorker: true };

    try {
      const compressedFile = await imageCompression(file, options);
      setImage(compressedFile);
      setPreview(URL.createObjectURL(compressedFile));
    } catch (error) {
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
      dataToSend.append("name", isAnonymous ? "Anonim" : formData.name);
      dataToSend.append("noHp", isAnonymous ? "-" : formData.noHp);
      dataToSend.append("category", formData.category);
      dataToSend.append("urgency", formData.urgency);
      dataToSend.append("message", formData.message);
      dataToSend.append("isAnonymous", String(isAnonymous));
      if (image) dataToSend.append("image", image);

      const res = await fetch("/api/pengaduan", { method: "POST", body: dataToSend });
      const responseJson = await res.json();
      
      if (!res.ok) throw new Error("Database sync failed");

      const fullLink = responseJson.data?.image || "";
      const header = isAnonymous ? "🕵️ *LAPORAN ANONIM (ENCRYPTED)*" : "🚨 *LAPORAN RESMI SISWA*";
      const identitas = isAnonymous 
        ? "_Identitas pelapor disembunyikan oleh sistem._" 
        : `Nama: *${formData.name}*\nNo HP: *${formData.noHp}*`;

      const noteFoto = fullLink ? `\n\n📷 *Lampiran Bukti:* \n${fullLink}` : "";

      const textWA = `${header}\n\n${identitas}\n----------------------------------\n📂 Kategori: *${formData.category}*\n⚠️ Urgensi: *${formData.urgency}*\n\n📝 *DETAIL KEJADIAN:*\n"${formData.message}"${noteFoto}\n\n_Laporan ini terenkripsi dan tersimpan di database sekolah._`;

      window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(textWA)}`, "_blank");
      
      setFormData({ name: "", noHp: "", category: "Bullying", urgency: "Biasa", message: "" });
      removeImage();
      setIsSubmitting(false);
      alert("Laporan terkirim ke pusat data.");

    } catch (error) {
      alert("Koneksi gagal. Pastikan backend aktif.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white flex items-center justify-center p-6 py-32 relative overflow-hidden">
      
      {/* GLOW DECOR */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="max-w-3xl w-full bg-slate-900/60 backdrop-blur-2xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative z-10"
      >
        
        {/* HEADER TACTICAL */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 rounded-3xl bg-slate-950 border border-white/10 flex items-center justify-center relative z-10">
              <ShieldAlert size={38} className={isAnonymous ? "text-rose-500" : "text-cyan-400"} />
            </div>
            <div className={`absolute inset-0 blur-2xl opacity-40 animate-pulse ${isAnonymous ? "bg-rose-600" : "bg-cyan-600"}`} />
          </div>
          
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-600 italic">Whistleblower.</span>
          </h1>
          <p className="text-slate-500 mt-3 text-sm font-mono uppercase tracking-[0.2em]">Secure_Report_System_v1.0</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* ANONYMOUS TOGGLE - CUSTOM DESIGN */}
          <div 
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`cursor-pointer p-6 rounded-2xl border transition-all duration-500 flex items-center justify-between overflow-hidden relative ${
                isAnonymous ? "bg-rose-500/10 border-rose-500/50" : "bg-slate-950/50 border-white/5 hover:border-white/10"
            }`}
          >
            <div className="flex items-center gap-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isAnonymous ? "bg-rose-500 text-white" : "bg-slate-900 text-slate-500"}`}>
                    {isAnonymous ? <EyeOff size={22} /> : <Fingerprint size={22} />}
                </div>
                <div>
                    <h3 className={`font-bold italic uppercase tracking-wider text-sm ${isAnonymous ? "text-rose-400" : "text-white"}`}>
                        {isAnonymous ? "Identitas_Disembunyikan" : "Status_Pengadu"}
                    </h3>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        {isAnonymous ? "Your identity is encrypted" : "Report as registered student"}
                    </p>
                </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isAnonymous ? "border-rose-500 bg-rose-500" : "border-slate-700"}`}>
                {isAnonymous && <CheckCircle2 size={16} className="text-white" />}
            </div>
          </div>

          {/* INPUT DATA DIRI (HIDDEN ON ANONYMOUS) */}
          <AnimatePresence>
            {!isAnonymous && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">Full_Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" size={18} />
                            <input 
                                required={!isAnonymous} type="text"
                                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-500/50 transition-all italic font-light"
                                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">Contact_ID</label>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" size={18} />
                            <input 
                                required={!isAnonymous} type="tel"
                                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-500/50 transition-all italic font-light"
                                value={formData.noHp} onChange={(e) => setFormData({...formData, noHp: e.target.value})}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>

          {/* CATEGORY & URGENCY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">Klasifikasi_Kejadian</label>
                <div className="relative group">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" size={18} />
                    <select 
                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 appearance-none focus:outline-none focus:border-purple-500/50 transition-all italic font-light cursor-pointer"
                        value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                        {['Bullying', 'Fasilitas Rusak', 'Kekerasan Seksual', 'Pelayanan', 'Lainnya'].map(opt => <option key={opt} className="bg-slate-900">{opt}</option>)}
                    </select>
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">Urgensi</label>
                <div className="relative group">
                    <AlertTriangle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-rose-400 transition-colors" size={18} />
                    <select 
                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 appearance-none focus:outline-none focus:border-rose-500/50 transition-all italic font-light cursor-pointer"
                        value={formData.urgency} onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                    >
                        {['Biasa', 'Penting', 'Darurat (Segera!)'].map(opt => <option key={opt} className="bg-slate-900">{opt}</option>)}
                    </select>
                </div>
            </div>
          </div>

          {/* TEXT AREA */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">Kronologi_Kejadian</label>
            <div className="relative group">
                <FileText className="absolute left-4 top-5 text-slate-600 group-focus-within:text-white transition-colors" size={18} />
                <textarea 
                    required rows={5} placeholder="Input transmission data here..."
                    className="w-full bg-slate-950/50 border border-white/5 rounded-3xl py-4 pl-12 pr-6 focus:outline-none focus:border-white/20 transition-all italic font-light resize-none"
                    value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
            </div>
          </div>

          {/* UPLOAD FOTO PRO */}
          <div className="space-y-3">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">Bukti_Laporan (Optional)</label>
            {!preview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group border-2 border-dashed border-white/5 hover:border-white/10 bg-slate-950/30 rounded-[2rem] h-36 flex flex-col items-center justify-center cursor-pointer transition-all"
              >
                <div className="bg-slate-900 p-3 rounded-2xl mb-3 group-hover:scale-110 transition-transform shadow-xl">
                  <ImagePlus className="text-slate-600 group-hover:text-white" size={24} />
                </div>
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Tambah_file.img.jpg.png</span>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>
            ) : (
              <div className="relative w-full h-56 bg-black rounded-[2rem] overflow-hidden border border-white/5 group shadow-2xl">
                <Image src={preview} alt="Preview" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <button type="button" onClick={removeImage} className="bg-rose-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <button 
                disabled={isSubmitting} type="submit" 
                className={`w-full relative overflow-hidden group font-black uppercase italic tracking-[0.2em] py-5 rounded-2xl transition-all shadow-2xl ${
                    isAnonymous ? "bg-rose-600 text-white" : "bg-white text-slate-950"
                }`}
            >
                <span className="relative z-10 flex items-center justify-center gap-3 text-xs">
                    {isSubmitting ? 'Transmitting_Data...' : <><Send size={16} /> Kirim_Laporan</>}
                </span>
                <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${isAnonymous ? "bg-rose-500" : "bg-cyan-400"}`}></div>
            </button>
            <p className="text-[9px] font-mono text-center text-slate-600 mt-8 uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">
                Notice: Segala bentuk penyalahgunaan sistem ada konsekuensinya.
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}