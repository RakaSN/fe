import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

// 1. Panggil Prisma Client
const prisma = new PrismaClient();

// 2. Fungsi ambil data LANGSUNG dari Database (Bukan lewat API Laravel lagi)
async function getBerita() {
  try {
    // Cek schema.prisma, apakah namanya 'news', 'berita', atau 'posts'
    // Biasanya Laravel pakai bahasa Inggris jamak -> 'news'
    const data = await prisma.news.findMany({
      orderBy: {
        created_at: 'desc', // Mengurutkan dari yang terbaru
      },
    });
    return data;
  } catch (error) {
    console.error("Gagal ambil berita:", error);
    return []; // Balikin array kosong kalau error biar gak crash
  }
}

export default async function BeritaPage() {
  // 3. Panggil fungsinya
  const berita = await getBerita();

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-10">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-800">Berita & Agenda Sekolah</h1>
            <p className="text-slate-500 mt-2">Kabar terbaru dari SMK PK Kampung Jawa</p>
        </div>

        {/* Grid Berita */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {berita.map((item) => (
            <div key={Number(item.id)} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col h-full">
              
              {/* GAMBAR BERITA */}
              <div className="relative h-48 w-full bg-gray-200">
                {item.image ? (
                   // Pastikan Abang copy foto dari Laravel storage ke public/uploads di Next.js
                   // Atau sementara pakai URL absolut kalau wamp nyala
                   <Image 
                     src={`/uploads/${item.image}`} 
                     alt={item.title || "Berita"}
                     fill
                     className="object-cover"
                     // Tambahkan unoptimized kalau gambar dari luar/lokal kadang bermasalah
                     unoptimized 
                   />
                ) : (
                   <div className="flex items-center justify-center h-full text-gray-400">
                     <span className="text-sm">No Image</span>
                   </div>
                )}
              </div>

              {/* KONTEN */}
              <div className="p-5 flex-1 flex flex-col">
                <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md w-fit">
                    Berita
                </span>
                <h2 className="mt-3 text-lg font-bold text-slate-800 line-clamp-2 leading-tight">
                  {item.title}
                </h2>
                <div className="mt-2 text-slate-500 text-sm line-clamp-3 flex-1">
                  {/* Hapus tag HTML bawaan Laravel (misal <p>) secara kasar */}
                  {item.content?.replace(/<[^>]+>/g, '')} 
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                    <span>
                      {/* Cek kalau created_at ada */}
                      {item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID") : "-"}
                    </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Tampilan kalau data kosong */}
        {berita.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-400">Belum ada berita yang ditemukan di Database.</p>
                <p className="text-xs text-slate-300 mt-2">(Pastikan tabel 'news' di Aiven ada isinya)</p>
            </div>
        )}

      </div>
    </div>
  );
}