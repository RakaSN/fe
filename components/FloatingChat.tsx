"use client";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FloatingChat() {
  return (
    <Link 
      href="https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20mau%20tanya%20tentang%20PPDB"
      target="_blank"
      className="fixed bottom-8 right-8 z-50"
    >
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group"
      >
        {/* Lingkaran Luar (Ping) */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
        
        {/* Tombol Utama */}
        <div className="relative bg-green-500 text-white p-4 rounded-full shadow-lg shadow-green-500/30 flex items-center gap-2">
          <MessageCircle size={28} fill="white" />
          
          {/* Teks yang muncul pas di-hover (Tooltip) */}
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">
            Chat Admin
          </span>
        </div>

        {/* Notifikasi Merah Kecil */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-white">
          1
        </div>
      </motion.div>
    </Link>
  );
}