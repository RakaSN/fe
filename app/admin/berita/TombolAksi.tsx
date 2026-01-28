"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TombolAksi({ id }: { id: any }) { // Saya ubah jadi any dulu biar aman
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // 1. CEK ID
    console.log("=== DEBUG TOMBOL ===");
    console.log("ID yang mau dihapus:", id);
    console.log("Tipe ID:", typeof id);

    if (!id) {
      alert("ERROR: ID Berita KOSONG/UNDEFINED! Cek page.tsx");
      return;
    }

    if (confirm(`Yakin hapus berita ID: ${id}?`)) {
      setIsDeleting(true);
      try {
        // 2. CEK URL
        const url = `/api/berita/${id}`;
        console.log("Mengirim DELETE ke URL:", url);

        const res = await fetch(url, { method: "DELETE" });
        
        console.log("Status Response:", res.status);
        
        if (!res.ok) {
           const text = await res.text();
           console.error("Error dari Server:", text);
           alert(`GAGAL HAPUS! Server Error: ${res.status}\nCek Console (F12)`);
        } else {
           alert("BERHASIL DIBUNUH! Data harusnya hilang.");
           router.refresh();
        }
      } catch (error) {
        console.error("Error Koneksi:", error);
        alert("Error Koneksi Client");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Link href={`/admin/berita/edit/${id}`}>
        <button className="p-2 text-blue-400 hover:bg-blue-50 rounded" title={`Edit ID: ${id}`}>
          <Pencil size={18} />
        </button>
      </Link>

      <button onClick={handleDelete} disabled={isDeleting} className="p-2 text-rose-400 hover:bg-rose-50 rounded">
        {isDeleting ? "..." : <Trash2 size={18} />}
      </button>
    </div>
  );
}