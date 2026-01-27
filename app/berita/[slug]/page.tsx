import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
    // FIX: pt-32 sangat penting di sini
    <div className="min-h-screen bg-white pt-32 pb-20"> 
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Tombol Kembali */}
        <Link 
          href="/berita" 
          className="inline-flex items-center text-gray-500 hover:text-blue-600 transition mb-8 font-medium group no-underline"
        >
          <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-blue-50 transition">
             ←
          </span>
          Kembali ke Daftar Berita
        </Link>

        {/* Header Artikel */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-semibold text-xs tracking-wide">
              {news.category}
            </span>
            <span className="text-gray-500 flex items-center gap-1">
              📅 {news.created_at}
            </span>
            <span className="text-gray-500 flex items-center gap-1">
              ✍️ {news.author}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            {news.title}
          </h1>
        </header>

        {/* Gambar Utama */}
        <div className="relative w-full h-[300px] md:h-[500px] mb-12 rounded-3xl overflow-hidden shadow-2xl">
          <Image 
            src={news.image} 
            alt={news.title} 
            fill 
            className="object-cover"
            priority
            unoptimized={true} 
          />
        </div>

        {/* Isi Berita (Content) */}
        {/* max-w-3xl agar baris teks tidak kepanjangan (lebih enak dibaca) */}
        <div className="max-w-3xl mx-auto">
          <article 
            className="prose prose-lg prose-blue prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>

        {/* Footer Kecil */}
        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-sm">Terima kasih telah membaca.</p>
        </div>

      </div>
    </div>
  );
}