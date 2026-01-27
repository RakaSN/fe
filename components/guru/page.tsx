import { Metadata } from "next";
import GuruClient, { TeacherItem } from "@/components/guru/GuruClient";

export const metadata: Metadata = {
  title: "Guru & Staff | SMK PK Kampung Jawa",
  description: "Daftar pengajar profesional dan praktisi industri.",
};

async function getTeachers(): Promise<TeacherItem[]> {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/teachers', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Gagal ambil data guru:", error);
    return [];
  }
}

export default async function GuruPage() {
  const teachers = await getTeachers();

  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-cyan-900/20 to-transparent pointer-events-none"></div>

        {/* Client Component */}
        <GuruClient teachers={teachers} />

         {/* Join Team CTA (Bisa tetap statis di sini atau di client) */}
         <div className="container mx-auto px-4 mt-20">
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-colors"></div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">Tertarik menjadi bagian dari The Squad?</h2>
                <p className="text-slate-400 mb-8 max-w-2xl mx-auto relative z-10">
                    Kami selalu mencari talenta pengajar yang memiliki visi masa depan. Kirim CV Anda sekarang.
                </p>
                <button className="relative z-10 px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-cyan-400 transition-all shadow-lg hover:scale-105">
                    Karir di Yayasan
                </button>
            </div>
         </div>
    </main>
  );
}