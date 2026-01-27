// middleware.ts
import { withAuth } from "next-auth/middleware";

// Ini akan otomatis melindungi semua rute yang cocok dengan config
export default withAuth({
  pages: {
    signIn: "/login", // Kalau belum login, lempar ke sini
  },
});

export const config = {
  // Tentukan folder mana yang mau diproteksi
  // Artinya: Semua yang depannya "/admin" WAJIB LOGIN dulu
  matcher: ["/admin/:path*"],
};