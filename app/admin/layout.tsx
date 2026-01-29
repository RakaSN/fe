"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  GraduationCap, 
  Newspaper, 
  MessageSquare, 
  LogOut, 
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Daftar Menu Admin
  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Manajemen Guru", // <--- INI MENU BARU KITA
      href: "/admin/guru",
      icon: <GraduationCap size={20} />,
    },
    {
      title: "Berita / Blog",
      href: "/admin/berita",
      icon: <Newspaper size={20} />,
    },
    {
      title: "Pengaduan",
      href: "/admin/pengaduan",
      icon: <MessageSquare size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans text-slate-200">
      
      {/* MOBILE HEADER (Hanya muncul di HP) */}
      <div className="md:hidden fixed top-0 w-full bg-slate-900 border-b border-slate-800 z-50 p-4 flex justify-between items-center">
        <span className="font-bold text-cyan-400">Admin Panel</span>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* SIDEBAR (KIRI) */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:block
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-slate-800">
          <h1 className="text-xl font-black tracking-tighter text-white">
            SEKOLAH <span className="text-cyan-500">ADMIN</span>
          </h1>
        </div>

        {/* Menu Links */}
        <nav className="p-4 space-y-2">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4">Main Menu</p>
          
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)} // Tutup sidebar di HP saat klik
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? "bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <span className={isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-white"}>
                    {item.icon}
                </span>
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 bg-slate-900">
            <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl w-full transition-colors">
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT (KANAN) */}
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto h-screen scrollbar-hide">
        {children}
      </main>

      {/* Overlay Gelap untuk Mobile */}
      {isSidebarOpen && (
        <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
        ></div>
      )}
    </div>
  );
}