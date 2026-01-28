"use client";

import { useEffect, useState } from "react";
import { 
  Trash2, Calendar, User, Phone, ShieldAlert, 
  RefreshCw, ExternalLink, Inbox,
  AlertCircle, Clock, Filter, Search,
  ChevronRight, Hash
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
  const [filter, setFilter] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pengaduan", { cache: "no-store" });
      const data = await res.json();
      setComplaints(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredData = complaints.filter(item => {
    const matchesFilter = filter === "Semua" || item.category === filter;
    const matchesSearch = (item.name?.toLowerCase() || "anonim").includes(searchTerm.toLowerCase()) || 
                          item.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getUrgencyTheme = (urgency: string) => {
    const u = urgency.toLowerCase();
    if (u.includes("darurat")) return { color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", bar: "bg-rose-500" };
    if (u.includes("penting")) return { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", bar: "bg-amber-500" };
    return { color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", bar: "bg-emerald-500" };
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 text-slate-900 font-sans">
      
      {/* --- TOP HUD (Heads Up Display) --- */}
      <header className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-4">
              <div className="bg-slate-900 text-white p-2.5 rounded-2xl shadow-lg shadow-slate-900/20">
                <ShieldAlert size={24} />
              </div>
              <span className="h-[1px] w-12 bg-slate-300"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Security_Protocol_Active</span>
            </motion.div>
            <h1 className="text-5xl font-black tracking-tighter italic uppercase text-slate-900 leading-none">
              Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Center.</span>
            </h1>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" placeholder="Search reports..." 
                className="bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-6 outline-none focus:ring-4 ring-blue-500/5 focus:border-blue-500/50 transition-all w-64 text-sm shadow-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 bg-white p-1.5 border border-slate-200 rounded-2xl shadow-sm">
              {["Semua", "Bullying", "Kekerasan"].map((cat) => (
                <button 
                  key={cat} onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${filter === cat ? "bg-slate-900 text-white shadow-md" : "text-slate-400 hover:bg-slate-50"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT GRID --- */}
      <main className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-80 bg-white rounded-[2.5rem] border border-slate-200 animate-pulse" />)}
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-40">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-slate-100">
              <Inbox size={40} className="text-slate-200" />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-400">No_Data_Packets_Found</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence>
              {filteredData.map((item) => {
                const theme = getUrgencyTheme(item.urgency);
                return (
                  <motion.div 
                    layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    key={item.id} 
                    className="break-inside-avoid bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group"
                  >
                    {/* Urgency Progress Bar */}
                    <div className="h-1.5 w-full bg-slate-100 relative">
                        <motion.div 
                            initial={{ width: 0 }} animate={{ width: "100%" }}
                            className={`absolute top-0 left-0 h-full ${theme.bar}`}
                        />
                    </div>

                    <div className="p-8">
                      <div className="flex justify-between items-start mb-8">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${item.name ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20' : 'bg-slate-900'}`}>
                          {item.name ? <User size={24} /> : <Hash size={24} />}
                        </div>
                        <button className="p-2 hover:bg-rose-50 rounded-full text-slate-300 hover:text-rose-500 transition-all"><Trash2 size={20}/></button>
                      </div>

                      <div className="space-y-1 mb-6">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800 flex items-center gap-2">
                          {item.name || "Anonim_Signal"}
                          {!item.name && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                          <Clock size={12}/> {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${theme.bg} ${theme.color} ${theme.border}`}>
                          {item.urgency}
                        </span>
                        <span className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-500 border border-slate-200">
                          {item.category}
                        </span>
                      </div>

                      <p className="text-slate-500 text-sm leading-relaxed font-medium italic mb-8">
                        "{item.message}"
                      </p>

                      {item.image && (
                        <div className="mb-8 relative h-48 rounded-[2rem] overflow-hidden group/img cursor-pointer border border-slate-100">
                           <Image src={item.image} alt="Bukti" fill className="object-cover group-hover/img:scale-110 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                             <a href={item.image} target="_blank" className="bg-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover/img:translate-y-0 transition-all">
                               Open_File <ExternalLink size={14}/>
                             </a>
                           </div>
                        </div>
                      )}

                      {item.noHp && (
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group/btn hover:border-blue-500/30 transition-all">
                          <div className="flex items-center gap-3">
                            <Phone size={16} className="text-blue-600"/>
                            <span className="text-xs font-bold text-slate-700">{item.noHp}</span>
                          </div>
                          <ChevronRight size={16} className="text-slate-300 group-hover/btn:translate-x-1 transition-transform"/>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Floating Refresh Button */}
      <button 
        onClick={fetchData}
        className="fixed bottom-10 right-10 bg-slate-900 text-white p-5 rounded-3xl shadow-2xl hover:scale-110 active:scale-95 transition-all group z-50"
      >
        <RefreshCw size={24} className={`${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
      </button>

    </div>
  );
}