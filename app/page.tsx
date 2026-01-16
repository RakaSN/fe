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
      <VideoProfilSection />
      {/* 5. Layanan Digital (Bento Grid) */}
      <LayananSection />
      <TestimoniSection />

      {/* 6. Guru & Staff (Simple Carousel Placeholder) */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Tenaga Pendidik Profesional</h2>
        <div className="flex flex-wrap justify-center gap-6">
            {/* Contoh 1 Card Guru */}
            {[1, 2, 3, 4].map((i) => (
               <div key={i} className="w-64 bg-white p-4 rounded-xl shadow-md border text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h4 className="font-bold text-lg">Bpk. Guru {i}</h4>
                  <p className="text-sm text-gray-500">Kaprodi TJKT</p>
               </div> 
            ))}
        </div>
      </section>

      {/* 7. Fitur Chat (Global) */}
      <FloatingChat />
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
