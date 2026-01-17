"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, Users, BookOpen, Phone, Image as ImageIcon, Command, X, ArrowRight, Code } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Daftar Menu Pintas
  const actions = [
    { id: "home", name: "Beranda", icon: <Home size={18} />, link: "/" },
    { id: "jurusan", name: "Jurusan & Program", icon: <BookOpen size={18} />, link: "/jurusan" },
    { id: "guru", name: "Data Pengajar", icon: <Users size={18} />, link: "/guru" },
    { id: "galeri", name: "Galeri Foto", icon: <ImageIcon size={18} />, link: "/galeri" },
    { id: "kontak", name: "Hubungi Kami", icon: <Phone size={18} />, link: "/kontak" },
    { id: "ppdb", name: "Daftar PPDB Sekarang", icon: <ArrowRight size={18} />, link: "/ppdb/daftar", highlight: true },
    { id: "tech", name: "Tech Stack & Architecture", icon: <Code size={18} />, link: "/tech" },
  ];

  // Filter pencarian
  const filteredActions = actions.filter((action) =>
    action.name.toLowerCase().includes(query.toLowerCase())
  );

  // Magic: Deteksi tombol CTRL+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fungsi pindah halaman
  const handleSelect = (link: string) => {
    setIsOpen(false);
    router.push(link);
    setQuery("");
  };

  return (
    <>
      {/* 1. Tombol Pemicu di Layar (Opsional, buat yang gak tau shortcut) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-40 bg-slate-900/80 backdrop-blur border border-white/10 px-4 py-3 rounded-full text-slate-400 text-xs font-mono hidden md:flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg"
      >
        <Command size={14} /> <span className="opacity-50">CTRL + K</span> Quick Menu
      </button>

      {/* 2. Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-[20vh] px-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()} // Supaya klik di dalam kotak gak nutup
              className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
            >
              
              {/* Header Pencarian */}
              <div className="flex items-center px-4 py-4 border-b border-white/5">
                <Search className="text-slate-500 mr-3" size={20} />
                <input
                  type="text"
                  autoFocus
                  placeholder="Mau kemana hari ini? (Ketik 'Jurusan', 'Guru', dll)..."
                  className="w-full bg-transparent text-white placeholder:text-slate-600 focus:outline-none text-lg"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
                    <X size={18} className="text-slate-500" />
                </button>
              </div>

              {/* Hasil Pencarian */}
              <div className="max-h-[300px] overflow-y-auto p-2">
                {filteredActions.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <p>Tujuan tidak ditemukan...</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-600 px-3 py-2 uppercase tracking-wider">Navigasi</p>
                    {filteredActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleSelect(action.link)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all group ${
                            action.highlight 
                            ? "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-white" 
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div className={`p-2 rounded-md ${action.highlight ? 'bg-cyan-500/20 group-hover:bg-white/20' : 'bg-slate-800'}`}>
                            {action.icon}
                        </div>
                        <span className="flex-1 font-medium">{action.name}</span>
                        {action.highlight && <span className="text-[10px] font-bold border border-cyan-500/30 px-2 py-0.5 rounded uppercase">Hot</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Modal */}
              <div className="bg-slate-950/50 px-4 py-2 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <div className="flex gap-2">
                    <span>↑↓ pilih</span>
                    <span>↵ enter</span>
                </div>
                <span>Future Academy OS v2.0</span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}