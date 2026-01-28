import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { Calendar, Newspaper, ArrowUpRight, Hash } from "lucide-react";

const prisma = new PrismaClient();

async function getBerita() {
  try {
    const data = await prisma.news.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
    return data;
  } catch (error) {
    console.error("Gagal ambil berita:", error);
    return [];
  }
}

export default async function BeritaPage() {
  const berita = await getBerita();

  return (
    // bg-transparent supaya grid global tembus
    <main className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">
      
      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <header className="mb-16">
            <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-cyan-500"></div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.4em]">Intelligence_Update</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 pr-6">Events.</span>
            </h1>
            <p className="text-slate-400 mt-6 max-w-xl font-light italic border-l-2 border-white/10 pl-6">
                Transmisi data terbaru mengenai aktivitas, prestasi, dan agenda strategis di ekosistem SMK PK Kampung Jawa.
            </p>
        </header>

        {/* --- GRID BERITA --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {berita.map((item) => (
            <div 
              key={Number(item.id)} 
              className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 flex flex-col h-full"
            >
              {/* GAMBAR BERITA */}
              <div className="relative h-56 w-full overflow-hidden">
                {item.image ? (
                  <Image 
                    src={`/uploads/${item.image}`} 
                    alt={item.title || "Berita"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    unoptimized 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full bg-slate-800 text-slate-500 gap-2">
                    <Newspaper size={32} strokeWidth={1} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">No_Media_Found</span>
                  </div>
                )}
                {/* Overlay Gradient on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                
                {/* Badge Category */}
                <div className="absolute top-4 left-4">
                    <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-cyan-400 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-cyan-500/20 uppercase">
                        <Hash size={10} /> Bulletin
                    </span>
                </div>
              </div>

              {/* KONTEN */}
              <div className="p-7 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <Calendar size={12} className="text-slate-500" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        {item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID", { day: '2-digit', month: 'short', year: 'numeric' }) : "UNKNOWN_DATE"}
                    </span>
                </div>

                <h2 className="text-xl font-black text-white italic uppercase tracking-tighter leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {item.title}
                </h2>

                <div className="mt-4 text-slate-400 text-sm font-light leading-relaxed line-clamp-3 flex-1 italic">
                  {item.content?.replace(/<[^>]+>/g, '')} 
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Read_More_Signal</span>
                    <button className="p-2 rounded-full bg-white/5 border border-white/10 text-white group-hover:bg-cyan-500 group-hover:text-slate-900 transition-all duration-300">
                        <ArrowUpRight size={18} />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- EMPTY STATE --- */}
        {berita.length === 0 && (
            <div className="text-center py-32 bg-slate-900/20 backdrop-blur-sm rounded-[2.5rem] border border-dashed border-white/10 mt-10">
                <div className="inline-flex p-6 bg-white/5 rounded-full mb-6">
                    <Newspaper size={48} className="text-slate-700" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 italic">Data Stream Offline</h3>
                <p className="text-slate-500 max-w-xs mx-auto text-sm font-light">Belum ada berita yang tersinkronisasi dari database Aiven.</p>
            </div>
        )}

      </div>
    </main>
  );
}