"use client"; // Wajib pakai ini karena ada interaksi tombol Logout

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquareWarning, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react"; // Import fungsi logout

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/admin",
    },
    {
      title: "Data Pengaduan",
      icon: <MessageSquareWarning size={20} />,
      href: "/admin/pengaduan",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* MOBILE MENU BUTTON */}
      <button 
        className="fixed top-4 right-4 z-50 p-2 bg-indigo-600 text-white rounded-lg md:hidden shadow-lg"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#0f172a] text-white transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative
      `}>
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-xs text-slate-500 mt-1">Sekolah Aman v1.0</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
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

        {/* TOMBOL LOGOUT (Posisi di Bawah) */}
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })} // Redirect ke login setelah logout
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}