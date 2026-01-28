// File: components/ShareButton.tsx
"use client"; // <--- WAJIB ADA DI BARIS PERTAMA

import { Share2, Check, Copy } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // 1. Ambil URL halaman saat ini
    const currentUrl = url || window.location.href;
    const shareData = {
      title: title,
      text: text,
      url: currentUrl,
    };

    // 2. Cek apakah Browser mendukung Native Share (Fitur HP)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share dibatalkan user");
      }
    } else {
      // 3. Jika di Laptop/PC: Copy ke Clipboard
      try {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        // Munculkan alert kecil supaya user sadar (bisa dihapus nanti kalau menggangu)
        alert("Link berhasil disalin! Silakan paste (Ctrl+V) ke temanmu."); 
        
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        alert("Gagal menyalin link. Browser tidak mengizinkan.");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="group relative flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 rounded-full transition-all duration-300 border border-white/10 hover:border-cyan-500/50"
      title="Bagikan Berita"
    >
      {copied ? (
        <>
          <Check size={18} className="text-green-400" />
          <span className="text-xs font-bold text-green-400">COPIED!</span>
        </>
      ) : (
        <>
          <Share2 size={18} />
          <span className="text-xs font-medium uppercase tracking-wider">Share</span>
        </>
      )}
    </button>
  );
}