"use client";

import { useEffect, useState } from "react";
import { 
  Trash2, Calendar, User, Phone, ShieldAlert, 
  RefreshCw, MoreVertical, ExternalLink, Inbox,
  AlertCircle, ShieldCheck, Clock
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
      setTimeout(() => setLoading(false), 500); // Smooth transition
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if(!confirm("Hapus laporan ini secara permanen dari database?")) return;
    alert("API Delete dalam tahap pengembangan.");
  };

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "darurat (segera!)": 
        return "bg-rose-500/10 text-rose-600 border-rose-200/50 ring-rose-500/20";
      case "penting": 
        return "bg-amber-500/10 text-amber-600 border-amber-200/50 ring-amber-500/20";
      default: 
        return "bg-emerald-500/10 text-emerald-600 border-emerald-200/50 ring-emerald-500/20";
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-10 bg-slate-50/50 min-h-screen">
      
      {/* TACTICAL HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.3em]">Monitoring_Center</p>
          </div>
          <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase">
            Inbox <span className="text-cyan-600">Laporan.</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest text-right">Live_Database</span>
            <span className="text-sm font-bold text-slate-700">{complaints.length} Records Found</span>
          </div>
          <button 
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl border border-slate-200 shadow-sm transition-all active:scale-95 group"
          >
            <RefreshCw size={18} className={`${loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            <span className="text-xs font-black uppercase tracking-widest">Sync_Data</span>
          </button>
        </div>
      </div>

      {/* QUICK STATS BARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500"><AlertCircle size={24}/></div>
              <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none mb-1">High_Urgency</p>
                  <p className="text-xl font-black text-slate-800 leading-none">{complaints.filter(c => c.urgency.toLowerCase().includes('darurat')).length}</p>
              </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white"><ShieldAlert size={24}/></div>
              <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none mb-1">Anonymous</p>
                  <p className="text-xl font-black text-slate-800 leading-none">{complaints.filter(c => !c.name).length}</p>
              </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600"><Clock size={24}/></div>
              <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none mb-1">Last_Update</p>
                  <p className="text-sm font-black text-slate-800 leading-none uppercase">Just Now</p>
              </div>
          </div>
      </div>

      {/* DATA GRID */}
      <div className="relative">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[350px] bg-white border border-slate-200 rounded-[2rem] animate-pulse" />
            ))}
          </div>
        ) : complaints.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Inbox size={48} className="text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-slate-400 uppercase tracking-[0.2em] italic">Database_Empty</h3>
            <p className="text-slate-400 text-sm mt-2">No incoming reports at the moment.</p>
          </motion.div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence>
              {complaints.map((item, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.id} 
                  className="break-inside-avoid bg-white rounded-[2.5rem] border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden group relative"
                >
                  {/* TOP DECOR */}
                  <div className={`h-1.5 w-full ${item.urgency.toLowerCase().includes('darurat') ? 'bg-rose-500' : 'bg-slate-200'}`} />

                  <div className="p-8">
                    {/* CARD HEADER */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${item.name ? 'bg-slate-100 text-slate-600' : 'bg-slate-950 text-white'}`}>
                          {item.name ? <User size={20} /> : <ShieldAlert size={20} />}
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 italic tracking-tight text-lg leading-none">
                            {item.name || "ANONYMOUS"}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                            ID_{item.id.toString().padStart(4, '0')}
                          </span>
                        </div>
                      </div>
                      <button onClick={() => handleDelete(item.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* BADGES */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ring-4 ring-transparent transition-all ${getUrgencyStyles(item.urgency)}`}>
                            {item.urgency}
                        </span>
                        <span className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 border border-slate-200">
                            {item.category}
                        </span>
                    </div>

                    {/* MESSAGE AREA */}
                    <div className="relative mb-6">
                      <p className="text-slate-600 text-sm leading-relaxed italic font-light">
                        "{item.message}"
                      </p>
                    </div>

                    {/* METADATA LIST */}
                    <div className="space-y-3 pt-6 border-t border-slate-50">
                        {item.noHp && (
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                                <div className="w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600"><Phone size={14}/></div>
                                <span>{item.noHp}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                            <Calendar size={14} />
                            {new Date(item.createdAt).toLocaleDateString("id-ID", {
                                day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit'
                            })}
                        </div>
                    </div>

                    {/* IMAGE BUKTI */}
                    {item.image && (
                      <div className="mt-6 relative w-full h-52 rounded-[2rem] overflow-hidden border border-slate-100 group/img">
                        <Image src={item.image} alt="Evidence" fill className="object-cover transition-transform duration-700 group-hover/img:scale-110" />
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <a href={item.image} target="_blank" className="bg-white text-slate-950 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transform translate-y-4 group-hover/img:translate-y-0 transition-transform">
                            View_Evidence <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}