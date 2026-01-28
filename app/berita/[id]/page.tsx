import { prisma } from "@/lib/prisma"; // <--- 1. PAKAI INI (Singleton)
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Hash } from "lucide-react"; // Share2 dihapus karena sudah ada di dalam komponen ShareButton
import ShareButton from "@/components/ShareButton";

// HAPUS baris: const prisma = new PrismaClient(); 

// Fungsi ambil 1 berita by ID
async function getNewsDetail(id: string) {
  // Cek jika ID bukan angka
  if (isNaN(Number(id))) return null;

  const data = await prisma.news.findUnique({
    where: { id: parseInt(id) }, 
  });
  return data;
}

// Params di Next.js 15 adalah Promise
export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Unwrap params (Wajib di Next 15)
  const { id } = await params;
  
  // 2. Ambil Data
  const news = await getNewsDetail(id);

  // 3. Jika berita tidak ditemukan (404)
  if (!news) {
    return notFound();
  }

  // --- LOGIC GAMBAR ---
  const rawImage = news.image || "";
  const hasImage = rawImage.length > 0;
  let imageSrc = "/images/placeholder.jpg";
  
  if (hasImage) {
      if (rawImage.startsWith("/") || rawImage.startsWith("http")) {
          imageSrc = rawImage;
      } else {
          imageSrc = `/uploads/${rawImage}`;
      }
  }
  // --------------------

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 relative overflow-x-hidden selection:bg-cyan-500 selection:text-slate-900">
      
      {/* BACKGROUND ACCENTS */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20">
        
        {/* NAVIGASI KEMBALI */}
        <Link 
            href="/berita" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8 group font-mono text-sm uppercase tracking-widest"
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back_To_Feed</span>
        </Link>

        {/* HEADER BERITA */}
        <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
                    <Hash size={10} /> {news.category || "General"}
                </span>
                <span className="text-slate-500 text-[10px] uppercase tracking-widest flex items-center gap-1">
                    <Calendar size={12} /> 
                    {news.created_at 
                        ? new Date(news.created_at).toLocaleDateString("id-ID", { dateStyle: 'full' }) 
                        : "UNKNOWN DATE"
                    }
                </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 italic uppercase">
                {news.title}
            </h1>

            <div className="flex items-center justify-between border-y border-white/5 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 border border-white/10">
                        <User size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Author</p>
                        <p className="text-sm text-white font-medium">{news.author || "Redaksi Sekolah"}</p>
                    </div>
                </div>
                
                {/* --- 2. PERBAIKAN TOMBOL SHARE --- */}
                {/* Langsung self-closing tag, jangan ada isi di dalamnya */}
                <ShareButton 
                    title={news.title}
                    text={`Baca berita menarik ini: ${news.title}`}
                />
                {/* --------------------------------- */}

            </div>
        </header>

        {/* FEATURED IMAGE */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-2xl shadow-cyan-500/5 group">
            {hasImage ? (
                <Image 
                    src={imageSrc}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    priority
                />
            ) : (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-600">
                    <span className="font-mono text-xs uppercase tracking-widest">No Visual Data</span>
                </div>
            )}
            
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-50"></div>
        </div>

        {/* ISI BERITA (CONTENT) */}
        <article className="prose prose-lg prose-invert max-w-none">
            <div 
                className="text-slate-300 font-light leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: news.content }} 
            />
        </article>

        {/* FOOTER ARTICLE */}
        <div className="mt-16 pt-10 border-t border-white/5 flex justify-between items-center text-slate-500 font-mono text-xs">
            <span>ID_REF: {news.id}</span>
            <span>END_OF_TRANSMISSION</span>
        </div>

      </div>
    </main>
  );
}