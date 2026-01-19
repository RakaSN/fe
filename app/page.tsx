import HeroSection from "@/components/home/HeroSection";
import JurusanSection from "@/components/home/JurusanSection";
import LayananSection from "@/components/home/LayananSection";
import FloatingChat from "@/components/home/FloatingChat";
import TechMarquee from "@/components/home/TechMarquee";
import KeunggulanSection from "@/components/home/KeunggulanSection";
import VideoProfilSection from "@/components/home/VideoProfilSection";
import TestimoniSection from "@/components/home/TestimoniSection";
import StatsSection from "@/components/home/StatsSection";
import Footer from "@/components/Footer";
import { Outfit } from "next/font/google";
import type { Metadata } from "next";
import KepalaSekolah from "@/components/home/KepalaSekolah";
const fontOutfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SMK PK Kampung Jawa Jakarta",
  description: "School of Future Technology Leaders",
};
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Section (Landing + PPDB) */}
      <HeroSection />
      <TechMarquee />
      <KeunggulanSection />
      <JurusanSection />
      <StatsSection />
      <KepalaSekolah />
      <VideoProfilSection />
      {/* 5. Layanan Digital (Bento Grid) */}
      <LayananSection />
      <TestimoniSection />

    

      {/* 7. Fitur Chat (Global) */}
     
<Footer />
      {/* Footer Sederhana */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 SMK Pusat Keunggulan Kampung Jawa Jakarta. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
