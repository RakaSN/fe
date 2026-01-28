"use client";

import { useEffect, useState, use } from "react"; // <--- TAMBAH 'use'
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Update Tipe Props: params adalah Promise
export default function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 1. UNWRAP PARAMS (Wajib di Next.js 15)
  // Kita "buka" promisenya di sini untuk dapatkan ID yang asli
  const { id } = use(params); 

  const router = useRouter();
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  // 2. Gunakan 'id' hasil unwrap tadi
  useEffect(() => {
    fetch(`/api/berita/${id}`) 
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]); // Dependency ganti jadi 'id' saja

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("category", formData.category);
    data.append("author", formData.author);

    // 3. Gunakan 'id' di sini juga
    await fetch(`/api/berita/${id}`, {
      method: "PUT",
      body: data,
    });

    alert("Berita berhasil diupdate!");
    router.push("/admin/berita");
    router.refresh();
  };

  if (!formData.title) return <div className="p-10 text-center text-black">Loading data...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-black">
       <Link href="/admin/berita" className="flex items-center gap-2 text-slate-500 mb-6 font-bold"><ArrowLeft size={20}/> KEMBALI</Link>
       
       <h1 className="text-3xl font-black mb-8">EDIT BERITA (ID: {id})</h1>

       <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <div>
            <label className="block font-bold mb-2">Judul</label>
            <input 
              className="w-full border p-3 rounded-xl bg-slate-50 text-black font-bold" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Kategori</label>
            <select 
              className="w-full border p-3 rounded-xl bg-slate-50 text-black" 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})} 
            >
               <option value="Kegiatan Sekolah">Kegiatan Sekolah</option>
               <option value="Prestasi">Prestasi</option>
               <option value="Pengumuman">Pengumuman</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2">Penulis</label>
            <input 
              className="w-full border p-3 rounded-xl bg-slate-50 text-black" 
              value={formData.author || ""} 
              onChange={(e) => setFormData({...formData, author: e.target.value})} 
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Isi Berita</label>
            <textarea 
              rows={10}
              className="w-full border p-3 rounded-xl bg-slate-50 text-black" 
              value={formData.content} 
              onChange={(e) => setFormData({...formData, content: e.target.value})} 
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2">
            <Save size={20} />
            {isLoading ? "Menyimpan..." : "SIMPAN PERUBAHAN"}
          </button>
       </form>
    </div>
  );
}