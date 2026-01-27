import HeroSection from "@/components/home/HeroSection";
import JurusanSection from "@/components/home/JurusanSection";
import LayananSection from "@/components/home/LayananSection";
import TechMarquee from "@/components/home/TechMarquee";
import KeunggulanSection from "@/components/home/KeunggulanSection";
import VideoProfilSection from "@/components/home/VideoProfilSection";
import TestimoniSection, { TestimoniItem } from "@/components/home/TestimoniSection";
import StatsSection from "@/components/home/StatsSection";
import Footer from "@/components/Footer";
import KepalaSekolah from "@/components/home/KepalaSekolah";
import type { Metadata } from "next";
// Import Component Mitra dan Typenya
import MitraSection, { PartnerItem } from "@/components/home/MitraSection";

// --- TIPE DATA BERITA ---
interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  created_at: string;
}

// --- FETCHING DATA ---

// 1. Ambil Berita
async function getLatestNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/berita', { cache: 'no-store' });
    if (!res.ok) return [];
    const data: NewsItem[] = await res.json();
    return data.slice(0, 3);
  } catch (error) {
    console.error("Gagal ambil berita:", error);
    return [];
  }
}

// 2. Ambil Testimoni
async function getTestimonials(): Promise<TestimoniItem[]> {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/testimoni', { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.slice(0, 3);
  } catch (error) {
    console.error("Gagal ambil testimoni:", error);
    return [];
  }
}

// 3. Ambil Mitra / Partner (BARU)
async function getPartners(): Promise<PartnerItem[]> {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/partners', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Gagal ambil partner:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "SMK PK Kampung Jawa Jakarta",
  description: "School of Future Technology Leaders",
};

export default async function Home() {
  // Jalankan ketiganya secara paralel (Berita, Testimoni, Partner)
  const [latestNews, testimonials, partners] = await Promise.all([
    getLatestNews(),
    getTestimonials(),
    getPartners()
  ]);

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />

      {/* Menampilkan Mitra/Partner Tepat setelah Hero */}
      

      <TechMarquee />
      {/* Kirim Data Berita */}
      <LayananSection latestNews={latestNews} />
      <KeunggulanSection />
      <JurusanSection />
      <StatsSection />
      <KepalaSekolah />
      <VideoProfilSection />
      
      
      
      {/* Kirim Data Testimoni */}
      <TestimoniSection data={testimonials} />
      <div className="border-b border-slate-100 shadow-sm relative z-20"></div>
      <MitraSection data={partners} />
      
      <Footer />
    </main>
  );
}