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
  Newspaper,
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

  // 1. Data Menu disatukan di sini agar rapi
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
    {
      title: "Berita Sekolah",
      icon: <Newspaper size={20} />,
      href: "/admin/berita",
    },
  ];

  // 2. Logic Judul Halaman
  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard Overview";
    if (pathname.startsWith("/admin/pengaduan")) return "Data Laporan Masuk";
    if (pathname.startsWith("/admin/berita")) return "Manajemen Berita";
    return "Admin Panel";
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* =======================
          1. SIDEBAR (Kiri)
      ======================== */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-white transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative flex flex-col shadow-2xl
      `}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 font-bold text-xl tracking-wide">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
              🛡️
            </div>
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Sekolah Aman
            </span>
          </div>
          {/* Tombol Close di Mobile */}
          <button 
            className="md:hidden ml-auto text-slate-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 mt-2">
            Main Menu
          </p>
          
          {menuItems.map((item) => {
            // Cek active state (termasuk sub-path untuk UX yang lebih baik)
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Tombol Logout (Bawah) */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/30">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all border border-transparent hover:border-rose-500/20 group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Logout Admin</span>
          </button>
        </div>
      </aside>


      {/* =======================
          2. KONTEN UTAMA (Kanan)
      ======================== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <h2 className="text-lg md:text-xl font-bold text-slate-800 hidden md:block tracking-tight">
              {getPageTitle()}
            </h2>
          </div>

          {/* Profil Admin */}
          <div className="flex items-center gap-5">
            <button className="relative p-2 text-slate-400 hover:bg-slate-50 hover:text-indigo-600 rounded-full transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white animate-pulse"></span>
            </button>
            
            <div className="h-6 w-px bg-slate-200"></div>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-800">Super Admin</p>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-full flex items-center justify-center shadow-md shadow-indigo-500/20">
                <UserCircle size={24} />
              </div>
            </div>
          </div>
        </header>

        {/* ISI HALAMAN */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>

      </div>
      
      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}