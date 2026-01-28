import { PrismaClient } from "@prisma/client";
import HeroSection from "@/components/home/HeroSection"; 
import JurusanSection from "@/components/home/JurusanSection";
import LayananSection from "@/components/home/LayananSection";
import TechMarquee from "@/components/home/TechMarquee";
import KeunggulanSection from "@/components/home/KeunggulanSection";
import VideoProfilSection from "@/components/home/VideoProfilSection";
import TestimoniSection from "@/components/home/TestimoniSection";
import StatsSection from "@/components/home/StatsSection";
import Footer from "@/components/Footer";
import KepalaSekolah from "@/components/home/KepalaSekolah";
import type { Metadata } from "next";
import MitraSection from "@/components/home/MitraSection";

const prisma = new PrismaClient();

// --- TIPE DATA BERITA ---
interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  created_at: string;
  image?: string;
  content?: string;
}

// --- FETCHING DATA ---

// 1. Ambil Berita
async function getLatestNews(): Promise<NewsItem[]> {
  try {
    const data = await prisma.news.findMany({
      take: 3,
      orderBy: { created_at: 'desc' }
    });

    return data.map((item) => ({
      id: Number(item.id),
      title: item.title,
      slug: item.slug || "#",
      category: "Berita",
      created_at: item.created_at ? item.created_at.toISOString() : new Date().toISOString(),
      image: item.image ? `/uploads/${item.image}` : undefined,
      content: item.content || ""
    }));
  } catch (error) {
    console.error("Gagal ambil berita:", error);
    return [];
  }
}




export const metadata: Metadata = {
  title: "SMK PK Kampung Jawa Jakarta",
  description: "School of Future Technology Leaders",
};

export default async function Home() {
  // Jalankan fetch secara paralel (Hapus getHeroImages dari sini)
  const [latestNews] = await Promise.all([
    getLatestNews(),
    
    
  ]);

  return (
    <main className="relative min-h-screen"> {/* Warna dasar global */}
      {/* FIX DISINI: Panggil HeroSection TANPA props heroImages */}
      <HeroSection />
      
      <TechMarquee />
      {/* Mitra */}
      <MitraSection/>
      <JurusanSection />
      <LayananSection latestNews={latestNews} />
      <KeunggulanSection />
      
      <StatsSection />
      <KepalaSekolah />
      <VideoProfilSection />
      
      {/* Testimoni */}
      <TestimoniSection/>
      
      <div className="border-b border-slate-100 shadow-sm relative z-20"></div>
      
      
      
      
    </main>
  );
}