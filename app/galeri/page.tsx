import { Metadata } from "next";
import GaleriClient, { GalleryItem } from "@/components/galeri/GaleriClient";
import { Camera, LayoutGrid, Box } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Archives | SMK PK Kampung Jawa",
  description: "Dokumentasi kegiatan, fasilitas, dan arsip digital sekolah.",
};

async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/gallery', { 
        cache: 'no-store',
        next: { revalidate: 0 }
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
    // bg-transparent agar grid global menyatu dari halaman ke halaman
    <main className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">
        
        {/* --- ORNAMENTAL BACKGROUND --- */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-600/5 via-transparent to-transparent pointer-events-none z-0"></div>
        <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

        {/* --- HEADER SECTION --- */}
        <header className="container mx-auto px-6 mb-16 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Camera size={14} className="text-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase">Visual_Archive_v4.0</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
              Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Intelligence.</span>
            </h1>

            <div className="flex items-center gap-6 mt-2">
              <div className="h-px w-12 bg-white/10 hidden md:block"></div>
              <p className="text-slate-400 max-w-xl text-lg font-light italic leading-relaxed">
                Dokumentasi langkah nyata kami dalam merevolusi pendidikan teknologi dan aktivitas ekosistem digital.
              </p>
              <div className="h-px w-12 bg-white/10 hidden md:block"></div>
            </div>

            {/* Statistics Mini-Bar (Optional Visual) */}
            <div className="flex gap-10 mt-12 border-y border-white/5 py-6">
               <div className="text-center">
                  <span className="block text-2xl font-black text-white italic">500+</span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Assets_Stored</span>
               </div>
               <div className="text-center border-x border-white/5 px-10">
                  <span className="block text-2xl font-black text-cyan-400 italic">4K</span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Resolution</span>
               </div>
               <div className="text-center">
                  <span className="block text-2xl font-black text-white italic">24/7</span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Live_Feed</span>
               </div>
            </div>
          </div>
        </header>

        {/* --- GALERI CONTENT --- */}
        <section className="relative z-10 px-4 md:px-0">
           {/* Panggil Client Component dan kirim datanya */}
           <GaleriClient items={items} />
        </section>

        {/* --- DECORATIVE FOOTER ELEMENT --- */}
        <div className="mt-20 flex justify-center opacity-20">
           <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
              ))}
           </div>
        </div>

    </main>
  );
}