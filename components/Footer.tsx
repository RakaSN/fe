import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin, Phone, Mail, Sparkles, Import } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-white/10 text-slate-400 font-sans">
      <div className="container mx-auto px-4">
        
        {/* GRID UTAMA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. BRANDING & SOSMED */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
                {/* Logo Image */}
                <div className="relative w-12 h-12">
                    <Image 
                        src="/logo.png" 
                        alt="Logo Future Academy" 
                        fill
                        className="object-contain"
                    />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                    CAMP<span className="text-cyan-400">JAVA</span>
                </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Mencetak talenta digital berstandar global. Sekolah berbasis teknologi dengan kurikulum masa depan.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. LINK CEPAT */}
          <div>
            <h3 className="text-white font-bold mb-6">Jelajahi</h3>
            <ul className="space-y-4 text-sm">
              {['Beranda', 'Profil Sekolah', 'Daftar Jurusan', 'Berita & Artikel', 'Hubungi Kami'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. PROGRAM KEAHLIAN */}
          <div>
            <h3 className="text-white font-bold mb-6">Jurusan Favorit</h3>
            <ul className="space-y-4 text-sm">
              {['TITL', 'TJKT', 'TKRO'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-cyan-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. KONTAK */}
          <div>
            <h3 className="text-white font-bold mb-6">Alamat</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin size={20} className="text-cyan-500 shrink-0" />
                <span>Jl. Percetakan Negara II No.9 11, RT.11/RW.6, Johar Baru, Kec. Johar Baru, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10560</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={20} className="text-cyan-500 shrink-0" />
                <span>(021) 4212680</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={20} className="text-cyan-500 shrink-0" />
                <span>admissions@future.sch.id</span>
              </li>
            </ul>
          </div>

        </div>

        {/* GARIS BATAS */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm">
          <div>
            &copy; {new Date().getFullYear()} Raka Sepyan Nurfiqri. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}