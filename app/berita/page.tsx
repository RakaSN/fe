import NewsList from './NewsList';

// Definisikan Interface (harus sama strukturnya)
interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  created_at: string;
}

// Fetch Data di Server (Lebih Cepat & SEO Friendly)
async function getNews(): Promise<NewsItem[]> {
  // Gunakan no-store agar data selalu fresh
  const res = await fetch('http://127.0.0.1:8000/api/berita', { cache: 'no-store' });
  
  if (!res.ok) {
    // Jika error, kembalikan array kosong agar tidak crash
    return [];
  }
  
  return res.json();
}

export default async function BeritaPage() {
  const news = await getNews();

  // Oper data ke Client Component untuk diolah
  return <NewsList news={news} />;
}