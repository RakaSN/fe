"use client";

import { useEffect, useState } from "react";
import { Trash2, Calendar, User, Phone, MapPin, AlertTriangle, ShieldAlert, RefreshCw } from "lucide-react";
import Image from "next/image";

interface Complaint {
  id: number;
  name: string | null;
  noHp: string | null;
  category: string;
  urgency: string;
  message: string;
  image: string | null;
  createdAt: string;
}

export default function AdminPengaduanPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pengaduan", { cache: "no-store" });
      const data = await res.json();
      setComplaints(data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk hapus data (Opsional, kalau mau dipasang nanti)
  const handleDelete = async (id: number) => {
    if(!confirm("Yakin mau hapus laporan ini?")) return;
    // Logic hapus bisa ditambahkan nanti di API
    alert("Fitur hapus belum disambungkan ke API (Coming Soon)");
  };

  // Helper warna badge urgensi
  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "darurat (segera!)": return "bg-red-100 text-red-700 border-red-200";
      case "penting": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-emerald-100 text-emerald-700 border-emerald-200";
    }
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Daftar Laporan Masuk</h1>
          <p className="text-slate-500 text-sm mt-1">
            Total {complaints.length} laporan diterima siswa.
          </p>
        </div>
        <button 
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all text-sm font-medium"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh Data
        </button>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && complaints.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="text-slate-400" size={40} />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Belum ada laporan</h3>
          <p className="text-slate-500">Aman terkendali, belum ada siswa yang melapor.</p>
        </div>
      )}

      {/* DATA GRID (MASONRY STYLE) */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {!loading && complaints.map((item) => (
          <div 
            key={item.id} 
            className="break-inside-avoid bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
          >
            {/* HEADER KARTU */}
            <div className="p-5 border-b border-slate-50 flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.name ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-800 text-white'}`}>
                  <User size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    {item.name || "🕵️ Anonim"}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <Calendar size={12} />
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'
                    })}
                  </div>
                </div>
              </div>
              
              {/* TOMBOL HAPUS (Visual Saja Dulu) */}
              <button 
                onClick={() => handleDelete(item.id)}
                className="text-slate-300 hover:text-red-500 transition-colors p-1"
                title="Hapus Laporan"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* ISI KARTU */}
            <div className="p-5">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getUrgencyColor(item.urgency)}`}>
                  {item.urgency}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  {item.category}
                </span>
              </div>

              {/* Pesan */}
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                "{item.message}"
              </p>

              {/* Info Kontak (Kalau ada) */}
              {item.noHp && (
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg mb-3">
                  <Phone size={14} className="text-indigo-500" />
                  <span>{item.noHp}</span>
                </div>
              )}

              {/* Gambar Bukti */}
              {item.image && (
                <div className="relative w-full h-48 mt-3 rounded-xl overflow-hidden border border-slate-200 group-hover:brightness-90 transition-all">
                  <Image 
                    src={item.image} 
                    alt="Bukti Laporan" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <a 
                      href={item.image} 
                      target="_blank" 
                      className="text-white text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 hover:bg-white hover:text-black transition-all"
                    >
                      Lihat Full
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}