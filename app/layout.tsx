import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

// --- KOMPONEN LAMA ABANG (TETAP DIPAKAI) ---
import ScrollProgress from "@/components/ScrollProgress";
import FloatingChat from "@/components/FloatingChat";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import CommandPalette from "@/components/CommandPalette";

// --- KOMPONEN BARU (FOOTER) ---
import Footer from "@/components/layout/Footer"; // <--- 1. Import Footer

const fontOutfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Future Academy | Sekolah Teknologi Masa Depan",
  description: "Sekolah menengah kejuruan berbasis teknologi dan inovasi. Mencetak generasi digital siap kerja di era industri 5.0.",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${fontOutfit.className} bg-slate-950 text-slate-100 antialiased`}>
        
        {/* FITUR-FITUR UI */}
        <ScrollProgress />
        <Navbar />
        <CommandPalette />
        <CustomCursor />
        <FloatingChat />
        
        {/* KONTEN UTAMA HALAMAN */}
        {children}

        {/* FOOTER (Letakkan di paling bawah) */}
        <Footer /> {/* <--- 2. Pasang Footer di sini */}

      </body>
    </html>
  );
}