/** @type {import('next').NextConfig} */
const nextConfig = {
  // Izinkan upload agak besar (jaga-jaga)
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  // Izinkan gambar dari mana saja (biar preview gak error)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;