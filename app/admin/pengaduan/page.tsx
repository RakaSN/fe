import { PrismaClient } from "@prisma/client";
import Image from "next/image";

// Inisialisasi Prisma (atau import dari lib/db.ts kalau punya)
const prisma = new PrismaClient();

// Agar halaman selalu update data terbaru (tidak di-cache)
export const dynamic = "force-dynamic"; 

export default async function AdminPengaduanPage() {
  // 1. Ambil data dari database, urutkan dari yang terbaru
  const dataPengaduan = await prisma.pengaduan.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          📋 Dashboard Pengaduan Sekolah
        </h1>

        <div className="grid gap-6">
          {dataPengaduan.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6 border border-gray-200"
            >
              {/* Bagian Gambar */}
              <div className="shrink-0">
                {item.image ? (
                  <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden border">
                    <img 
  src={item.image} 
  alt="Cek Gambar" 
  className="w-full h-48 object-cover" 
/>
                  </div>
                ) : (
                  <div className="w-full md:w-48 h-48 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500 text-sm">
                    Tidak ada foto
                  </div>
                )}
              </div>

              {/* Bagian Text */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      item.urgency === "high" || item.urgency === "Tinggi"
                        ? "bg-red-100 text-red-600"
                        : item.urgency === "medium" || item.urgency === "Sedang"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.urgency}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  Kategori: {item.category}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  "{item.message}"
                </p>

                {/* Info Pengirim (Kalau ada) */}
                {(item.name || item.noHp) && (
                  <div className="pt-4 border-t mt-4 text-sm text-gray-500">
                    <span className="font-semibold">Pengirim:</span>{" "}
                    {item.name || "Anonim"} ({item.noHp || "-"})
                  </div>
                )}
              </div>
            </div>
          ))}

          {dataPengaduan.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              Belum ada data pengaduan masuk.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}