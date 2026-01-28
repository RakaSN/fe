import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Calendar, User, Share2, Clock } from 'lucide-react';

// Types
interface NewsDetail {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  author: string;
  image: string;
  created_at: string;
}

async function getNewsDetail(slug: string): Promise<NewsDetail | undefined> {
  const apiUrl = `http://127.0.0.1:8000/api/berita/${slug}`;
  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) return undefined;
    return res.json();
  } catch (error) {
    return undefined;
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const news = await getNewsDetail(resolvedParams.slug);

  if (!news) notFound();

  return (
    // bg-transparent agar grid global tetap terlihat
    <main className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/5 blur-[120px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        {/* Tombol Kembali - Stylized */}
        <Link 
          href="/berita" 
          className="inline-flex items-center text-slate-400 hover:text-cyan-400 transition-all mb-12 font-mono text-[10px] uppercase tracking-[0.3em] group"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center mr-4 group-hover:border-cyan-500/50 transition-all">
             <ChevronLeft size={14} />
          </div>
          Return_to_Archive
        </Link>

        {/* Header Artikel */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono uppercase tracking-widest mb-8">
            <span className="bg-cyan-500 text-slate-900 px-3 py-1 rounded-md font-bold italic">
              {news.category}
            </span>
            <span className="text-slate-500 flex items-center gap-2">
              <Calendar size={14} className="text-blue-500" /> {news.created_at}
            </span>
            <span className="text-slate-500 flex items-center gap-2">
              <User size={14} className="text-purple-500" /> {news.author}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8 italic uppercase tracking-tighter">
            {news.title}
          </h1>

          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent"></div>
        </header>

        {/* Gambar Utama dengan Frame Tech */}
        <div className="relative w-full h-[300px] md:h-[550px] mb-16 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
          <Image 
            src={news.image} 
            alt={news.title} 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
            unoptimized={true} 
          />
          {/* Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40"></div>
        </div>

        {/* Isi Berita (Content) */}
        <div className="max-w-3xl mx-auto">
          <article 
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-headings:tracking-tighter
              prose-p:text-slate-400 prose-p:leading-relaxed prose-p:font-light
              prose-strong:text-cyan-400 prose-strong:font-bold
              prose-blockquote:border-l-cyan-500 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
              prose-img:rounded-[2rem] prose-img:border prose-img:border-white/10"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>

        {/* Action Footer */}
        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic">EndOf_Transmission</p>
            </div>
            
            <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-slate-300 transition-all">
                    <Share2 size={14} /> Share_Report
                </button>
            </div>
        </footer>

      </div>
    </main>
  );
}