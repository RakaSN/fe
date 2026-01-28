import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { Plus, Calendar } from "lucide-react"; // Pencil & Trash2 dihapus krn sdh ada di TombolAksi
import Image from "next/image";
import TombolAksi from "./TombolAksi"; // Pastikan ini ter-import

const prisma = new PrismaClient();

async function getNews() {
  const data = await prisma.news.findMany({
    orderBy: { created_at: 'desc' },
  });
  return data;
}

export default async function AdminBeritaPage() {
  const news = await getNews();

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">
            Newsroom <span className="text-blue-600">Dashboard.</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Total {news.length} artikel telah diterbitkan.
          </p>
        </div>
        
        <Link 
          href="/admin/berita/tambah" 
          className="group flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" />
          <span>Buat Berita Baru</span>
        </Link>
      </div>

      {/* EMPTY STATE */}
      {news.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-3xl bg-white">
          <div className="bg-slate-50 p-4 rounded-full mb-4">
            <Calendar className="text-slate-300" size={32} />
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Belum ada berita</p>
        </div>
      ) : (
        /* NEWS GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id.toString()} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 group">
              
              {/* IMAGE */}
              <div className="h-52 bg-slate-100 relative overflow-hidden">
                {item.image && item.image !== "" && (item.image.startsWith("/") || item.image.startsWith("http")) ? (
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300 bg-slate-50">
                    <span className="text-[10px] font-mono uppercase tracking-widest">No_Image</span>
                  </div>
                )}
                
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
                  <Calendar size={12} />
                  {item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}
                </div>
                
                <h3 className="font-bold text-slate-900 text-lg leading-tight mb-3 line-clamp-2 h-[3.5rem]">
                  {item.title}
                </h3>
                
                {/* Actions Bar */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wide ${item.is_published ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    {item.is_published ? "Published" : "Draft"}
                  </span>
                  
                  {/* INI KUNCINYA AGAR TOMBOL BERFUNGSI */}
                  <TombolAksi id={item.id} />

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}