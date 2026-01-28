"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TambahBeritaPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // State untuk form
  const [formData, setFormData] = useState({
    title: "",
    category: "Kegiatan",
    content: "",
    author: "Admin Sekolah",
  });
  const [file, setFile] = useState<File | null>(null);

  // Handle perubahan input teks
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle upload gambar & preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  // Handle Submit ke API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("content", formData.content);
      data.append("author", formData.author);
      if (file) {
        data.append("image", file);
      }

      const res = await fetch("/api/berita", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Gagal menyimpan berita");

      alert("Berita berhasil diterbitkan!");
      router.push("/admin/berita");
      router.refresh(); 

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan berita.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header & Tombol Kembali */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/berita" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} className="text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">Tulis Berita Baru</h1>
            <p className="text-slate-500 text-sm">Bagikan informasi terbaru sekolah.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI: Input Utama */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Judul */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Judul Artikel</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Contoh: Juara 1 Lomba Coding Nasional..."
                // PERBAIKAN: text-black agar tulisan hitam pekat
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium text-lg"
              />
            </div>

            {/* Konten */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Isi Berita</label>
              <textarea
                name="content"
                required
                rows={12}
                value={formData.content}
                onChange={handleChange}
                placeholder="Tulis isi berita lengkap di sini..."
                // PERBAIKAN: text-black agar tulisan hitam pekat
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all leading-relaxed"
              ></textarea>
            </div>
          </div>

          {/* KOLOM KANAN: Sidebar Setting */}
          <div className="space-y-6">
            
            {/* Upload Gambar */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">Gambar Utama</label>
              
              <div className="relative group cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                />
                
                <div className={`
                  border-2 border-dashed rounded-2xl p-4 text-center transition-all h-64 flex flex-col items-center justify-center overflow-hidden
                  ${imagePreview ? 'border-blue-600 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}
                `}>
                  {imagePreview ? (
                    <Image 
                      src={imagePreview} 
                      alt="Preview" 
                      fill 
                      className="object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <div className="bg-slate-100 p-4 rounded-full mb-3 text-slate-400">
                        <ImageIcon size={32} />
                      </div>
                      <span className="text-sm font-medium text-slate-500">Klik untuk upload gambar</span>
                      <span className="text-xs text-slate-400 mt-1">JPG, PNG (Max 2MB)</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Kategori & Author */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Kategori</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  // PERBAIKAN: text-black
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Kegiatan">Kegiatan Sekolah</option>
                  <option value="Prestasi">Prestasi Siswa</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Artikel">Artikel Umum</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Penulis</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  // PERBAIKAN: text-black
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/20 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> Menerbitkan...
                </>
              ) : (
                <>
                  <Save size={20} /> Terbitkan Berita
                </>
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}