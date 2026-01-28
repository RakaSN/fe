import { Metadata } from "next";
import GuruClient, { TeacherItem } from "@/components/guru/GuruClient";
import { UserPlus, Cpu, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "The Faculty | SMK PK Kampung Jawa",
  description: "Daftar pengajar profesional dan praktisi industri.",
};

async function getTeachers(): Promise<TeacherItem[]> {
  try {
    // Note: Pastikan API ini aktif saat build/runtime
    const res = await fetch('http://127.0.0.1:8000/api/teachers', { 
      cache: 'no-store',
      next: { revalidate: 0 } 
    });
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
    // bg-transparent agar grid global menyatu
    <main className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">
        
        {/* --- DYNAMIC BACKGROUND GLOW --- */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-600/5 blur-[120px] pointer-events-none z-0"></div>

        {/* --- CLIENT COMPONENT (LIST GURU) --- */}
        <div className="relative z-10">
          <GuruClient teachers={teachers} />
        </div>

        {/* --- JOIN THE SQUAD CTA --- */}
        <section className="container mx-auto px-6 mt-32 relative z-10">
          <div className="group relative p-1 md:p-[2px] rounded-[2.5rem] overflow-hidden">
            {/* Animated Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative bg-slate-900/80 backdrop-blur-2xl rounded-[2.4rem] p-10 md:p-16 text-center overflow-hidden">
              {/* Background Decor */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>

              {/* Icon & Meta */}
              <div className="flex justify-center gap-4 mb-8">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-cyan-400">
                  <Cpu size={20} />
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-blue-400">
                  <ShieldCheck size={20} />
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic uppercase tracking-tighter">
                Become Part of <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">The Faculty Squad</span>
              </h2>
              
              <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg font-light leading-relaxed italic">
                Kami selalu mencari mentor, praktisi industri, dan pengajar bervisi masa depan. 
                Mari berkolaborasi membangun ekosistem pendidikan teknologi terbaik.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group/btn relative px-10 py-4 bg-white text-slate-900 font-black uppercase italic tracking-widest text-sm rounded-xl hover:bg-cyan-400 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3">
                  <UserPlus size={18} className="group-hover/btn:rotate-12 transition-transform" />
                  Kirim CV Sekarang
                </button>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Ref_Code: RECRUIT_2024</span>
              </div>
            </div>
          </div>
        </section>

    </main>
  );
}