import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MapPin, Users } from "lucide-react";
import { notFound } from "next/navigation";

// --- DATABASE DATA JURUSAN ---
// Kuncinya (slug) harus sama dengan href di JurusanSection tadi: 'titl', 'tjkt', 'tkro'
const dataJurusan: Record<string, any> = {
  titl: {
    title: "Teknik Instalasi Tenaga Listrik",
    short: "Ahli Kelistrikan & Otomasi Industri",
    desc: "Jurusan TITL mencetak tenaga ahli yang kompeten dalam merancang, memasang, dan memelihara sistem kelistrikan, mulai dari penerangan rumah tangga hingga panel kontrol industri berbasis PLC dan Smart Building.",
    heroImage: "https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?q=80&w=2070&auto=format&fit=crop", // Foto Hero
    kurikulum: [
      "Instalasi Penerangan Listrik Bangunan",
      "Instalasi Tenaga Listrik Industri",
      "Sistem Kontrol Elektromekanik & Elektronik",
      "Programmable Logic Controller (PLC)",
      "Perbaikan Peralatan Listrik Rumah Tangga",
      "Produk Kreatif dan Kewirausahaan"
    ],
    prospek: [
      "Teknisi Listrik Industri (Maintenance)",
      "Kontraktor Instalasi Listrik",
      "Operator PLC & Otomasi",
      "Wirausaha Service Elektronik",
      "Melanjutkan kuliah Teknik Elektro"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069",
      "https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=2070",
      "https://images.unsplash.com/photo-1563770095-39d468f95c3c?q=80&w=1974"
    ]
  },
  tjkt: {
    title: "Teknik Jaringan Komputer & Telekomunikasi",
    short: "Network Engineer & Cyber Security",
    desc: "TJKT fokus pada penguasaan teknologi infrastruktur jaringan, administrasi server, keamanan siber, teknologi fiber optik, dan cloud computing. Siswa dilatih untuk merancang jaringan skala besar yang aman dan stabil.",
    heroImage: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2072&auto=format&fit=crop",
    kurikulum: [
      "Dasar Teknik Jaringan Komputer & Telekomunikasi",
      "Administrasi Infrastruktur Jaringan (Cisco/Mikrotik)",
      "Administrasi Sistem Jaringan (Linux/Windows Server)",
      "Teknologi Layanan Jaringan (VoIP & Fiber Optik)",
      "Keamanan Jaringan (Cyber Security)",
      "Cloud Computing & IoT"
    ],
    prospek: [
      "Network Engineer",
      "System Administrator",
      "IT Support / Helpdesk",
      "Teknisi Fiber Optik",
      "Cyber Security Analyst"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070",
      "https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?q=80&w=2080",
      "https://images.unsplash.com/photo-1520869562399-e772f042f422?q=80&w=2073"
    ]
  },
  tkro: {
    title: "Teknik Kendaraan Ringan Otomotif",
    short: "Mekanik Profesional & Teknologi Otomotif",
    desc: "TKRO mempelajari seluk-beluk kendaraan roda empat, mulai dari engine, chasis, pemindah tenaga, hingga sistem kelistrikan body dan elektronik mobil modern (EFI). Siap mencetak mekanik handal berstandar industri.",
    heroImage: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop",
    kurikulum: [
      "Pemeliharaan Mesin Kendaraan Ringan",
      "Pemeliharaan Sasis & Pemindah Tenaga",
      "Pemeliharaan Kelistrikan Kendaraan Ringan",
      "Teknologi Motor Bensin & Diesel",
      "Sistem Injeksi Elektronik (EFI)",
      "Spooring & Balancing"
    ],
    prospek: [
      "Mekanik Bengkel Resmi (ATPM)",
      "Service Advisor",
      "Teknisi Modifikasi Otomotif",
      "Wirausaha Bengkel Mobil / Cuci Mobil",
      "Operator Alat Berat"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974",
      "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083"
    ]
  }
};

// --- FUNGSI UTAMA HALAMAN ---
export default async function DetailJurusanPage({ params }: { params: Promise<{ slug: string }> }) {
  // Tunggu params dibaca dulu (wajib di Next.js 15)
  const resolvedParams = await params; 
  const slug = resolvedParams.slug;
  
  const data = dataJurusan[slug];

  // Kalau slug ngawur (misal /jurusan/boga), tampilkan 404
  if (!data) {
    return notFound();
  }

  return (
    <main className="bg-slate-950 min-h-screen text-slate-200">
      
      {/* 1. HERO SECTION KHUSUS JURUSAN */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={data.heroImage} 
            alt={data.title} 
            fill 
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-slate-900/80 bg-gradient-to-t from-slate-950 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center mt-20">
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-cyan-400 mb-6 transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            {data.title}
          </h1>
          <p className="text-xl md:text-2xl text-cyan-400 font-medium">
            {data.short}
          </p>
        </div>
      </section>

      {/* 2. DESKRIPSI & INFO */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white border-l-4 border-cyan-500 pl-4">
              Tentang Kompetensi Keahlian
            </h2>
            <p className="text-lg leading-relaxed text-slate-300 text-justify">
              {data.desc}
            </p>
            <div className="flex gap-4 pt-4">
               <div className="bg-slate-900 p-4 rounded-xl border border-white/10 text-center flex-1">
                  <Users className="mx-auto text-cyan-400 mb-2" />
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-xs text-slate-400">Rombel / Kelas</div>
               </div>
               <div className="bg-slate-900 p-4 rounded-xl border border-white/10 text-center flex-1">
                  <MapPin className="mx-auto text-purple-400 mb-2" />
                  <div className="text-2xl font-bold text-white">Lab</div>
                  <div className="text-xs text-slate-400">Standar Industri</div>
               </div>
            </div>
          </div>
          
          {/* List Kurikulum */}
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
              Apa yang dipelajari?
            </h3>
            <ul className="space-y-4">
              {data.kurikulum.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-cyan-400 min-w-[20px] mt-1" size={20} />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. GALERI KEGIATAN */}
      <section className="py-16 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Galeri Kegiatan Praktik</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.gallery.map((img: string, idx: number) => (
              <div key={idx} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer">
                <Image 
                  src={img} 
                  alt="Kegiatan Siswa" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROSPEK KERJA */}
      <section className="py-20 container mx-auto px-4">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Peluang Karir Lulusan</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.prospek.map((job: string, idx: number) => (
                <span key={idx} className="px-6 py-3 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 text-cyan-300 font-semibold shadow-lg hover:scale-105 transition-transform">
                  {job}
                </span>
              ))}
            </div>

            <div className="mt-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-10 relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Siap Bergabung dengan {data.title}?</h3>
                  <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                    Daftarkan dirimu sekarang dan jadilah tenaga ahli profesional masa depan.
                  </p>
                  <Link href="/ppdb" className="inline-block bg-white text-cyan-700 font-bold px-8 py-4 rounded-full hover:bg-slate-100 transition-colors shadow-xl">
                    Daftar Jurusan Ini Sekarang
                  </Link>
               </div>
               {/* Hiasan */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            </div>
         </div>
      </section>

    </main>
  );
}

// Biar performa kencang, kita generate parameter statis
export async function generateStaticParams() {
  return [
    { slug: 'titl' },
    { slug: 'tjkt' },
    { slug: 'tkro' },
  ];
}