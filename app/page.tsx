import { PrismaClient } from "@prisma/client";
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
import MitraSection, { PartnerItem } from "@/components/home/MitraSection";

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

// 2. Ambil Testimoni
async function getTestimonials(): Promise<TestimoniItem[]> {
  try {
    const data = await prisma.testimonis.findMany({
      take: 3,
      orderBy: { created_at: 'desc' }
    });

    return data.map((item: any) => ({
      id: Number(item.id),
      name: item.name,
      role: item.role || "Siswa",
      content: item.content,
      image: item.image ? `/uploads/${item.image}` : "/images/placeholder-user.png",
      company: item.company || "Alumni SMK", 
      batch: item.batch || "2024",
    }));
  } catch (error) {
    console.error("Gagal ambil testimoni:", error);
    return [];
  }
}

// 3. Ambil Mitra
async function getPartners(): Promise<PartnerItem[]> {
  try {
    const data = await prisma.partners.findMany({
        orderBy: { id: 'desc' }
    });

    return data.map((item: any) => ({
       id: Number(item.id),
       name: item.name,
       logo: item.image ? `/uploads/${item.image}` : "/images/placeholder-logo.png", 
    }));

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
  // Jalankan fetch secara paralel (Hapus getHeroImages dari sini)
  const [latestNews, testimonials, partners] = await Promise.all([
    getLatestNews(),
    getTestimonials(),
    getPartners()
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* FIX DISINI: Panggil HeroSection TANPA props heroImages */}
      <HeroSection />
      
      <TechMarquee />
      <LayananSection latestNews={latestNews} />
      <KeunggulanSection />
      <JurusanSection />
      <StatsSection />
      <KepalaSekolah />
      <VideoProfilSection />
      
      {/* Testimoni */}
      <TestimoniSection data={testimonials} />
      
      <div className="border-b border-slate-100 shadow-sm relative z-20"></div>
      
      {/* Mitra */}
      <MitraSection data={partners} />
      
      <Footer />
    </main>
  );
}