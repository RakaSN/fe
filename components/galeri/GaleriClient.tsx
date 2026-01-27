"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

// Tipe data sesuai API Laravel
export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image_url: string; // Dari Laravel
  created_at: string;
}

export default function GaleriClient({ items }: { items: GalleryItem[] }) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState("Semua");

  // 1. Ambil Kategori Unik dari Data secara Dinamis
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(items.map(item => item.category)));
    return ["Semua", ...uniqueCats];
  }, [items]);

  // 2. Filter Data
  const filteredItems = filter === "Semua" 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-black text-white mb-4"
            >
                Lensa <span className="text-cyan-400">Kampus</span>
            </motion.h1>
            <p className="text-slate-400">Dokumentasi hidup aktivitas, fasilitas, dan karya terbaik siswa.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all border border-white/10 ${
                        filter === cat 
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                        : 'bg-slate-900 text-slate-400 hover:bg-white/10'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Masonry Grid Layout */}
        <motion.div 
            layout 
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
            <AnimatePresence>
                {filteredItems.map((item) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        key={item.id}
                        className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-slate-900"
                        onClick={() => setSelectedImage(item)}
                    >
                        {/* Image: Gunakan 'w-full h-auto' agar tinggi menyesuaikan gambar asli */}
                        <Image 
                            src={item.image_url} 
                            alt={item.title}
                            width={800} // Resolusi render
                            height={600}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            unoptimized={true}
                        />
                        
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                            <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">{item.category}</span>
                            <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                            <div className="flex items-center gap-1 text-slate-300 text-xs mt-2">
                                <ZoomIn size={14} /> Klik untuk perbesar
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="relative max-w-5xl w-full max-h-[90vh] rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-500 rounded-full text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] h-full">
                            <div className="relative h-[50vh] md:h-[80vh] bg-black flex items-center justify-center">
                                <Image 
                                    src={selectedImage.image_url} 
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain"
                                    unoptimized={true}
                                />
                            </div>

                            <div className="p-8 flex flex-col justify-center border-l border-white/10 bg-slate-900">
                                <span className="inline-block self-start px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-4 border border-cyan-500/20">
                                    {selectedImage.category}
                                </span>
                                <h2 className="text-2xl font-bold text-white mb-4">{selectedImage.title}</h2>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    Dokumentasi resmi kegiatan sekolah.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}