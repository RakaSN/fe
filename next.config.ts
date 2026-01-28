import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Izin untuk Unsplash
        port: '',
        pathname: '/**',
      },
      // Kamu bisa tambah domain lain disini nanti (misal: drive.google.com, dll)
    ],
  },
};

export default nextConfig;