"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { 
  Trash2, Edit, Plus, Save, 
  UploadCloud, ImageIcon, Loader2,
  Linkedin, Mail // <--- Icon Baru
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Tipe Data sesuai Database
interface Teacher {
  id: number;
  name: string;
  role: string;
  subject: string;
  experience: string;
  level: string;
  image: string;
  theme_color: string;
  linkedin?: string;
  email?: string;
}

export default function AdminGuruPage() {
  // State Form
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    subject: "",
    experience: "",
    level: "Beginner",
    image: "",
    theme_color: "cyan",
    linkedin: "",
    email: "",
  });

  // State Data & UI
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // 1. READ: Ambil Data Guru
  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/teachers");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setTeachers(data);
      } else {
        setTeachers([]); 
      }
    } catch (error) {
      console.error("Gagal ambil data:", error);
      setTeachers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // 2. CREATE & UPDATE: Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const method = isEditing ? "PUT" : "POST";
      const body = isEditing ? { ...formData, id: editId } : formData;

      const res = await fetch("/api/teachers", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");

      resetForm();
      fetchTeachers();
      alert(isEditing ? "Data berhasil diupdate!" : "Guru berhasil ditambahkan!");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. DELETE: Handle Hapus
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus guru ini?")) return;

    try {
      const res = await fetch("/api/teachers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Gagal menghapus");
      
      fetchTeachers();
    } catch (error) {
      alert("Gagal menghapus data");
    }
  };

  // Helper: Masuk Mode Edit
  const handleEdit = (teacher: Teacher) => {
    setIsEditing(true);
    setEditId(teacher.id);
    setFormData({
      name: teacher.name,
      role: teacher.role,
      subject: teacher.subject,
      experience: teacher.experience,
      level: teacher.level,
      image: teacher.image,
      theme_color: teacher.theme_color,
      linkedin: teacher.linkedin || "",
      email: teacher.email || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper: Reset Form
  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      name: "",
      role: "",
      subject: "",
      experience: "",
      level: "Beginner",
      image: "",
      theme_color: "cyan",
      linkedin: "",
      email: "",
    });
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Manajemen Guru</h1>
        <div className="text-sm text-slate-400">
           Total: {Array.isArray(teachers) ? teachers.length : 0} Guru
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- FORM INPUT (KIRI) --- */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              {isEditing ? <Edit className="text-yellow-500"/> : <Plus className="text-cyan-500"/>}
              {isEditing ? "Edit Guru" : "Tambah Guru Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Upload Foto */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Foto Profil</label>
                <div className="flex items-center gap-4">
                    {formData.image ? (
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-500">
                            <Image src={formData.image} alt="Preview" fill className="object-cover" unoptimized />
                        </div>
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                            <ImageIcon size={24}/>
                        </div>
                    )}
                    
                    <CldUploadWidget 
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET} 
                        onSuccess={(result: any) => {
                            setFormData({ ...formData, image: result.info.secure_url });
                        }}
                    >
                        {({ open }) => (
                            <button type="button" onClick={() => open()} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm flex items-center gap-2 transition-colors">
                                <UploadCloud size={16}/> Upload Foto
                            </button>
                        )}
                    </CldUploadWidget>
                </div>
              </div>

              {/* Input Fields */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Nama Lengkap</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Role / Jabatan</label>
                    <input placeholder="e.g. Senior Mentor" required type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"/>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Bidang Ahli</label>
                    <input placeholder="e.g. Web Dev" required type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"/>
                </div>
              </div>

              {/* --- SOSMED INPUT (BARU) --- */}
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 flex items-center gap-1"><Mail size={12}/> Email</label>
                    <input placeholder="email@guru.com" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"/>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 flex items-center gap-1"><Linkedin size={12}/> LinkedIn URL</label>
                    <input placeholder="https://linkedin..." type="text" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"/>
                </div>
              </div>
              {/* --------------------------- */}

              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Pengalaman</label>
                    <input placeholder="e.g. 5 Tahun" required type="text" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"/>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Warna Tema</label>
                    <select value={formData.theme_color} onChange={(e) => setFormData({...formData, theme_color: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500">
                        <option value="cyan">Cyan</option>
                        <option value="blue">Blue</option>
                        <option value="purple">Purple</option>
                        <option value="pink">Pink</option>
                        <option value="orange">Orange</option>
                    </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3">
                {isEditing && (
                    <button type="button" onClick={resetForm} className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold hover:bg-slate-700 transition-all">
                        Batal
                    </button>
                )}
                <button disabled={isSubmitting} type="submit" className={`flex-1 py-3 rounded-xl font-bold text-slate-950 transition-all flex items-center justify-center gap-2 ${isEditing ? "bg-yellow-400 hover:bg-yellow-300" : "bg-cyan-400 hover:bg-cyan-300"}`}>
                    {isSubmitting ? <Loader2 className="animate-spin"/> : (isEditing ? <Save size={18}/> : <Plus size={18}/>)}
                    {isEditing ? "Simpan Perubahan" : "Tambah Guru"}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* --- LIST TABLE (KANAN) --- */}
        <div className="lg:col-span-2">
            {isLoading ? (
                <div className="text-center text-slate-500 py-10 flex flex-col items-center">
                    <Loader2 className="animate-spin mb-2" /> Memuat data...
                </div>
            ) : !Array.isArray(teachers) || teachers.length === 0 ? (
                <div className="bg-slate-900 rounded-2xl p-10 text-center border border-slate-800 border-dashed">
                    <p className="text-slate-400">Belum ada data guru. Silakan tambah di form sebelah kiri.</p>
                </div>
            ) : (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-950 text-slate-400 text-xs uppercase font-bold">
                            <tr>
                                <th className="p-4">Guru</th>
                                <th className="p-4">Ahli</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {teachers.map((t) => (
                                <tr key={t.id} className="hover:bg-slate-800/50 transition-colors group">
                                    <td className="p-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden relative border border-slate-700 shrink-0">
                                            {t.image && <Image src={t.image} alt={t.name} fill className="object-cover" unoptimized/>}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{t.name}</div>
                                            <div className="text-xs text-slate-500 mb-1">{t.role}</div>
                                            
                                            {/* --- ICON SOSMED DI TABEL --- */}
                                            <div className="flex items-center gap-2">
                                                {t.email && (
                                                    <a href={`mailto:${t.email}`} className="text-slate-600 hover:text-cyan-400 transition-colors" title={t.email}>
                                                        <Mail size={12} />
                                                    </a>
                                                )}
                                                {t.linkedin && (
                                                    <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-400 transition-colors" title="LinkedIn">
                                                        <Linkedin size={12} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-300 text-sm">{t.subject}</td>
                                    <td className="p-4">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded bg-${t.theme_color}-500/10 text-${t.theme_color}-400 border border-${t.theme_color}-500/20 uppercase`}>
                                            Active
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(t)} className="p-2 bg-slate-800 text-yellow-500 rounded hover:bg-yellow-500 hover:text-slate-900 transition-all">
                                                <Edit size={16}/>
                                            </button>
                                            <button onClick={() => handleDelete(t.id)} className="p-2 bg-slate-800 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all">
                                                <Trash2 size={16}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}