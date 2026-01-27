import { Metadata } from "next";
import GaleriClient, { GalleryItem } from "@/components/galeri/GaleriClient";

export const metadata: Metadata = {
  title: "Galeri | SMK PK Kampung Jawa",
  description: "Dokumentasi kegiatan dan fasilitas sekolah.",
};

async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/gallery', { 
        cache: 'no-store' 
    });
    if (!res.ok) {
        throw new Error("Failed to fetch gallery");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }
}

export default async function GaleriPage() {
  const items = await getGalleryItems();

  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-20">
       {/* Panggil Client Component dan kirim datanya */}
       <GaleriClient items={items} />
    </main>
  );
}