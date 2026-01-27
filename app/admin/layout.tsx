"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  MessageSquareWarning, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  UserCircle 
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      title: "Dashboard Utama",
      icon: <LayoutDashboard size={20} />,
      href: "/admin",
    },
    {
      title: "Data Pengaduan",
      icon: <MessageSquareWarning size={20} />,
      href: "/admin/pengaduan",
    },
  ];

  // Fungsi untuk mendapatkan Judul Halaman berdasarkan URL
  const getPageTitle = () => {
    if (pathname === "/admin/pengaduan") return "Data Laporan Masuk";
    if (pathname === "/admin") return "Dashboard Overview";
    return "Admin Panel";
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* =======================
          1. SIDEBAR (Kiri)
      ======================== */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-white transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative flex flex-col
      `}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2 font-bold text-xl tracking-wide">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              🛡️
            </div>
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Sekolah Aman
            </span>
          </div>
          {/* Tombol Close di Mobile */}
          <button 
            className="md:hidden ml-auto text-slate-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Menu</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)} // Tutup sidebar pas diklik (mobile)
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Tombol Logout (Bawah) */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/30">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout Admin</span>
          </button>
        </div>
      </aside>


      {/* =======================
          2. KONTEN UTAMA (Kanan)
      ======================== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER (Navbar Atas) */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shadow-sm sticky top-0 z-40">
          
          <div className="flex items-center gap-4">
            {/* Tombol Menu Mobile */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            {/* Judul Halaman Dinamis */}
            <h2 className="text-lg md:text-xl font-bold text-slate-800 hidden md:block">
              {getPageTitle()}
            </h2>
          </div>

          {/* Profil Admin Kanan Atas */}
          <div className="flex items-center gap-4">
            {/* Notifikasi (Hiasan) */}
            <button className="p-2 text-slate-400 hover:bg-slate-50 hover:text-indigo-600 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            {/* Divider Kecil */}
            <div className="h-8 w-px bg-slate-200"></div>

            {/* Admin Profile */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-700">Super Admin</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <UserCircle size={24} />
              </div>
            </div>
          </div>
        </header>

        {/* ISI HALAMAN (Scrollable Area) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
      
      {/* Overlay Gelap untuk Mobile saat Sidebar Buka */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}